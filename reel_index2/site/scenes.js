const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - Index II म्हणजे काय? Logo look (ivory + champagne). One person (राहुल), result-first hook on frame 1,
// one thing on screen at a time, fast crops, footer only in the outro. Times = words.json (align.py), L = cue - 0.12.
function buildScenes(){
const END=70.5;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:7.56,s3:12.8,s4:25.41,s5:30.17,s6:41.84,s7:56.59,s8:62.16,s9:67.6};
BOKEH_ON=t=>(t>S.s9)?1:0;
const INK='#2b2620',CH='#8a7560';
const FADE='linear-gradient(180deg,rgba(246,243,240,.6),rgba(246,243,240,0) 20%,rgba(246,243,240,0) 78%,rgba(246,243,240,.55))';
const CUT=(img,t0,t1,o={})=>{const s=o.s||1.0,s1=s+(o.ds===undefined?.06:o.ds),fx=o.fx===undefined?540:o.fx,fy=o.fy===undefined?960:o.fy;
  const cx=v=>Math.max(-540*(v-1),Math.min(540*(v-1),-(fx-540)*v)),cy=v=>Math.max(-960*(v-1),Math.min(960*(v-1),-(fy-960)*v));
  BG({img,t0,t1,s0:s,s1,x0:cx(s),x1:cx(s1),y0:cy(s),y1:cy(s1),fade:o.fade||.16,filter:o.filter||'brightness(.96) saturate(.95)'});
  if(o.cut!==false&&t0>0){punch(t0,.025);if(!o.q)sfx(t0,'swoosh',.16)}};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||430,txt,'p-gold',{st:'font:800 44px/1 P;padding:22px 46px 16px',z:500,float:0});
