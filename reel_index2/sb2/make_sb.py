# Builds sb2/storyboard.html for the Index II reel (ivory + champagne look, one person: राहुल).
import json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
prev = open('../../reel_stalled_redev/sb2/storyboard.html', encoding='utf-8').read()
head = prev.split('<body>')[0] + '<body>\n'
SRC = '* स्रोत: IGR महाराष्ट्र free search · नोंदणी कायदा 1908 कलम 55 · कायदेशीर सल्ला नाही'
G = '#8a7560'


def F(n, body, cap, src=False):
    return (f'<div class="cell"><div class="f"><img class="bg" src="S{n}.jpg"><div class="unsafe top"></div><div class="unsafe bot"></div>'
            f'<div class="logo"><img src="logo_gold.png"></div>{"<div class=src>"+SRC+"</div>" if src else ""}{body}</div><div class="cap">{cap}</div></div>\n')


RAHUL = lambda img, x, y, h: f'<img src="{img}.png" style="position:absolute;left:{x}px;top:{y}px;height:{h}px;z-index:21;filter:drop-shadow(0 10px 20px rgba(0,0,0,.35))">'
frames = [
 F(1,
   '<div class="t" style="top:150px;font-size:36px;color:#2b2620;text-shadow:none">हा flat <span style="color:#d6342a">आधीच विकलाय?</span></div>'
   '<div class="pill" style="left:150px;top:230px;font-size:16px">2 मिनिटांत · ₹0 · घरबसल्या</div>'
   + RAHUL('O16_rahul_shock', 60, 330, 520) +
   '<div class="stamp" style="left:250px;top:470px;font-size:22px;transform:rotate(-8deg)">दुसऱ्याचं नाव!</div>'
   '<div class="pill" style="left:300px;top:380px;font-size:14px">2 वर्षांपूर्वी</div>',
   '<div class="h">S1 · Hook <span class="tm">0–7.5 s</span></div>"राहुलने वाशीत flat ठरवला… दुसऱ्याचं नाव होतं! … कसं? Index II!"<br><i>Frame 1 (voice आधी): "हा flat आधीच विकलाय?" मोठे · P1 दरवाजा, push-in · राहुल (धक्का) "दुसऱ्याचं" वर pop + shake · "दुसऱ्याचं नाव!" stamp · "Index II" वर title pill</i>'),
 F(2,
   '<div class="pill" style="left:130px;top:210px;font-size:20px">Index II = सूची क्रमांक 2</div>'
   '<img src="O11_document_page.png" style="position:absolute;left:150px;top:290px;height:420px;z-index:20;filter:drop-shadow(0 10px 24px rgba(0,0,0,.3))">'
   '<div style="position:absolute;left:175px;top:330px;width:190px;font:700 11px/1.7 P;color:#2b2620;z-index:22"><div style="font:800 14px P;color:#8a7560">सूची क्र. 2</div><div style="border-bottom:1px solid #ccc;margin:6px 0">दस्त क्र. ____</div><div>दुय्यम निबंधक ____</div><div style="border-bottom:1px solid #ccc">दिनांक ____</div></div>'
   '<div class="pill" style="left:110px;top:740px;font-size:14px">दस्ताचा एका पानाचा सारांश</div>',
   '<div class="h">S2 · Index II म्हणजे <span class="tm">7.5–12.8 s</span></div>"Index II, म्हणजे सूची क्रमांक दोन… एका पानाचा सारांश"<br><i>P2 registrar desk, close crop · O11 कागद "उघडतो" (flip-in), O02 stamp "नोंदवल्यावर" वर ठोकतो · "एका पानाचा" pill</i>'),
 F(3,
   '<img src="O11_document_page.png" style="position:absolute;left:120px;top:190px;height:560px;z-index:20;filter:drop-shadow(0 10px 24px rgba(0,0,0,.3))">'
   '<div style="position:absolute;left:150px;top:240px;width:240px;font:700 13px/2.1 P;color:#2b2620;z-index:22">'
   + ''.join(f'<div style="display:flex;justify-content:space-between;border-bottom:1px solid #ddd"><span style="color:#8a7560">{k}</span><span style="color:{c}">{v}</span></div>' for k, v, c in
             [('कोणी', 'विकणारा', '#2b2620'), ('कोणाला', 'घेणारा', '#2b2620'), ('मालमत्ता', 'flat 402', '#2b2620'), ('किती रुपयांना', '₹72 लाख', '#d6342a'), ('बाजारमूल्य', '₹78 लाख', '#2b2620'), ('stamp duty', '₹4.68 लाख', '#2b2620'), ('नोंदणी', '12-03-2024', '#2b2620')]) +
   '</div><div class="pill" style="left:90px;top:800px;font-size:14px">दोनदा विकला? · शेजारचा flat किती ला?</div>',
   '<div class="h">S3 · त्यात काय असतं <span class="tm">12.8–25.3 s</span></div>"कोणी, कोणाला… नोंदणी कधी. म्हणजे flat दोनदा विकला गेलाय का…"<br><i>कागद मोठा; प्रत्येक शब्दावर एक ओळ उजळते (6 taps, ticks) · आकडे उदाहरण, "उदाहरण" tag · "दोनदा" वर O16 राहुल छोटा pop + "शेजारचा" pill</i>'),
 F(3,
   RAHUL('O15_rahul', 40, 300, 560) +
   '<div class="pill" style="left:230px;top:300px;font-size:16px">IGR महाराष्ट्र · free search</div>'
   '<div class="card" style="left:230px;top:360px;width:270px"><div class="k">freesearchigrservice.<br>maharashtra.gov.in</div><div style="font:800 18px P;margin-top:6px">Login ✗ · पैसे ✗</div></div>',
   '<div class="h">S4 · राहुलने काय केलं <span class="tm">25.3–30.1 s</span></div>"IGR महाराष्ट्रच्या free search website वर गेला. Login नाही, पैसे नाहीत."<br><i>P3 laptop-home मागे · O15 राहुल डावीकडे (पूर्ण S4-S6 राहतो) · URL card (screen वर, voice मध्ये नाही) · "Login ✗ पैसे ✗" दोन pops</i>'),
 F(3,
   '<img src="O12_laptop.png" style="position:absolute;left:30px;top:270px;width:480px;z-index:20;filter:drop-shadow(0 14px 30px rgba(0,0,0,.35))">'
   '<div style="position:absolute;left:90px;top:300px;width:360px;height:215px;background:#fff;z-index:22;padding:10px;font:700 11px/1.6 P;color:#2b2620"><div style="display:flex;gap:6px"><span style="background:#8a7560;color:#fff;padding:2px 8px;border-radius:4px">मिळकत निहाय</span><span style="border:1px solid #ccc;padding:2px 8px;border-radius:4px">दस्त निहाय</span></div>'
   + ''.join(f'<div style="display:flex;gap:6px;margin-top:5px"><span style="width:80px;color:#8a7560">{k}</span><span style="flex:1;border:1px solid #ccc;border-radius:4px;padding:0 6px">{v}</span></div>' for k, v in [('वर्ष', '2024'), ('जिल्हा', 'ठाणे'), ('गाव', 'वाशी'), ('मिळकत क्र.', 'CTS / सर्व्हे / plot'), ('Captcha', '●●●●')]) +
   '<div style="margin-top:6px;background:#2b2620;color:#fff;text-align:center;padding:4px;border-radius:4px">Search 🔍</div></div>'
   + RAHUL('O15_rahul', 380, 520, 340),
   '<div class="h">S5 · Online steps <span class="tm">30.1–41.8 s</span></div>"मिळकत निहाय… वर्ष, जिल्हा, गाव… मिळकत क्रमांक… Captcha… Index II उघडला! दस्त निहाय पर्यायही आहे"<br><i>O12 laptop वर mock browser (खरे recording आले तर तेच) · प्रत्येक शब्दावर एक field भरते (click) · "उघडला" वर कागद screen मधून बाहेर pop + punch · "दस्त निहाय" tab highlight</i>'),
 F(4,
   '<div class="pill" style="left:130px;top:210px;font-size:18px">एका वेळी एकच वर्ष</div>'
   '<div class="bar" style="top:280px;background:#2b2620">' + ''.join(f'<div style="flex:1;color:#fff;font:700 12px/34px P;text-align:center;border-right:1px solid #555">{y}</div>' for y in [2026, 2025, 2024, 2023, 2022, '…']) + '</div>'
   '<div class="card" style="left:40px;right:40px;top:360px"><div class="k">दस्त उपलब्ध</div><div style="font:800 16px/1.5 P">मुंबई: 1985 पासून<br>बाकी जिल्हे: साधारण 2002 पासून</div></div>'
   '<div class="stamp" style="left:110px;top:560px;font-size:22px;transform:rotate(-6deg)">मालकीचा पुरावा नाही</div>'
   '<div class="pill" style="left:80px;top:680px;font-size:14px">Bank / कोर्ट → प्रमाणित प्रत (दुय्यम निबंधक)</div>',
   '<div class="h">S6 · लक्षात ठेवा <span class="tm">41.8–56.5 s</span></div>"एका वेळी एकाच वर्षाचा शोध… 1985 / 2002… मालकीचा पुरावा नाही! … प्रमाणित प्रत घ्या"<br><i>P4 record room · वर्षांची पट्टी एकेक tick मागे सरकते · 1985/2002 card · "नाही!" वर stamp + shake (red) · P5 stamp photo वर "प्रमाणित प्रत" pill</i>'),
 F(5,
   '<div style="position:absolute;inset:0;background:rgba(20,16,12,.75);z-index:15"></div>'
   '<div class="t" style="top:380px;font-size:30px;color:#fff">कागद दाखवायला<br><span style="color:#e8cf9f">टाळाटाळ?</span></div>'
   '<div class="pill" style="left:120px;top:520px;font-size:18px">सही आधी · 2 मिनिटं</div>',
   '<div class="h">S7 · Pattern interrupt <span class="tm">56.5–62.1 s</span></div>"Builder किंवा मालक कागद दाखवायला टाळाटाळ करत असेल, तर सही करण्याआधी हे दोन मिनिटांचं काम करा."<br><i>गडद frame, एकच ओळ (नियम 6) · "2 मिनिटं" pill punch · O10 चावी थांबलेली</i>'),
 F(6,
   '<div class="t" style="top:230px;font-size:30px;color:#2b2620;text-shadow:none">तुम्ही कधी<br><span style="color:#8a7560">Index II काढलाय का?</span></div>'
   '<div class="card" style="left:40px;right:40px;top:640px;padding:10px 14px"><div style="font:600 12px P;color:#9aa">Add a comment…</div><div style="font:700 15px P">हो, bank loan साठी|</div></div>',
   '<div class="h">S8 · CTA <span class="tm">62.1–67.6 s</span></div>"तुम्ही कधी Index II काढलाय का? Comment करा! … पाठवा, … फॉलो करा!"<br><i>P6 जोडपे · comment box types "हो, bank loan साठी" → Post → ❤ · "📤 मित्रांना पाठवा" pill · Follow flip (S9 outro 67.6-70.5 s, logo sting)</i>'),
]
outro = ('<div class="cell"><div class="f" style="background:radial-gradient(ellipse 90% 60% at 50% 38%,#fdfbf8 0%,#f6f3f0 55%,#e9e2d8 100%)"><div class="unsafe top"></div><div class="unsafe bot"></div>'
         '<div style="position:absolute;left:0;right:0;top:300px;text-align:center;font:800 30px P;color:#2b2620">अशाच <span style="color:#8a7560">माहितीसाठी</span></div>'
         '<div style="position:absolute;left:150px;top:370px;width:240px;height:166px;background:#fff;border-radius:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.15)"><img src="logo_gold.png" style="width:200px"></div>'
         '<div class="pill" style="left:150px;top:620px;font-size:17px">Follow → Following ✓</div><div class="src" style="top:720px;left:40px;right:40px;position:absolute;color:#2b2620;background:none;text-align:center">' + SRC + '</div></div><div class="cap"><div class="h">S9 · Outro <span class="tm">67.6–70.5 s</span></div>Follow flip · footer/source फक्त इथे (नियम 7)</div></div>\n')
body = ('<h1>SRS Dwell · Index II म्हणजे काय? · Storyboard</h1>\n'
        '<div class="sub">placeholder &nbsp; Look: ivory + champagne (logo look) · एक माणूस: राहुल · frame 1 वर result-first hook · एका वेळी एक गोष्ट · footer फक्त outro ला · voice 67.6 s (1.12x) · safe: 1600 खाली काही नाही, comment box 1730 पर्यंत</div>\n<div class="grid">\n'
        + ''.join(frames) + outro
        + '</div><script>\nfunction fit(){document.querySelectorAll(".cell").forEach(c=>{const f=c.querySelector(".f");f.style.zoom=c.clientWidth/540})}\n'
          'addEventListener("resize",fit);addEventListener("load",fit);fit();\n</script></body></html>')
open('storyboard.html', 'w', encoding='utf-8').write(head + body)
json.dump({"1": "P1 flat चा दरवाजा", "2": "P2 registrar desk · गडद", "3": "P3 घरी laptop · गडद", "4": "P4 record room", "5": "P5 stamp · गडद", "6": "P6 जोडपे, नवीन घर"},
          open('labels.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('written')
