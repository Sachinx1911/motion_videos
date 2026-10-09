// SRS Dwell - Carpet / Built-up / Super built-up - v3 (photo storyboard, user-approved 18 scenes)
function WORDS(t0,t1,x,y,w,words,o={}){
  const html=`<div style="text-align:${o.align||'center'};${o.st||''}">`+words.map(([s,tt,c])=>`<span class="wd ${c||''}" data-t="${tt}">${s}</span>`).join(' ')+`</div>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'fade',din:.01,float:.08,z:50,sfx:null,
    draw:(t,lt,oo)=>{oo.el.querySelectorAll('.wd').forEach(el=>{const p=E.out(clamp((t-(+el.dataset.t))/.3));el.style.opacity=p;el.style.filter=`blur(${(1-p)*8}px)`;el.style.transform=`translateY(${(1-p)*12}px)`})}},o));
}
// white text panel for readability on photos
const PANEL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border:1.5px solid rgba(0,0,0,.08);border-radius:30px;box-shadow:0 24px 60px rgba(0,0,0,.18);padding:${o.pad||'26px 30px'};text-align:center">${inner}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.12},o));
const LBL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:420,cls:'chipw',html:`<span style="display:inline-block;font:800 34px/1 P;padding:16px 26px 12px;border-radius:999px;background:${o.bg||'#fff'};color:${o.col||'#151515'};box-shadow:0 10px 26px rgba(0,0,0,.28)">${txt}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:65,float:.15},o));
const sq=v=>`${v}<span style="font:800 .36em P"> SQ.FT</span>`;

