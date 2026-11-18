const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - ताबा उशिरा? RERA 18 व्याज. Navy + gold brand look. Times = cue_words (cue-0.12).
function buildScenes(){
const END=65.9;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:8.9,s3:16.3,s4:25.6,s5:37.4,s6:44.2,s7:51.1,s8:57.4,s9:62.6};
BOKEH_ON=t=>(t>S.s9)?1:0;
const TOP='linear-gradient(180deg,rgba(6,11,22,.85),rgba(6,11,22,.3) 32%,rgba(6,11,22,.15) 55%,rgba(6,11,22,.85))';
const PHOTO_BG=(img,t0,t1,o={})=>{BG(Object.assign({img,t0,t1,s0:1.0,s1:1.08,fade:.3,filter:'brightness(.85) saturate(.9)'},o));TINT(t0,t1,TOP,.25)};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||420,txt,'p-gold',{st:'font:900 44px/1 P;padding:20px 44px 14px',z:500,float:0});
const LINE=(t0,t1,y,html,o={})=>GL(t0,t1,500,y,o.w||860,html,Object.assign({pad:'22px 30px',align:'left',float:.05,enter:'left',din:.4,dark:true},o));
const INR=v=>Math.round(v).toLocaleString('en-IN');

// HUD
A({t0:0,t1:S.s9,x:128,y:300,w:170,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:.3,t1:S.s9,x:600,y:300,w:640,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="text-align:left;font:500 21px/1.4 P;color:rgba(255,255,255,.85)">* RERA कलम 18 · महा. RERA नियम 18 · SBI MCLR 15 ऑक्टो 2026<br>COVID काळ वगळून · कायदेशीर सल्ला नाही · दि. 3 नोव्हें 2026</div>`});

// ===== S1 HOOK =====
PHOTO_BG('P1_unfinished_tower.jpg',S.s1,S.s2,{s0:1.12,s1:1.0});
HEAD(L(0.6),S.s2,'ताबा उशिरा?');
GL(L(4.0),S.s2,540,820,860,`<div class="lab">₹50 लाख भरले असतील तर</div><div class="gold n" style="font:900 150px/1.05 P">₹0</div><div style="font:800 52px/1.2 P">दर महिन्याला व्याज</div>`,{dark:true,pad:'30px 36px',enter:'zoom',din:.35,float:0,
  draw:(t,lt,oo)=>{const n=oo.el.querySelector('.n');if(t<L(6.36)){n.textContent='₹ ?';return}n.textContent='₹'+INR(45625*E.out(clamp((t-L(6.36))/1.0)))}});
sfx(L(6.36),'ticks',.5);sfx(L(7.44),'impact',.55);punch(L(7.44),.05);
A({t0:L(8.14),t1:S.s2,x:540,y:1200,w:760,cls:'noshadow',enter:'up',din:.3,float:0,z:55,
  html:`<div style="display:flex;justify-content:center;gap:12px">${[1,2,3,4,5,6].map(i=>`<div class="m" style="width:84px;height:84px;border-radius:14px;background:rgba(255,255,255,.12);border:2px solid rgba(232,207,159,.4);color:#fff;font:800 30px/80px P;text-align:center;opacity:.25">${i}</div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.m').forEach((e,i)=>{const on=lt>i*.12;e.style.opacity=on?1:.25;e.style.background=on?'linear-gradient(180deg,#f2dfb6,#c9a66f)':'rgba(255,255,255,.12)';e.style.color=on?'#1a1206':'#fff'})}});

// ===== S2 LAW =====
PHOTO_BG('P2_family_waiting.jpg',S.s2,S.s3);
TXT(L(9.2),S.s3,540,560,`<div style="font:800 58px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.85)">हा उपकार <span class="red">नाही!</span></div>`,{enter:'down',din:.35,float:0});
HEAD(L(10.4),S.s3,'RERA · कलम 18');sfx(L(11.58),'stamp',.6);
LINE(L(13.18),S.s3,1200,`<div style="font:800 46px/1.35 P">करारातल्या तारखेला ताबा नाही →<br><span class="gold">2 पर्याय</span></div>`);

// ===== S3 TWO OPTIONS =====
PHOTO_BG('P3_two_paths.jpg',S.s3,S.s4,{filter:'brightness(.65) saturate(.85)'});
HEAD(L(16.4),S.s4,'तुमचे 2 पर्याय');
LINE(L(16.44),S.s4,600,`<div style="display:flex;align-items:center;gap:22px"><div style="width:84px;height:84px;flex:none;border-radius:50%;background:linear-gradient(180deg,#f2dfb6,#c9a66f);color:#1a1206;font:900 46px/88px P;text-align:center">1</div><div style="font:800 44px/1.3 P">project सोडा →<br><span class="gold">पैसे + व्याज परत</span></div></div>`);
LINE(L(20.40),S.s4,880,`<div style="display:flex;align-items:center;gap:22px"><div style="width:84px;height:84px;flex:none;border-radius:50%;background:linear-gradient(180deg,#f2dfb6,#c9a66f);color:#1a1206;font:900 46px/88px P;text-align:center">2</div><div style="font:800 44px/1.3 P">project मध्ये रहा →<br><span class="gold">दर महिना व्याज</span></div></div>`);
[16.44,20.40].forEach(k=>sfx(L(k),'pop',.5));

// ===== S4 RATE =====
PHOTO_BG('P4_calculator_emi.jpg',S.s4,S.s5,{filter:'brightness(.6) saturate(.85)'});
HEAD(L(25.7),S.s5,'व्याज किती?');
GL(L(27.38),S.s5,540,800,900,`<div class="lab">महाराष्ट्र RERA नियम 18</div><div style="font:800 46px/1.35 P">SBI चा सर्वोच्च MCLR <span class="gold">8.95%</span> + <span class="gold">2%</span></div><div class="gold r" style="font:900 170px/1.05 P;visibility:hidden">0%</div><div style="font:700 38px/1.3 P">वर्षाला</div>`,{dark:true,pad:'30px 36px',float:0,
  draw:(t,lt,oo)=>{const r=oo.el.querySelector('.r');r.style.visibility=t>=L(31.68)?'visible':'hidden';r.textContent=(10.95*E.out(clamp((t-L(31.68))/.9))).toFixed(2)+'%'}});
sfx(L(31.68),'ticks',.45);
PILL(L(34.70),S.s5,540,1230,'भरलेल्या रकमेवर · stamp duty, tax सोडून','p-gold',{st:'font-size:34px',float:0});

// ===== S5 COURT =====
PHOTO_BG('P5_court_order.jpg',S.s5,S.s6,{filter:'brightness(.65)'});
LINE(L(37.52),S.s6,560,`<div style="font:800 46px/1.35 P">Builder: "उशीर <span class="red">आमच्या हातात नव्हता</span>"</div>`);
HEAD(L(39.78),S.s6,'High Court',{y:780});
A({t0:L(42.96),t1:S.s6,x:540,y:1050,w:900,cls:'chipw',html:`<span class="pill p-gold" style="font:900 72px/1 P;padding:28px 56px 22px">हक्क बिनशर्त!</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:60,float:0});
shake(L(42.96)+.05,8);

// ===== S6 60 DAYS =====
PHOTO_BG('P6_cheque_handover.jpg',S.s6,S.s7,{filter:'brightness(.7) saturate(.85)'});
HEAD(L(44.46),S.s7,'MahaRERA चा नियम');
GL(L(45.80),S.s7,540,860,780,`<div class="lab">भरपाईचा आदेश झाल्यावर</div><div style="position:relative;width:300px;height:300px;margin:16px auto"><svg viewBox="0 0 300 300" width="300" height="300"><circle cx="150" cy="150" r="130" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="18"/><circle class="rg" cx="150" cy="150" r="130" fill="none" stroke="#e8cf9f" stroke-width="18" stroke-linecap="round" stroke-dasharray="817" stroke-dashoffset="817" transform="rotate(-90 150 150)"/></svg><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div class="gold" style="font:900 110px/1 P">60</div><div style="font:800 40px P">दिवस</div></div></div>`,{dark:true,pad:'26px 30px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.rg').style.strokeDashoffset=817*(1-E.inout(clamp((t-L(47.88))/1.2)))}});
sfx(L(47.88),'ticks',.45);
PILL(L(49.44),S.s7,540,1330,'नाहीतर → वसुलीचं warrant','p-red',{st:'font-size:40px',float:0});sfx(L(49.86),'thud',.6);

