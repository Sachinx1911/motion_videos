"""Cap long pauses in a voice file.

Usage (from reels/reel_<topic>/):
    python ../../tools/trim.py [src=versions/vo_original.mp3] [dst=vo.mp3] [max_pause=0.35]

- Finds silences (RMS below -40 dBFS for >= max_pause) and shortens each to max_pause,
  cutting in the middle of the silence with a 10 ms crossfade.
- Leading / trailing silence capped to 0.10 s / 0.30 s.
- Never touches the source file. Writes dst + trim_map.json (kept segments, for cue shifting).
"""
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).parent))
from common import encode_mp3, load_audio, save_wav  # noqa: E402

SR = 44100
src = sys.argv[1] if len(sys.argv) > 1 else "versions/vo_original.mp3"
dst = sys.argv[2] if len(sys.argv) > 2 else "vo.mp3"
max_pause = float(sys.argv[3]) if len(sys.argv) > 3 else 0.35
THRESH_DB = -40.0
HOP = int(0.01 * SR)
XF = int(0.010 * SR)

x = load_audio(src, SR)
n_frames = len(x) // HOP
rms = np.sqrt(np.mean(x[: n_frames * HOP].reshape(n_frames, HOP) ** 2, axis=1) + 1e-12)
silent = 20 * np.log10(rms) < THRESH_DB

# silence runs in samples
runs, i = [], 0
while i < n_frames:
    if silent[i]:
        j = i
        while j < n_frames and silent[j]:
            j += 1
        runs.append((i * HOP, j * HOP))
        i = j
    else:
        i += 1

# decide what to remove
cuts = []
for a, b in runs:
    length = b - a
    if a == 0:
        keep = int(0.10 * SR)
        if length > keep:
            cuts.append((0, length - keep))
    elif b >= n_frames * HOP:
        keep = int(0.30 * SR)
        if length > keep:
            cuts.append((a + keep, len(x)))
    elif length > max_pause * SR:
        keep = int(max_pause * SR)
        mid = (a + b) // 2
        ca = mid - (length - keep) // 2
        cuts.append((ca, ca + (length - keep)))

# build output with crossfades, record map of kept spans
pieces, kept, pos = [], [], 0
for ca, cb in cuts:
    pieces.append(x[pos:ca])
    kept.append((pos / SR, ca / SR))
    pos = cb
pieces.append(x[pos:])
kept.append((pos / SR, len(x) / SR))

out = pieces[0]
fade_in = np.linspace(0, 1, XF, dtype=np.float32)
for p in pieces[1:]:
    if len(out) >= XF and len(p) >= XF:
        blend = out[-XF:] * (1 - fade_in) + p[:XF] * fade_in
        out = np.concatenate([out[:-XF], blend, p[XF:]])
    else:
        out = np.concatenate([out, p])

tmp = Path(dst).with_suffix(".trim.wav")
save_wav(tmp, out, SR)
encode_mp3(tmp, dst)
tmp.unlink()

removed = sum(cb - ca for ca, cb in cuts) / SR
Path("trim_map.json").write_text(json.dumps({"src": src, "max_pause": max_pause, "kept": kept}, indent=1))
print(f"{len(cuts)} pauses capped, removed {removed:.2f}s: {len(x)/SR:.2f}s -> {len(out)/SR:.2f}s -> {dst}")
