# Builds out/storyboard_layout.html - self-contained (fonts + logo embedded), no images yet.
# Frames are 540x960 (half of 1080x1920). Grey sketches = where the user's images go.
import base64, os
HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, '..', 'reel_cidco_bid_error', 'site', 'a')
b64 = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
F = {w: b64(os.path.join(A, f'Poppins-{n}.ttf')) for w, n in [(500, 'Medium'), (600, 'SemiBold'), (700, 'Bold'), (800, 'ExtraBold')]}
LOGO = b64(os.path.join(A, 'logo_gold.png'))
O = '#ff8a2a'

css = ''.join(f"@font-face{{font-family:P;font-weight:{w};src:url(data:font/ttf;base64,{d})}}" for w, d in F.items()) + f"""
:root{{--o:{O};--ink:#17191c;--mute:#6b6f76}}
*{{box-sizing:border-box;margin:0;padding:0}}html{{overflow-x:hidden}}
body{{background:#f4f2ee;font-family:P;color:var(--ink);padding:24px 3vw;overflow-x:hidden}}
h1{{font:800 28px/1.2 P}}.sub{{font:500 14px/1.6 P;color:var(--mute);margin:6px 0 20px;max-width:1100px}}.sub b{{color:var(--o)}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:24px 20px}}
.cell{{display:flex;flex-direction:column;gap:10px;min-width:0}}
.f{{position:relative;width:540px;height:960px;overflow:hidden;border-radius:6px;background:#cfcac2;box-shadow:0 6px 24px rgba(0,0,0,.12)}}
.f svg.bg{{position:absolute;inset:0;width:540px;height:960px}}
.ph{{position:absolute;left:14px;bottom:170px;font:600 12px/1.4 P;color:#4a4740;background:rgba(255,255,255,.75);padding:6px 10px;border-radius:8px;z-index:30;max-width:300px}}
.unsafe{{position:absolute;left:0;right:0;background:rgba(255,40,40,.10);border-color:rgba(255,40,40,.55);border-style:dashed;border-width:0;z-index:50}}
.top{{top:0;height:110px;border-bottom-width:1px}}.bot{{bottom:0;height:210px;border-top-width:1px}}
.logo{{position:absolute;left:26px;top:122px;width:70px;height:48px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,.25);z-index:20}}.logo img{{width:58px}}
.src{{position:absolute;left:106px;top:124px;font:500 10px/1.35 P;color:#fff;background:rgba(20,22,26,.55);padding:5px 9px;border-radius:6px;z-index:20}}
.t{{position:absolute;left:0;right:0;text-align:center;font:800 32px/1.2 P;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.55);z-index:20}}.t .o{{color:var(--o)}}
.card{{position:absolute;background:rgba(255,255,255,.95);border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.25);z-index:20;padding:12px 16px}}
.k{{font:600 11px/1.3 P;letter-spacing:1.2px;color:var(--mute);text-transform:uppercase}}
.n{{font:800 28px/1.15 P}}.n.o{{color:var(--o)}}
.row{{display:flex;justify-content:space-between;align-items:center;gap:10px}}
.pill{{position:absolute;background:#fff;color:var(--ink);font:700 14px/1 P;padding:9px 14px;border-radius:999px;z-index:20;box-shadow:0 4px 14px rgba(0,0,0,.25);white-space:nowrap}}
.pill.o{{background:var(--o);color:#fff}}.tag{{position:absolute;right:16px;top:186px;font:700 11px P;color:#fff;background:rgba(20,22,26,.6);padding:4px 9px;border-radius:999px;z-index:25}}
.chip{{display:inline-flex;align-items:center;gap:6px;background:#fff;border-radius:999px;padding:7px 12px;font:700 14px P;box-shadow:0 4px 14px rgba(0,0,0,.2);margin:4px}}
.cap{{font:500 12px/1.45 P;color:#3a3d42}}.cap .h{{font:800 14px/1.3 P;color:var(--ink)}}.cap .tm{{color:var(--o);font-weight:700}}.cap i{{font-style:normal;color:var(--mute)}}
"""

HUD = f'<div class="unsafe top"></div><div class="unsafe bot"></div><div class="logo"><img src="data:image/png;base64,{LOGO}"></div><div class="src">* अंदाज · UDCPR 10.10.2 · दि. 27 ऑक्टो 2026<br>CIDCO चा अधिकृत video नाही</div>'

def svg(body, bg='#c9c3b8'):
    return f'<svg class="bg" viewBox="0 0 540 960"><rect width="540" height="960" fill="{bg}"/>{body}</svg>'

