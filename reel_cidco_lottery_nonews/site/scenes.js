const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - CIDCO Non-EWS सोडत 27 नोव्हें. Logo look (ivory + champagne). Fast-paced crops, cue-0.12 s.
function buildScenes(){
const END=63.5;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:7.6,s3:14.75,s4:23.5,s5:30.35,s6:40.85,s7:48.95,s8:56.6,s9:61.1};
BOKEH_ON=t=>(t>S.s9)?1:0;
const INK='#2b2620';
const FADE='linear-gradient(180deg,rgba(246,243,240,.6),rgba(246,243,240,0) 20%,rgba(246,243,240,0) 78%,rgba(246,243,240,.55))';
const CUT=(img,t0,t1,o={})=>{const s=o.s||1.0,s1=s+(o.ds===undefined?.06:o.ds),fx=o.fx===undefined?540:o.fx,fy=o.fy===undefined?960:o.fy;
  const cx=v=>Math.max(-540*(v-1),Math.min(540*(v-1),-(fx-540)*v)),cy=v=>Math.max(-960*(v-1),Math.min(960*(v-1),-(fy-960)*v));
  BG({img,t0,t1,s0:s,s1,x0:cx(s),x1:cx(s1),y0:cy(s),y1:cy(s1),fade:o.fade||.16,filter:o.filter||'brightness(.98) saturate(.95)'});
  if(o.cut!==false&&t0>0){punch(t0,.025);sfx(t0,'swoosh',.16)}};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||430,txt,'p-gold',{st:'font:800 44px/1 P;padding:22px 46px 16px',z:500,float:0});
const LINE=(t0,t1,y,html,o={})=>GL(t0,t1,500,y,o.w||860,html,Object.assign({pad:'24px 32px',align:'left',float:.05,enter:'left',din:.38},o));
const TICK=`<div style="width:64px;height:64px;flex:none">${IC.check}</div>`;
const CROSS=`<div style="width:64px;height:64px;flex:none">${IC.cross}</div>`;
// new transition for this reel: three ivory shutter bands with champagne edges slide across from alternate sides
function SHUTTER(t){for(let i=0;i<3;i++){const d=i*.04,dir=i%2?1:-1;
  A({t0:t-.3+d,t1:t+.3+d,x:540,y:320+i*640,w:1080,cls:'noshadow',enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700+i,
   html:`<div style="height:646px;background:linear-gradient(180deg,#fbf9f6,#efe8de);border-top:6px solid #ac9981;border-bottom:6px solid #ac9981"></div>`,
   fn:(tt,lt)=>({dx:lerp(dir*1120,-dir*1120,E.inout(clamp(lt/.6)))})})}
  sfx(t-.28,'whoosh',.65)}

// HUD
A({t0:0,t1:S.s9,x:128,y:300,w:170,cls:'noshadow',enter:'fade',din:.01,float:0,z:600,html:`<div style="background:#fff;border-radius:18px;padding:12px 16px;box-shadow:0 6px 18px rgba(50,38,25,.25)"><img src="a/logo_gold.png" style="width:100%;display:block"></div>`});
A({t0:0,t1:S.s9,x:620,y:300,w:700,cls:'noshadow',enter:'fade',din:.01,float:0,z:600,html:`<div style="display:inline-block;text-align:left;font:600 19px/1.4 P;color:${INK};background:rgba(250,247,242,.88);border-radius:10px;padding:6px 12px">* CIDCO सूचना 14 नोव्हें 2026 (बातम्यांनुसार) · माहितीपुस्तिका डिसें 2025<br>सरकारी video नाही · अधिकृत माहिती cidcohomes.com वर तपासा</div>`});
for(let k=1;k<=8;k++){TINT(S['s'+k],S['s'+(k+1)],FADE,.15)}
[S.s2,S.s3,S.s4,S.s5,S.s6,S.s7,S.s8].forEach(SHUTTER);

