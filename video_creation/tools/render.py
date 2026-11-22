"""Render frames from site/index.html (pure function seek(t)) with headless Chromium.

Usage (from reels/reel_<topic>/):
    python ../../tools/render.py shots 1.5,4.9,... out/sh      -> out/sh_0001.50.png ...
    python ../../tools/render.py video A B out/p1.mp4          -> frames [A, B) at 30 fps, CRF 12 intermediate
    python ../../tools/render.py sfx 0 0 out/sfx.json          -> SFX events + duration
Env: PAGE=site/index.html (default)
"""
import base64
import json
import os
import subprocess
import sys
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from common import FFMPEG  # noqa: E402

FPS = 30
mode = sys.argv[1]
page_path = os.environ.get("PAGE", "site/index.html")


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


srv = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=os.getcwd()))
threading.Thread(target=srv.serve_forever, daemon=True).start()
url = f"http://127.0.0.1:{srv.server_address[1]}/{page_path}?render=1"

GRAB = "t => { seek(t); return document.getElementById('c').toDataURL(%s); }"

with sync_playwright() as pw:
    browser = pw.chromium.launch(args=["--disable-gpu-vsync", "--autoplay-policy=no-user-gesture-required"])
    page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    errors = []
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(url)
    page.wait_for_function("window.READY === true || window.LOAD_ERROR", timeout=60000)
    err = page.evaluate("window.LOAD_ERROR || null")
    if err or errors:
        sys.exit(f"page error: {err or errors}")
    duration = page.evaluate("E.duration")

    if mode == "shots":
        times = [float(x) for x in sys.argv[2].split(",")]
        prefix = Path(sys.argv[3])
        prefix.parent.mkdir(parents=True, exist_ok=True)
        for t in times:
            data = page.evaluate(GRAB % "'image/png'", t)
            out = Path(f"{prefix}_{t:07.2f}.png")
            out.write_bytes(base64.b64decode(data.split(",", 1)[1]))
        print(f"{len(times)} shots -> {prefix}_*.png")

    elif mode == "video":
        a, b, out = float(sys.argv[2]), float(sys.argv[3]), Path(sys.argv[4])
        out.parent.mkdir(parents=True, exist_ok=True)
        n0, n1 = round(a * FPS), round(min(b, duration) * FPS)
        ff = subprocess.Popen([FFMPEG, "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                               "-c:v", "libx264", "-preset", "medium", "-crf", "12", "-pix_fmt", "yuv420p", "-r", str(FPS), str(out)],
                              stdin=subprocess.PIPE)
        for n in range(n0, n1):
            data = page.evaluate(GRAB % "'image/jpeg', 0.96", n / FPS)
            ff.stdin.write(base64.b64decode(data.split(",", 1)[1]))
            if (n - n0) % 150 == 0:
                print(f"{out.name}: {n / FPS:.1f}s", flush=True)
        ff.stdin.close()
        if ff.wait() != 0:
            sys.exit("ffmpeg failed")
        print(f"{out} frames {n0}-{n1 - 1} ({(n1 - n0) / FPS:.2f}s)")

    elif mode == "sfx":
        out = Path(sys.argv[4])
        out.parent.mkdir(parents=True, exist_ok=True)
        events = page.evaluate("E.sfx")
        out.write_text(json.dumps({"duration": duration, "events": events}, indent=1))
        print(f"{len(events)} sfx events, duration {duration}s -> {out}")

    if errors:
        print("console errors:", errors)
    browser.close()
srv.shutdown()
