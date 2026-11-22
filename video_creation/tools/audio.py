"""Mix voice + SFX and loudness-normalise.

Usage (from reels/reel_<topic>/):
    END=<seconds> python ../../tools/audio.py [sfx_json=out/sfx.json]
VO gain 1.0, FX gain 0.16 x event gain, light ducking of FX under voice.
Two-pass ffmpeg loudnorm to -15 LUFS integrated, true peak -1 dBTP -> out/mix.m4a (AAC 160k).
Writes qc/audio_qc.md with measured values.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from common import FFMPEG, load_audio, save_wav  # noqa: E402

SR = 48000
FX_GAIN = 0.16
TARGET_I, TARGET_TP, TARGET_LRA = -15.0, -1.0, 11.0
root = Path(__file__).resolve().parent.parent

meta = json.loads(Path(sys.argv[1] if len(sys.argv) > 1 else "out/sfx.json").read_text())
end = float(os.environ.get("END", meta["duration"]))
n = int(end * SR)

vo = load_audio("vo.mp3", SR)[:n]
vo = np.pad(vo, (0, n - len(vo)))
fx = np.zeros(n, np.float32)
cache = {}
for ev in meta["events"]:
    name = ev["name"]
    if name not in cache:
        cache[name] = load_audio(root / "sfx" / f"{name}.wav", SR)
    s = cache[name] * ev["gain"] * FX_GAIN
    i = int(ev["t"] * SR)
    j = min(n, i + len(s))
    if i < n:
        fx[i:j] += s[: j - i]

# light ducking: FX down by up to 4 dB while the voice is loud
win = int(0.05 * SR)
env = np.sqrt(np.convolve(vo ** 2, np.ones(win) / win, mode="same"))
duck = 1 - 0.37 * np.clip(env / (env.max() + 1e-9) * 3, 0, 1)
mix = vo + fx * duck
save_wav("out/mix_raw.wav", mix.astype(np.float32), SR)

ln = f"loudnorm=I={TARGET_I}:TP={TARGET_TP - 0.5}:LRA={TARGET_LRA}"  # 0.5 dB headroom for AAC overshoot
r = subprocess.run([FFMPEG, "-hide_banner", "-i", "out/mix_raw.wav", "-af", ln + ":print_format=json", "-f", "null", "-"], capture_output=True, text=True)
m = json.loads(re.search(r"\{[^{}]*\"input_i\"[^{}]*\}", r.stderr).group(0))
ln2 = (f"{ln}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}"
       f":measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true")
subprocess.run([FFMPEG, "-v", "error", "-y", "-i", "out/mix_raw.wav", "-af", ln2 + f",aresample={SR}", "-c:a", "aac", "-b:a", "160k", "out/mix.m4a"], check=True)

# verify
r = subprocess.run([FFMPEG, "-hide_banner", "-i", "out/mix.m4a", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
tail = r.stderr[r.stderr.rfind("Summary:"):]
I = float(re.search(r"I:\s+(-?[\d.]+) LUFS", tail).group(1))
TP = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", tail).group(1))
LRA = float(re.search(r"LRA:\s+(-?[\d.]+) LU", tail).group(1))
Path("qc").mkdir(exist_ok=True)
Path("qc/audio_qc.md").write_text(
    "# AUDIO QC\n\n"
    f"- Length: {end:.2f} s, {len(meta['events'])} SFX events, FX gain {FX_GAIN}, ducking up to -4 dB under voice\n"
    f"- Before norm: I {m['input_i']} LUFS, TP {m['input_tp']} dBTP\n"
    f"- Final out/mix.m4a: I {I:.1f} LUFS (target {TARGET_I}), true peak {TP:.1f} dBTP (max {TARGET_TP}), LRA {LRA:.1f} LU\n"
    f"- Result: {'PASS' if abs(I - TARGET_I) <= 1 and TP <= TARGET_TP + 0.2 else 'CHECK'}\n"
    "- No background music.\n", encoding="utf-8")
print(f"mix.m4a  I={I:.1f} LUFS  TP={TP:.1f} dBTP  LRA={LRA:.1f}")