// ===== S1 HOOK 0-7.6 =====
CUT('C1_mass_housing.jpg',-.3,2.6,{s:1.05,cut:false});
CUT('C1_mass_housing.jpg',2.6,5.2,{s:1.55,fx:600,fy:1250});
CUT('C1_mass_housing.jpg',5.2,S.s2,{s:1.4,fx:420,fy:700});
PILL(0,S.s2,540,430,'CIDCO सोडत','p-gold',{st:'font:800 44px/1 P;padding:22px 46px 16px',z:500,float:0,enter:'fade',din:.01});
GL(0,S.s2,540,700,820,`<div class="lab">Non-EWS (LIG) सोडत</div><div class="d gold" style="font:900 150px/1.05 P">? ?</div><div style="font:800 46px/1.2 P">नोव्हेंबर 2026</div>`,{pad:'24px 34px 22px',enter:'fade',din:.01,float:0,
  draw:(t,lt,oo)=>{const d=oo.el.querySelector('.d');d.textContent=t<L(2.1)?'? ?':'27';d.style.transform=`scale(${t>=L(2.1)?lerp(1.7,1,E.out(clamp((t-L(2.1))/.35))):1})`}});
sfx(L(2.1),'impact',.55);punch(L(2.1),.06);
A({t0:L(3.6),t1:S.s2,x:540,y:1060,w:900,cls:'chipw',html:`<span class="pill p-red" style="font:800 44px/1 P;padding:22px 40px 16px">⚠ चुकीचा निर्णय?</span>`,enter:'pop',din:.3,sfx:'thud',sfxv:.5,z:60,float:0});
GL(L(5.4),S.s2,540,1260,640,`<div style="font:900 72px/1.15 P" class="gold">₹1.5 - 2 लाख</div><div style="font:700 32px P">जाऊ शकतात</div>`,{pad:'20px 26px',float:0,enter:'zoom',din:.3});
sfx(L(6.2),'impact',.5);shake(L(7.0),6);

// ===== S2 SCHEME 7.6-14.75 =====
CUT('C2_waiting_window.jpg',S.s2,10.1,{s:1.04,cut:false});
CUT('C2_waiting_window.jpg',10.1,12.6,{s:1.6,fx:720,fy:1650});
CUT('C2_waiting_window.jpg',12.6,S.s3,{s:1.5,fx:480,fy:800});
HEAD(L(7.7),S.s3,'"माझे पसंतीचे सिडकोचे घर"',{});
A({t0:L(8.4),t1:S.s3,x:540,y:560,w:900,cls:'chipw',html:`<span class="pill p-ivory" style="font:700 34px/1 P">योजना · डिसेंबर 2025</span>`,enter:'pop',din:.3,z:55,float:0});
LINE(L(10.9),S.s3,770,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 46px/1.3 P">EWS सोडत · <span class="gold">जुलै 2026</span></div></div>`);
LINE(L(13.0),S.s3,960,`<div style="display:flex;align-items:center;gap:22px"><div style="width:64px;height:64px;flex:none;border-radius:50%;background:#e2a33b;color:#fff;font:900 34px/64px P;text-align:center">❚❚</div><div style="font:800 46px/1.3 P">LIG सोडत · <span style="color:#c0392b">थांबली</span></div></div>`);
[10.9,13.0].forEach(k=>sfx(L(k),'pop',.5));

// ===== S3 INCOME / COURT 14.75-23.5 =====
CUT('C3_car_vs_cycle.jpg',S.s3,17.3,{s:1.04,cut:false});
CUT('C3_car_vs_cycle.jpg',17.3,20.2,{s:1.55,fx:360,fy:1100});
CUT('C3_car_vs_cycle.jpg',20.2,S.s4,{s:1.5,fx:850,fy:1000});
HEAD(L(14.85),S.s4,'कारण?');
GL(L(16.1),S.s4,540,700,900,`<div class="lab">वार्षिक कौटुंबिक उत्पन्न</div>
 <div style="display:flex;align-items:stretch;gap:14px;margin-top:12px">
  <div style="flex:1;border-radius:18px;background:rgba(172,153,129,.18);padding:14px 8px"><div style="font:800 40px P">EWS</div><div class="gold" style="font:900 52px/1.2 P">≤ ₹6 लाख</div></div>
  <div style="flex:1;border-radius:18px;background:rgba(192,57,43,.1);padding:14px 8px"><div style="font:800 40px P">LIG</div><div class="u" style="font:900 52px/1.2 P;color:#c0392b">₹6 लाख +</div></div>
 </div>`,{pad:'24px 28px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.u').textContent=t>=L(17.2)?'₹6 लाख → ∞':'₹6 लाख +'}});
