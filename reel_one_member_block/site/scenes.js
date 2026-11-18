const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - एक सभासद redevelopment अडवू शकतो का? Look = "7 नवे नियम" brand (navy + gold). Times = cue_words (cue-0.12).
function buildScenes(){
const END=81.7;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:9.3,s3:22.5,s3b:30.0,s4:40.5,s5:44.0,s6:55.8,s7:65.4,s8:73.6,s9:78.3};
BOKEH_ON=t=>((t>S.s3&&t<S.s3b)||t>S.s9)?1:0;
const TOP='linear-gradient(180deg,rgba(6,11,22,.82),rgba(6,11,22,.25) 32%,rgba(6,11,22,.1) 55%,rgba(6,11,22,.85))';
const PHOTO_BG=(img,t0,t1,o={})=>{BG(Object.assign({img,t0,t1,s0:1.0,s1:1.08,fade:.3,filter:'brightness(.85) saturate(.9)'},o));TINT(t0,t1,TOP,.25)};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||420,txt,'p-gold',{st:'font:900 44px/1 P;padding:20px 44px 14px',z:500,float:0});
const LINE=(t0,t1,y,html,o={})=>GL(t0,t1,500,y,o.w||860,html,Object.assign({pad:'22px 30px',align:'left',float:.05,enter:'left',din:.4},o));
const PL_RED=(t0,t1,y,txt,o={})=>PILL(t0,t1,540,y,txt,'p-red',Object.assign({st:'font-size:40px',float:0},o));

