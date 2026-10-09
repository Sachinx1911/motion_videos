// SRS Dwell - TDR 60 सेकंदात (Metaphor + 3D isometric + infographic). Times = cue_words.json
function WORDS(t0,t1,x,y,w,words,o={}){
  const html=`<div style="text-align:${o.align||'center'};${o.st||''}">`+words.map(([s,tt,c])=>`<span class="wd ${c||''}" data-t="${tt}">${s}</span>`).join(' ')+`</div>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'fade',din:.01,float:.08,z:50,sfx:null,
    draw:(t,lt,oo)=>{oo.el.querySelectorAll('.wd').forEach(el=>{const p=E.out(clamp((t-(+el.dataset.t))/.3));el.style.opacity=p;el.style.filter=`blur(${(1-p)*8}px)`;el.style.transform=`translateY(${(1-p)*12}px)`})}},o));
}
const PANEL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border:1.5px solid rgba(0,0,0,.08);border-radius:30px;box-shadow:0 24px 60px rgba(0,0,0,.18);padding:${o.pad||'26px 30px'};text-align:center">${inner}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.12},o));
const LBL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'chipw',html:`<span style="display:inline-block;font:800 ${o.fs||34}px/1 P;padding:16px 26px 12px;border-radius:999px;background:${o.bg||'#fff'};color:${o.col||'#151515'};box-shadow:0 10px 26px rgba(0,0,0,.28);white-space:nowrap">${txt}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:65,float:.15},o));
const STAMP=(t0,t1,x,y,txt,col='#b8935f',o={})=>A(Object.assign({t0,t1,x,y,w:o.w||760,cls:'chipw',html:`<div style="display:inline-block;border:9px solid ${col};color:${col};border-radius:22px;padding:16px 36px 10px;font:900 ${o.fs||84}px/1.1 P;letter-spacing:3px;background:rgba(255,253,249,.85);transform:rotate(${o.rot||-5}deg)">${txt}</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:70,float:0},o));
const GOLD='#b8935f';
// certificate hero (travels through the reel)
const CERT=(t0,t1,o={})=>A(Object.assign({t0,t1,x:540,y:960,w:420,img:'O02_certificate.png',enter:'fade',din:.3,z:55,float:.3,shine:o.shine||[]},o));

function buildScenes(){
const END=71.5;
const SEC=[0,5.3,10.2,11.7,18.2,24.4,29.4,32.9,38.1,42.9,47.1,50.2,63.6,67.3,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.4,'#fffaf0');sfx(t-.15,'whoosh',.6);punch(t,.03)};
[5.3,11.7,18.2,24.4,29.4,32.9,35.1,38.1,42.9,47.1,50.2,63.6,67.3].forEach(CUT);
for(const [t,a] of [[3.88,.05],[7.38,.05],[10.88,.07],[21.0,.03],[27.14,.04],[34.5,.05],[37.5,.06],[41.45,.06],[46.12,.04],[49.6,.05],[52.66,.04],[58.88,.04],[65.36,.04],[70.4,.04]])punch(t,a);

// ---------- HUD ----------
A({t0:0,t1:67.3,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:0.5,t1:67.3,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* UDCPR-2020 नियम 11.2 - मुंबई (MCGM) सोडून</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1-2 HOOK 0-5.3 : plot + road =================
BG({img:'B01_plot_topdown.jpg',t0:0,t1:5.35,s0:1.0,s1:1.14,y0:0,y1:-40,fade:.2});
TINT(0,5.3,'linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,0) 35%,rgba(0,0,0,0) 65%,rgba(0,0,0,.3))',.2);
// red dashed road strip over the empty plot (plot roughly x 440-690, y 800-1200 in 1080 frame)
A({t0:0.3,t1:5.3,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><rect class="rd" x="300" y="850" width="0" height="300" fill="rgba(214,52,42,.28)" stroke="#d6342a" stroke-width="6" stroke-dasharray="26 16"/><text class="rt" x="540" y="1015" text-anchor="middle" font-family="P" font-weight="900" font-size="54" fill="#d6342a" opacity="0">भावी रस्ता</text></svg>`,enter:'fade',din:.1,float:0,z:40,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-1.24)/.8));const r=oo.el.querySelector('.rd');r.setAttribute('width',480*p);r.setAttribute('x',540-240*p);r.style.strokeDashoffset=-t*40;oo.el.querySelector('.rt').setAttribute('opacity',clamp((t-1.9)/.3))}});
PANEL(0.05,2.6,540,520,760,`<div style="font:800 50px/1.25 P">तुमची जमीन <span style="color:#d6342a">रस्त्यासाठी</span> गेली?</div>`,{enter:'down'});
PANEL(2.64,5.3,540,520,760,`<div style="font:800 46px/1.2 P">मोबदला</div><div class="cnt" style="font:900 140px/1 P;color:#d6342a">₹0</div>`,{enter:'stamp',din:.3,sfx:'impact',sfxv:.6,draw:(t,lt,oo)=>{oo.el.querySelector('.cnt').style.transform=`scale(${1+.08*Math.max(0,Math.sin((t-3.88)*12))*(t>3.88&&t<4.3?1:0)})`}});
shake(3.9,10);
PANEL(4.5,5.3,540,1400,640,`<div style="font:800 44px/1.2 P">थांबू नका!</div>`,{enter:'pop',din:.3});

