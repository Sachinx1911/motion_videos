"""Remove the Gemini/Flow sparkle watermark (bottom-right) by patching with the best-matching nearby texture.

usage: python3 tools/wm_remove.py img1.jpg [img2.jpg ...]   (edits in place)
Known positions (centre x, y, half-size) by image size; add new sizes when Flow changes.
"""
import sys
import numpy as np
from PIL import Image, ImageFilter

POS = {(1116, 2000): (1034, 1918, 34), (2000, 2000): (1882, 1882, 46), (1500, 1500): (1412, 1412, 36)}


def clean(path):
    img = Image.open(path).convert('RGB')
    if img.size not in POS:
        print('skip (unknown size)', path, img.size); return
    cx, cy, r = POS[img.size]
    im = np.asarray(img).astype(float); H, W, _ = im.shape
    x0, y0, x1, y1 = cx - r, cy - r, cx + r, cy + r; R = 8

    def ring(ox, oy):
        b = im[y0 - R + oy:y1 + R + oy, x0 - R + ox:x1 + R + ox].copy(); b[R:-R, R:-R] = np.nan; return b
    tgt = ring(0, 0); best = None
    for ox in range(-8 * r, 1, 10):
        for oy in range(-8 * r, 2 * r, 10):
            if abs(ox) < 2 * r and abs(oy) < 2 * r: continue
            if y1 + R + oy > H or x0 - R + ox < 0 or y0 - R + oy < 0 or x1 + R + ox > W: continue
            d = np.nanmean((ring(ox, oy) - tgt) ** 2)
            if best is None or d < best[0]: best = (d, ox, oy)
    _, ox, oy = best
    patch = im[y0 + oy:y1 + oy, x0 + ox:x1 + ox]
    mm = np.zeros((2 * r, 2 * r)); mm[6:-6, 6:-6] = 255
    mask = np.asarray(Image.fromarray(mm.astype('uint8')).filter(ImageFilter.GaussianBlur(5))).astype(float)[..., None] / 255
    im[y0:y1, x0:x1] = im[y0:y1, x0:x1] * (1 - mask) + patch * mask
    Image.fromarray(im.clip(0, 255).astype('uint8')).save(path, quality=95)
    print('ok', path, 'patch offset', ox, oy, 'err', round(best[0]))


for p in sys.argv[1:]:
    clean(p)
