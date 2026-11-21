const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - Index II म्हणजे काय? FIRST STYLE (7 नवे नियम): navy + gold, big objects centre stage, numbered pills,
// progress bar, big transitions, stage always zooming, bokeh. Every item lands on its spoken word (L = cue - 0.12), never before.
function buildScenes(){
const END=70.5;window.END=END;
const L=t=>t-.12;
const SEC=[0,7.56,12.8,25.41,41.84,56.59,62.16,67.6,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.04*E.inout(p)})`});
BOKEH_ON=t=>(t<7.5)?0:1;
const INK='#0d1729';
const BAN=(t0,t1,y,txt,o={})=>{A({t0,t1,x:540,y,w:1000,cls:'chipw',html:`<span class="pill p-red" style="font:900 ${o.fs||52}px/1.15 P;padding:24px 44px 18px;transform:rotate(${o.rot||-3}deg);display:inline-block;white-space:normal">⚠ ${txt}</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0,allowOver:1,over:1});shake(t0+.05,10)};
const CARD=(t0,t1,y,icon,title,sub,o={})=>GL(t0,t1,o.x||540,y,o.w||900,`<div style="display:flex;align-items:center;gap:24px;text-align:left"><div style="width:96px;height:96px;flex:none;border-radius:22px;background:${o.col||'linear-gradient(180deg,#f2dfb6,#c9a66f)'};display:flex;align-items:center;justify-content:center;font-size:52px">${icon}</div><div><div style="font:800 ${o.fs||44}px/1.25 P;color:${INK}">${title}</div>${sub?`<div style="font:600 30px/1.3 P;color:#6b5a45;margin-top:4px">${sub}</div>`:''}</div></div>`,Object.assign({white:true,pad:'20px 28px',enter:'left',din:.4,float:.05},o));
function RULE(n,t0,t1,title,tt,o={}){
  A({t0,t1,x:540,y:250,w:1040,cls:'chipw',html:`<span class="pill p-gold" style="font:900 48px/1 P;padding:20px 46px 14px">${n}</span>`,enter:'down',din:.4,sfx:null,z:500,float:.1});
  if(title)TXT(tt,o.tt1||t1,540,o.y||395,`<div style="font:800 ${o.fs||60}px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">${title}</div>`,{z:500,sfx:null});
}
// ---------- transitions ----------
SWEEP(SEC[1]);BARS(SEC[2]);RINGT(SEC[3]);BLINDS(SEC[4]);flash(SEC[5],.5,'#ff5a4a');sfx(SEC[5]-.05,'boom',.55);shake(SEC[5]+.05,10);SWEEP(SEC[6]);SWEEP(SEC[7]);

// ---------- HUD ----------
A({t0:0,t1:SEC[7],x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:SEC[1],t1:SEC[6],x:680,y:104,w:660,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,
  html:`<div style="display:flex;gap:12px">${[1,2,3,4].map(i=>`<div class="sg" style="flex:1;height:14px;border-radius:7px;background:rgba(255,255,255,.18);overflow:hidden"><div style="height:100%;width:0;background:linear-gradient(90deg,#f2dfb6,#c9a66f);box-shadow:0 0 12px #e8cf9f"></div></div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{const st=[SEC[1],SEC[2],SEC[3],SEC[4],SEC[5]];oo.el.querySelectorAll('.sg>div').forEach((d,i)=>{d.style.width=(clamp((t-st[i])/(st[i+1]-st[i]))*100)+'%'})}});
