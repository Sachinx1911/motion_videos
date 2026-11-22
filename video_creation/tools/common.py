"""Shared helpers for reel tools."""
import os
import shutil
import subprocess
from pathlib import Path

import numpy as np


def _find(name):
    p = shutil.which(name)
    if p:
        return p
    base = Path(os.environ.get("LOCALAPPDATA", "")) / "Microsoft/WinGet/Packages"
    for exe in base.glob(f"Gyan.FFmpeg*/*/bin/{name}.exe"):
        return str(exe)
    raise FileNotFoundError(f"{name} not found - install with: winget install Gyan.FFmpeg")


FFMPEG = _find("ffmpeg")
FFPROBE = _find("ffprobe")


def load_audio(path, sr=44100):
    """Decode any audio file to mono float32 numpy at sample rate sr."""
    out = subprocess.run(
        [FFMPEG, "-v", "error", "-i", str(path), "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(out, dtype=np.float32).copy()


def save_wav(path, x, sr=44100):
    import soundfile as sf
    sf.write(str(path), x, sr, subtype="PCM_24")


def encode_mp3(src_wav, dst_mp3, bitrate="192k"):
    subprocess.run([FFMPEG, "-v", "error", "-y", "-i", str(src_wav), "-c:a", "libmp3lame", "-b:a", bitrate, str(dst_mp3)], check=True)
