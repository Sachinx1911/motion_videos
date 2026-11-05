const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;
// SRS Dwell - बिल्डरने भाडं थांबवलं, building अर्धवट. Logo look: ivory + champagne gold (no navy).
// Fast-paced: a new crop every 2-3 s (CUT), panel transition between scenes, every element at cue-0.12 s.
function buildScenes(){
const END=67.6;window.END=END;
const L=t=>t-.12;
const S={s1:0,s2:9.4,s3:18.05,s4:25.15,s5:32.35,s6:40.25,s7:48.05,s8:53.55,s9:59.95,s10:65.45};
BOKEH_ON=t=>(t>S.s10)?1:0;
const INK='#2b2620';
const FADE='linear-gradient(180deg,rgba(246,243,240,.62),rgba(246,243,240,0) 20%,rgba(246,243,240,0) 78%,rgba(246,243,240,.55))';
// one crop of an image: focus point (fx,fy) in frame px, scale s, slow drift ds
const CUT=(img,t0,t1,o={})=>{const s=o.s||1.0,s1=s+(o.ds===undefined?.06:o.ds),fx=o.fx===undefined?540:o.fx,fy=o.fy===undefined?960:o.fy;
  const cx=v=>Math.max(-540*(v-1),Math.min(540*(v-1),-(fx-540)*v)),cy=v=>Math.max(-960*(v-1),Math.min(960*(v-1),-(fy-960)*v));
  BG({img,t0,t1,s0:s,s1,x0:cx(s),x1:cx(s1),y0:cy(s),y1:cy(s1),fade:o.fade||.16,filter:o.filter||'brightness(.98) saturate(.95)'});
  if(o.cut!==false&&t0>0){punch(t0,.025);sfx(t0,'swoosh',.16)}};
const HEAD=(t0,t1,txt,o={})=>PILL(t0,t1,540,o.y||430,txt,'p-gold',{st:'font:800 44px/1 P;padding:22px 46px 16px',z:500,float:0});
const LINE=(t0,t1,y,html,o={})=>GL(t0,t1,500,y,o.w||860,html,Object.assign({pad:'24px 32px',align:'left',float:.05,enter:'left',din:.38},o));
const NUM=(n)=>`<div style="width:80px;height:80px;flex:none;border-radius:50%;background:linear-gradient(180deg,#c3b092,#937b5c);color:#fff;font:900 42px/84px P;text-align:center">${n}</div>`;
const TICK=`<div style="width:64px;height:64px;flex:none">${IC.check}</div>`;
// new transition for this reel: ivory panel with champagne edges and the logo slides up through the frame
function PANEL(t){A({t0:t-.26,t1:t+.26,x:540,y:960,w:1080,cls:'noshadow',enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
  html:`<div style="height:1920px;background:linear-gradient(180deg,#fbf9f6,#efe8de);border-top:14px solid #ac9981;border-bottom:14px solid #ac9981;display:flex;align-items:center;justify-content:center"><img src="a/logo_gold.png" style="width:300px;opacity:.9"></div>`,
  fn:(tt,lt)=>({dy:lerp(1990,-1990,E.inout(clamp(lt/.52)))})});sfx(t-.24,'whoosh',.7)}

// HUD: gold logo on a white card + source line
A({t0:0,t1:S.s10,x:128,y:300,w:170,cls:'noshadow',enter:'fade',din:.01,float:0,z:600,html:`<div style="background:#fff;border-radius:18px;padding:12px 16px;box-shadow:0 6px 18px rgba(50,38,25,.25)"><img src="a/logo_gold.png" style="width:100%;display:block"></div>`});
A({t0:0,t1:S.s10,x:620,y:300,w:700,cls:"noshadow",enter:"fade",din:.01,float:0,z:600,html:`<div style="display:inline-block;text-align:left;font:600 19px/1.4 P;color:${INK};background:rgba(250,247,242,.88);border-radius:10px;padding:6px 12px">* Bombay HC आदेश, ऑक्टो 2026 (बातम्यांनुसार) · GR 30 सप्टें 2026<br>कायदेशीर सल्ला नाही · वकीलाचा सल्ला घ्या · दि. 5 नोव्हें 2026</div>`});
for(let k=1;k<=9;k++){const a=S['s'+k],b=S['s'+(k+1)];TINT(a,b,FADE,.15)}
[S.s2,S.s3,S.s4,S.s5,S.s6,S.s7,S.s8,S.s9].forEach(PANEL);

// ===== S1 HOOK 0-9.4 =====
CUT('S1_abandoned_frame.jpg',-0.3,3.0,{s:1.06,ds:.05,fy:900,cut:false});
CUT('S1_abandoned_frame.jpg',3.0,5.3,{s:1.55,fy:420});
CUT('S1_abandoned_frame.jpg',5.3,7.2,{s:1.12,fy:1000});
CUT('S1_abandoned_frame.jpg',7.2,S.s2,{s:1.5,fy:1560});
PILL(0,8.1,330,430,'22 कुटुंबं','p-gold',{st:'font:800 46px/1 P;padding:22px 40px 16px',enter:'fade',din:.01,float:0,w:500});
PILL(L(1.1),8.1,740,430,'8 वर्षं','p-gold',{st:'font:800 46px/1 P;padding:22px 40px 16px',float:0,w:400});
GL(0,8.1,540,700,860,`<div class="lab">थकलेलं भाडं</div><div class="gold n" style="font:900 140px/1.08 P">₹ ?</div>`,{pad:'24px 34px 18px',enter:'fade',din:.01,float:0,
  draw:(t,lt,oo)=>{const n=oo.el.querySelector('.n');if(t<L(2.4)){n.textContent='₹ ?';return}const v=7.35*E.out(clamp((t-L(2.4))/1.3));n.textContent='₹'+v.toFixed(2)+' कोटी'}});
sfx(L(2.4),'ticks',.5);sfx(L(3.6),'impact',.55);punch(L(3.6),.05);
A({t0:L(5.4),t1:8.1,x:300,y:1220,w:300,cls:'noshadow',enter:'up',din:.3,float:0,z:55,
  html:`<div>${[10,9,8,7,6,5,4,3,2,1].map(i=>`<div class="fl" data-i="${i}" style="height:44px;margin-top:6px;border-radius:9px;background:rgba(250,247,242,.95);border:2px solid rgba(172,153,129,.6);color:${INK};font:800 26px/40px P;padding-left:16px;opacity:0">${i}</div>`).join('')}</div>`,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.fl').forEach(e=>{const i=+e.dataset.i;e.style.opacity=lt>(i-1)*.07?1:0;const hi=i>8&&t>=L(6.4);e.style.background=hi?'linear-gradient(180deg,#c3b092,#937b5c)':'rgba(250,247,242,.95)';e.style.color=hi?'#fff':INK;e.textContent=i+(hi?' · अर्धवट':'')})}});
sfx(L(6.4),'thud',.55);punch(L(6.4),.04);
GL(L(6.6),8.1,700,1130,420,`<div style="font:800 38px/1.3 P">मंजुरी <span class="gold">8</span> मजले<br>बांधले <span class="gold">10</span></div>`,{pad:'20px 24px',float:0,enter:'right'});
GL(L(8.2),S.s2,540,960,880,`<div style="font:900 70px/1.25 P">मग society ने<br><span class="gold">काय केलं?</span></div>`,{pad:'34px 36px',enter:'zoom',din:.32,float:0});

// ===== S2 CHEMBUR 9.4-18.05 =====
CUT('S2_elderly_rented_room.jpg',S.s2,12.0,{s:1.05,cut:false});
CUT('S2_elderly_rented_room.jpg',12.0,14.4,{s:1.5,fx:270,fy:1150});
CUT('S2_elderly_rented_room.jpg',14.4,16.3,{s:1.9,fx:270,fy:390});
CUT('S2_elderly_rented_room.jpg',16.3,S.s3,{s:1.15,fy:1050,filter:'brightness(.85) saturate(.8)'});
HEAD(L(9.6),S.s3,'चेंबूर, मुंबई');
GL(L(11.0),S.s3,540,700,900,`<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;position:relative">
  <svg style="position:absolute;left:60px;right:60px;top:40px" width="700" height="8"><line class="tl" x1="0" y1="4" x2="700" y2="4" stroke="#ac9981" stroke-width="6" stroke-dasharray="700" stroke-dashoffset="700"/></svg>
  ${[['2014','घर सोडलं',11.0],['+2 वर्षं','परत याल',13.1],['2026','काम थांबलं',15.8]].map(([a,b,k])=>`<div class="nd" data-k="${k}" style="flex:1;text-align:center;opacity:0;position:relative"><div style="width:30px;height:30px;margin:26px auto 14px;border-radius:50%;background:#937b5c;border:5px solid #fff;box-shadow:0 0 0 3px #ac9981"></div><div class="gold" style="font:900 52px/1.05 P">${a}</div><div style="font:700 30px/1.3 P">${b}</div></div>`).join('')}</div>`,{pad:'10px 26px 26px',float:0,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.nd').forEach(e=>{e.style.opacity=t>=L(+e.dataset.k)?1:0});oo.el.querySelector('.tl').style.strokeDashoffset=700*(1-clamp((t-L(11.0))/(15.8-11.0)))}});
[13.1,15.8].forEach(k=>sfx(L(k),'pop',.45));
A({t0:L(16.9),t1:S.s3,x:540,y:1060,w:900,cls:'chipw',html:`<span class="pill p-red" style="font:900 74px/1 P;padding:28px 60px 22px">भाडं बंद!</span>`,enter:'stamp',din:.28,sfx:'stamp',sfxv:.85,z:60,float:0});
shake(L(16.9)+.05,10);

// ===== S3 STEP 1 18.05-25.15 =====
CUT('S3_notice_signing.jpg',S.s3,20.6,{s:1.05,cut:false});
CUT('S3_notice_signing.jpg',20.6,23.0,{s:1.6,fx:470,fy:1130});
CUT('S3_notice_signing.jpg',23.0,S.s4,{s:1.5,fx:760,fy:560});
HEAD(L(18.15),S.s4,'पहिली पायरी');
LINE(L(19.4),S.s4,640,`<div style="display:flex;align-items:center;gap:22px">${NUM(1)}<div style="font:800 44px/1.3 P">लेखी <span class="gold">show-cause notice</span></div></div>`);
LINE(L(22.1),S.s4,860,`<div style="display:flex;align-items:center;gap:22px">${NUM(2)}<div style="font:800 44px/1.3 P;position:relative">करार + power of attorney<div class="st" style="position:absolute;left:0;top:52%;height:7px;background:#d1301f;border-radius:4px;width:0"></div></div></div>`,
  {draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.width=(100*E.out(clamp((t-L(24.4))/.3)))+'%'}});
A({t0:L(24.4),t1:S.s4,x:760,y:1010,w:400,cls:'chipw',html:`<span class="pill p-red" style="font:900 60px/1 P;padding:22px 46px 16px">रद्द</span>`,enter:'stamp',din:.25,sfx:'stamp',sfxv:.8,z:60,float:0});
shake(L(24.4)+.05,8);

// ===== S4 STEP 2 HIGH COURT 25.15-32.35 =====
CUT('S4_court_corridor.jpg',S.s4,28.0,{s:1.04,ds:.1,cut:false});
CUT('S4_court_corridor.jpg',28.0,30.3,{s:1.55,fx:540,fy:1230});
CUT('S4_court_corridor.jpg',30.3,S.s5,{s:1.35,fy:560});
HEAD(L(25.25),S.s5,'दुसरी पायरी · High Court');
PILL(L(26.7),S.s5,540,560,'ऑक्टोबर 2026 चा आदेश','p-ivory',{st:'font:700 36px/1 P',float:0});
LINE(L(28.3),S.s5,770,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 44px/1.3 P">थकलेलं <span class="gold">सगळं भाडं</span> द्या</div></div>`);
LINE(L(30.4),S.s5,970,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 44px/1.3 P">society <span class="gold">नवा builder</span><br>नेमू शकते</div></div>`);
[28.3,30.4].forEach(k=>sfx(L(k),'pop',.5));punch(L(30.9),.05);

// ===== S5 WHERE TO GO 32.35-40.25 =====
CUT('S5_arbitration_table.jpg',S.s5,35.3,{s:1.05,cut:false});
CUT('S5_arbitration_table.jpg',35.3,37.6,{s:1.5,fx:560,fy:860});
CUT('S5_arbitration_table.jpg',37.6,S.s6,{s:1.4,fx:700,fy:1180});
HEAD(L(32.45),S.s6,'पण लक्षात ठेवा');
GL(L(33.3),S.s6,540,830,900,`<div class="lab" style="margin-bottom:14px">जुन्या सभासदांची भाड्याची तक्रार</div>
 <div style="display:flex;align-items:stretch">
  <div style="flex:1;text-align:center"><div style="font:800 46px/1.2 P">MahaRERA</div><div class="x1" style="width:120px;height:120px;margin:14px auto;opacity:0">${IC.cross}</div><div class="b1" style="font:700 30px P;color:#8a7560;opacity:0">बहुतेक वेळा नाही</div></div>
  <div style="width:3px;background:rgba(172,153,129,.5);margin:0 10px"></div>
  <div style="flex:1;text-align:center"><div style="font:800 46px/1.2 P">लवाद + कोर्ट</div><div class="x2" style="width:120px;height:120px;margin:14px auto;opacity:0">${IC.check}</div><div class="b2" style="font:700 30px P;color:#8a7560;opacity:0">करारातला मार्ग</div></div>
 </div>`,{pad:'26px 30px',float:0,
  draw:(t,lt,oo)=>{const q=(c,k)=>{const e=oo.el.querySelector(c);const p=clamp((t-L(k))/.3);e.style.opacity=p;e.style.transform=`scale(${p>0?E.back2(p):0})`};
   q('.x1',36.8);q('.x2',39.0);oo.el.querySelector('.b1').style.opacity=t>=L(35.4)?1:0;oo.el.querySelector('.b2').style.opacity=t>=L(38.2)?1:0}});
sfx(L(36.8),'thud',.6);sfx(L(39.0),'pop',.6);punch(L(36.8),.04);

// ===== S6 STEP 3 GOREGAON 40.25-48.05 =====
CUT('S6_calendar_weeks.jpg',S.s6,42.6,{s:1.04,cut:false});
CUT('S6_calendar_weeks.jpg',42.6,44.9,{s:1.45,fx:720,fy:820});
CUT('S6_calendar_weeks.jpg',44.9,46.4,{s:1.5,fx:330,fy:480});
CUT('S6_calendar_weeks.jpg',46.4,S.s7,{s:1.7,fx:650,fy:1520});
HEAD(L(40.35),S.s7,'तिसरी पायरी · करार करतानाच');
PILL(L(42.3),S.s7,540,570,'गोरेगावच्या society चा करार','p-ivory',{st:'font:700 36px/1 P',float:0});
GL(L(44.6),S.s7,540,860,860,`<div class="lab">उशिराच्या प्रत्येक आठवड्याला</div><div class="n gold" style="font:900 130px/1.1 P;visibility:hidden">₹10 लाख</div><div class="d" style="font:800 46px/1.2 P;opacity:0">दंड</div>`,{pad:'26px 34px',float:0,
  draw:(t,lt,oo)=>{const n=oo.el.querySelector('.n');n.style.visibility=t>=L(46.5)?'visible':'hidden';const p=clamp((t-L(46.5))/.35);n.style.transform=`scale(${t>=L(46.5)?lerp(1.6,1,E.out(p)):1})`;oo.el.querySelector('.d').style.opacity=t>=L(47.3)?1:0}});
sfx(L(46.5),'impact',.6);punch(L(46.5),.07);

// ===== S7 RESULT 48.05-53.55 =====
CUT('S6_calendar_weeks.jpg',S.s7,50.7,{s:1.25,fx:480,fy:700,cut:false});
CUT('S6_calendar_weeks.jpg',50.7,S.s8,{s:1.85,fx:650,fy:1550});
HEAD(L(48.15),S.s8,'निकाल');
GL(L(48.1),S.s8,540,800,900,`<div style="font:800 48px/1.3 P">₹10 लाख × <span class="w gold" style="font-weight:900">0</span> आठवडे</div><div class="n gold" style="font:900 140px/1.08 P;visibility:hidden">₹0</div><div class="lab b" style="opacity:0">भरपाई</div>`,{pad:'28px 34px',float:0,enter:'zoom',din:.3,
  draw:(t,lt,oo)=>{oo.el.querySelector('.w').textContent=Math.round(62*E.out(clamp((t-L(48.1))/.6)));const n=oo.el.querySelector('.n');n.style.visibility=t>=L(49.9)?'visible':'hidden';
   n.textContent='₹'+(6.2*E.out(clamp((t-L(49.9))/1.0))).toFixed(2)+' कोटी';oo.el.querySelector('.b').style.opacity=t>=L(51.6)?1:0}});
sfx(L(48.1),'ticks',.45);sfx(L(49.9),'ticks',.5);
A({t0:L(52.6),t1:S.s8,x:540,y:1150,w:900,cls:'chipw',html:`<span class="pill p-gold" style="font:900 62px/1 P;padding:26px 52px 20px">कोर्टाने कायम ✓</span>`,enter:'stamp',din:.28,sfx:'stamp',sfxv:.85,z:60,float:0});
shake(L(52.6)+.05,8);

// ===== S8 NEW RULE 53.55-59.95 =====
CUT('S7_bank_guarantee.jpg',S.s8,56.0,{s:1.04,cut:false});
CUT('S7_bank_guarantee.jpg',56.0,58.3,{s:1.6,fx:600,fy:1180});
CUT('S7_bank_guarantee.jpg',58.3,S.s9,{s:1.3,fx:700,fy:600});
HEAD(L(53.65),S.s9,'नवा नियम · GR 30 सप्टें 2026');
LINE(L(54.3),S.s9,640,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 46px/1.3 P">बँक गॅरंटी</div></div>`);
LINE(L(55.6),S.s9,830,`<div style="display:flex;align-items:center;gap:22px">${TICK}<div style="font:800 44px/1.3 P">दर महिन्याला <span class="gold">वेळेवर भाडं</span></div></div>`);
[54.3,55.6].forEach(k=>sfx(L(k),'pop',.5));
PILL(L(58.7),S.s9,540,1040,'करारात लिहून घ्या ✍️','p-gold',{st:'font:900 54px/1 P;padding:26px 50px 20px',float:0});punch(L(58.7),.05);

// ===== S9 COMMENT 59.95-65.45 =====
CUT('S8_society_compound.jpg',S.s9,62.6,{s:1.04,cut:false});
CUT('S8_society_compound.jpg',62.6,S.s10,{s:1.5,fx:580,fy:1080});
GL(L(60.0),S.s10,540,560,940,`<div style="font:800 54px/1.35 P">तुमचा redevelopment<br><span class="gold">किती वर्षं रखडलाय?</span></div>`,{pad:'30px 36px',float:0,enter:'zoom',din:.32});
COMMENT_BOX(L(62.6),S.s10-.05,L(62.9),63.75,'6 वर्षं',{y:1300,typeDur:.35});
PILL(L(63.4),S.s10,540,800,'📤 society च्या group वर पाठवा','p-gold',{st:'font:800 38px/1 P',float:0});

// ===== S10 OUTRO 65.45-END =====
TXT(L(65.7),END+1,540,470,`<div style="font:800 60px/1.3 P;color:${INK}">अशाच <span class="gold">माहितीसाठी</span></div>`,{enter:'down',din:.35,float:0});
A({t0:S.s10,t1:END+1,x:540,y:900,w:780,cls:'gl w',html:`<div style="padding:44px 56px 38px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.45,sfx:'whoosh',sfxv:.5,z:50,float:0});
FOLLOW_FLIP(L(65.9),END+1,66.7,{y:1330,col:'#937b5c'});
}