// ================= 3-4 METAPHOR 5.3-11.7 : plot -> certificate, TDR stamp =================
TINT(5.3,11.7,'radial-gradient(ellipse 80% 60% at 50% 45%,#fbf7f0,#e9e1d4)',.2);
// plot tile shrinks and flips into certificate
A({t0:5.3,t1:7.6,x:540,y:960,w:520,cls:'noshadow',html:`<img src="a/B01_plot_topdown.jpg" style="width:100%;border-radius:26px;filter:none;box-shadow:0 30px 70px rgba(0,0,0,.25)">`,enter:'zoom',din:.3,z:50,float:0,
  fn:t=>({s:lerp(1,.35,E.inout(clamp((t-6.4)/.9))),ry:lerp(0,90,E.inout(clamp((t-6.9)/.6))),o:1-clamp((t-7.3)/.2)})});
CERT(7.3,11.7,{enter:'fade',din:.2,shine:[8.6,10.9],fn:(t,lt)=>({ry:lerp(-90,0,E.out(clamp(lt/.6)))+Math.sin(t*.8)*5,s:lerp(.4,1,E.back(clamp(lt/.9)))}),sfx:'reveal',sfxv:.6});
PART({type:'sparks',t0:7.4,t1:7.7,n:70,seed:3,x:540,y:960,speed:800,color:GOLD});
PANEL(5.38,7.3,540,500,760,`<div style="font:800 46px/1.3 P">त्या बदल्यात मिळतात</div>`,{enter:'down'});
PANEL(7.38,10.2,500,500,760,`<div style="font:800 40px/1.2 P;color:#6b6b6b">जमिनीच्या</div><div style="font:900 120px/1 P"><span style="color:${GOLD}">3 पट</span> <span style="font-size:52px">पर्यंत</span></div><div style="font:800 40px/1.3 P">बांधकामाचे हक्क</div>`,{enter:'down',pad:'22px 28px'});
STAMP(10.88,11.7,540,1500,'TDR',GOLD,{fs:120,rot:-6});
PART({type:'sparks',t0:10.95,t1:11.2,n:60,seed:5,x:540,y:1500,speed:700,color:GOLD});

// ================= 5 MEANING 11.7-18.2 =================
TINT(11.7,18.2,'radial-gradient(ellipse 80% 60% at 50% 45%,#fbf7f0,#e9e1d4)',.2);
CERT(11.7,18.2,{x:800,y:1250,w:300,enter:'fade',din:.3,float:.3,fn:t=>({ry:Math.sin(t*.8)*8})});
[['T','Transferable',12.66,'विकता येणारे'],['D','Development',13.48,'विकास /'],['R','Rights',13.9,'बांधकामाचे हक्क']].forEach(([l,w,t0,mr],i)=>{
  const y=560+i*230;
  A({t0:11.75+i*.07,t1:18.2,x:230,y,w:190,cls:'noshadow',html:`<div style="width:170px;height:170px;border-radius:34px;background:#0d1729;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px rgba(0,0,0,.25)"><span style="font:900 120px/1 P;color:#e8cf9f">${l}</span></div>`,enter:'pop',din:.4,sfx:i?null:'whoosh',z:40,float:.2,fn:t=>({s:t>t0&&t<t0+.35?1+.15*Math.sin((t-t0)/.35*Math.PI):1})});
  A({t0,t1:18.2,x:640,y,w:600,cls:'noshadow',html:`<div style="text-align:left"><div style="font:800 58px/1.1 P;color:#151515">${w}</div><div style="font:800 38px/1.3 P;color:${GOLD}">${mr}</div></div>`,enter:'fade',din:.35,sfx:'swoosh',sfxv:.6,z:40,float:.15,fn:(t,lt)=>({dx:(1-E.out(clamp(lt/.4)))*60})});
});
PANEL(14.24,18.2,500,1480,760,`<div style="font:800 42px/1.35 P">बांधकामाचे हक्क, जे तुम्ही <span style="color:${GOLD}">दुसऱ्याला विकू</span> शकता</div>`,{pad:'20px 26px'});

