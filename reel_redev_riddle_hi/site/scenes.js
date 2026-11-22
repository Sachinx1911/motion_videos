const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - Hindi riddle v2 (professional edit pass, 22 Nov 2026).
// STRICT LAYOUT GRID: TITLE slot (y 430, one yellow/red label) · HERO slot (centre, y 1000, one cut-out) · CAPTION slot (y 1480, one label).
// Never more than one element per slot; a new caption replaces the old one. Cuts only on sentence boundaries, camera push on every cut.
// SOUND: 3 sounds only - soft pop (labels), swoosh (cuts), impact/stamp (reveals). FXG 0.17 (-30 %).
function buildScenes(){
const END=62.3;window.END=END;
const L=t=>t-.12;
const SEC=[0,12.27,19.65,27.31,37.22,49.00,59.99,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
BOKEH_ON=t=>0;
const INK='#0d1729',YEL='#ffd23f',RED='#e8382a';
const TOPTINT='linear-gradient(180deg,rgba(13,23,41,.5),rgba(13,23,41,0) 28%,rgba(13,23,41,0) 72%,rgba(13,23,41,.5))';
// label box (Mind Hex): yellow = fact, red = problem. One motion language: pop in, fade out.
const LBL=(t0,t1,y,txt,o={})=>A(Object.assign({t0,t1,x:540,y,w:1000,cls:'chipw',enter:'pop',din:.26,exit:'fade',dout:.2,sfx:o.sfx===undefined?'pop':o.sfx,sfxv:.35,z:60,float:0,
  html:`<span style="display:inline-block;background:${o.red?RED:YEL};color:${o.red?'#fff':INK};font:900 ${o.fs||46}px/1.1 P;padding:18px 36px 14px;border-radius:12px;transform:rotate(${o.rot===undefined?-2:o.rot}deg);box-shadow:0 10px 24px rgba(0,0,0,.28);white-space:nowrap">${txt}</span>`},o));
const TITLE=(t0,t1,txt,o={})=>LBL(t0,t1,430,txt,Object.assign({fs:54},o));
const CAP=(t0,t1,txt,o={})=>LBL(t0,t1,1480,txt,Object.assign({fs:42},o));
const HERO=(t0,t1,img,w,o={})=>A(Object.assign({t0,t1,x:540,y:1000,w,img,enter:'pop',din:.35,exit:'fade',dout:.2,sfx:null,float:.12,z:40},o));
const STAMP=(t0,t1,txt,fs=54)=>{A({t0,t1,x:540,y:1000,w:960,cls:'chipw',html:`<span style="display:inline-block;border:8px solid ${RED};color:${RED};background:rgba(255,255,255,.94);font:900 ${fs}px/1.1 P;padding:16px 32px 10px;border-radius:14px;transform:rotate(-7deg)">${txt}</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.6,z:62,float:0,allowOver:1,over:1});shake(t0+.05,8)};
const FOCUS=[];const focusAt=t=>{let k=0;for(const [a,b] of FOCUS){if(t>=a-.25&&t<=b+.25)k=Math.max(k,Math.min(clamp((t-(a-.25))/.3),clamp(((b+.25)-t)/.3)))}return k};
const CUT=(img,t0,t1,o={})=>{const s=o.s||1.0,s1=s+(o.ds===undefined?.06:o.ds),fx=o.fx===undefined?540:o.fx,fy=o.fy===undefined?960:o.fy;
  const cx=v=>Math.max(-540*(v-1),Math.min(540*(v-1),-(fx-540)*v)),cy=v=>Math.max(-960*(v-1),Math.min(960*(v-1),-(fy-960)*v));
  const base=o.filter||'none';BG({img,t0,t1,s0:s,s1,x0:cx(s),x1:cx(s1),y0:cy(s),y1:cy(s1),fade:o.fade||.14,filter:t=>{const k=focusAt(t);return k>0?`${base==='none'?'':base} blur(${(3.5*k).toFixed(1)}px) brightness(${(1-.18*k).toFixed(2)})`:base}});
  TINT(t0,t1,TOPTINT,.15);if(t0>0){punch(t0,.03);if(!o.q)sfx(t0,'swoosh',.15)}};
FOCUS.push([L(32.76),L(35.59)],[L(37.44),L(46.62)],[L(47.97),SEC[5]],[SEC[6],END+1]);

// HUD
A({t0:0,t1:SEC[6],x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:0,t1:SEC[6],x:900,y:120,w:320,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="display:inline-block;font:900 24px/1 P;color:${INK};background:${YEL};border-radius:10px;padding:12px 20px;transform:rotate(-2deg)">TRUE CASE</div>`});

// ===== H1 0-4.94 : two societies signed =====
CUT('B1_old_society_a.jpg',-.3,4.94,{s:1.04,fx:520,fy:1000});
TITLE(L(0.42),L(4.94),'2 SOCIETIES');
HERO(L(3.12),L(4.94),'C1_builder.png',420);
CAP(L(3.60),L(4.94),'AGREEMENT SIGNED');
// ===== H2 4.94-8.06 : builder late, one got ₹6.20 cr =====
CUT('B1_old_society_a.jpg',4.94,8.06,{s:1.22,fx:600,fy:800,q:1});
TITLE(L(4.94),L(8.06),'BUILDER LATE',{red:1,rot:2});
HERO(L(6.10),L(8.06),'C4_money_bag.png',420,{enter:'rise',din:.4});
A({t0:L(6.35),t1:L(8.06),x:540,y:1480,w:1000,cls:'chipw',enter:'pop',din:.26,exit:'fade',dout:.2,sfx:'pop',sfxv:.35,z:60,float:0,
  html:`<span class="v" style="display:inline-block;background:${YEL};color:${INK};font:900 50px/1.1 P;padding:18px 36px 14px;border-radius:12px;transform:rotate(-2deg);box-shadow:0 10px 24px rgba(0,0,0,.28)">₹0 CR</span>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.v').textContent='₹'+(6.2*E.out(clamp((t-L(6.35))/.9))).toFixed(2)+' CR'}});
sfx(L(7.64),'impact',.4);punch(L(7.64),.05);
// ===== H3 8.06-12.27 : the other one, 12 years on rent, question =====
CUT('B1_old_society_b.jpg',8.06,SEC[1],{s:1.08,fx:600,fy:900});
HERO(L(8.06),L(11.62),'C2_members.png',560,{enter:'up'});
TITLE(L(9.39),SEC[1],'12 YEARS ON RENT',{red:1,fs:48,rot:2});
A({t0:L(11.62),t1:SEC[1],x:540,y:1000,w:960,cls:'chipw',enter:'zoom',din:.3,sfx:'impact',sfxv:.45,z:62,float:0,
  html:`<span style="display:inline-block;font:900 80px/1.2 P;color:#fff;background:rgba(13,23,41,.82);padding:22px 44px 16px;border-radius:26px">फर्क क्या था?</span>`});
punch(L(11.62),.06);

// ===== H4 12.27-17.86 : Chembur 2013, 24 months =====
CUT('B1_old_society_b.jpg',SEC[1],17.86,{s:1.0,fx:540,fy:900,q:1});
TITLE(L(13.28),L(17.86),'CHEMBUR · 2013');
HERO(L(15.81),L(17.86),'C1_builder.png',420);
CAP(L(16.54),L(17.86),'24 MONTHS');
// ===== H5 17.86-19.65 : everyone moved out =====
CUT('B1_old_society_b.jpg',17.86,SEC[2],{s:1.25,fx:400,fy:900});
TITLE(L(17.86),SEC[2],'CHEMBUR · 2013',{sfx:null});
A({t0:L(17.86),t1:SEC[2],x:540,y:1000,w:560,img:'C2_members.png',enter:'pop',din:.3,exit:'fade',dout:.15,sfx:null,float:0,z:40,
  fn:(t)=>({dx:lerp(0,760,E.inout(clamp((t-L(18.86))/1.1)))})});
CAP(L(18.86),SEC[2],'MOVED OUT ON RENT',{red:1,rot:2});

// ===== H6 19.65-23.76 : 8 years, empty structure =====
CUT('B2_half_built.jpg',SEC[2],23.76,{s:1.0,fx:540,fy:800});
TITLE(L(19.65),L(23.76),'8 YEARS',{sfx:null});
CAP(L(21.34),L(23.76),'EMPTY STRUCTURE',{red:1,rot:2});
// ===== H7 23.76-26.16 : rent stopped, ₹7 cr due =====
CUT('B2_half_built.jpg',23.76,26.16,{s:1.35,fx:540,fy:1000,q:1});
TITLE(L(23.76),L(26.16),'8 YEARS',{sfx:null});
STAMP(L(23.76),L(26.16),'RENT STOPPED',52);
CAP(L(24.36),L(26.16),'₹7 CR+ RENT DUE');
// ===== H8 26.16-27.31 : still outside =====
CUT('B3_rented_room.jpg',26.16,SEC[3],{s:1.05,fx:620,fy:1100,q:1});
CAP(L(26.16),SEC[3],'STILL OUTSIDE',{red:1});

// ===== H9 27.31-32.22 : Goregaon, same story, 62 weeks late =====
CUT('B1_old_society_a.jpg',SEC[3],32.22,{s:1.1,fx:560,fy:900});
TITLE(L(27.50),L(32.22),'GOREGAON',{sfx:null});
CAP(L(29.05),L(30.11),'SAME STORY');
HERO(L(30.11),L(32.22),'C5_calendar_weeks.png',500);
CAP(L(30.11),L(32.22),'62 WEEKS LATE',{red:1,rot:2,sfx:null});
// ===== H10 32.22-37.22 : court gave ₹6.20 cr - how? comments =====
CUT('B4_court.jpg',32.22,SEC[4],{s:1.0,fx:540,fy:900});
TITLE(L(32.22),SEC[4],'COURT',{sfx:null});
HERO(L(32.76),L(35.59),'C4_money_bag.png',420,{enter:'rise',din:.4});
CAP(L(32.94),L(35.59),'₹6.20 CR',{fs:50});
A({t0:L(33.77),t1:L(35.59),x:540,y:640,w:600,cls:'chipw',enter:'zoom',din:.3,sfx:'impact',sfxv:.4,z:62,float:0,
  html:`<span style="display:inline-block;font:900 84px/1.2 P;color:#fff;background:rgba(13,23,41,.82);padding:18px 44px 12px;border-radius:26px">कैसे?</span>`});
A({t0:L(35.59),t1:SEC[4],x:540,y:1000,w:960,cls:'chipw',enter:'pop',din:.3,sfx:'pop',sfxv:.35,z:60,float:0,
  html:`<span style="display:inline-block;background:${YEL};color:${INK};font:900 44px/1.15 P;padding:22px 40px 16px;border-radius:14px;transform:rotate(-2deg);box-shadow:0 10px 24px rgba(0,0,0,.28)">TELL US IN THE<br>COMMENTS</span>`});

// ===== H11 37.22-46.62 : the answer =====
CUT('B4_court.jpg',SEC[4],46.62,{s:1.2,fx:540,fy:600,filter:'brightness(.6) saturate(.8)'});
TITLE(L(37.22),L(46.62),'THE ANSWER',{sfx:null});
A({t0:L(37.44),t1:L(46.62),x:540,y:1040,w:520,img:'C3_agreement.png',enter:'zoom',din:.4,exit:'fade',dout:.2,sfx:null,float:.05,z:40,
  html:`<div class="hl" style="position:absolute;left:12%;right:12%;top:44%;height:7%;background:rgba(255,210,63,0);border-radius:8px;transform-origin:0 50%"></div>`,
  draw:(t,lt,oo)=>{const p=clamp((t-L(38.56))/.4);const h=oo.el.querySelector('.hl');h.style.background=`rgba(255,210,63,${.85*p})`;h.style.transform=`scaleX(${p})`}});
CAP(L(38.13),L(39.25),'ONE LINE');
CAP(L(39.25),L(43.06),'₹10 LAKH / WEEK',{red:1,rot:2});
A({t0:L(40.37),t1:L(46.62),x:540,y:580,w:960,cls:'chipw',enter:'pop',din:.25,sfx:'pop',sfxv:.35,z:62,float:0,
  html:`<div style="display:inline-block;background:#fff;border-radius:18px;padding:18px 36px 14px;box-shadow:0 10px 24px rgba(0,0,0,.3);font:900 54px/1.1 P;color:${INK}"><span>62</span> <span class="b" style="visibility:hidden">× 10 LAKH</span> <span class="c" style="visibility:hidden;color:${RED}">= ₹6.20 CR</span></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.b').style.visibility=t>=L(41.16)?'visible':'hidden';oo.el.querySelector('.c').style.visibility=t>=L(42.24)?'visible':'hidden'}});
sfx(L(41.16),'pop',.3);sfx(L(42.24),'impact',.5);punch(L(42.24),.06);
A({t0:L(43.06),t1:L(46.62),x:800,y:1250,w:260,img:'C6_gavel.png',enter:'stamp',din:.3,sfx:'stamp',sfxv:.5,float:0,z:55,allowOver:1,over:1});shake(L(43.06)+.05,7);
CAP(L(44.76),L(46.62),'HIGH COURT ✓');
// ===== H12 46.62-49.00 : Chembur agreement - that line missing =====
CUT('B1_old_society_b.jpg',46.62,SEC[5],{s:1.3,fx:600,fy:700,filter:'brightness(.75) saturate(.8)'});
TITLE(L(46.85),SEC[5],'CHEMBUR AGREEMENT',{fs:44,sfx:null});
HERO(L(46.85),SEC[5],'C3_agreement.png',520);
STAMP(L(47.97),SEC[5],'THAT LINE: MISSING',46);

// ===== H13 49.00-55.14 : your society - ask before you sign =====
CUT('B1_old_society_a.jpg',SEC[5],SEC[6],{s:1.0,fx:540,fy:900});
TITLE(L(49.53),SEC[6],'YOUR SOCIETY?',{sfx:null});
HERO(L(51.41),L(55.14),'C3_agreement.png',440);
CAP(L(52.76),L(53.32),'ASK BEFORE YOU SIGN');
CAP(L(53.32),L(55.14),'DELAY = ₹ ? / WEEK',{red:1,rot:2,sfx:null});
// ===== H14 55.14-60.9 : comment + follow =====
COMMENT_BOX(L(55.14),SEC[6]-.05,55.64,57.3,'हाँ, हमारे agreement में है',{y:1300,typeDur:1.2,placeholder:'Comment करो...'});
LBL(L(58.28),SEC[6],760,'TRUE CASES EVERY WEEK',{fs:38});

// ===== OUTRO 59.99-62.3 : logo + Follow under it =====
CUT('B1_old_society_b.jpg',SEC[6],END+1,{s:1.08,fx:540,fy:700,q:1,filter:'brightness(.9) saturate(.95)'});
LBL(L(60.9),END+1,460,'ऐसी ही सच्ची कहानियाँ',{fs:46,sfx:null});
A({t0:SEC[6],t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:null,z:50,float:0});
FOLLOW_FLIP(L(60.11),END+1,60.7,{y:1300,fs:40,col:'#e8382a',label:'Follow करो →'});
A({t0:61.2,t1:END+1,x:540,y:1540,w:980,cls:'chipw',enter:'fade',din:.4,float:0,z:40,html:`<div style="display:inline-block;background:rgba(250,247,242,.92);border-radius:14px;padding:14px 22px;font:600 22px/1.5 P;color:#2b2620">* स्रोत: Bombay High Court orders, Oct 2026 (FPJ, LiveLaw) · नाम हटाए गए<br>कानूनी सलाह नहीं · SRS Dwell</div>`});
}