// ---------- HUD ----------
A({t0:0,t1:S.s9,x:128,y:300,w:170,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:.3,t1:S.s9,x:600,y:300,w:640,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="text-align:left;font:500 21px/1.4 P;color:rgba(255,255,255,.85)">* Bombay HC आदेश 2026 · GR 30 सप्टें 2026 · UDCPR 10.10.2<br>कायदेशीर सल्ला नाही · माहिती दि. 2 नोव्हें 2026</div>`});

// ================= S1 HOOK =================
PHOTO_BG('M1_facade_windows.jpg',S.s1,S.s2,{s0:1.12,s1:1.0});
A({t0:L(0.8),t1:S.s2,x:540,y:1020,w:760,cls:'gl dk',enter:'zoom',din:.35,float:0,z:50,sfx:'whoosh',sfxv:.4,
  html:`<div style="padding:30px 34px"><div style="display:grid;grid-template-columns:repeat(8,1fr);gap:14px">${Array.from({length:38},(_,i)=>`<div class="d" style="aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.18)"></div>`).join('')}</div>
   <div style="margin-top:24px;font:800 56px/1.2 P;color:#fff;text-align:center"><span class="gold c1" style="font-size:84px">0</span> तयार <span class="r" style="opacity:0">· <span class="red" style="font-size:84px">6</span> नाही</span></div></div>`,
  draw:(t,lt,oo)=>{const red=[5,12,19,23,30,36];const a=L(0.8),b=L(1.6);const n=Math.round(32*clamp((t-a)/(b-a)));let k=0;
   oo.el.querySelectorAll('.d').forEach((d,i)=>{const isR=red.includes(i);let col='rgba(255,255,255,.18)',sh='none';
     if(!isR){if(k<n){col='linear-gradient(180deg,#f2dfb6,#c9a66f)';sh='0 0 12px rgba(232,207,159,.7)'}k++}
     else if(t>=L(2.6)){col='linear-gradient(180deg,#ff6a5c,#c92a1e)';sh='0 0 12px rgba(255,80,60,.7)'}
     d.style.background=col;d.style.boxShadow=sh});
   oo.el.querySelector('.c1').textContent=n;oo.el.querySelector('.r').style.opacity=t>=L(2.6)?1:0}});
sfx(L(0.8),'ticks',.45);sfx(L(2.6),'buzz',.45);
TXT(L(4.6),S.s2,540,520,`<div style="font:900 74px/1.2 P;color:#fff;text-shadow:0 10px 30px rgba(0,0,0,.8)">Redevelopment</div><div class="gold" style="font:900 92px/1.15 P">थांबणार का?</div>`,{enter:'down',din:.4,float:.05});
PILL(L(7.3),S.s2,540,1560,'⚖️ High Court चं उत्तर','p-gold',{st:'font-size:44px',float:0});

// ================= S2 HIGH COURT JUNE =================
PHOTO_BG('M2_signing_declaration.jpg',S.s2,S.s3);
HEAD(L(9.4),S.s3,'High Court · जून 2026');
LINE(L(10.9),S.s3,590,`<div class="lab">वांद्रे · एक society</div><div style="font:800 52px/1.3 P">38 पैकी <span class="red">6 सभासदांचा</span> सहीला नकार</div>`);
LINE(L(16.9),S.s3,820,`<div style="font:800 54px/1.3 P">कोर्टाचा आदेश: <span class="gold">सही करा</span></div>`,{dark:true});
GL(L(18.7),S.s3,540,1220,940,`<div class="lab">कोर्ट म्हणालं</div><div style="font:800 50px/1.35 P">"नाहीतर <span class="gold">एक सभासदसुद्धा</span><br>बहुमताचा प्रकल्प अडवू शकेल"</div>`,{dark:true,pad:'30px 36px',enter:'up',din:.45,float:.05});
punch(L(19.3),.04);

// ================= S3 RULES =================
HEAD(L(22.6),S.s4,'नियम काय सांगतो?');
GL(L(23.9),S.s3b,540,740,900,`<div class="lab">GR · 30 सप्टेंबर 2026</div><div style="font:800 50px/1.3 P">एकूण सभासदांपैकी किमान</div><div class="gold cn" style="font:900 200px/1 P">0%</div><div style="font:700 44px/1.3 P">मान्यता</div>`,{pad:'30px 36px',float:.05,
  draw:(t,lt,oo)=>{const c=oo.el.querySelector('.cn');c.style.visibility=t>=L(27.8)?'visible':'hidden';c.textContent=Math.round(51*E.out(clamp((t-L(27.8))/.8)))+'%'}});
sfx(L(27.8),'ticks',.45);
PHOTO_BG('M3_cidco_morning.jpg',S.s3b,S.s4);
GL(L(30.7),S.s4,540,700,920,`<div class="lab">नवी मुंबई · सिडको इमारत (UDCPR 10.10.2)</div>
 <div style="text-align:left;margin-top:10px">${[['सिडकोची NOC',32.8],['70% सभासदांची संमती',33.4],['पर्यायी घराची सोय',35.9]].map(([s,k])=>`<div class="ck" data-k="${L(k)}" style="font:800 48px/1.6 P;opacity:0"><span class="gold">✓</span> ${s}</div>`).join('')}</div>`,{pad:'30px 40px',float:.05,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.ck').forEach(e=>{const q=E.out(clamp((t-(+e.dataset.k))/.3));e.style.opacity=q;e.style.transform=`translateX(${(1-q)*-30}px)`})}});
[32.8,33.4,35.9].forEach(k=>sfx(L(k),'pop',.5));
PILL(L(37.8),S.s4,540,1180,'→ सगळ्यांनी सहभागी होऊन घर रिकामं करायचं','p-gold',{st:'font-size:36px',float:0});

// ================= S4 TWIST =================
PHOTO_BG('M4_lonely_balcony.jpg',S.s4,S.s5,{s0:1.0,s1:1.06});
TXT(L(40.6),S.s5,540,480,`<div style="font:800 66px/1.25 P;color:#fff;text-shadow:0 10px 30px rgba(0,0,0,.85)">विरोध करणाऱ्याला</div><div class="gold" style="font:900 86px/1.2 P">काहीच हक्क नाहीत?</div>`,{enter:'down',din:.4,float:.05});
A({t0:L(43.0),t1:S.s5,x:540,y:1250,w:900,cls:'chipw',html:`<span class="pill p-gold" style="font:900 64px/1 P;padding:26px 54px 20px">नाही, असं नाही!</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.8,z:60,float:0});
shake(L(43.0)+.05,8);