const RED=(t0,t1,y,txt,o={})=>PILL(t0,t1,540,y,txt,'p-red',Object.assign({st:'font:800 40px/1 P;padding:20px 40px 16px',float:0},o));
const IV=(t0,t1,y,txt,o={})=>PILL(t0,t1,540,y,txt,'p-ivory',Object.assign({st:'font:800 36px/1 P;padding:18px 36px 14px',float:0},o));
const STAMP=(t0,t1,x,y,txt,rot=-7,fs=72)=>{A({t0,t1,x,y,w:960,cls:'chipw',html:`<span class="stampbox" style="color:#d6342a;background:rgba(255,255,255,.9);font-size:${fs}px;transform:rotate(${rot}deg);display:inline-block">${txt}</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0,over:1});shake(t0+.05,10)};
const MAG=`<svg viewBox="0 0 100 100" width="100%"><circle cx="40" cy="40" r="26" fill="rgba(255,255,255,.35)" stroke="#2b2620" stroke-width="7"/><path d="M60 60 L88 88" stroke="#2b2620" stroke-width="12" stroke-linecap="round"/></svg>`;

// HUD: logo only (footer/source only in the outro - rule 7)
A({t0:0,t1:S.s9,x:128,y:300,w:170,cls:'noshadow',enter:'fade',din:.01,float:0,z:600,html:`<div style="background:#fff;border-radius:18px;padding:12px 16px;box-shadow:0 6px 18px rgba(50,38,25,.25)"><img src="a/logo_gold.png" style="width:100%;display:block"></div>`});
A({t0:0,t1:S.s9,x:820,y:300,w:300,cls:'noshadow',enter:'fade',din:.01,float:0,z:600,html:`<div style="display:inline-block;font:700 22px/1 P;color:${INK};background:rgba(250,247,242,.9);border:2px solid rgba(172,153,129,.6);border-radius:999px;padding:10px 20px">उदाहरण · राहुल</div>`});
for(let k=1;k<=8;k++){TINT(S['s'+k],S['s'+(k+1)],FADE,.15)}

// ===== S1 HOOK 0-7.56 : result-first on frame 1 =====
CUT('P1_flat_door.jpg',-.3,2.6,{s:1.04,cut:false});
CUT('P1_flat_door.jpg',2.6,5.0,{s:1.5,fx:620,fy:760,q:1});
CUT('P1_flat_door.jpg',5.0,S.s2,{s:1.25,fx:500,fy:900});
GL(0,S.s2,540,540,900,`<div style="font:900 78px/1.15 P;color:${INK}">हा flat<br><span class="red">आधीच विकलाय?</span></div>`,{pad:'26px 34px 20px',enter:'fade',din:.01,sfx:null,float:0,z:48});
punch(.05,.06);
IV(L(2.84),S.s2,760,'2 वर्षांपूर्वी · दुसऱ्याचं नाव');
A({t0:L(3.50),t1:S.s2,x:300,y:1240,w:470,img:'O16_rahul_shock.png',enter:'pop',din:.35,sfx:'thud',sfxv:.5,float:.2,z:40});
shake(L(3.50)+.05,8);
STAMP(L(3.94),S.s2,700,1000,'दुसऱ्याचं नाव!',-8,60);
IV(L(4.94),S.s2,1480,'घरबसल्या · ₹0 · 2 मिनिटं');
A({t0:L(6.77),t1:S.s2,x:810,y:1300,w:520,cls:'chipw',html:`<span class="pill p-gold" style="font:900 70px/1 P;padding:26px 50px 20px">Index II</span>`,enter:'zoom',din:.3,sfx:'impact',sfxv:.6,z:62,float:0});
punch(L(6.77),.07);

// ===== S2 7.56-12.8 : Index II = सूची क्र. 2, document flips in, stamp =====
CUT('P2_registrar_desk.jpg',S.s2,10.2,{s:1.1,fx:500,fy:1100});
CUT('P2_registrar_desk.jpg',10.2,S.s3,{s:1.45,fx:600,fy:1250});
HEAD(L(8.81),S.s3,'Index II = सूची क्रमांक 2');
A({t0:L(9.62),t1:S.s3,x:540,y:1000,w:560,img:'O11_document_page.png',enter:'flip',din:.45,sfx:'paper',sfxv:.6,float:.1,z:40,
  html:`<div style="position:absolute;left:12%;right:12%;top:12%;text-align:left;font:700 26px/1.9 P;color:${INK}"><div style="font:900 34px P;color:${CH}">सूची क्रमांक 2</div><div style="border-bottom:2px solid #ddd">दस्त क्र. ________</div><div style="border-bottom:2px solid #ddd">दुय्यम निबंधक ________</div><div style="border-bottom:2px solid #ddd">दिनांक ________</div></div>`});
A({t0:L(9.98),t1:S.s3,x:700,y:1250,w:260,img:'O02_rubber_stamp.png',enter:'stamp',din:.3,sfx:'stamp',sfxv:.7,float:0,z:50,over:1});
shake(L(9.98)+.05,8);
IV(L(11.48),S.s3,1500,'दस्ताचा एका पानाचा सारांश');

// ===== S3 12.8-25.41 : what is in it - one row per word =====
CUT('P3_laptop_home.jpg',S.s3,17.0,{s:1.05,fx:560,fy:1000,q:1});
CUT('P3_laptop_home.jpg',17.0,21.0,{s:1.4,fx:400,fy:1300});
CUT('P3_laptop_home.jpg',21.0,S.s4,{s:1.2,fx:700,fy:900});
const ROWS=[['कोणी','विकणारा',13.66],['कोणाला','घेणारा',13.90],['मालमत्ता','flat 402',14.77],['किती रुपयांना','₹72 लाख',15.56],['बाजारमूल्य','₹78 लाख',16.47],['stamp duty','₹4.68 लाख',17.37],['नोंदणी','12-03-2024',19.05]];
A({t0:L(12.80),t1:S.s4,x:520,y:900,w:700,img:'O11_document_page.png',enter:'zoom',din:.4,sfx:'whoosh',sfxv:.5,float:0,z:40,
  html:`<div style="position:absolute;left:9%;right:9%;top:9%;text-align:left;font:700 30px/2.0 P;color:${INK}"><div style="font:900 36px/1.4 P;color:${CH};margin-bottom:6px">सूची क्रमांक 2 · उदाहरण</div>${ROWS.map(r=>`<div class="rw" style="display:flex;justify-content:space-between;border-bottom:2px solid #e4ddd3;opacity:.12"><span style="color:${CH}">${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.rw').forEach((e,i)=>{const on=t>=L(ROWS[i][2]);e.style.opacity=on?1:.12;e.style.background=on&&t<L(ROWS[i][2])+.5?'rgba(138,117,96,.18)':'transparent'})}});
ROWS.forEach(r=>sfx(L(r[2]),'click',.45));
RED(L(20.75),S.s4,1560,'flat दोनदा विकला?');
A({t0:L(20.75),t1:S.s4,x:960,y:1300,w:210,img:'O16_rahul_shock.png',enter:'pop',din:.3,sfx:null,float:.2,z:45});
IV(L(22.33),S.s4,1440,'शेजारचा flat किती ला गेला?',{z:46});

// ===== S4 25.41-30.17 : Rahul goes to the free search site =====
CUT('P3_laptop_home.jpg',S.s4,S.s5,{s:1.3,fx:650,fy:1150,q:1});
A({t0:L(25.41),t1:S.s6,x:240,y:1120,w:370,img:'O15_rahul.png',enter:'left',din:.45,sfx:'whoosh',sfxv:.4,float:.15,z:44,
  fn:(t)=>({dx:t>S.s5?lerp(0,-150,E.inout(clamp((t-S.s5)/.5))):0,s:t>S.s5?lerp(1,.72,E.inout(clamp((t-S.s5)/.5))):1,dy:t>S.s5?lerp(0,420,E.inout(clamp((t-S.s5)/.5))):0})});
HEAD(L(26.28),S.s5,'IGR महाराष्ट्र · free search');
GL(L(27.76),S.s5,730,900,540,`<div class="lab" style="font-size:26px">website (screen वर)</div><div style="font:800 34px/1.3 P;word-break:break-all">freesearchigrservice.<br>maharashtra.gov.in</div>`,{pad:'22px 28px',float:0,align:'left',enter:'right',din:.4});
IV(L(28.81),S.s5,1260,'Login ✗',{x:700,w:400});
IV(L(29.60),S.s5,1400,'पैसे ✗',{x:700,w:400});

// ===== S5 30.17-41.84 : the steps on the laptop (mock browser) =====
CUT('P3_laptop_home.jpg',S.s5,35.7,{s:1.15,fx:540,fy:1000,q:1});
CUT('P3_laptop_home.jpg',35.7,S.s6,{s:1.35,fx:620,fy:1200,q:1});
const FIELDS=[['वर्ष','2024',31.04],['जिल्हा','ठाणे',31.23],['गाव','वाशी',31.54],['मिळकत क्र.','CTS / सर्व्हे / plot नं.',32.14],['Captcha','● ● ● ●',35.73]];
A({t0:L(30.17),t1:S.s6,x:540,y:900,w:1000,img:'O12_laptop.png',enter:'up',din:.45,sfx:'whoosh',sfxv:.5,float:0,z:42,
  html:`<div style="position:absolute;left:12.5%;right:12.5%;top:7%;height:62%;background:#fff;padding:16px 20px;text-align:left;font:700 24px/1.5 P;color:${INK};overflow:hidden">
   <div style="display:flex;gap:10px"><span class="tb1" style="background:${CH};color:#fff;padding:4px 16px;border-radius:8px">मिळकत निहाय</span><span class="tb2" style="border:2px solid #ccc;padding:4px 16px;border-radius:8px">दस्त निहाय</span></div>
   ${FIELDS.map(f=>`<div class="fd" style="display:flex;gap:12px;margin-top:10px;opacity:.35"><span style="width:200px;color:${CH}">${f[0]}</span><span class="v" style="flex:1;border:2px solid #ccc;border-radius:8px;padding:0 10px;min-height:38px"></span></div>`).join('')}
   <div class="sb" style="margin-top:12px;background:${INK};color:#fff;text-align:center;padding:8px;border-radius:8px;font:800 26px/1.3 P">Search</div></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.fd').forEach((e,i)=>{const on=t>=L(FIELDS[i][2]);e.style.opacity=on?1:.35;const v=e.querySelector('.v');v.textContent=on?FIELDS[i][1]:'';v.style.borderColor=on?CH:'#ccc'});
    const sb=oo.el.querySelector('.sb');sb.style.background=t>=L(36.65)?CH:INK;sb.style.transform=`scale(${t>=L(36.65)&&t<L(36.65)+.2?.94:1})`;
    oo.el.querySelector('.tb2').style.background=t>=L(40.34)?CH:'transparent';oo.el.querySelector('.tb2').style.color=t>=L(40.34)?'#fff':INK;oo.el.querySelector('.tb1').style.background=t>=L(40.34)?'transparent':CH;oo.el.querySelector('.tb1').style.color=t>=L(40.34)?INK:'#fff';oo.el.querySelector('.tb1').style.border=t>=L(40.34)?'2px solid #ccc':'none'}});
HEAD(L(30.17)+.2,S.s6,'मिळकत निहाय',{y:430});
FIELDS.forEach(f=>sfx(L(f[2]),'click',.5));
A({t0:L(36.65),t1:L(38.5),x:860,y:1160,w:120,cls:'noshadow',html:MAG,enter:'pop',din:.25,sfx:'click',sfxv:.7,float:0,z:70,over:1,fn:(t,lt)=>({s:lt<.2?.85:1})});
A({t0:L(37.98),t1:S.s6,x:540,y:1250,w:420,img:'O11_document_page.png',enter:'zoom',din:.4,sfx:'impact',sfxv:.55,float:.15,z:60,
  html:`<div style="position:absolute;left:10%;right:10%;top:10%;text-align:left;font:700 20px/1.8 P;color:${INK}"><div style="font:900 26px P;color:${CH}">सूची क्रमांक 2</div><div style="border-bottom:2px solid #ddd">कोणी · कोणाला</div><div style="border-bottom:2px solid #ddd">मालमत्ता · रक्कम</div><div style="border-bottom:2px solid #ddd">नोंदणी दिनांक</div></div>`});
punch(L(37.98),.06);
IV(L(40.34),S.s6,1560,'दस्त क्रमांक माहीत? → दस्त निहाय');

// ===== S6 41.84-56.59 : remember: one year at a time, 1985/2002, not proof of ownership =====
CUT('P4_archive_shelves.jpg',S.s6,46.4,{s:1.05,fx:540,fy:900});
CUT('P4_archive_shelves.jpg',46.4,51.2,{s:1.45,fx:420,fy:1150});
CUT('P5_certified_copy.jpg',51.2,S.s7,{s:1.1,fx:600,fy:1000});
HEAD(L(42.86),51.2,'एका वेळी एकच वर्ष');
const YEARS=[2026,2025,2024,2023,2022,2021,2020];
A({t0:L(43.74),t1:51.2,x:540,y:640,w:1000,cls:'noshadow',enter:'up',din:.35,sfx:null,float:0,z:45,
  html:`<div style="display:flex;gap:10px">${YEARS.map(y=>`<div class="yr" style="flex:1;border-radius:14px;padding:14px 4px;text-align:center;background:rgba(250,247,242,.92);border:2px solid rgba(172,153,129,.6);color:${INK};font:800 30px/1.1 P">${y}</div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{const n=Math.floor(clamp((t-L(45.08))/1.3)*YEARS.length);oo.el.querySelectorAll('.yr').forEach((e,i)=>{const on=i<=n&&t>=L(45.08);e.style.background=on?`linear-gradient(180deg,#c3b092,#937b5c)`:'rgba(250,247,242,.92)';e.style.color=on?'#fff':INK})}});
for(let i=0;i<YEARS.length;i++)sfx(L(45.08)+i*1.3/YEARS.length,'click',.35);
GL(L(46.91),51.2,540,900,860,`<div class="lab">दस्त उपलब्ध</div><div class="a" style="font:800 44px/1.3 P">मुंबई: <span class="gold">1985</span> पासून</div><div class="b" style="font:800 44px/1.3 P;visibility:hidden">बाकी जिल्हे: साधारण <span class="gold">2002</span> पासून</div>`,{pad:'24px 32px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.b').style.visibility=t>=L(49.24)?'visible':'hidden'}});
sfx(L(49.24),'pop',.5);
STAMP(L(53.55),S.s7,540,900,'मालकीचा पुरावा नाही',-6,64);
IV(L(55.88),S.s7,1300,'Bank / कोर्ट → प्रमाणित प्रत (दुय्यम निबंधक)',{st:'font:800 32px/1 P;padding:18px 32px 14px'});

