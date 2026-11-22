"""Generate the house SFX library procedurally (no third-party audio, no license issues).

Usage (from project root): python tools/sfxgen.py
Writes sfx/<name>.wav (44.1 kHz mono). Deterministic (fixed seed).
"""
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
rng = np.random.default_rng(7)
out = Path(__file__).resolve().parent.parent / "sfx"
out.mkdir(exist_ok=True)


def t_(d):
    return np.arange(int(d * SR)) / SR


def env(n, a, r, shape=3.0):
    """attack seconds a, then exponential release over remaining."""
    x = np.ones(n)
    na = max(int(a * SR), 1)
    x[:na] = np.linspace(0, 1, na)
    rest = n - na
    x[na:] = np.exp(-shape * np.linspace(0, 1, rest))
    return x


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], btype="band", fs=SR, output="sos"), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, btype="low", fs=SR, output="sos"), x)


def save(name, x, peak=0.89):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = int(0.005 * SR)
    x[-fade:] *= np.linspace(1, 0, fade)
    import soundfile as sf
    sf.write(out / f"{name}.wav", x.astype(np.float32), SR)
    print(name, f"{len(x)/SR:.2f}s")


# whoosh: noise through a sweeping band, swelling then fading
d = 0.55
n = int(d * SR)
noise = rng.standard_normal(n)
w = np.zeros(n)
blocks = 40
for k in range(blocks):
    s, e = k * n // blocks, (k + 1) * n // blocks
    f = 300 + 2600 * (k / blocks)
    w[s:e] = bp(noise, f * 0.6, f * 1.4)[s:e]
shape = np.sin(np.pi * np.linspace(0, 1, n)) ** 1.6
save("whoosh", w * shape)

# soft whoosh (shorter, darker)
d = 0.4
n = int(d * SR)
save("whoosh_soft", lp(rng.standard_normal(n), 1400) * np.sin(np.pi * np.linspace(0, 1, n)) ** 2)

# tick: short high click
tt = t_(0.05)
save("tick", np.sin(2 * np.pi * 2400 * tt) * env(len(tt), 0.001, 0, 9) + 0.3 * bp(rng.standard_normal(len(tt)), 3000, 8000) * env(len(tt), 0.0005, 0, 14), peak=0.6)

# click: UI click
tt = t_(0.07)
save("click", (np.sin(2 * np.pi * 1500 * tt) + 0.5 * np.sin(2 * np.pi * 3100 * tt)) * env(len(tt), 0.001, 0, 10), peak=0.7)

# pop: pitch-dropping blip
tt = t_(0.14)
f = 900 * np.exp(-tt * 18) + 300
save("pop", np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.002, 0, 6))

# soft hit: low thump + short noise
tt = t_(0.6)
f = 110 * np.exp(-tt * 5) + 45
thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.003, 0, 5)
save("hit_soft", thump + 0.25 * lp(rng.standard_normal(len(tt)), 2500) * env(len(tt), 0.001, 0, 25))

# stamp: thud + paper slap
tt = t_(0.35)
f = 160 * np.exp(-tt * 12) + 60
thud = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(tt), 0.001, 0, 9)
slap = bp(rng.standard_normal(len(tt)), 800, 5000) * env(len(tt), 0.0005, 0, 30)
save("stamp", thud + 0.6 * slap)

# paper: soft rustle slide
d = 0.45
n = int(d * SR)
rust = bp(rng.standard_normal(n), 1500, 7000) * (0.5 + 0.5 * rng.random(n) ** 3)
save("paper", lp(rust, 6000) * np.sin(np.pi * np.linspace(0, 1, n)) ** 1.2, peak=0.7)

# page flip: quick bright swish
d = 0.22
n = int(d * SR)
save("flip", bp(rng.standard_normal(n), 2000, 9000) * np.sin(np.pi * np.linspace(0, 1, n) ** 0.6) ** 2, peak=0.7)

# rise: soft upward shimmer
tt = t_(0.9)
f = 300 + 500 * (tt / tt[-1]) ** 2
tone = np.sin(2 * np.pi * np.cumsum(f) / SR) + 0.4 * np.sin(2 * np.pi * np.cumsum(2 * f) / SR)
save("rise", tone * (tt / tt[-1]) ** 1.5 * np.exp(-((tt - 0.85) * 12).clip(0) ** 2) + 0.15 * bp(rng.standard_normal(len(tt)), 3000, 9000) * (tt / tt[-1]) ** 2, peak=0.6)

# coin: two bright partials
tt = t_(0.35)
save("coin", (np.sin(2 * np.pi * 2100 * tt) + 0.6 * np.sin(2 * np.pi * 3300 * tt) + 0.3 * np.sin(2 * np.pi * 5200 * tt)) * env(len(tt), 0.001, 0, 7), peak=0.55)
