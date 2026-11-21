# Green-screen cut-out: raw/<name>.jpg (object on pure green) -> site/a/<name>.png (transparent, cropped).
# usage: python ../tools/keygreen.py name1 name2 ...   (env RAW=raw/ OUT=site/a/)
# Alpha = greenness 20..80 -> 1..0, despill at the edge, keep only the main blobs, crop with 8 px margin.
import os, sys, glob
import numpy as np, cv2
from scipy import ndimage
R = os.environ.get('RAW', 'raw/'); O = os.environ.get('OUT', 'site/a/')
names = sys.argv[1:] or [os.path.basename(p)[:-4] for p in glob.glob(R + 'O*.jpg')]
for n in names:
    im = cv2.cvtColor(cv2.imread(R + n + '.jpg'), cv2.COLOR_BGR2RGB).astype(np.float32)
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    green = g - np.maximum(r, b)
    alpha = np.clip(1 - (green - 20) / 60, 0, 1)
    lab, k = ndimage.label(alpha > .5)
    if k > 1:
        sizes = ndimage.sum(np.ones_like(lab), lab, range(1, k + 1))
        big = [i + 1 for i, s in enumerate(sizes) if s > sizes.max() * .01]
        alpha = alpha * np.isin(lab, big)
    spill = np.maximum(g - np.maximum(r, b), 0) * (alpha < 1)
    out = np.dstack([r, g - spill, b, alpha * 255]).astype(np.uint8)
    ys, xs = np.where(alpha > .02)
    out = out[max(0, ys.min() - 8):ys.max() + 9, max(0, xs.min() - 8):xs.max() + 9]
    cv2.imwrite(f'{O}{n}.png', cv2.cvtColor(out, cv2.COLOR_RGBA2BGRA))
    print(n, out.shape[1], 'x', out.shape[0])