function buildScenes(){
const END=76.6;
const SEC=[0,6.5,12.9,29.6,41.3,46.9,50.7,54.3,63.6,69.05,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
// soft professional cut: warm light flash + whoosh
const CUT=t=>{flash(t,.45,'#fffaf0');sfx(t-.15,'whoosh',.6);punch(t,.03)};
[6.5,12.9,22.96,25.0,37.4,41.3,46.9,49.1,50.7,54.3,63.6,67.3,69.05,72.0].forEach(CUT);
for(const [t,a] of [[3.88,.06],[5.48,.04],[9.48,.03],[10.42,.03],[11.7,.03],[18.6,.03],[21.72,.04],[27.42,.03],[36.58,.04],[40.06,.04],[50.72,.05],[53.3,.06],[56.59,.04],[58.75,.04],[66.61,.05],[75.13,.04]])punch(t,a);

// ---------- HUD ----------
A({t0:0,t1:72.0,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:12.9,t1:63.6,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 22px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px">* उदाहरणासाठी आकडे - project नुसार बदलतात</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1-2 HOOK 0-6.5 =================
BG({img:'B00_living_room.jpg',t0:0,t1:6.55,s0:1.02,s1:1.16,y0:0,y1:30,fade:.2});
TINT(0,6.5,'linear-gradient(180deg,rgba(0,0,0,.15),rgba(0,0,0,0) 40%,rgba(0,0,0,.35))',.2);
PANEL(0.1,3.6,540,560,760,`<div style="font:700 42px/1.2 P;color:#6b6b6b">flat घेतला...</div><div class="cnt" style="font:900 150px/1 P;color:#151515;margin-top:6px"></div>`,{exit:'fade',dout:.2,
  draw:(t,lt,oo)=>{oo.el.querySelector('.cnt').innerHTML=sq(Math.round(1000*E.out(clamp(lt/.9))))}});
sfx(0.1,'ticks',.5);
PANEL(3.62,6.5,540,560,760,`<div style="font:900 70px/1 P;color:#9a958c;text-decoration:line-through">1000</div><div style="font:800 34px P;color:#151515;margin:8px 0">↓ प्रत्यक्ष घरात</div><div class="cnt" style="font:900 160px/1 P;color:#d6342a"></div>`,{enter:'stamp',din:.3,sfx:'impact',sfxv:.6,
  draw:(t,lt,oo)=>{oo.el.querySelector('.cnt').innerHTML=sq(Math.round(lerp(1000,700,E.out(clamp((t-3.7)/.5)))))}});
shake(3.9,10);
PANEL(4.9,6.5,540,1250,720,`<div style="font:800 46px/1.2 P">उरलेले <span style="color:#d6342a;font-size:64px">300 SQ.FT</span><br><span class="ser" style="font-size:58px">कुठे गेले?</span></div>`,{enter:'up',din:.35,sfx:'swoosh'});

// ================= 3 THREE WORDS 6.5-12.9 =================
WORDS(6.56,12.9,540,470,860,[['हे',6.56,''],['समजण्यासाठी',6.78,''],['तीन',7.6,'acc'],['शब्द',7.98,'']],{st:'font:900 64px/1.2 P'});
const ICO={
 c:`<svg viewBox="0 0 60 60" width="80"><rect x="6" y="6" width="48" height="48" fill="none" stroke="#151515" stroke-width="4"/><path d="M6 30 H34 V6 M34 30 V54" stroke="#151515" stroke-width="4" fill="none"/></svg>`,
 b:`<svg viewBox="0 0 60 60" width="80"><path d="M30 6 L54 18 V44 L30 56 L6 44 V18 Z M6 18 L30 30 L54 18 M30 30 V56" fill="none" stroke="#151515" stroke-width="4" stroke-linejoin="round"/></svg>`,
 s:`<svg viewBox="0 0 60 60" width="80"><g fill="none" stroke="#151515" stroke-width="4"><rect x="8" y="22" width="18" height="34"/><rect x="30" y="6" width="22" height="50"/></g><g fill="#151515"><rect x="13" y="28" width="8" height="5"/><rect x="13" y="38" width="8" height="5"/><rect x="36" y="14" width="10" height="5"/><rect x="36" y="24" width="10" height="5"/><rect x="36" y="34" width="10" height="5"/></g></svg>`};
[['c','CARPET AREA',9.48,700,'#f3e6cf'],['b','BUILT-UP AREA',10.42,920,'#d9e8f7'],['s','SUPER BUILT-UP AREA',11.7,1140,'#e1ead9']].forEach(([k,s,t0,y,bg])=>
  A({t0,t1:12.9,x:500,y,w:720,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:30px;background:${bg};border-radius:26px;padding:24px 36px;box-shadow:0 18px 40px rgba(0,0,0,.12)">${ICO[k]}<div style="font:900 50px/1.1 P;color:#151515;text-align:left">${s}</div></div>`,enter:'left',din:.45,sfx:'whoosh',sfxv:.5,z:50,float:.15}));

// ================= 4-8 FLOOR PLAN 12.9-37.4 (cutaway 22.96-25.0) =================
const IW=`<svg viewBox="0 0 1116 2000" style="position:absolute;inset:0;width:100%;height:100%"><g class="iw" stroke="#2a9d55" stroke-width="16" stroke-linecap="round" fill="none" style="filter:drop-shadow(0 0 10px #2a9d55)"><path d="M618 805 L784 668"/><path d="M675 1048 L904 1197"/><path d="M355 1359 L624 1123"/></g></svg>`;
A({t0:12.9,t1:37.4,x:500,y:975,w:740,cls:'noshadow',enter:'zoom',din:.6,float:0,z:30,
  html:`<div style="position:relative"><img src="a/O04_floorplan3d.jpg" style="width:100%;display:block;filter:none;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 51%,#000 70%,transparent 100%)">
   ${['carpet','builtup','ring','bal'].map(n=>`<img class="ov-${n}" src="a/fp_${n}.png" style="position:absolute;inset:0;width:100%;opacity:0;filter:none">`).join('')}${IW}</div>`,
  draw:(t,lt,oo)=>{const q=s=>oo.el.querySelector(s);
    q('.ov-carpet').style.opacity=clamp((t-13.6)/.8)*(t>27.0&&t<29.6?.55:1);
    const redOn=(t>21.72&&t<29.6);q('.ov-ring').style.opacity=redOn?(t<22.96?.6+.4*Math.sin(t*10):1):0;
    q('.ov-bal').style.opacity=(t>23.64&&t<29.6)?1:0;
    q('.ov-builtup').style.opacity=clamp((t-32.64)/.6);
    q('.iw').style.opacity=t>27.02&&t<29.6?(.6+.4*Math.sin(t*8)):0},
  fn:t=>({s:1+.05*E.inout(clamp((t-12.9)/24)),o:(t>22.9&&t<25.05)?0:1})});
// 4 carpet
PANEL(12.95,22.9,500,490,720,`<span style="font:800 46px P;color:#b8935f">1.</span> <span class="ser" style="font-size:66px;color:#151515">Carpet Area</span>`,{pad:'16px 30px',enter:'down'});
PANEL(14.5,21.7,500,1400,740,`<div style="font:800 44px/1.3 P">घरात तुम्ही <span style="color:#2f6fd6">खरोखर वापरू</span> शकता ती जागा</div>`,{pad:'22px 26px'});
LBL(17.22,21.7,330,1250,'UDCPR व्याख्या 25',{bg:'#151515',col:'#fff'});LBL(19.5,21.7,680,1250,'RERA',{bg:'#b8935f',col:'#111'});
// 6 excluded
PANEL(21.72,22.96,500,1400,740,`<div style="font:800 44px/1.3 P;color:#d6342a">✕ बाहेरच्या भिंती</div>`,{pad:'20px 26px',sfx:'buzz',sfxv:.4});
BG({img:'O06_wall_cutaway.jpg',t0:22.96,t1:25.0,s0:1.0,s1:1.08,fade:.2});
LBL(22.96,25.0,300,820,'✕ Duct',{bg:'#d6342a',col:'#fff'});
LBL(23.0,25.0,330,1180,'✕ बाहेरची भिंत',{bg:'#d6342a',col:'#fff'});
LBL(23.64,25.0,660,1330,'✕ Balcony',{bg:'#d6342a',col:'#fff'});
LBL(24.3,25.0,660,1440,'✕ Terrace',{bg:'#d6342a',col:'#fff'});
PANEL(25.0,27.0,500,1400,740,`<div style="font:800 42px/1.3 P">✕ भिंती ✕ Duct ✕ Balcony ✕ Terrace<br><span style="color:#d6342a">carpet मध्ये मोजले जात नाहीत</span></div>`,{pad:'20px 24px'});
PANEL(27.02,29.6,500,1400,740,`<div style="font:800 44px/1.3 P;color:#2a9d55">✓ आतल्या भिंती = carpet मध्येच</div>`,{pad:'20px 26px',sfx:'ding',sfxv:.6});
// 7-8 built-up
PANEL(29.62,37.4,500,490,720,`<span style="font:800 46px P;color:#b8935f">2.</span> <span class="ser" style="font-size:66px;color:#151515">Built-up Area</span>`,{pad:'16px 30px',enter:'down'});
PANEL(31.38,37.4,500,1390,760,`<div style="font:800 40px/1.4 P"><span style="color:#2f6fd6">Carpet</span> <span class="p1" style="opacity:0">+ बाहेरच्या भिंती</span> <span class="p2" style="opacity:0">+ Balcony</span></div><div class="cnt" style="font:900 74px/1.2 P;margin-top:6px"></div>`,{pad:'20px 24px',
  draw:(t,lt,oo)=>{const q=s=>oo.el.querySelector(s);q('.p1').style.opacity=clamp((t-32.64)/.3);q('.p2').style.opacity=clamp((t-34.56)/.3);
    const v=Math.round(lerp(700,820,E.out(clamp((t-36.58)/.7))));q('.cnt').innerHTML=t>36.5?`<span style="color:#2f6fd6">700</span> → ${sq(v)}`:''}});
// 9 +10-20%
BG({img:'B09_tape_wall.jpg',t0:37.4,t1:41.35,s0:1.02,s1:1.12,x0:0,x1:-30,fade:.2});
PANEL(37.45,41.3,500,1150,760,`<div style="font:800 40px/1.3 P">Built-up साधारण</div><div style="display:flex;height:70px;margin:18px 10px 10px;border-radius:14px;overflow:hidden"><div style="flex:70;background:#2f6fd6;color:#fff;font:800 30px/70px P">Carpet 700</div><div class="gr" style="flex:0;background:#7a7a7a;color:#fff;font:800 28px/70px P;white-space:nowrap;overflow:hidden">+भिंती</div></div><div style="font:900 80px/1.1 P;color:#b8935f" class="pc"></div>`,{pad:'24px 26px',
  draw:(t,lt,oo)=>{const p=E.out(clamp((t-39.26)/.8));oo.el.querySelector('.gr').style.flex=String(p*14);oo.el.querySelector('.pc').innerHTML=t>39.26?'+10 ते 20%':''}});
sfx(39.26,'riser',.3);sfx(40.06,'ding',.5);

// ================= 10 SUPER 41.3-46.9 =================
BG({img:'B10_society_dusk.jpg',t0:41.3,t1:46.95,s0:1.15,s1:1.0,y0:80,y1:0,fade:.2});
PANEL(41.52,46.9,500,490,780,`<span style="font:800 44px P;color:#b8935f">3.</span> <span class="ser" style="font-size:62px;color:#151515">Super Built-up Area</span>`,{pad:'16px 26px',enter:'down'});
PANEL(43.84,46.9,500,1380,740,`<div style="font:800 44px/1.3 P">घराबाहेरच्या <span style="color:#b8935f">सामायिक जागांचा</span> वाटा</div>`,{pad:'22px 26px'});
// 11 common areas
BG({img:'B03_lobby.jpg',t0:46.9,t1:49.15,s0:1.05,s1:1.14,fade:.2});
LBL(46.94,49.1,760,640,'जिना',{bg:'#0d1729',col:'#fff'});
LBL(47.72,49.1,260,960,'Lift',{bg:'#0d1729',col:'#fff'});
LBL(48.44,49.1,480,1340,'Lobby',{bg:'#0d1729',col:'#fff'});
BG({img:'B04_clubhouse.jpg',t0:49.1,t1:50.75,s0:1.05,s1:1.12,fade:.2});
LBL(49.16,50.7,500,880,'Clubhouse',{bg:'#0d1729',col:'#fff'});

// ================= 12 BLOCKS 50.7-54.3 =================
A({t0:50.2,t1:54.3,x:500,y:880,w:760,cls:'noshadow',html:`<img src="a/O12_blocks_text.jpg" style="width:100%;display:block;border-radius:30px;box-shadow:0 30px 70px rgba(0,0,0,.18);filter:none">`,enter:'zoom',din:.5,sfx:'thud',sfxd:.2,sfxv:.6,z:40,float:.15,
  fn:t=>({s:t>50.72&&t<51.1?1+.05*Math.sin((t-50.72)/.38*Math.PI):1})});
PANEL(52.48,54.3,500,1450,740,`<div style="font:900 70px/1.1 P"><span class="ser" style="color:#151515">1000</span> <span style="color:#9a958c">→</span> <span style="color:#d6342a">700!</span></div>`,{pad:'18px 26px',enter:'stamp',din:.3,sfx:'impact',sfxv:.6});

// ================= 13-14 RERA 54.3-63.6 =================
BG({img:'B13_rera_book.jpg',t0:54.3,t1:63.65,s0:1.02,s1:1.2,x0:0,x1:60,y0:0,y1:-80,fade:.2});
PANEL(54.3,63.6,500,470,760,`<div style="font:800 52px/1.25 P">पण आता <span style="color:#b8935f">कायदा</span> तुमच्या बाजूने</div>`,{pad:'22px 26px',enter:'down'});
A({t0:56.59,t1:63.6,x:500,y:820,w:520,cls:'noshadow',html:`<div style="background:#0d1729;color:#fff;border-radius:26px;padding:24px 30px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.35)"><div style="font:900 70px/1 P;color:#e8cf9f">RERA</div><div style="font:600 24px/1.3 P;margin-top:8px">Real Estate (Regulation and Development) Act, 2016</div></div>`,enter:'stamp',din:.35,sfx:'stamp',sfxv:.7,z:60,float:.1});
PANEL(58.53,63.6,500,1260,760,`<div style="font:800 46px/1.3 P">flat चा भाव = <span style="background:linear-gradient(transparent 55%,#ffe36b 55%)">Carpet area</span> वर</div>`,{pad:'22px 26px'});
PANEL(60.91,63.6,500,1420,740,`<div style="font:800 40px/1.3 P;color:#2a9d55">✓ करारात carpet area स्पष्ट</div><div style="font:500 22px/1.4 P;color:#7a756c;margin-top:6px">* RERA नोंदणीकृत projects साठी</div>`,{pad:'18px 24px',sfx:'ding',sfxv:.5});

// ================= 15 QUESTION 63.6-67.3 =================
BG({img:'B15_couple_agent.jpg',t0:63.6,t1:67.35,s0:1.04,s1:1.14,fade:.2});
PANEL(63.67,67.3,500,470,760,`<div style="font:800 44px/1.3 P">म्हणून flat घेताना <span style="color:#b8935f">एकच प्रश्न</span> विचारा</div>`,{pad:'20px 26px',enter:'down'});
A({t0:65.95,t1:67.3,x:520,y:760,w:620,cls:'noshadow',html:`<div style="position:relative;background:#ffd84d;border-radius:34px;padding:28px 34px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3)"><div style="font:900 64px/1.1 P;color:#151515">CARPET AREA<br>किती?</div><div style="position:absolute;left:90px;bottom:-34px;width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-top:40px solid #ffd84d"></div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.8,z:60,float:.2});

// ================= 16 CHECK 67.3-69.05 =================
BG({img:'B16_signing.jpg',t0:67.3,t1:69.1,s0:1.05,s1:1.15,fade:.2,filter:'blur(3px)'});
PANEL(67.33,69.05,500,470,740,`<div style="font:800 44px/1.3 P">करारात तोच आकडा <span style="color:#2a9d55">तपासा</span></div>`,{pad:'20px 26px',enter:'down'});
A({t0:68.29,t1:69.05,x:500,y:980,w:640,cls:'noshadow',html:`<div style="background:#fffdf9;border-radius:18px;padding:20px 28px;box-shadow:0 16px 40px rgba(0,0,0,.3);font:800 46px/1.2 P;text-align:center"><span style="background:linear-gradient(transparent 55%,#ffe36b 55%)">Carpet Area: 700 sq.ft</span> <span style="color:#2a9d55">✓</span></div>`,enter:'zoom',din:.35,sfx:'ding',sfxv:.6,z:60,float:0});

// ================= 17 SHARE 69.05-72.0 =================
TINT(69.05,72.0,'linear-gradient(180deg,#faf7f2,#efe8dc)',.15);
WORDS(69.09,72.0,540,560,860,[['हा',69.09,''],['video',69.49,'ser'],['flat',69.75,''],['घेणाऱ्या',70.17,''],['तुमच्या',70.51,''],['मित्रांना',70.81,'gd'],['नक्की',71.27,''],['पाठवा',71.71,'acc']],{st:'font:800 60px/1.3 P;color:#151515'});
{const IC2={share:`<svg viewBox="0 0 24 24" width="70"><path d="M3 11 L21 3 L14 21 L11 13 Z" fill="#fff"/></svg>`,save:`<svg viewBox="0 0 24 24" width="66"><path d="M6 3 H18 V21 L12 16 L6 21 Z" fill="#fff"/></svg>`,follow:`<svg viewBox="0 0 24 24" width="66"><circle cx="12" cy="8" r="4.5" fill="#fff"/><path d="M3 21 C3 15 21 15 21 21 Z" fill="#fff"/></svg>`};
 [['share','SHARE',69.49,260],['save','SAVE',70.17,500],['follow','FOLLOW',70.81,740]].forEach(([k,s,t0,x])=>A({t0,t1:72.0,x,y:1000,w:200,cls:'chipw',html:`<div style="width:150px;height:150px;border-radius:50%;background:#151515;margin:0 auto;display:flex;align-items:center;justify-content:center">${IC2[k]}</div><div style="font:800 34px P;margin-top:14px;color:#151515">${s}</div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:55,float:.3}));}

// ================= 18 OUTRO 72.0-END =================
TINT(72.0,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(72.07,END+1,540,560,860,[['अशाच',72.07,''],['real',72.57,'ser gd'],['estate',72.83,'ser gd'],['माहितीसाठी',73.09,'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:72.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[73.4,75.6]});
A({t0:73.71,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:#b8935f;color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>75.05&&t<75.25?.93:1)})});
A({t0:74.3,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>75.05&&t<75.25?.85:1})});
sfx(75.13,'click',.9);PART({type:'confetti',t0:75.2,t1:75.5,n:100,seed:41,x:540,y:-40,burst:1,life:3,colors:['#b8935f','#ffffff','#f2dfb6','#d6342a']});
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
