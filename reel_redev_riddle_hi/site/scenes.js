const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - Hindi riddle: 2 societies, one got ₹6.20 cr, the other 12 years on rent. Mind Hex format:
// flat cartoon backgrounds, English yellow/red label boxes, cut-outs move on their spoken word. L = cue - 0.12.
function buildScenes(){
const END=63.9;window.END=END;
const L=t=>t-.12;
const SEC=[0,12.33,22.30,29.52,38.26,48.66,60.9,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.035*E.inout(p)})`});
BOKEH_ON=t=>(t>SEC[4]&&t<SEC[5])||t>SEC[6]?1:0;
const INK='#0d1729',YEL='#ffd23f',RED='#e8382a';
// Mind Hex label box: yellow (ink text) or red (white text), slight tilt, pops on its word
const LBL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||900,cls:'chipw',enter:'pop',din:.28,sfx:'pop',sfxv:.55,z:60,float:0,
  html:`<span style="display:inline-block;background:${o.red?RED:YEL};color:${o.red?'#fff':INK};font:900 ${o.fs||46}px/1.1 P;padding:18px 34px 14px;border-radius:12px;transform:rotate(${o.rot===undefined?-2:o.rot}deg);box-shadow:0 10px 24px rgba(0,0,0,.28);white-space:nowrap">${txt}</span>`},o));
const BIG=(t0,t1,y,html,o={})=>TXT(t0,t1,540,y,`<div style="display:inline-block;font:900 ${o.fs||70}px/1.2 P;color:#fff;background:rgba(13,23,41,.78);padding:22px 40px 16px;border-radius:26px">${html}</div>`,Object.assign({enter:'up',din:.3,float:0,z:58},o));
const FOCUS=[];const focusAt=t=>{let k=0;for(const [a,b] of FOCUS){if(t>=a-.25&&t<=b+.25)k=Math.max(k,Math.min(clamp((t-(a-.25))/.3),clamp(((b+.25)-t)/.3)))}return k};
const CUT=(img,t0,t1,o={})=>{const s=o.s||1.0,s1=s+(o.ds===undefined?.06:o.ds),fx=o.fx===undefined?540:o.fx,fy=o.fy===undefined?960:o.fy;
  const cx=v=>Math.max(-540*(v-1),Math.min(540*(v-1),-(fx-540)*v)),cy=v=>Math.max(-960*(v-1),Math.min(960*(v-1),-(fy-960)*v));
  const base=o.filter||'none';BG({img,t0,t1,s0:s,s1,x0:cx(s),x1:cx(s1),y0:cy(s),y1:cy(s1),fade:o.fade||.14,filter:t=>{const k=focusAt(t);return k>0?`${base==='none'?'':base} blur(${(3.5*k).toFixed(1)}px) brightness(${(1-.18*k).toFixed(2)})`:base}});
  if(o.cut!==false&&t0>0){punch(t0,.03);if(!o.q)sfx(t0,'swoosh',.2)}};
const STAMPR=(t0,t1,x,y,txt,fs=56)=>{A({t0,t1,x,y,w:960,cls:'chipw',html:`<span style="display:inline-block;border:8px solid ${RED};color:${RED};background:rgba(255,255,255,.92);font:900 ${fs}px/1.1 P;padding:16px 30px 10px;border-radius:14px;transform:rotate(-7deg)">${txt}</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.85,z:62,float:0,allowOver:1,over:1});shake(t0+.05,10)};
FOCUS.push([L(34.49),L(36.8)],[L(38.45),L(46.42)],[L(48.06),SEC[5]],[SEC[6],END+1]);  // only the key reveals: ₹6.20 CR, the answer, the missing line
// transitions
BARS(SEC[1],['#ffd23f','#0d1729','#faf7f2','#e8382a']);SWEEP(SEC[2]);BLINDS(SEC[3],'#15264a');RINGT(SEC[4]);BARS(SEC[5],['#ffd23f','#0d1729','#faf7f2','#e8382a']);SWEEP(SEC[6]);

// HUD
A({t0:0,t1:SEC[6],x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600});
A({t0:0,t1:SEC[6],x:900,y:120,w:320,cls:'noshadow',enter:'fade',din:.5,float:0,z:600,html:`<div style="display:inline-block;font:900 24px/1 P;color:${INK};background:${YEL};border-radius:10px;padding:12px 20px;transform:rotate(-2deg)">TRUE CASE</div>`});