A({t0:0,t1:SEC[7],x:900,y:162,w:320,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="display:inline-block;font:700 20px/1 P;color:#fff;background:rgba(255,255,255,.14);border:2px solid rgba(232,207,159,.5);border-radius:999px;padding:10px 20px">उदाहरण · राहुल</div>`});

// ================= HOOK 0 - 7.56 =================
BG({img:'B01_building_day.jpg',t0:0,t1:SEC[1],s0:1.2,s1:1.04,y0:-60,y1:20,fade:.2,filter:'brightness(.95) saturate(1.0)'});
TINT(0,SEC[1],'linear-gradient(180deg,rgba(13,26,51,.72),rgba(13,26,51,.25) 40%,rgba(13,26,51,.15) 60%,rgba(13,26,51,.8))',.2);
TXT(L(0.03),L(1.71),540,520,`<div style="display:inline-block;font:800 66px/1.25 P;color:#fff;background:rgba(13,26,51,.72);padding:22px 40px 16px;border-radius:28px;backdrop-filter:blur(8px)">राहुलने वाशीत<br>flat ठरवला</div>`,{enter:'up',din:.35,sfx:'whoosh',sfxv:.5});
TXT(L(1.71),L(3.50),540,520,`<div style="display:inline-block;font:800 66px/1.25 P;color:#fff;background:rgba(13,26,51,.72);padding:22px 40px 16px;border-radius:28px;backdrop-filter:blur(8px)">पण त्याच flat वर<br>2 वर्षांपूर्वी…</div>`,{enter:'up',din:.3,sfx:'swoosh',sfxv:.4});
A({t0:L(3.50),t1:SEC[1],x:300,y:1230,w:460,img:'O16_rahul_shock.png',enter:'pop',din:.3,sfx:null,float:.2,z:40});
BAN(L(3.50),SEC[1],620,'दुसऱ्याचं नाव!',{fs:66,rot:-6});flash(L(3.50),.5,'#ff5a4a');
GL(L(4.68),SEC[1],720,980,520,`<div style="font:800 40px/1.3 P;color:${INK}">घरबसल्या<br><span style="color:#b8935f">फुकट</span> कळलं</div>`,{white:true,pad:'20px 26px',enter:'right',din:.35,float:.1});
TXT(L(6.35),L(6.77),720,1300,`<div style="font:900 80px/1 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">कसं?</div>`,{enter:'pop',din:.2,sfx:'pop',sfxv:.5,w:500});
A({t0:L(6.77),t1:SEC[1],x:720,y:1300,w:600,cls:'chipw',html:`<span class="pill p-gold" style="font:900 96px/1 P;padding:30px 56px 22px">Index II</span>`,enter:'zoom',din:.3,sfx:'impact',sfxv:.65,z:62,float:0});
punch(L(6.77),.08);

// ================= 1. Index II = सूची क्र. 2 (7.56-12.8) =================
RULE('1 · Index II म्हणजे?',SEC[1]+.05,SEC[2],'सूची क्रमांक 2',L(8.48));
A({t0:L(9.62),t1:SEC[2],x:540,y:960,w:520,img:'O17_deed_booklet.png',enter:'rise',din:.45,sfx:'thud',sfxv:.5,float:.25,z:40,
  html:`<div style="position:absolute;left:14%;top:32%;width:48%;text-align:center;font:800 30px/1.2 P;color:#5a4a35">दस्त<br><span style="font-size:22px">(नोंदणीकृत)</span></div>`});
A({t0:L(9.98),t1:SEC[2],x:800,y:820,w:300,img:'O02_rubber_stamp.png',enter:'stamp',din:.3,sfx:'stamp',sfxv:.8,float:0,z:50,allowOver:1,over:1,fn:(t,lt)=>({r:-20})});
shake(L(9.98)+.05,9);
CARD(L(10.56),SEC[2],1560,'🏛️','दुय्यम निबंधक','नोंदणी झाल्यावर सारांश बनवतात',{w:900,fs:40});
A({t0:L(11.48),t1:SEC[2],x:300,y:900,w:300,img:'O11_document_page.png',enter:'left',din:.4,sfx:'paper',sfxv:.6,float:.2,z:45,allowOver:1,
  html:`<div style="position:absolute;left:10%;right:10%;top:12%;text-align:left;font:800 22px/1.7 P;color:${INK}"><div style="color:#b8935f">सूची क्र. 2</div><div style="border-bottom:2px solid #ddd">1 पान</div><div style="border-bottom:2px solid #ddd">सारांश</div></div>`});

// ================= 2. त्यात काय असतं (12.8-25.41) =================
RULE('2 · त्यात काय असतं?',SEC[2]+.05,SEC[3],null,0);
const ROWS=[['कोणी','विकणारा',13.66],['कोणाला','घेणारा',13.90],['मालमत्ता','flat 402, वाशी',14.77],['किती रुपयांना','₹72 लाख',15.56],['बाजारमूल्य','₹78 लाख',16.47],['stamp duty','₹4.68 लाख',17.37],['नोंदणी','12-03-2024',19.05]];
A({t0:L(12.80),t1:SEC[3],x:540,y:930,w:820,img:'O11_document_page.png',enter:'zoom',din:.4,sfx:null,float:.1,z:40,allowOver:1,
  html:`<div style="position:absolute;left:8%;right:8%;top:8%;text-align:left;font:700 36px/2.0 P;color:${INK}"><div style="font:900 44px/1.4 P;color:#b8935f;margin-bottom:8px">सूची क्रमांक 2 <span style="font-size:24px;color:#8a7560">· उदाहरण</span></div>${ROWS.map(r=>`<div class="rw" style="display:flex;justify-content:space-between;border-bottom:2px solid #e4ddd3;clip-path:inset(0 100% 0 0)"><span style="color:#8a7560">${r[0]}</span><span style="font-weight:800">${r[1]}</span></div>`).join('')}</div>`,
  fn:(t)=>{const p=E.inout(clamp((t-L(19.86))/.5));return {dx:-170*p,s:1-.28*p,dy:-120*p}},
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.rw').forEach((e,i)=>{const p=clamp((t-L(ROWS[i][2]))/.45);e.style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`})}});
ROWS.forEach(r=>sfx(L(r[2]),'pen',.5));
A({t0:L(13.66),t1:L(19.86),x:900,y:700,w:120,cls:'noshadow',html:`<svg viewBox="0 0 100 100" width="100%"><path d="M20 80 L70 30 l10 10 L30 90z" fill="#f2dfb6" stroke="#0d1729" stroke-width="4"/><path d="M70 30l8-8 10 10-8 8z" fill="#c9a66f" stroke="#0d1729" stroke-width="4"/></svg>`,enter:'pop',din:.3,sfx:null,float:0,z:50,allowOver:1,over:1,
  fn:(t)=>{let i=0;for(let k=0;k<ROWS.length;k++)if(t>=L(ROWS[k][2]))i=k;const p=clamp((t-L(ROWS[i][2]))/.45);return {dx:lerp(-520,80,p),dy:i*66-120,r:-10}}});
