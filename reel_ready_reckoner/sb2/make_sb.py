# Builds sb2/storyboard.html (template) for the Ready Reckoner reel, reusing the navy+gold head from possession-delay.
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
prev = open('../../reel_possession_delay/sb2/storyboard.html', encoding='utf-8').read()
head = prev.split('<body>')[0] + '<body>\n'
SRC = '* उदाहरण · IGR e-ASR 2025-26 (2026-27 अपरिवर्तित) · built-up = carpet + 20% (साधारण)<br>अंतिम मूल्यांकन sub-registrar · दि. 18 नोव्हें 2026'


def F(n, body, cap):
    return (f'<div class="cell"><div class="f"><img class="bg" src="S{n}.jpg"><div class="unsafe top"></div><div class="unsafe bot"></div>'
            f'<div class="logo"><img src="logo_gold.png"></div><div class="src">{SRC}</div>{body}</div><div class="cap">{cap}</div></div>\n')


STEP = ('<div class="step" style="margin:6px 0"><div class="circ" style="width:26px;height:26px;line-height:22px;font-size:11px;color:#17191c">{n}</div>'
        '<div style="font:700 12px P">{t}</div></div>')
frames = [
 F(1,
   '<div class="pill" style="left:150px;top:210px;font-size:22px">घराची किंमत?</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><div style="text-align:center"><div class="k">Agreement</div><div style="font:900 44px/1.1 P;color:#fff">₹70 लाख</div></div></div>'
   '<div class="stamp" style="left:120px;top:430px;transform:rotate(-8deg)">सरकार: ₹78 लाख</div>'
   '<div class="pill" style="left:120px;top:540px;font-size:16px">Stamp duty 78 वर!</div>',
   '<div class="h">S1 · Hook <span class="tm">0–8.3 s</span></div>"घराची किंमत ठरली सत्तर लाख… सरकारच्या हिशोबात अठ्ठ्याहत्तर"<br><i>P1 वाशीची इमारत · O01 price tag "₹70 लाख" · "अठ्ठ्याहत्तर" वर O02 stamp ठोकतो (shake) · "stamp duty" वर pill</i>'),
 F(2,
   '<div class="pill" style="left:120px;top:210px;font-size:20px">Ready Reckoner rate</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><div style="text-align:center"><div class="k">= सरकारी किंमत</div><div style="font:700 16px/1.4 P">दरवर्षी <span class="g">1 एप्रिल</span> · प्रत्येक गाव · प्रत्येक zone<br>जमीन · flat · दुकान</div></div></div>'
   '<div class="pill" style="left:110px;top:560px;font-size:16px">त्याखाली registration नाही ✗</div>',
   '<div class="h">S2 · RR म्हणजे काय <span class="tm">8.3–21 s</span></div>"या सरकारी किमतीला म्हणतात Ready Reckoner rate… त्याखाली registration होत नाही"<br><i>P2 aerial, हळू zoom · zone grid lines काढतात (orange फक्त zones mark) · O03 calendar "1 एप्रिल" flip · शेवटी ✗ pill</i>'),
 F(3,
   '<div class="pill" style="left:150px;top:210px;font-size:20px">उदाहरण · वाशी</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><table><tr><th>flat दर</th><td class="g" style="font-weight:800">₹1,03,000 / चौ.मी.</td></tr><tr><th>carpet</th><td>650 sq.ft</td></tr><tr><th>built-up</th><td>≈ 72.5 चौ.मी.</td></tr><tr><th>गुणाकार</th><td style="font-weight:800">₹74.7 लाख</td></tr><tr><th>7 वा मजला</th><td class="g" style="font-weight:800">+5% = ₹78 लाख</td></tr></table></div>'
   '<div class="bar" style="top:600px;background:#1b2a45"><div style="flex:1;color:#fff;font:700 11px/34px P;text-align:center">1-4 · 0%</div><div style="flex:1;background:#2b3f66;color:#fff;font:700 11px/34px P;text-align:center">5-10 · +5%</div><div style="flex:1;color:#fff;font:700 11px/34px P;text-align:center">11-20 · +10%</div><div style="flex:1;color:#fff;font:700 11px/34px P;text-align:center">21-30 · +15%</div></div>',
   '<div class="h">S3 · हिशोब <span class="tm">21–37 s</span></div>"उदाहरण घेऊ - वाशी… सातवा मजला, पाच टक्के जास्त - अठ्ठ्याहत्तर लाख!"<br><i>P3 रिकामा 2 BHK · O04 tape "carpet" वर · O05 calculator "गुणाकार" वर · rows एकेक शब्दावर · O08 इमारत + मजला-premium पट्टी "सातवा" वर, 7 वा मजला highlight</i>'),
 F(4,
   '<div class="pill" style="left:150px;top:210px;font-size:20px">Stamp duty 6%</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><div class="row"><div><div class="k">70 लाखावर</div><div style="font:800 26px P">₹4.20 लाख</div></div><div><div class="k">78 लाखावर</div><div style="font:800 26px P" class="g">₹4.68 लाख</div></div></div><div style="margin-top:10px;text-align:center"><div class="k">फरक</div><div style="font:900 40px/1.1 P" class="g">₹48,000</div></div></div>'
   '<div class="pill" style="left:80px;top:580px;font-size:14px">5% + 1% metro cess · महिला: 5% · registration 1%, कमाल ₹30,000</div>',
   '<div class="h">S4 · Stamp duty <span class="tm">37–48.7 s</span></div>"आता हिशोब. Stamp duty सहा टक्के… अठ्ठेचाळीस हजार जास्त"<br><i>P4 office · O06 नोटांचे bundle · दोन आकडे count-up · "अठ्ठेचाळीस" वर gold counter + punch</i>'),
 F(5,
   '<div class="pill" style="left:130px;top:210px;font-size:20px">Income tax चा नियम</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><div style="text-align:center"><div class="k">सरकारी किंमत ÷ agreement</div><div style="font:900 40px/1.1 P" class="g">111%</div><div style="font:700 14px P">10% पेक्षा जास्त → फरकावर tax</div></div><div style="margin-top:12px;height:14px;border-radius:7px;background:linear-gradient(90deg,#3a8f5a 0 55%,#e5483b 55%)"></div></div>'
   '<div class="card" style="left:40px;width:200px;top:560px;padding:10px"><div class="k">विकणारा · 50C</div><div style="font:700 13px P">capital gain मध्ये +₹8 लाख</div></div>'
   '<div class="card" style="right:110px;width:200px;top:560px;padding:10px"><div class="k">घेणारा · 56(2)(x)</div><div style="font:700 13px P">उत्पन्न म्हणून +₹8 लाख</div></div>'
   '<div class="stamp" style="left:170px;top:680px;font-size:24px">दोघांना tax</div>',
   '<div class="h">S5 · 10% चा नियम <span class="tm">48.7–64.1 s</span></div>"खरा धोका पुढे… दोघांना tax!"<br><i>P5 table (heading spot-blur) · O09 needle meter "दहा टक्क्यांहून" वर लाल पट्ट्यात जातो · दोन cards "विकणाऱ्याच्या" / "घेणाऱ्याचं" वर · "दोघांना" stamp + shake · P6 notice हलक्या dissolve ने मध्ये</i>'),
 F(6,
   '<div class="pill" style="left:140px;top:210px;font-size:18px">igrmaharashtra.gov.in</div>'
   '<div style="position:absolute;left:170px;top:280px;width:200px;height:400px;background:#111;border-radius:26px;padding:12px;z-index:20"><div style="background:#fff;border-radius:16px;height:100%;padding:14px 10px;font:700 12px/1.6 P;color:#17191c"><div style="color:#9aa">e-ASR</div>'
   + STEP.format(n=1, t='जिल्हा: ठाणे') + STEP.format(n=2, t='तालुका: ठाणे') + STEP.format(n=3, t='गाव: वाशी') + STEP.format(n=4, t='zone → दर') + '</div></div>',
   '<div class="h">S6 · e-ASR तपासा <span class="tm">64.1–77.9 s</span></div>"म्हणून agreement करण्याआधी… तुमच्या zone चा दर बघा"<br><i>P7 phone-woman मागे · O07 phone वर generic UI (IGR logo नाही) · 4 taps शब्दांवर: "जिल्हा" "तालुका" "गाव" "दर" · ही ओळ re-record नंतर re-time</i>'),
 F(7,
   '<div class="pill" style="left:110px;top:210px;font-size:20px">2026-27: दर अपरिवर्तित</div>'
   '<div class="card" style="left:40px;right:110px;top:300px"><div style="text-align:center"><div class="k">गेल्या वर्षीचेच दर</div><div style="font:900 40px/1.1 P" class="g">+0%</div><div style="font:700 13px/1.5 P;margin-top:8px">* अंदाज · मजला, वय, lift नुसार बदल<br>अंतिम आकडा sub-registrar office</div></div></div>',
   '<div class="h">S7 · 2026-27 + disclaimer <span class="tm">77.9–88 s</span></div>"दोन हजार सव्वीस-सत्तावीससाठी हे दर वाढलेले नाहीत… अंतिम आकडा sub-registrar office ठरवतं"<br><i>P6 → P2 aerial परत · O03 calendar "2026-27" · "+0%" counter · disclaimer card हळू</i>'),
 F(8,
   '<div class="t" style="top:230px;font-size:30px">तुमच्या node चा<br><span class="g">RR दर किती?</span></div>'
   '<div class="card" style="left:40px;right:40px;top:640px;padding:10px 14px"><div style="font:600 12px P;color:#9aa">Add a comment…</div><div style="font:700 15px P">वाशी sec 17 · 1,03,000|</div></div>',
   '<div class="h">S8 · CTA <span class="tm">88–96.4 s</span></div>"तुमच्या node चा Ready Reckoner दर किती? Comment करा… पुढचा video - Index 2"<br><i>P8 चाव्या · O10 चावी · comment box types "वाशी sec 17 · 1,03,000" → Post → ❤ · "पुढचा video" pill "Index 2 म्हणजे काय?"</i>'),
]
outro = ('<div class="cell"><div class="f" style="background:radial-gradient(ellipse 90% 60% at 50% 38%,#1b2a45 0%,#0d1729 50%,#060b16 100%)"><div class="unsafe top"></div><div class="unsafe bot"></div>'
         '<div style="position:absolute;left:0;right:0;top:300px;text-align:center;font:800 30px P;color:#fff">अशाच <span class="g">माहितीसाठी</span></div>'
         '<div style="position:absolute;left:150px;top:370px;width:240px;height:166px;background:#fff;border-radius:16px;display:flex;align-items:center;justify-content:center"><img src="logo_gold.png" style="width:200px"></div>'
         '<div class="pill" style="left:150px;top:620px;font-size:17px">Follow → Following ✓</div></div><div class="cap"><div class="h">S9 · Outro <span class="tm">96.4–99.5 s</span></div>Follow flip (engine/cta.js)</div></div>\n')