// ================= 6 RESERVED LAND 18.2-24.4 =================
BG({img:'B03_block_reserved.jpg',t0:18.2,t1:24.45,s0:1.04,s1:1.16,fade:.25});
PANEL(18.25,24.4,540,470,760,`<div style="font:800 46px/1.3 P">शहराच्या आराखड्यात जमीन <span style="color:${GOLD}">राखीव</span> असेल तर</div>`,{enter:'down',pad:'20px 26px'});
LBL(20.14,24.4,520,1000,'रस्ता',{bg:'#0d1729',col:'#fff'});
LBL(20.82,24.4,760,800,'बाग',{bg:'#2a9d55',col:'#fff'});
LBL(21.46,24.4,330,1180,'शाळा',{bg:GOLD,col:'#111'});
PANEL(22.7,24.4,500,1430,740,`<div style="font:800 42px/1.3 P">ती जमीन तुम्ही <span style="color:#0d1729">सरकारला</span> देता</div>`,{pad:'18px 24px'});

// ================= 7 CERTIFICATE INSTEAD OF MONEY 24.4-29.4 =================
BG({img:'B04_officer.jpg',t0:24.4,t1:29.45,s0:1.02,s1:1.12,x0:0,x1:-30,fade:.25});
A({t0:24.66,t1:29.4,x:500,y:560,w:760,cls:'noshadow',html:`<div style="perspective:1400px"><div class="fl" style="background:rgba(255,253,249,.94);border-radius:30px;padding:24px 30px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.2);transform-style:preserve-3d"><div class="f1" style="font:900 90px/1 P;color:#9a958c"><span style="text-decoration:line-through">₹ पैसे</span></div><div class="f2" style="font:900 60px/1.15 P;color:${GOLD};display:none">प्रमाणपत्र ✓<div style="font:700 26px/1.3 P;color:#151515">Development Rights Certificate</div></div></div></div>`,enter:'down',din:.4,sfx:'whoosh',z:60,float:.1,
  draw:(t,lt,oo)=>{const p=E.inout(clamp((t-26.3)/.6));const fl=oo.el.querySelector('.fl');fl.style.transform=`rotateX(${p*180}deg)`;const b=p>.5;oo.el.querySelector('.f1').style.display=b?'none':'block';const f2=oo.el.querySelector('.f2');f2.style.display=b?'block':'none';f2.style.transform='rotateX(180deg)'}});
sfx(26.3,'swoosh',.6);sfx(26.6,'ding',.6);

// ================= 8 RULE 29.4-32.9 =================
BG({img:'B05_rulebook.jpg',t0:29.4,t1:32.95,s0:1.05,s1:1.15,fade:.25});
PANEL(29.5,32.9,500,520,720,`<div style="font:700 40px/1.2 P;color:#6b6b6b">आणि किती?</div><div style="font:900 96px/1.05 P;color:#151515">UDCPR <span style="color:${GOLD}">11.2</span></div><div class="hl" style="height:10px;width:0;margin:8px auto 0;border-radius:5px;background:#f7e463;box-shadow:0 0 18px #f7e463"></div>`,{enter:'zoom',din:.4,sfx:'impact',sfxv:.5,draw:(t,lt,oo)=>{oo.el.querySelector('.hl').style.width=(E.out(clamp((t-31.2)/.6))*70)+'%'}});
sfx(31.2,'pen',.4);