BAN(L(20.75),SEC[3],1130,'flat दोनदा विकला?',{fs:56,rot:-4});
A({t0:L(20.75),t1:SEC[3],x:880,y:1420,w:230,img:'O16_rahul_shock.png',enter:'pop',din:.3,sfx:null,float:.2,z:45});
CARD(L(22.33),SEC[3],1290,'🏠','शेजारचा flat किती ला गेला?','हे सुद्धा कळतं',{w:720,fs:34,x:400});

// ================= 3. Online कसा (25.41-41.84) =================
RULE('3 · Online · फुकट',SEC[3]+.05,SEC[4],'राहुलने काय केलं?',L(25.41),{tt1:L(30.17)});
A({t0:L(25.41),t1:SEC[4],x:150,y:1480,w:260,img:'O15_rahul.png',enter:'left',din:.45,sfx:null,float:.15,z:44});
const FIELDS=[['वर्ष','2024',31.04],['जिल्हा','ठाणे',31.23],['गाव','वाशी',31.54],['मिळकत क्र.','CTS / सर्व्हे / plot नं.',32.14],['Captcha','● ● ● ●',35.73]];
A({t0:L(26.28),t1:SEC[4],x:560,y:980,w:1000,img:'O12_laptop.png',enter:'up',din:.45,sfx:'whoosh',sfxv:.55,float:0,z:42,
  html:`<div style="position:absolute;left:12.5%;right:12.5%;top:7%;height:66%;background:#fff;padding:10px 20px;text-align:left;font:700 24px/1.35 P;color:${INK};overflow:hidden">
   <div class="url" style="background:#eef0f3;border-radius:10px;padding:6px 14px;font:700 22px/1.3 P;color:#333;visibility:hidden">🔒 freesearchigrservice.maharashtra.gov.in</div>
   <div class="chips" style="display:flex;gap:10px;margin-top:6px;visibility:hidden"><span class="c1" style="background:#ffe9e6;color:#c92a1e;border-radius:8px;padding:4px 14px;visibility:hidden">Login ✗</span><span class="c2" style="background:#ffe9e6;color:#c92a1e;border-radius:8px;padding:4px 14px;visibility:hidden">पैसे ✗</span></div>
   <div class="tabs" style="display:flex;gap:10px;margin-top:6px;visibility:hidden"><span class="tb1" style="background:#0d1729;color:#fff;padding:4px 16px;border-radius:8px">मिळकत निहाय</span><span class="tb2" style="border:2px solid #ccc;padding:4px 16px;border-radius:8px">दस्त निहाय</span></div>
   ${FIELDS.map(f=>`<div class="fd" style="display:flex;gap:12px;margin-top:5px;opacity:.3"><span style="width:190px;color:#8a7560">${f[0]}</span><span class="v" style="flex:1;border:2px solid #ccc;border-radius:8px;padding:0 10px;min-height:32px"></span></div>`).join('')}
   <div class="sb" style="margin-top:6px;background:#0d1729;color:#fff;text-align:center;padding:8px;border-radius:8px;font:800 26px/1.3 P;visibility:hidden">Search</div></div>`,
  draw:(t,lt,oo)=>{const q=oo.el;q.querySelector('.url').style.visibility=t>=L(27.76)?'visible':'hidden';q.querySelector('.chips').style.visibility=t>=L(28.81)?'visible':'hidden';q.querySelector('.c1').style.visibility=t>=L(28.81)?'visible':'hidden';q.querySelector('.c2').style.visibility=t>=L(29.60)?'visible':'hidden';
    const on5=t>=L(30.17);q.querySelector('.tabs').style.visibility=on5?'visible':'hidden';q.querySelector('.sb').style.visibility=on5?'visible':'hidden';
    q.querySelectorAll('.fd').forEach((e,i)=>{const on=t>=L(FIELDS[i][2]);e.style.opacity=on?1:(on5?.5:.3);const v=e.querySelector('.v');const n=Math.floor(clamp((t-L(FIELDS[i][2]))/.3)*FIELDS[i][1].length);v.textContent=on?FIELDS[i][1].slice(0,n):'';v.style.borderColor=on?'#b8935f':'#ccc'});
    const sb=q.querySelector('.sb');sb.style.background=t>=L(36.65)?'#b8935f':'#0d1729';sb.style.transform=`scale(${t>=L(36.65)&&t<L(36.65)+.2?.94:1})`;
    const d=t>=L(40.34);q.querySelector('.tb2').style.background=d?'#0d1729':'transparent';q.querySelector('.tb2').style.color=d?'#fff':INK;q.querySelector('.tb1').style.background=d?'transparent':'#0d1729';q.querySelector('.tb1').style.color=d?INK:'#fff';q.querySelector('.tb1').style.border=d?'2px solid #ccc':'none'}});