// ===== S7 WHAT TO DO =====
PHOTO_BG('P7_online_complaint.jpg',S.s7,S.s8);
HEAD(L(51.3),S.s8,'आता काय करायचं?');
[['1','करारातली ताब्याची तारीख तपासा',51.50],['2','भरलेल्या पैशांच्या पावत्या जपा',53.40],['3','MahaRERA वर online तक्रार',55.68]].forEach(([n,s,k],i)=>
  LINE(L(k),S.s8,580+i*175,`<div style="display:flex;align-items:center;gap:22px"><div style="width:76px;height:76px;flex:none;border-radius:50%;background:linear-gradient(180deg,#f2dfb6,#c9a66f);color:#1a1206;font:900 42px/80px P;text-align:center">${n}</div><div style="font:800 42px/1.3 P">${s}</div></div>`));
[51.50,53.40,55.68].forEach(k=>sfx(L(k),'pop',.5));

// ===== S8 COMMENT =====
PHOTO_BG('P2_family_waiting.jpg',S.s8,S.s9,{s0:1.1,s1:1.18,filter:'brightness(.75) saturate(.9)'});
GL(L(57.52),S.s9,540,520,940,`<div style="font:800 54px/1.35 P;color:#0d1729">तुमचा ताबा<br><span style="color:#b8935f">किती महिने उशिरा?</span></div>`,{white:true,pad:'30px 36px',float:0});
COMMENT_BOX(L(58.6),S.s9-.05,L(58.9),59.88,'18 महिने',{y:1300,typeDur:.35});
PILL(L(60.74),S.s9,540,760,'📤 flat घेतलेल्या मित्रांना पाठवा','p-gold',{st:'font-size:36px',float:0});

// ===== S9 OUTRO =====
TXT(L(62.70),END+1,540,420,`<div style="font:800 62px/1.3 P;color:#fff">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.4,float:0});
A({t0:62.7,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(64.12),END+1,64.58,{y:1380,col:'#c9a66f'});
}