// ===== HOOK 0-12.33 : two societies =====
CUT('B1_old_society_a.jpg',-.3,6.1,{s:1.06,fx:500,fy:1000,cut:false});
CUT('B1_old_society_b.jpg',6.1,SEC[1],{s:1.12,fx:620,fy:900});
TINT(0,SEC[1],'linear-gradient(180deg,rgba(13,23,41,.45),rgba(13,23,41,0) 30%,rgba(13,23,41,0) 70%,rgba(13,23,41,.45))',.2);
LBL(L(0.42),L(5.45),540,430,'2 SOCIETIES',{fs:56});
A({t0:L(1.76),t1:L(5.45),x:300,y:1180,w:380,img:'C1_builder.png',enter:'left',din:.4,sfx:null,float:.1,z:40});
A({t0:L(3.88),t1:L(5.45),x:760,y:1120,w:360,img:'C3_agreement.png',enter:'pop',din:.3,sfx:'paper',sfxv:.5,float:.1,z:41,fn:(t,lt)=>({r:8})});
LBL(L(5.45),SEC[1],540,430,'BUILDER LATE',{red:1,fs:56,rot:2});
A({t0:L(7.38),t1:SEC[1],x:300,y:1050,w:380,img:'C4_money_bag.png',enter:'rise',din:.4,sfx:'thud',sfxv:.45,float:.2,z:40});
LBL(L(7.38),SEC[1],300,1400,'₹6.20 CR',{w:520,fs:50,sfx:null});
A({t0:L(9.98),t1:SEC[1],x:790,y:1080,w:420,img:'C2_members.png',enter:'right',din:.4,sfx:null,float:.1,z:40});
LBL(L(9.98),SEC[1],790,1400,'12 YEARS ON RENT',{red:1,w:520,fs:36,rot:2});
BIG(L(11.78),SEC[1],700,'फर्क क्या था?',{fs:76,sfx:'impact',sfxv:.55});punch(L(11.78),.06);

// ===== S1 Chembur 12.33-22.30 =====
CUT('B1_old_society_b.jpg',SEC[1],17.5,{s:1.0,fx:540,fy:900,q:1});
CUT('B1_old_society_b.jpg',17.5,SEC[2],{s:1.35,fx:600,fy:700});
TINT(SEC[1],SEC[2],'linear-gradient(180deg,rgba(13,23,41,.45),rgba(13,23,41,0) 30%,rgba(13,23,41,0) 70%,rgba(13,23,41,.45))',.2);
LBL(L(13.37),SEC[2],540,430,'CHEMBUR · 2013',{fs:52});
A({t0:L(15.99),t1:SEC[2],x:300,y:1150,w:360,img:'C3_agreement.png',enter:'pop',din:.3,sfx:'paper',sfxv:.5,float:.1,z:40,fn:(t,lt)=>({r:-6})});
A({t0:L(16.89),t1:SEC[2],x:780,y:1150,w:380,img:'C1_builder.png',enter:'right',din:.4,sfx:null,float:.1,z:41});
LBL(L(17.88),SEC[2],780,620,'24 MONTHS',{w:520,fs:48,rot:3});
A({t0:L(19.51),t1:SEC[2],x:540,y:1480,w:520,img:'C2_members.png',enter:'up',din:.4,sfx:null,float:0,z:42,fn:(t)=>({dx:lerp(0,-700,E.inout(clamp((t-L(20.97))/1.0)))})});
LBL(L(20.97),SEC[2],300,760,'MOVED OUT ON RENT',{red:1,w:520,fs:34,rot:-3});

// ===== S2 8 years, empty structure 22.30-29.52 =====
CUT('B2_half_built.jpg',SEC[2],25.3,{s:1.0,fx:540,fy:800,q:1});
CUT('B2_half_built.jpg',25.3,28.4,{s:1.4,fx:540,fy:1000});
CUT('B3_rented_room.jpg',28.4,SEC[3],{s:1.05,fx:600,fy:1100,q:1});
TINT(SEC[2],SEC[3],'linear-gradient(180deg,rgba(13,23,41,.5),rgba(13,23,41,0) 30%,rgba(13,23,41,0) 70%,rgba(13,23,41,.5))',.2);
LBL(L(22.30),SEC[3],540,430,'8 YEARS',{fs:56,sfx:null});
LBL(L(23.51),L(26.91),540,1300,'EMPTY STRUCTURE',{red:1,fs:44,rot:2});
STAMPR(L(26.19),SEC[3],540,900,'RENT STOPPED',52);
A({t0:L(26.91),t1:28.4,x:300,y:1480,w:300,img:'C4_money_bag.png',enter:'pop',din:.3,sfx:null,float:.1,z:40,fn:(t,lt)=>({r:Math.sin(lt*6)*4})});
LBL(L(26.91),SEC[3],770,1480,'₹7 CR+ RENT DUE',{w:520,fs:34,rot:-3});
LBL(L(28.52),SEC[3],540,1280,'STILL OUTSIDE',{red:1,fs:44});