A({t0:L(17.2),t1:S.s4,x:540,y:960,w:900,cls:'chipw',html:`<span class="pill p-red" style="font:800 40px/1 P;padding:20px 36px 14px">वरची मर्यादा नाही!</span>`,enter:'stamp',din:.26,sfx:'stamp',sfxv:.7,z:60,float:0});
GL(L(18.9),S.s4,540,1230,900,`<div class="lab">High Court · मार्च 2026</div><div style="font:800 44px/1.3 P">₹6 लाखांपेक्षा जास्त कमावणारा<br><span class="gold">"कमी उत्पन्न गट" कसा?</span></div>`,{pad:'22px 30px',float:0,enter:'up'});
punch(L(23.1),.05);sfx(L(23.1),'thud',.5);

// ===== S4 PETITIONS DISMISSED, RENAME 23.5-30.35 =====
CUT('C4_file_stamp.jpg',S.s4,26.0,{s:1.04,cut:false});
CUT('C4_file_stamp.jpg',26.0,28.6,{s:1.6,fx:300,fy:1480});
CUT('C4_file_stamp.jpg',28.6,S.s5,{s:1.45,fx:700,fy:1000});
HEAD(L(23.6),S.s5,'आता');
LINE(L(23.9),S.s5,600,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 44px/1.3 P">याचिका <span class="gold">फेटाळल्या</span></div></div>`);
GL(L(26.0),S.s5,540,860,820,`<div style="display:flex;align-items:center;justify-content:center;gap:28px"><div style="position:relative;font:900 84px/1.1 P">LIG<div class="st" style="position:absolute;left:-6px;right:-6px;top:50%;height:9px;background:#c0392b;border-radius:5px;transform:scaleX(0);transform-origin:left"></div></div><div style="font:900 60px P;color:#ac9981">→</div><div class="nn gold" style="font:900 84px/1.1 P;opacity:0">Non-EWS</div></div>`,{pad:'30px 30px',float:0,enter:'zoom',din:.3,
  draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.transform=`scaleX(${E.out(clamp((t-L(26.6))/.3))})`;const n=oo.el.querySelector('.nn');const p=clamp((t-L(27.4))/.35);n.style.opacity=p;n.style.transform=`scale(${p>0?E.back2(p):.5})`}});
sfx(L(27.4),'pop',.6);punch(L(27.9),.05);
PILL(L(28.9),S.s5,540,1080,'बाकी सगळ्या अटी तशाच','p-ivory',{st:'font:700 36px/1 P',float:0});

// ===== S5 WITHDRAW BY 24 NOV 30.35-40.85 =====
CUT('C5_online_withdraw.jpg',S.s5,33.0,{s:1.04,cut:false});
CUT('C5_online_withdraw.jpg',33.0,35.6,{s:1.55,fx:560,fy:700});
CUT('C5_online_withdraw.jpg',35.6,38.2,{s:1.6,fx:820,fy:1520});
CUT('C5_online_withdraw.jpg',38.2,S.s6,{s:1.2,fy:1100});
HEAD(L(30.45),S.s6,'सगळ्यात महत्त्वाचं');
GL(L(31.8),S.s6,540,690,860,`<div class="lab">घर नको असेल तर</div><div style="font:900 96px/1.1 P;color:#c0392b" class="dl">24 नोव्हें</div><div style="font:800 40px P">पर्यंत माघार</div>`,{pad:'22px 30px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.dl').style.visibility=t>=L(33.1)?'visible':'hidden'}});
sfx(L(33.1),'impact',.5);punch(L(33.1),.05);
PILL(L(35.0),S.s6,540,960,'🔐 login मधून · फक्त online','p-gold',{st:'font:800 38px/1 P',float:0});
GL(L(36.8),S.s6,540,1200,860,`<div style="display:flex;align-items:center;gap:20px;justify-content:center">${TICK}<div style="text-align:left"><div style="font:800 44px/1.25 P">Booking ची <span class="gold">पूर्ण रक्कम</span></div><div class="q" style="font:700 34px/1.3 P;opacity:0">₹0 कपात · <span class="gold">15 दिवसांत</span> परत</div></div></div>`,{pad:'22px 28px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.q').style.opacity=t>=L(38.2)?1:0}});
sfx(L(39.8),'pop',.5);