// ===== S7 56.59-62.16 : pattern interrupt (dark, one line) =====
CUT('P5_certified_copy.jpg',S.s7,S.s8,{s:1.3,fx:560,fy:1100,filter:'brightness(.5) saturate(.6)',q:1});
TINT(S.s7,S.s8,'linear-gradient(180deg,rgba(20,16,12,.8),rgba(20,16,12,.7))',.2);
A({t0:L(56.59),t1:S.s8,x:540,y:820,w:900,cls:'chipw',html:`<div style="font:900 72px/1.2 P;color:#fff">कागद दाखवायला<br><span style="color:#e8cf9f">टाळाटाळ?</span></div>`,enter:'up',din:.4,sfx:'thud',sfxv:.5,float:0,z:50});
A({t0:L(60.34),t1:S.s8,x:540,y:1180,w:900,cls:'chipw',html:`<span class="pill p-gold" style="font:900 56px/1 P;padding:24px 48px 18px">सही आधी · 2 मिनिटं</span>`,enter:'pop',din:.3,sfx:'impact',sfxv:.55,z:60,float:0});
punch(L(60.34),.06);

// ===== S8 62.16-67.6 : CTA =====
CUT('P6_couple_new_home.jpg',S.s8,65.0,{s:1.05,fx:540,fy:960,q:1});
CUT('P6_couple_new_home.jpg',65.0,S.s9,{s:1.25,fx:540,fy:800,q:1});
GL(L(62.16),S.s9,540,520,940,`<div style="font:800 54px/1.35 P;color:${INK}">तुम्ही कधी<br><span class="gold">Index II काढलाय का?</span></div>`,{pad:'30px 36px',float:0});
COMMENT_BOX(L(64.04),S.s9-.05,64.3,64.95,'हो, bank loan साठी',{y:1300,typeDur:.45});
PILL(L(65.64),S.s9,540,780,'📤 घर घेणाऱ्या मित्रांना पाठवा','p-gold',{st:'font-size:36px',float:0});

// ===== S9 OUTRO 67.6-70.5 =====
TXT(L(67.6),END+1,540,420,`<div style="font:800 62px/1.3 P;color:${INK}">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.4,float:0,sfx:null});
A({t0:67.6,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(68.3),END+1,68.8,{y:1380,col:'#937b5c'});
A({t0:68.3,t1:END+1,x:540,y:1540,w:980,cls:'chipw',enter:'fade',din:.4,float:0,z:40,html:`<div style="font:600 22px/1.5 P;color:${INK};opacity:.8">* स्रोत: IGR महाराष्ट्र free search (14 नोव्हें 2026) · नोंदणी कायदा 1908 कलम 55<br>उदाहरणातील नावे, आकडे काल्पनिक · कायदेशीर सल्ला नाही</div>`});
}