// ===== S3 Goregaon 29.52-38.26 =====
CUT('B1_old_society_a.jpg',SEC[3],33.7,{s:1.1,fx:560,fy:900,q:1});
CUT('B4_court.jpg',33.7,SEC[4],{s:1.0,fx:540,fy:900,q:1});
TINT(SEC[3],SEC[4],'linear-gradient(180deg,rgba(13,23,41,.45),rgba(13,23,41,0) 30%,rgba(13,23,41,0) 70%,rgba(13,23,41,.45))',.2);
LBL(L(29.69),33.7,540,430,'GOREGAON',{fs:56,sfx:null});
LBL(L(31.06),33.7,540,560,'SAME STORY',{w:600,fs:40,rot:2});
A({t0:L(31.99),t1:33.7,x:540,y:1150,w:520,img:'C5_calendar_weeks.png',enter:'pop',din:.3,sfx:'paper',sfxv:.5,float:.1,z:40});
LBL(L(31.99),33.7,540,1520,'62 WEEKS LATE',{red:1,fs:44,rot:-3,sfx:null});
LBL(L(33.85),SEC[4],540,430,'COURT',{fs:56});
A({t0:L(34.49),t1:SEC[4],x:320,y:1150,w:380,img:'C4_money_bag.png',enter:'rise',din:.4,sfx:'thud',sfxv:.45,float:.2,z:40});
LBL(L(34.49),SEC[4],320,1480,'₹6.20 CR',{w:520,fs:50,sfx:null});
BIG(L(35.22),SEC[4],760,'कैसे?',{fs:90,sfx:'impact',sfxv:.5,w:500,x:760});
A({t0:L(36.82),t1:SEC[4],x:780,y:1200,w:380,cls:'noshadow',enter:'up',din:.35,sfx:'whoosh',sfxv:.4,float:0,z:50,
  html:`<div style="background:#111;border-radius:40px;padding:14px"><div style="background:#fff;border-radius:28px;padding:18px 16px;text-align:left"><div style="font:800 22px P;color:${INK};margin-bottom:10px">Comments</div>${['#e8382a','#2a9d8f','#7b5cd6'].map(c=>`<div style="display:flex;gap:10px;align-items:center;margin-top:10px"><div style="width:30px;height:30px;border-radius:50%;background:${c}"></div><div style="flex:1;height:12px;border-radius:6px;background:#ddd"></div></div>`).join('')}</div></div>`});
LBL(L(36.82),SEC[4],540,560,'TELL US IN THE COMMENTS',{w:980,fs:36,rot:-2,sfx:null});

// ===== S4 Solution 38.26-48.66 =====
CUT('B4_court.jpg',SEC[4],SEC[5],{s:1.2,fx:540,fy:600,filter:'brightness(.55) saturate(.8)',q:1});
TINT(SEC[4],SEC[5],'linear-gradient(180deg,rgba(13,23,41,.6),rgba(13,23,41,.5))',.2);
LBL(L(38.26),SEC[5],540,430,'THE ANSWER',{fs:56,sfx:null});
A({t0:L(38.45),t1:L(46.42),x:540,y:1020,w:560,img:'C3_agreement.png',enter:'zoom',din:.4,sfx:null,float:.05,z:40,
  html:`<div class="hl" style="position:absolute;left:12%;right:12%;top:44%;height:7%;background:rgba(255,210,63,.0);border-radius:8px"></div>`,
  draw:(t,lt,oo)=>{const p=clamp((t-L(39.44))/.4);oo.el.querySelector('.hl').style.background=`rgba(255,210,63,${.85*p})`;oo.el.querySelector('.hl').style.transform=`scaleX(${p})`}});