// ================= 9-10 2x / 3x 32.9-38.1 =================
BG({img:'B06_suburb_b.jpg',t0:32.9,t1:35.15,s0:1.05,s1:1.12,fade:.2});
PANEL(32.95,35.1,500,470,700,`<div style="font:800 42px/1.2 P">साधा भाग</div>`,{enter:'down',pad:'16px 24px'});
A({t0:33.9,t1:35.1,x:500,y:1300,w:700,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:26px;background:rgba(255,253,249,.94);border-radius:30px;padding:22px 40px;box-shadow:0 24px 60px rgba(0,0,0,.2)"><div class="b1" style="width:110px;height:110px;border-radius:18px;background:${GOLD}"></div><div style="font:900 70px/1 P">→</div><div class="b2" style="display:flex;gap:10px"><div style="width:110px;height:110px;border-radius:18px;background:${GOLD}"></div><div class="x" style="width:110px;height:110px;border-radius:18px;background:${GOLD};opacity:0"></div></div><div style="font:900 110px/1 P;color:#151515">2×</div></div>`,enter:'pop',din:.4,sfx:'pop',z:60,float:0,draw:(t,lt,oo)=>{oo.el.querySelector('.x').style.opacity=clamp((t-34.5)/.3)}});
sfx(34.5,'thud',.5);
BG({img:'B07_oldcity_a.jpg',t0:35.1,t1:38.15,s0:1.05,s1:1.14,fade:.2});
PANEL(35.15,38.1,500,470,760,`<div style="font:800 42px/1.2 P">जुना गर्दीचा शहर भाग</div>`,{enter:'down',pad:'16px 24px'});
A({t0:36.2,t1:38.1,x:500,y:1300,w:760,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:22px;background:rgba(255,253,249,.94);border-radius:30px;padding:22px 34px;box-shadow:0 24px 60px rgba(0,0,0,.2)"><div style="width:90px;height:90px;border-radius:16px;background:${GOLD}"></div><div style="font:900 60px/1 P">→</div><div style="display:flex;gap:8px">${[0,1,2].map(i=>`<div class="x${i}" style="width:90px;height:90px;border-radius:16px;background:${GOLD};opacity:${i?0:1}"></div>`).join('')}</div><div style="font:900 110px/1 P;color:#d6342a">3×</div></div>`,enter:'pop',din:.4,sfx:'pop',z:60,float:0,draw:(t,lt,oo)=>{oo.el.querySelector('.x1').style.opacity=clamp((t-37.1)/.25);oo.el.querySelector('.x2').style.opacity=clamp((t-37.5)/.25)}});
sfx(37.1,'thud',.5);sfx(37.5,'thud',.6);flash(37.5,.3,'#fff');

// ================= 11 COUNTER 38.1-42.9 =================
TINT(38.1,42.9,'radial-gradient(ellipse 80% 60% at 50% 45%,#fbf7f0,#e9e1d4)',.2);
A({t0:38.14,t1:42.9,x:540,y:800,w:900,cls:'noshadow',html:`<div style="text-align:center"><div style="font:800 40px/1.2 P;color:#6b6b6b">जमीन दिली</div><div class="c1" style="font:900 150px/1 P;color:#151515">100</div><div style="font:800 40px/1.2 P;color:#6b6b6b">चौरस मीटर</div></div>`,enter:'zoom',din:.4,sfx:'ticks',sfxv:.5,z:50,float:.1,
  draw:(t,lt,oo)=>{oo.el.querySelector('.c1').textContent=Math.round(100*E.out(clamp((t-38.38)/.6)))}});
A({t0:40.5,t1:42.9,x:540,y:1180,w:900,cls:'noshadow',html:`<div style="text-align:center"><div style="font:900 70px/1 P;color:${GOLD}">↓</div><div class="c2" style="font:900 200px/1 P;color:${GOLD};text-shadow:0 0 40px rgba(184,147,95,.6)">0</div><div style="font:800 44px/1.2 P;color:#151515">चौरस मीटर बांधकामाचे हक्क</div></div>`,enter:'fade',din:.2,sfx:'riser',sfxv:.4,z:50,float:.1,
  draw:(t,lt,oo)=>{oo.el.querySelector('.c2').textContent=Math.round(300*E.out(clamp((t-40.54)/.9)))}});
PART({type:'sparks',t0:41.45,t1:41.75,n:80,seed:9,x:540,y:1180,speed:900,color:GOLD});sfx(41.45,'ding',.7);

// ================= 12 SELL 42.9-47.1 =================
BG({img:'B08_handshake.jpg',t0:42.9,t1:47.15,s0:1.02,s1:1.12,fade:.25});
PANEL(42.96,47.1,540,470,760,`<div style="font:800 46px/1.3 P">हे हक्क</div>`,{enter:'down',pad:'16px 24px'});
LBL(44.26,47.1,330,650,'स्वतः वापरा',{bg:'#0d1729',col:'#fff',w:400});
LBL(46.12,47.1,750,650,'बिल्डरला विका',{bg:GOLD,col:'#111',w:420});
CERT(45.5,47.1,{x:540,y:1250,w:260,enter:'rise',din:.5,float:.3,shine:[46.3],fn:(t,lt)=>({dx:lerp(0,160,E.inout(clamp((t-46.12)/.7))),ry:Math.sin(t)*8})});

// ================= 13 FLOORS 47.1-50.2 =================
BG({img:'B09_construction.jpg',t0:47.1,t1:50.25,s0:1.0,s1:1.1,y0:40,y1:-40,fade:.25});
PANEL(47.15,50.2,500,470,760,`<div style="font:800 44px/1.3 P">बिल्डर इमारतीवर <span style="color:${GOLD}">जास्त मजले</span> बांधतो</div>`,{enter:'down',pad:'18px 24px'});
// gold floors stacking on the grey frame (frame top roughly x 390-790, y 450-900)
A({t0:48.6,t1:50.2,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920">${[0,1,2,3].map(i=>`<rect class="g${i}" x="395" y="${860-i*78}" width="300" height="68" rx="6" fill="${GOLD}" opacity="0" style="filter:drop-shadow(0 0 14px #e8cf9f)"/>`).join('')}</svg>`,enter:'fade',din:.1,float:0,z:45,
  draw:(t,lt,oo)=>{[0,1,2,3].forEach(i=>{const p=clamp((t-48.7-i*.25)/.25);const g=oo.el.querySelector('.g'+i);g.setAttribute('opacity',p*.85);g.setAttribute('transform',`translate(0,${(1-E.out(p))*-40})`)})}});
[48.7,48.95,49.2,49.45].forEach(t=>sfx(t,'thud',.45));
LBL(49.6,50.2,760,1150,'+ मजले',{bg:GOLD,col:'#111',w:300});

// ================= 14 CONDITIONS 50.2-63.6 =================
BG({img:'B10_agreement.jpg',t0:50.2,t1:63.65,s0:1.0,s1:1.1,fade:.25});
TINT(50.2,63.6,'linear-gradient(180deg,rgba(255,253,249,.55),rgba(255,253,249,0) 45%)',.3);
PANEL(50.3,63.6,500,470,760,`<div style="font:800 46px/1.2 P">पण <span style="color:#d6342a">लक्षात ठेवा</span></div>`,{enter:'down',pad:'16px 24px'});
const COND=[[52.66,'⏱ प्रमाणपत्र <b style="color:#0d1729">90 दिवसांत</b> मिळायला हवं',660],[53.92,'📝 नोंदणीकृत करार + <b style="color:#0d1729">महापालिकेची नोंद</b>',820],[58.88,'✕ हिरवा पट्टा / शेती झोन / पूररेषा - <b style="color:#d6342a">TDR नाही</b>',980]];
COND.forEach(([t0,s,y])=>PANEL(t0,63.6,500,y,760,`<div style="font:700 36px/1.35 P;text-align:left">${s}</div>`,{enter:'left',din:.4,pad:'18px 26px',sfx:'pop',sfxv:.5}));

// ================= 15 SAVE 63.6-67.3 =================
TINT(63.6,67.3,'linear-gradient(180deg,#faf7f2,#efe8dc)',.15);
WORDS(63.7,67.3,540,560,860,[['जमीन',64.16,''],['आराखड्यात',64.44,''],['राखीव',64.94,'gd'],['आहे?',65.36,'']],{st:'font:800 62px/1.3 P;color:#151515'});
{const IC2={save:`<svg viewBox="0 0 24 24" width="66"><path d="M6 3 H18 V21 L12 16 L6 21 Z" fill="#fff"/></svg>`,share:`<svg viewBox="0 0 24 24" width="70"><path d="M3 11 L21 3 L14 21 L11 13 Z" fill="#fff"/></svg>`};
 [['save','SAVE',65.6,380],['share','SHARE',66.5,700]].forEach(([k,s,t0,x])=>A({t0,t1:67.3,x,y:1000,w:220,cls:'chipw',html:`<div style="width:160px;height:160px;border-radius:50%;background:#151515;margin:0 auto;display:flex;align-items:center;justify-content:center">${IC2[k]}</div><div style="font:800 34px P;margin-top:14px;color:#151515">${s}</div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:55,float:.3}));}

// ================= 16 OUTRO 67.3-END =================
TINT(67.3,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(67.38,END+1,540,560,860,[['अशाच',67.38,''],['real',67.92,'ser gd'],['estate',68.2,'ser gd'],['माहितीसाठी',68.46,'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:67.7,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[68.7,70.9]});
A({t0:69.12,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>70.35&&t<70.55?.93:1)})});
A({t0:69.7,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>70.35&&t<70.55?.85:1})});
sfx(70.4,'click',.9);PART({type:'confetti',t0:70.45,t1:70.8,n:100,seed:41,x:540,y:-40,burst:1,life:3,colors:[GOLD,'#ffffff','#f2dfb6','#d6342a']});
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