sfx(L(28.81),'pop',.5);sfx(L(29.60),'pop',.5);
PILL(L(30.17),SEC[4],540,395,'मिळकत निहाय पर्याय','p-gold',{st:'font:800 44px/1 P;padding:20px 44px 14px',z:500,float:0});
// cursor moves field to field and clicks
const CPOS=[[L(31.04),330,745],[L(31.23),330,790],[L(31.54),330,835],[L(32.14),330,880],[L(35.73),330,925],[L(36.65),560,990],[L(40.34),560,655]];
A({t0:L(30.9),t1:L(41.0),x:330,y:745,w:70,cls:'noshadow',html:CURSOR,enter:'fade',din:.2,sfx:null,float:0,z:70,allowOver:1,over:1,
  fn:(t)=>{let i=0;for(let k=0;k<CPOS.length;k++)if(t>=CPOS[k][0]-.25)i=k;const prev=CPOS[Math.max(0,i-1)],cur=CPOS[i];const p=E.inout(clamp((t-(cur[0]-.25))/.25));
    return {dx:lerp(prev[1],cur[1],p)-330,dy:lerp(prev[2],cur[2],p)-745,s:t>=cur[0]&&t<cur[0]+.12?.85:1}}});
FIELDS.forEach(f=>sfx(L(f[2]),'click',.55));sfx(L(36.65),'click',.7);sfx(L(40.34),'click',.5);
A({t0:L(36.65),t1:L(38.4),x:640,y:1000,w:130,cls:'noshadow',html:`<svg viewBox="0 0 100 100" width="100%"><circle cx="40" cy="40" r="26" fill="rgba(255,255,255,.3)" stroke="#f2dfb6" stroke-width="8"/><path d="M60 60 L88 88" stroke="#f2dfb6" stroke-width="12" stroke-linecap="round"/></svg>`,enter:'pop',din:.25,sfx:null,float:0,z:72,allowOver:1,fn:(t,lt)=>({s:1+.15*Math.sin(lt*8)})});
A({t0:L(37.98),t1:SEC[4],x:700,y:1330,w:420,img:'O11_document_page.png',enter:'zoom',din:.4,sfx:'impact',sfxv:.6,float:.15,z:60,allowOver:1,
  html:`<div style="position:absolute;left:10%;right:10%;top:10%;text-align:left;font:700 22px/1.8 P;color:${INK}"><div style="font:900 28px P;color:#b8935f">सूची क्रमांक 2 ✓</div><div style="border-bottom:2px solid #ddd">कोणी · कोणाला</div><div style="border-bottom:2px solid #ddd">मालमत्ता · रक्कम</div><div style="border-bottom:2px solid #ddd">नोंदणी दिनांक</div></div>`});
