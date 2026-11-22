"""Cut out objects shot on a pure white background.

Usage (from reels/reel_<topic>/):
    python ../../tools/keycut.py [--all-white] raw/NAME.webp [...]

Default: removes only near-white pixels CONNECTED to the image border (so white
highlights inside the object stay opaque). --all-white removes every near-white pixel.
Writes cutouts/NAME.png (trimmed to the object + 16 px margin) and qc/cutouts_sheet.jpg
(each cut-out on dark navy for edge inspection).
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

args = [a for a in sys.argv[1:] if not a.startswith("--")]
all_white = "--all-white" in sys.argv
Path("cutouts").mkdir(exist_ok=True)
Path("qc").mkdir(exist_ok=True)
outs = []

for src in args:
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(np.float32)
    mn = a.min(axis=2)
    sat = a.max(axis=2) - mn
    white = (mn > 228) & (sat < 22)
    if not all_white:
        lab, _ = ndimage.label(white)
        border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
        # enclosed holes (e.g. inside a key ring) are background too; small specular highlights are not
        sizes = np.bincount(lab.ravel())
        holes = {i for i in range(1, len(sizes)) if sizes[i] > 0.002 * white.size}
        white = np.isin(lab, list(border | holes))
    alpha = np.where(white, 0, 255).astype(np.uint8)
    # soft edge: partial alpha from whiteness on the boundary band
    edge = ndimage.binary_dilation(white, iterations=2) & ~ndimage.binary_erosion(white, iterations=1)
    soft = np.clip((255 - mn) / (255 - 200), 0, 1) * 255
    alpha = np.where(edge, np.minimum(alpha.astype(np.float32) + soft, 255) * (~white | edge), alpha).astype(np.uint8)
    alpha[white & ~edge] = 0
    am = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.6))
    rgba = im.copy()
    rgba.putalpha(am)
    ys, xs = np.where(np.asarray(am) > 8)
    m = 16
    box = (max(xs.min() - m, 0), max(ys.min() - m, 0), min(xs.max() + m, im.width), min(ys.max() + m, im.height))
    rgba = rgba.crop(box)
    name = Path(src).stem
    dst = Path("cutouts") / f"{name}.png"
    rgba.save(dst)
    outs.append(rgba)
    print(f"{src} -> {dst} {rgba.size}")

# contact sheet on navy
W = sum(o.width for o in outs) + 40 * (len(outs) + 1)
H = max(o.height for o in outs) + 80
sheet = Image.new("RGB", (W, H), (13, 23, 41))
x = 40
for o in outs:
    sheet.paste(o, (x, 40), o)
    x += o.width + 40
sheet.save("qc/cutouts_sheet.jpg", quality=90)
print("sheet -> qc/cutouts_sheet.jpg")