// ===== S6 AFTER ALLOTMENT = FORFEIT 40.85-48.95 =====
CUT('C6_letter_forfeit.jpg',S.s6,43.2,{s:1.04,cut:false});
CUT('C6_letter_forfeit.jpg',43.2,45.8,{s:1.5,fx:600,fy:620});
CUT('C6_letter_forfeit.jpg',45.8,S.s7,{s:1.6,fx:620,fy:1450});
HEAD(L(40.95),S.s7,'पण सावध!');
GL(L(41.2),S.s7,540,720,880,`<div style="display:flex;align-items:center;justify-content:center;gap:16px;font:800 38px/1.3 P;flex-wrap:wrap">
 <span class="a1" style="opacity:.25">सोडत लागली</span><span style="color:#ac9981">→</span><span class="a2" style="opacity:.25">allotment letter</span><span style="color:#ac9981">→</span><span class="a3" style="opacity:.25;color:#c0392b">"घर नको"</span></div>`,{pad:'24px 26px',float:0,
  draw:(t,lt,oo)=>{[['.a1',41.2],['.a2',42.1],['.a3',43.8]].forEach(([c,k])=>oo.el.querySelector(c).style.opacity=t>=L(k)?1:.25)}});
A({t0:L(45.9),t1:S.s7,x:540,y:1000,w:900,cls:'chipw',html:`<span class="pill p-red" style="font:900 64px/1 P;padding:26px 52px 20px">Booking जप्त!</span>`,enter:'stamp',din:.26,sfx:'stamp',sfxv:.85,z:60,float:0});
shake(L(45.9)+.05,9);
PILL(L(46.3),S.s7,540,1190,'+ भरलेल्या हप्त्यांचे 10%','p-ivory',{st:'font:800 38px/1 P',float:0});

// ===== S7 CHECKLIST 48.95-56.6 =====
CUT('C7_loan_check.jpg',S.s7,51.3,{s:1.04,cut:false});
CUT('C7_loan_check.jpg',51.3,53.9,{s:1.6,fx:430,fy:1250});
CUT('C7_loan_check.jpg',53.9,S.s8,{s:1.5,fx:700,fy:1150});
HEAD(L(49.05),S.s8,'आत्ताच तपासा');
[['घराची किंमत','₹30.80 - 87.50 लाख',50.4],['Floor rise','6 व्या मजल्यापासून',51.4],['Loan मिळेल का?','',53.5],['Bank खातं बरोबर?','registration मधलं',54.5]].forEach(([a,b,k],i)=>
  LINE(L(k),S.s8,590+i*168,`<div style="display:flex;align-items:center;gap:20px">${TICK}<div><div style="font:800 40px/1.2 P">${a}</div>${b?`<div class="gold" style="font:800 30px/1.3 P">${b}</div>`:''}</div></div>`,{pad:'16px 28px'}));
[50.4,51.4,53.5,54.5].forEach(k=>sfx(L(k),'pop',.45));

// ===== S8 COMMENT 56.6-61.1 =====
CUT('C8_family_towers.jpg',S.s8,58.8,{s:1.04,cut:false});
CUT('C8_family_towers.jpg',58.8,S.s9,{s:1.45,fx:420,fy:1050});
GL(L(56.7),S.s9,540,560,940,`<div style="font:800 52px/1.35 P">CIDCO च्या कोणत्या घरासाठी<br><span class="gold">अर्ज केलाय?</span></div>`,{pad:'30px 36px',float:0,enter:'zoom',din:.3});
COMMENT_BOX(L(58.9),S.s9-.05,L(59.0),59.7,'खारघर LIG',{y:1300,typeDur:.35});
PILL(L(59.6),S.s9,540,800,'📤 अर्ज केलेल्या मित्रांना पाठवा','p-gold',{st:'font:800 36px/1 P',float:0});

// ===== S9 OUTRO 61.1-END =====
TXT(L(61.2),END+1,540,470,`<div style="font:800 60px/1.3 P;color:${INK}">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.35,float:0});
A({t0:S.s9,t1:END+1,x:540,y:900,w:780,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.45,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(61.5),END+1,62.5,{y:1330,col:'#937b5c'});
}
