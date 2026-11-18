"""Build the two self-contained storyboard HTMLs for a reel.

usage: python3 tools/storyboard_build.py <reel_dir> [labels.json]
  <reel_dir>/sb2/storyboard.html  template; backgrounds are <img class="bg" src="S{n}.jpg">
  <reel_dir>/sb2/R{n}.jpg          real images (540x960). If missing, S{n}.jpg is used.
  labels.json                      {"1": "F1 · ...", ...} placeholder captions (layout version)
outputs <reel_dir>/out/storyboard_layout.html, storyboard_images.html (+ .jpg of the images one)
"""
import base64, json, os, re, sys

reel = sys.argv[1]
sb = os.path.join(reel, 'sb2')
labels = json.load(open(sys.argv[2], encoding='utf-8')) if len(sys.argv) > 2 else {}
tpl = open(os.path.join(sb, 'storyboard.html'), encoding='utf-8').read()


def b64(path, mt):
    return f"data:{mt};base64," + base64.b64encode(open(path, 'rb').read()).decode()


def embed(h):
    h = re.sub(r'url\((\.\./site/a/[^)]+\.ttf)\)',
               lambda m: f"url({b64(os.path.join(sb, m.group(1)), 'font/ttf')})", h)
    return re.sub(r'src="([^"]+\.(?:jpg|png))"',
                  lambda m: 'src="' + b64(os.path.join(sb, m.group(1)),
                                          'image/png' if m.group(1).endswith('png') else 'image/jpeg') + '"', h)


def placeholder(m):
    n = m.group(1)
    dark = 'गडद' in labels.get(n, '')
    bg = 'linear-gradient(160deg,#3a3f47,#23272d)' if dark else 'linear-gradient(160deg,#a9a299,#7f786f)'
    col = '#c9ccd1' if dark else '#f1ece4'
    # label sits in the top unsafe band (y 12-100), so it never collides with on-screen text
    return (f'<div class="bg" style="position:absolute;inset:0;background:{bg}">'
            f'<div style="position:absolute;left:24px;right:24px;top:14px;border:2px dashed {col};border-radius:10px;'
            f'padding:8px 12px;text-align:center;font:700 17px/1.3 P;color:{col};white-space:nowrap;overflow:hidden;'
            f'text-overflow:ellipsis">🖼 {labels.get(n, "F" + n)} · 9:16</div></div>')


title = re.search(r'<h1>(.*?)</h1>', tpl).group(1).split('· Storyboard')[0].strip()
sub_re = r'<div class="sub">.*?&nbsp;'

lay = re.sub(r'<img class="bg" src="S(\d+)\.jpg">', placeholder, tpl)
lay = re.sub(r'<h1>.*?</h1>', f'<h1>{title} · Storyboard 1 · Layout (images शिवाय)</h1>', lay)
lay = re.sub(sub_re, '<div class="sub">राखाडी box = तिथे येणारी image (नाव prompts मध्ये तेच). आधी layout आणि मजकूर final करा, मग images बनवा. &nbsp;', lay, flags=re.S)

img = re.sub(r'src="S(\d+)\.jpg"',
             lambda m: f'src="R{m.group(1)}.jpg"' if os.path.exists(os.path.join(sb, f'R{m.group(1)}.jpg')) else m.group(0), tpl)
img = re.sub(r'<h1>.*?</h1>', f'<h1>{title} · Storyboard 2 · खऱ्या images सह</h1>', img)
img = re.sub(sub_re, '<div class="sub">तुम्ही पाठवलेल्या images (watermark काढून). Video मध्ये camera हळू हलेल, मजकूर आणि रेषा animate होतील. &nbsp;', img, flags=re.S)

os.makedirs(os.path.join(reel, 'out'), exist_ok=True)
for name, h in (('storyboard_layout.html', lay), ('storyboard_images.html', img)):
    open(os.path.join(reel, 'out', name), 'w', encoding='utf-8').write(embed(h))

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    for name in ('storyboard_layout.html', 'storyboard_images.html'):
        for w in (800, 1280, 1920):
            pg = b.new_page(viewport={'width': w, 'height': 800})
            pg.goto('file://' + os.path.abspath(os.path.join(reel, 'out', name)))
            pg.wait_for_timeout(700)
            sw = pg.evaluate('document.documentElement.scrollWidth')
            assert sw <= w, f'{name} overflows at {w}px'
            if w == 1920 and name == 'storyboard_images.html':
                pg.screenshot(path=os.path.join(reel, 'out', 'storyboard_images.jpg'), full_page=True, type='jpeg', quality=88)
            pg.close()
    b.close()
print('ok: out/storyboard_layout.html, out/storyboard_images.html, out/storyboard_images.jpg')