# simple grey sketches (placeholders for photos)
ROADS = '<rect x="0" y="560" width="540" height="70" fill="#8d8a84"/><rect x="40" y="0" width="60" height="960" fill="#8d8a84"/>'
OLD_TOP = svg(ROADS + '<rect x="150" y="300" width="300" height="230" fill="#b3ada2"/><rect x="200" y="340" width="200" height="140" fill="#9e978b"/>' + '<g fill="#a8a296">' + ''.join(f'<rect x="{x}" y="{y}" width="70" height="60"/>' for x, y in [(120, 120), (230, 90), (360, 140), (130, 690), (300, 700), (420, 760)]) + '</g>')
PLOT_LINE = f'<rect x="150" y="300" width="300" height="230" fill="none" stroke="{O}" stroke-width="5" rx="3"/>'
OLD_FRONT = svg('<rect x="0" y="600" width="540" height="360" fill="#8d8a84"/><rect x="120" y="260" width="300" height="340" fill="#b9b2a6"/>' + ''.join(f'<rect x="{140+c*70}" y="{290+r*60}" width="40" height="30" fill="#8f897e"/>' for r in range(5) for c in range(4)))
EMPTY_TOP = svg(ROADS + '<rect x="150" y="300" width="300" height="230" fill="#b9a98f"/>')
FLAT = svg('<rect x="0" y="0" width="540" height="960" fill="#d8d1c4"/><rect x="0" y="640" width="540" height="320" fill="#b9ab95"/><rect x="330" y="200" width="160" height="300" fill="#e9e4da"/>', bg='#d8d1c4')
def tower(floors):
    s = '<rect x="0" y="760" width="540" height="200" fill="#8d8a84"/>'
    s += '<rect x="140" y="700" width="260" height="60" fill="#a29c91"/>'  # stilt
    for i in range(floors):
        y = 700 - (i + 1) * 46
        s += f'<rect x="140" y="{y}" width="260" height="44" fill="#ece8e1" stroke="#b5afa4"/>'
    return svg(s, bg='#cdd4d9')
EVENING = svg('<rect x="0" y="0" width="540" height="960" fill="#e2b98c"/><rect x="0" y="620" width="540" height="340" fill="#7f7a72"/><rect x="40" y="220" width="160" height="400" fill="#c9bfae"/><rect x="340" y="160" width="170" height="460" fill="#c4b9a7"/>', bg='#e2b98c')

S = []
def scene(no, tm, title, voice, note, bg, overlay, ph):
    S.append(f'<div class="cell"><div class="f">{bg}{HUD}<div class="ph">📷 {ph}</div>{overlay}</div><div class="cap"><div class="h">S{no} · {title} <span class="tm">{tm}</span></div>"{voice}"<br><i>{note}</i></div></div>')

scene(1, '0-11 s', 'Hook', 'plot पंधराशे ते दोन हजार... 48 ते 64 हजार sq.ft बांधकाम!', 'Plot ची नारिंगी सीमा स्वतः काढली जाते · आकडा count होतो · camera push · impact',
      OLD_TOP + f'<svg class="bg" viewBox="0 0 540 960">{PLOT_LINE}</svg>',
      '<div class="t" style="top:200px;font-size:26px">1,500-2,000 चौ.मी. plot</div><div class="card" style="left:50px;right:50px;top:250px;text-align:center"><div class="k">redevelopment नंतर बांधकाम</div><div class="n o" style="font-size:30px">48,000-64,000 sq.ft?</div></div>',
      'जुनी सिडको इमारत, वरून (aerial)')
scene(2, '11-19 s', 'उदाहरण', 'उदाहरण... सिडकोची 30 वर्षांपेक्षा जुनी इमारत, 15 मीटर रस्ता', 'Pills एकेक · रस्त्यावर नारिंगी पट्टी + "15 m" मोजपट्टी (marking)',
      OLD_FRONT + f'<svg class="bg" viewBox="0 0 540 960"><rect x="0" y="640" width="540" height="10" fill="{O}"/><line x1="40" y1="745" x2="500" y2="745" stroke="#fff" stroke-width="3"/><line x1="40" y1="733" x2="40" y2="757" stroke="#fff" stroke-width="3"/><line x1="500" y1="733" x2="500" y2="757" stroke="#fff" stroke-width="3"/></svg>',
      '<div class="pill" style="left:40px;top:200px">उदाहरण · नवी मुंबई</div><div class="pill" style="left:40px;top:245px">सिडको इमारत · 30+ वर्षं</div><div class="pill o" style="left:212px;top:676px">15 m रस्ता</div>',
      'जुनी इमारत समोरून, समोर रस्ता')