punch(L(37.98),.07);flash(L(37.98),.35,'#fff4dc');
CARD(L(40.34),SEC[4],1580,'🔢','दस्त क्रमांक माहीत? → दस्त निहाय','',{w:760,fs:32,x:640,sfx:null,allowOver:1});

// ================= 4. लक्षात ठेवा (41.84-56.59) =================
RULE('4 · लक्षात ठेवा',SEC[4]+.05,SEC[5],'एका वेळी एकच वर्ष',L(42.86),{tt1:L(51.48)});
const YEARS=[2026,2025,2024,2023,2022,2021,2020];
A({t0:L(43.74),t1:L(51.48),x:540,y:700,w:1000,cls:'noshadow',enter:'up',din:.35,sfx:'swoosh',sfxv:.4,float:0,z:45,
  html:`<div style="display:flex;gap:10px">${YEARS.map(y=>`<div class="yr" style="flex:1;border-radius:14px;padding:16px 4px;text-align:center;background:rgba(255,255,255,.12);border:2px solid rgba(232,207,159,.45);color:#fff;font:800 32px/1.1 P">${y}</div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{const n=Math.floor(clamp((t-L(45.08))/1.3)*YEARS.length);oo.el.querySelectorAll('.yr').forEach((e,i)=>{const on=i<=n&&t>=L(45.08);e.style.background=on?'linear-gradient(180deg,#f2dfb6,#c9a66f)':'rgba(255,255,255,.12)';e.style.color=on?INK:'#fff';e.style.transform=on&&i===n?'scale(1.12)':'scale(1)'})}});