// ================= S5 PROTECTION =================
PHOTO_BG('M5_rent_cheque.jpg',S.s5,S.s6,{filter:'brightness(.6) saturate(.8)'});
HEAD(L(44.1),S.s6,'High Court · ऑक्टो 2026');
LINE(L(45.9),S.s6,590,`<div style="display:flex;align-items:center;gap:24px"><div style="width:110px;flex:none">${IC.shield(110)}</div><div style="font:800 50px/1.3 P">सही न केलेल्यालाही <span class="gold">संरक्षण</span></div></div>`,{dark:true});
LINE(L(50.5),S.s6,830,`<div style="font:800 46px/1.35 P"><span class="gold">✓</span> करार (PAAA) register होईपर्यंत <span class="gold">दंड नाही</span></div>`,{dark:true});
LINE(L(53.9),S.s6,1030,`<div style="font:800 46px/1.35 P"><span class="gold">✓</span> भाडं, भरपाई <span class="gold">चालू</span></div>`,{dark:true});
[45.9,50.5,53.9].forEach(k=>sfx(L(k),'pop',.5));

// ================= S6 RIGHT WAY =================
PHOTO_BG('M6_court_corridor.jpg',S.s6,S.s7);
HEAD(L(56.3),S.s7,'विरोध? योग्य मार्गाने');
LINE(L(58.3),S.s7,590,`<div class="lab">कोपरखैरणे · High Court · ऑगस्ट 2026</div><div style="font:800 48px/1.3 P">ठराव आणि करार, दोन्हीला आव्हान</div>`,{dark:true});
A({t0:L(61.4),t1:S.s7,x:540,y:960,w:1000,cls:'noshadow',enter:'fade',din:.2,float:0,z:55,
  html:`<div style="position:relative;height:300px"><span class="a pill p-gold" style="position:absolute;top:0;font-size:46px">ठराव</span><span class="b pill p-gold" style="position:absolute;top:0;font-size:46px;opacity:0">करार</span><div class="m" style="position:absolute;left:0;right:0;top:150px;text-align:center;opacity:0"><span class="pill p-red" style="font-size:50px">= एकच civil दावा</span></div></div>`,
  draw:(t,lt,oo)=>{const j=E.inout(clamp((t-L(63.6))/.5));const a=oo.el.querySelector('.a'),b=oo.el.querySelector('.b');
   a.style.left=lerp(80,330,j)+'px';b.style.left=lerp(640,520,j)+'px';b.style.opacity=t>=L(62.5)?1:0;
   const m=oo.el.querySelector('.m');m.style.opacity=clamp((t-L(64.2))/.3)}});
sfx(L(61.4),'pop',.45);sfx(L(62.5),'pop',.45);sfx(L(63.6),'whoosh',.5);sfx(L(64.2),'stamp',.6);

// ================= S7 WHAT TO DO =================
PHOTO_BG('M7_lawyer_desk.jpg',S.s7,S.s8);
HEAD(L(65.5),S.s8,'विरोध असेल तर');
[['1','कारण लेखी द्या',66.9],['2','कागदपत्रं मागा',68.1],['3','वकिलाचा सल्ला घ्या',69.3]].forEach(([n,s,k],i)=>
  LINE(L(k),S.s8,560+i*170,`<div style="display:flex;align-items:center;gap:24px"><div style="width:84px;height:84px;flex:none;border-radius:50%;background:linear-gradient(180deg,#f2dfb6,#c9a66f);color:#1a1206;font:900 46px/88px P;text-align:center">${n}</div><div style="font:800 50px/1.3 P">${s}</div></div>`,{dark:true}));
[66.9,68.1,69.3].forEach(k=>sfx(L(k),'pop',.5));
PL_RED(L(72.4),S.s8,1170,'फक्त अडवणं = कोर्टात टिकत नाही');sfx(L(72.4),'buzz',.4);

// ================= S8 COMMENT =================
PHOTO_BG('M8_society_gate.jpg',S.s8,S.s9);
GL(L(73.7),S.s9,540,520,940,`<div style="font:800 54px/1.35 P;color:#0d1729">तुमच्या society त<br><span style="color:#b8935f">किती जण विरोधात?</span></div>`,{white:true,pad:'30px 36px',float:.05});
COMMENT_BOX(L(74.8),S.s9-.05,L(75.2),76.0,'3 जण',{y:1300,typeDur:.3});
PILL(L(77.4),S.s9,540,760,'📤 society च्या group वर पाठवा','p-gold',{st:'font-size:36px',float:0});

// ================= S9 OUTRO =================
TXT(L(78.4),END+1,540,420,`<div style="font:800 62px/1.3 P;color:#fff">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.4,float:0});
A({t0:78.5,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(79.9),END+1,80.5,{y:1380,col:'#c9a66f'});
}