scene(3, '19-28 s', 'FSI', 'FSI तीन... पण रस्ता नऊ मीटर, तर FSI फक्त दोन!', 'दोन cards समोरासमोर येतात · FSI 2 वर लाल खूण · pop',
      EMPTY_TOP,
      '<div class="t" style="top:200px;font-size:24px">रस्ता ठरवतो <span class="o">FSI</span></div><div class="card" style="left:30px;width:225px;top:250px;text-align:center"><div class="k">15 m रस्ता</div><div class="n" style="color:#1d8a4a">FSI 3</div></div><div class="card" style="right:30px;width:225px;top:250px;text-align:center"><div class="k">9 m रस्ता</div><div class="n" style="color:#d6342a">FSI 2</div></div><div class="pill" style="left:170px;top:345px;font-size:11px">UDCPR 10.10.2 · Table 10-C</div>',
      'रिकामा plot, top view')
scene(4, '28-36 s', 'बांधकाम', '1,500 वर 4,500 चौ.मी.... 2,000 वर 6,000 चौ.मी.', 'गुणाकार उघडतो · आकडे count होतात · ticks',
      EMPTY_TOP + f'<svg class="bg" viewBox="0 0 540 960">{PLOT_LINE}</svg>',
      '<div class="card" style="left:40px;right:40px;top:200px"><div class="row"><span class="k">1,500 × 3</span><span class="n">4,500 चौ.मी.</span></div><div style="height:1px;background:#ece8e2;margin:8px 0"></div><div class="row"><span class="k">2,000 × 3</span><span class="n">6,000 चौ.मी.</span></div></div>',
      'रिकामा plot, top view (तोच)')
scene(5, '36-44 s', 'तुमचं घर', 'carpet पेक्षा 35% जास्त, किमान 300 sq.ft... 300 चं थेट 405!', 'Floor-plan box 300 वरून 405 पर्यंत मोठा होतो · pop',
      FLAT,
      '<div class="t" style="top:200px;color:#17191c;text-shadow:none;font-size:28px">तुमचं घर</div><div class="card" style="left:60px;right:60px;top:250px;text-align:center"><div class="row" style="justify-content:center;gap:14px"><span class="n" style="color:#9aa0a6;font-size:24px">300 sq.ft</span><span style="font:800 22px P;color:#17191c">→</span><span class="n" style="font-size:32px;color:#1d8a4a">405 sq.ft</span></div><div style="font:600 12px P;color:#6b6f76;margin-top:4px">+35% · किमान 300 sq.ft carpet</div></div>',
      'नवीन घराचा आतला भाग (उजेड, रिकामी खोली)')
scene(6, '44-48 s', 'Open loop', 'पण इमारत दिसेल कशी? इथे एक खास नियम आहे.', 'हळू zoom · whoosh',
      EMPTY_TOP, '<div class="t" style="top:380px;font-size:34px">इमारत कशी <span class="o">दिसेल?</span></div>', 'रिकामा plot, top view')
scene(7, '48-57 s', 'इमारत उभी राहते', 'बाजूला फक्त 6 मीटर... stilt पार्किंग आणि वर 10 ते 12 मजले', 'Image-chain: रिकामा plot → stilt → पूर्ण tower · 6 m नारिंगी पट्ट्या · मजले counter · प्रत्येक टप्प्याला thud',
      tower(12) + f'<svg class="bg" viewBox="0 0 540 960"><rect x="80" y="160" width="60" height="600" fill="{O}" opacity=".35"/><rect x="400" y="160" width="60" height="600" fill="{O}" opacity=".35"/></svg>',
      '<div class="pill o" style="left:70px;top:470px;font-size:12px">6 m</div><div class="pill o" style="left:400px;top:470px;font-size:12px">6 m</div><div class="card" style="left:120px;right:120px;top:200px;text-align:center;padding:8px 12px"><div class="k">उदा.</div><div class="n" style="font-size:24px">stilt + 10-12 मजले</div><div style="font:500 10px P;color:#6b6f76">(ancillary FSI premium सह)</div></div>',
      'एकाच angle ने 3 images: रिकामा plot → stilt → tower')
scene(8, '57-70 s', 'नियम', '24 m पेक्षा उंच... 2 lift, refuge floor, fire NOC... garden नाही, terrace garden', '24 m वर नारिंगी रेषा (marking) · chips एकेक · click',
      tower(12) + f'<svg class="bg" viewBox="0 0 540 960"><line x1="100" y1="420" x2="440" y2="420" stroke="{O}" stroke-width="4" stroke-dasharray="10 8"/></svg>',
      '<div class="pill o" style="left:440px;top:405px;font-size:12px;transform:translateX(-100%)">24 m</div><div style="position:absolute;left:20px;right:20px;top:200px;z-index:20;text-align:center"><span class="chip">✅ 2 lift</span><span class="chip">✅ Refuge floor</span><span class="chip">✅ Fire NOC</span><br><span class="chip">❌ Ground garden</span><span class="chip">✅ Terrace garden</span></div>',
      'पूर्ण tower, 3/4 angle')
