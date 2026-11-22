"""Contact sheet of preview shots.

Usage (from reels/reel_<topic>/):
    python ../../tools/sheet.py [cols=6] [pattern=out/sh_*.png] [dst=qc/sheet.jpg]
Each tile is labelled with its time and has the platform safe-area guides drawn faintly.
"""
import sys
from glob import glob
from pathlib import Path

from PIL import Image, ImageDraw

cols = int(sys.argv[1]) if len(sys.argv) > 1 else 6
pattern = sys.argv[2] if len(sys.argv) > 2 else "out/sh_*.png"
dst = sys.argv[3] if len(sys.argv) > 3 else "qc/sheet.jpg"
files = sorted(glob(pattern))
if not files:
    sys.exit("no shots")
tw, th = 300, 533
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * (tw + 8) + 8, rows * (th + 34) + 8), (20, 20, 24))
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((tw, th))
    g = ImageDraw.Draw(im)
    s = tw / 1080
    g.rectangle([60 * s, 180 * s, 1020 * s, 1560 * s], outline=(255, 0, 255))  # safe area guide
    x, y = 8 + (i % cols) * (tw + 8), 8 + (i // cols) * (th + 34)
    sheet.paste(im, (x, y))
    d.text((x + 4, y + th + 6), Path(f).stem.split("_")[-1] + "s", fill=(230, 230, 230))
Path(dst).parent.mkdir(parents=True, exist_ok=True)
sheet.save(dst, quality=88)
print(f"{len(files)} tiles -> {dst}")