LBL(L(39.06),L(46.42),540,1460,'ONE LINE',{w:520,fs:44,rot:2});
sfx(L(39.44),'ticks',.4);
LBL(L(40.04),L(46.42),540,1565,'₹10 LAKH / WEEK',{red:1,w:700,fs:40,rot:-2});
A({t0:L(41.03),t1:L(46.42),x:540,y:600,w:960,cls:'chipw',enter:'pop',din:.25,sfx:null,float:0,z:62,
  html:`<div style="display:inline-block;background:#fff;border-radius:18px;padding:18px 36px 14px;box-shadow:0 10px 24px rgba(0,0,0,.3);font:900 56px/1.1 P;color:${INK}"><span class="a">62</span> <span class="b" style="visibility:hidden">× 10 LAKH</span> <span class="c" style="visibility:hidden;color:${RED}">= ₹6.20 CR</span></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.b').style.visibility=t>=L(41.72)?'visible':'hidden';oo.el.querySelector('.c').style.visibility=t>=L(42.68)?'visible':'hidden'}});
sfx(L(41.03),'click',.5);sfx(L(41.72),'click',.5);sfx(L(42.68),'impact',.6);punch(L(42.68),.07);flash(L(42.68),.3,'#fff4dc');
A({t0:L(43.40),t1:L(46.42),x:800,y:1180,w:300,img:'C6_gavel.png',enter:'stamp',din:.3,sfx:'thud',sfxv:.6,float:0,z:55,allowOver:1,over:1});shake(L(43.40)+.05,8);
LBL(L(44.90),L(46.42),800,1420,'HIGH COURT ✓',{w:480,fs:36,rot:3,allowOver:1,over:1});
CUT('B1_old_society_b.jpg',46.42,SEC[5],{s:1.3,fx:600,fy:700,filter:'brightness(.75) saturate(.8)'});
LBL(L(46.70),SEC[5],540,560,'CHEMBUR AGREEMENT',{w:800,fs:40});
A({t0:L(46.70),t1:SEC[5],x:540,y:1050,w:520,img:'C3_agreement.png',enter:'pop',din:.3,sfx:null,float:.05,z:40});
STAMPR(L(48.06),SEC[5],540,1050,'THAT LINE: MISSING',48);

// ===== S5 CTA 48.66-60.9 =====
CUT('B1_old_society_a.jpg',SEC[5],54.0,{s:1.0,fx:540,fy:900,q:1});
CUT('B1_old_society_a.jpg',54.0,SEC[6],{s:1.2,fx:540,fy:800,q:1});
TINT(SEC[5],SEC[6],'linear-gradient(180deg,rgba(13,23,41,.45),rgba(13,23,41,0) 30%,rgba(13,23,41,0) 70%,rgba(13,23,41,.45))',.2);
LBL(L(49.35),SEC[6],540,430,'YOUR SOCIETY?',{fs:52});
A({t0:L(51.49),t1:L(54.27),x:300,y:1050,w:360,img:'C3_agreement.png',enter:'pop',din:.3,sfx:'paper',sfxv:.5,float:.1,z:40,fn:(t,lt)=>({r:-6})});
LBL(L(52.56),SEC[6],760,900,'ASK BEFORE YOU SIGN',{w:520,fs:36,rot:3});
LBL(L(52.98),SEC[6],760,1060,'DELAY = ₹ ? / WEEK',{red:1,w:520,fs:36,rot:-2});
COMMENT_BOX(L(54.27),SEC[6]-.05,54.5,55.2,'हाँ, हमारे agreement में है',{y:1300,typeDur:.45});
LBL(L(58.40),SEC[6],540,760,'TRUE CASES EVERY WEEK',{w:900,fs:38,rot:-2});
FOLLOW_FLIP(L(60.21),SEC[6],60.7,{y:1560,col:'#e8382a',label:'Follow करो →'});

// ===== OUTRO 60.9-63.9 : same cartoon theme =====
CUT('B1_old_society_b.jpg',SEC[6],END+1,{s:1.08,fx:540,fy:700,q:1,filter:'brightness(.9) saturate(.95)'});
TINT(SEC[6],END+1,'linear-gradient(180deg,rgba(13,23,41,.5),rgba(13,23,41,.2) 40%,rgba(13,23,41,.2) 60%,rgba(13,23,41,.55))',.2);
LBL(L(60.9),END+1,540,460,'ऐसी ही सच्ची कहानियाँ',{w:980,fs:46,rot:-2,sfx:null});
A({t0:60.9,t1:END+1,x:540,y:900,w:820,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.5,sfx:null,z:50,float:0});
A({t0:61.4,t1:END+1,x:540,y:1500,w:980,cls:'chipw',enter:'fade',din:.4,float:0,z:40,html:`<div style="display:inline-block;background:rgba(250,247,242,.92);border-radius:14px;padding:14px 22px;font:600 22px/1.5 P;color:#2b2620">* स्रोत: Bombay High Court orders, Oct 2026 (FPJ, LiveLaw) · नाम हटाए गए<br>कानूनी सलाह नहीं · SRS Dwell</div>`});
}