for(let i=0;i<YEARS.length;i++)sfx(L(45.08)+i*1.3/YEARS.length,'click',.35);
A({t0:L(45.08),t1:L(51.48),x:540,y:1120,w:520,img:'O14_file_bundle.png',enter:'rise',din:.5,sfx:null,float:.25,z:40,fn:(t)=>({s:lerp(.7,1.1,E.out(clamp((t-L(45.08))/1.3)))})});
CARD(L(46.91),L(49.24),1480,'📍','मुंबई: 1985 पासून','',{w:760,fs:40});
CARD(L(49.24),L(51.48),1480,'📍','बाकी जिल्हे: साधारण 2002 पासून','',{w:860,fs:36});
A({t0:L(51.48),t1:SEC[5],x:540,y:900,w:420,img:'O11_document_page.png',enter:'zoom',din:.35,sfx:'whoosh',sfxv:.5,float:.1,z:40,
  html:`<div style="position:absolute;left:10%;right:10%;top:10%;text-align:left;font:700 22px/1.8 P;color:${INK}"><div style="font:900 28px P;color:#b8935f">सूची क्रमांक 2</div><div style="border-bottom:2px solid #ddd">कोणी · कोणाला</div><div style="border-bottom:2px solid #ddd">मालमत्ता · रक्कम</div></div>`});
BAN(L(53.55),SEC[5],1000,'मालकीचा पुरावा नाही!',{fs:58,rot:-6});flash(L(53.55),.4,'#ff5a4a');
CARD(L(55.88),SEC[5],1420,'🏛️','Bank / कोर्ट → प्रमाणित प्रत','दुय्यम निबंधकांकडून',{w:900,fs:38});

// ================= 5. Pattern interrupt (56.59-62.16) =================
TINT(SEC[5],SEC[6],'linear-gradient(180deg,rgba(13,26,51,.35),rgba(13,26,51,.35))',.2);
TXT(L(56.59),L(57.95),540,860,`<div style="font:800 64px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">Builder किंवा मालक</div>`,{enter:'up',din:.3,sfx:null});
TXT(L(57.95),SEC[6],540,860,`<div style="font:900 76px/1.2 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">कागद दाखवायला</div><div style="margin-top:14px"><span class="pill p-red" style="font:900 80px/1 P;padding:26px 52px 20px;color:#fff">टाळाटाळ?</span></div>`,{enter:'pop',din:.3,sfx:'impact',sfxv:.5});
A({t0:L(60.34),t1:SEC[6],x:540,y:1200,w:900,cls:'chipw',html:`<span class="pill p-gold" style="font:900 56px/1 P;padding:24px 48px 18px">सही आधी · 2 मिनिटं</span>`,enter:'zoom',din:.3,sfx:'impact',sfxv:.6,z:60,float:0});
punch(L(60.34),.07);
A({t0:L(61.03),t1:SEC[6],x:540,y:1480,w:200,img:'O10_house_key.png',enter:'pop',din:.3,sfx:'pop',sfxv:.4,float:.3,z:45,fn:(t,lt)=>({r:Math.sin(lt*3)*8})});

// ================= 6. CTA (62.16-67.6) =================
GL(L(62.16),SEC[7],540,560,940,`<div style="font:800 54px/1.35 P;color:${INK}">तुम्ही कधी<br>Index II काढलाय का?</div>`,{white:true,pad:'30px 36px',float:0,sfx:null});
COMMENT_BOX(L(64.04),SEC[7]-.05,64.3,64.95,'हो, bank loan साठी',{y:1300,typeDur:.45});
PILL(L(65.64),SEC[7],540,820,'📤 घर घेणाऱ्या मित्रांना पाठवा','p-gold',{st:'font-size:36px',float:0});

// ================= OUTRO (67.6-70.5) =================
TXT(L(67.6),END+1,540,420,`<div style="font:800 62px/1.3 P;color:#fff">अशाच <span style="color:#fff">माहितीसाठी</span></div>`,{enter:'down',din:.4,float:0,sfx:null});
A({t0:67.6,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:null,z:50,float:0});
FOLLOW_FLIP(L(68.3),END+1,68.8,{y:1380,col:'#c9a66f'});
A({t0:68.3,t1:END+1,x:540,y:1540,w:980,cls:'chipw',enter:'fade',din:.4,float:0,z:40,html:`<div style="font:600 22px/1.5 P;color:rgba(255,255,255,.8)">* स्रोत: IGR महाराष्ट्र free search (14 नोव्हें 2026) · नोंदणी कायदा 1908 कलम 55<br>उदाहरणातील नावे, आकडे काल्पनिक · कायदेशीर सल्ला नाही</div>`});
}