body = ('<h1>SRS Dwell · Ready Reckoner rate म्हणजे काय? · Storyboard</h1>\n'
        '<div class="sub">placeholder &nbsp; Look: navy + gold (possession-delay सारखा) · photos मागे navy छटेसह · orange फक्त zones mark करण्यासाठी · प्रत्येक घटक शब्दाआधी 0.12 s · voice 96.4 s (S6 ओळ re-record pending)</div>\n<div class="grid">\n'
        + ''.join(frames) + outro
        + '</div><script>\nfunction fit(){document.querySelectorAll(".cell").forEach(c=>{const f=c.querySelector(".f");f.style.zoom=c.clientWidth/540})}\n'
          'addEventListener("resize",fit);addEventListener("load",fit);fit();\n</script></body></html>')
open('storyboard.html', 'w', encoding='utf-8').write(head + body)
json.dump({"1": "P1 वाशीची जुनी इमारत", "2": "P2 नवी मुंबई aerial (golden hour)", "3": "P3 रिकामा 2 BHK", "4": "P4 sub-registrar office · गडद",
           "5": "P5 agreement table (top-down)", "6": "P6 tax notice, lamp · गडद", "7": "P7 sofa, phone · गडद", "8": "P8 चाव्या, doorway"},
          open('labels.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('written')
