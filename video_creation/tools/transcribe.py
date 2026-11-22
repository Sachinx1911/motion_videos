"""Transcribe a reel voice file with word timestamps.

Usage (from reels/reel_<topic>/):
    python ../../tools/transcribe.py [audio=vo.mp3] [out=whisper.json]

Writes <out> with segments + words, and prints the text with timings.
Model: large-v3-turbo, language mr, CUDA int8_float16 (falls back to CPU int8).
"""
import json
import os
import sys
import site
from pathlib import Path

# CUDA DLLs shipped by the nvidia-* pip packages
for sp in site.getsitepackages():
    for sub in ("nvidia/cublas/bin", "nvidia/cudnn/bin"):
        d = Path(sp) / sub
        if d.is_dir():
            os.environ["PATH"] = str(d) + os.pathsep + os.environ["PATH"]
            os.add_dll_directory(str(d))

from faster_whisper import WhisperModel  # noqa: E402

sys.path.insert(0, str(Path(__file__).parent))
from common import load_audio  # noqa: E402

audio_path = sys.argv[1] if len(sys.argv) > 1 else "vo.mp3"
out = sys.argv[2] if len(sys.argv) > 2 else "whisper.json"
audio = load_audio(audio_path, sr=16000)
initial_prompt = None  # keep transcription unbiased; script comparison is done separately

try:
    model = WhisperModel("large-v3-turbo", device="cuda", compute_type="int8_float16")
except Exception as e:  # noqa: BLE001
    print("CUDA failed, using CPU:", e)
    model = WhisperModel("large-v3-turbo", device="cpu", compute_type="int8")

segments, info = model.transcribe(
    audio,
    language="mr",
    word_timestamps=True,
    beam_size=5,
    vad_filter=os.environ.get("VAD", "1") == "1",  # VAD chunks stop Whisper from skipping long stretches
    vad_parameters={"min_silence_duration_ms": 250, "speech_pad_ms": 150},
    condition_on_previous_text=False,
    initial_prompt=initial_prompt,
)

data = {"duration": info.duration, "segments": []}
for s in segments:
    seg = {
        "start": round(s.start, 3),
        "end": round(s.end, 3),
        "text": s.text.strip(),
        "words": [
            {"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3), "p": round(w.probability, 3)}
            for w in (s.words or [])
        ],
    }
    data["segments"].append(seg)
    print(f"[{s.start:6.2f} - {s.end:6.2f}] {seg['text']}")

# second pass: re-transcribe stretches Whisper collapsed (word > 1.5 s or gap > 1.0 s)
def words_all():
    return [w for s in data["segments"] for w in s["words"]]

SR16 = 16000
for _ in range(3):
    ws = words_all()
    bad = []
    for i, w in enumerate(ws):
        if w["e"] - w["s"] > 1.5:
            bad.append((ws[i - 1]["e"] if i else 0.0, ws[i + 1]["s"] if i + 1 < len(ws) else info.duration))
        if i + 1 < len(ws) and ws[i + 1]["s"] - w["e"] > 1.0:
            bad.append((w["e"], ws[i + 1]["s"]))
    if not bad:
        break
    for a, b in bad:
        a0, b0 = max(0.0, a - 0.2), min(info.duration, b + 0.2)
        segs, _ = model.transcribe(audio[int(a0 * SR16):int(b0 * SR16)], language="mr", word_timestamps=True,
                                   beam_size=5, condition_on_previous_text=False)
        new_words = [{"w": x.word.strip(), "s": round(x.start + a0, 3), "e": round(x.end + a0, 3), "p": round(x.probability, 3)}
                     for sg in segs for x in (sg.words or [])]
        for sg in data["segments"]:
            sg["words"] = [w for w in sg["words"] if not (w["s"] >= a - 0.05 and w["e"] <= b + 0.05) and not (w["e"] - w["s"] > 1.5 and w["s"] < b and w["e"] > a)]
        data["segments"].append({"start": a0, "end": b0, "text": " ".join(w["w"] for w in new_words), "words": new_words, "patched": True})
        print(f"patched {a:.2f}-{b:.2f}: {len(new_words)} words")
    data["segments"].sort(key=lambda s: s["words"][0]["s"] if s["words"] else s["start"])

Path(out).write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"\nduration {info.duration:.2f}s -> {out}")