scene(9, '70-82 s', 'खरा प्रश्न', 'सगळं बांधकाम तुमचं नाही... society आणि सिडको मध्ये वाटलं जातं... हिशोब विचारा', 'Bar भरतो · उरलेल्या भागावर "% ?" · stamp',
      tower(12),
      '<div class="card" style="left:30px;right:30px;top:200px"><div class="k">एकूण बांधकाम</div><div style="display:flex;height:34px;border-radius:8px;overflow:hidden;margin:8px 0;font:700 12px/34px P;color:#fff;text-align:center"><div style="flex:3;background:#1d8a4a">तुमची घरं</div><div style="flex:4;background:#5c6470">उरलेलं: society / सिडको  % ?</div></div><div style="font:800 16px P;color:#d6342a">सही करण्याआधी हा हिशोब विचारा</div></div>',
      'पूर्ण tower (तोच)')
scene(10, '82-86 s', 'अंदाज', 'हा अंदाज आहे - अंतिम आराखडा architect आणि मंजुरीवर', 'इमारत मंद होते · fade',
      tower(12), '<div class="card" style="left:70px;right:70px;top:400px;text-align:center"><div style="font:800 18px/1.4 P">हा अंदाज आहे<br><span style="font-weight:600;font-size:14px;color:#6b6f76">अंतिम आराखडा: architect + मंजुरी</span></div></div>',
      'पूर्ण tower, मंद')
scene(11, '86-95 s', 'Comment (standard CTA)', 'plot किती, रस्ता किती मीटर? Comment करा - पुढचा video तुमच्या plot वर!', 'Comment box: "1800 चौ.मी. / 15m / वाशी" type होते → Post → ❤️ · ticks, click, pop',
      EVENING,
      '<div class="card" style="left:30px;right:30px;top:220px;text-align:center"><div style="font:800 20px/1.35 P">तुमच्या society चा <span style="color:#17191c">plot किती</span> आणि <span style="color:#17191c">रस्ता किती मीटर?</span></div></div><div style="position:absolute;left:30px;width:400px;top:640px;z-index:20;display:flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:7px 8px 7px 11px;box-shadow:0 5px 15px rgba(0,0,0,.3)"><div style="width:28px;height:28px;border-radius:50%;background:#e9e6e1"></div><div style="flex:1;font:600 14px P">1800 चौ.मी. / 15m / वाशी|</div><div style="font:800 14px P;color:#0095f6">Post</div></div>',
      'संध्याकाळचा society परिसर')
scene(12, '95-99 s', 'Outro', 'हा video society च्या group मध्ये पाठवा, आणि आमच्या पेजला फॉलो करा!', '"group मध्ये पाठवा" → Follow → Following ✓ · click',
      svg('', bg='#f7f6f3'),
      f'<div style="position:absolute;left:150px;top:330px;width:240px;height:166px;background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center;z-index:20"><img src="data:image/png;base64,{LOGO}" style="width:200px"></div><div class="pill" style="left:120px;top:560px">📤 society group मध्ये पाठवा</div><div class="pill o" style="left:150px;top:610px">Follow करा → Following ✓</div>',
      'image नाही (पांढरे पान)')

html = f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Plot किती, Building कशी? भाग 1 - Storyboard</title><style>{css}</style></head><body>
<h1>SRS Dwell · Plot किती, Building कशी? भाग 1 (1,500-2,000 चौ.मी.) · Layout storyboard</h1>
<div class="sub">Images अजून नाहीत - राखाडी चित्रे फक्त जागा दाखवतात (📷 = कोणती image लागेल). Look: golden-hour photoreal images, पांढरे cards, Poppins · <b>नारिंगी फक्त plot / रस्ता / 6 m / 24 m दाखवण्यासाठी</b> · transition: साधा zoom-dissolve · लाल पट्टी = Instagram unsafe area · वेळा script च्या शब्दांवरून अंदाजे (voice आल्यावर अचूक).</div>
<div class="grid">{''.join(S)}</div>
<script>function fit(){{document.querySelectorAll('.cell').forEach(c=>{{c.querySelector('.f').style.zoom=c.clientWidth/540}})}}addEventListener('resize',fit);addEventListener('load',fit);fit();</script>
</body></html>'''
os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
open(os.path.join(HERE, 'out', 'storyboard_layout.html'), 'w', encoding='utf-8').write(html)
print('ok', len(html))
