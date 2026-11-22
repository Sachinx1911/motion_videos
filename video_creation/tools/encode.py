"""Concat rendered parts, 2-pass H.264 to a target size, mux AAC mix.

Usage (from reels/reel_<topic>/):
    python ../../tools/encode.py out/p1.mp4,out/p2.mp4,... out/FINAL.mp4 [target_MB=27.5]
Bitrate = (target bytes * 8 / duration - audio bitrate) * 0.985 (container overhead).
"""
import json
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from common import FFMPEG, FFPROBE  # noqa: E402

parts = sys.argv[1].split(",")
dst = Path(sys.argv[2])
target_mb = float(sys.argv[3]) if len(sys.argv) > 3 else 27.5


def probe(p, *entries):
    r = subprocess.run([FFPROBE, "-v", "error", "-show_entries", ":".join(entries), "-of", "json", str(p)], capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


for p in parts:
    s = probe(p, "stream=width,height,r_frame_rate,nb_frames", "format=duration")
    print(p, s["streams"][0], s["format"]["duration"])

lst = Path("out/concat.txt")
lst.write_text("".join(f"file '{Path(p).resolve().as_posix()}'\n" for p in parts))
subprocess.run([FFMPEG, "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "out/joined.mp4"], check=True)

dur = float(probe("out/joined.mp4", "format=duration")["format"]["duration"])
abr = int(probe("out/mix.m4a", "stream=bit_rate")["streams"][0]["bit_rate"])
vbr = int((target_mb * 1_000_000 * 8 / dur - abr) * 0.985)
print(f"duration {dur:.2f}s  audio {abr // 1000}k  video target {vbr // 1000}k")

common = ["-i", "out/joined.mp4", "-c:v", "libx264", "-preset", "slow", "-b:v", str(vbr), "-maxrate", str(int(vbr * 1.6)), "-bufsize", str(vbr * 2),
          "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", "30", "-g", "60", "-x264-params", "stats=out/x264_2pass.log"]
subprocess.run([FFMPEG, "-v", "error", "-y", *common, "-pass", "1", "-an", "-f", "mp4", "NUL"], check=True)
subprocess.run([FFMPEG, "-v", "error", "-y", *common[:2], "-i", "out/mix.m4a", *common[2:], "-pass", "2",
                "-map", "0:v:0", "-map", "1:a:0", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(dst)], check=True)
size = dst.stat().st_size
print(f"{dst}  {size / 1_000_000:.2f} MB ({size / 1048576:.2f} MiB)")
