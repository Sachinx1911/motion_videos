// ---- shared helpers (from reel_cidco) ----
function WORDS(t0,t1,x,y,w,words,o={}){
  const html=`<div style="text-align:${o.align||'center'};${o.st||''}">`+words.map(([s,tt,c])=>`<span class="wd ${c||''}" data-t="${tt}">${s}</span>`).join(' ')+`</div>`;
  return A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'fade',din:.01,float:.08,z:50,sfx:null,
    draw:(t,lt,oo)=>{oo.el.querySelectorAll('.wd').forEach(el=>{const p=E.out(clamp((t-(+el.dataset.t))/.3));el.style.opacity=p;el.style.filter=`blur(${(1-p)*8}px)`;el.style.transform=`translateY(${(1-p)*12}px)`})}},o));
}
const PANEL=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border:1.5px solid rgba(0,0,0,.08);border-radius:30px;box-shadow:0 24px 60px rgba(0,0,0,.18);padding:${o.pad||'26px 30px'};text-align:center">${inner}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.12},o));
const LBL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'chipw',html:`<span style="display:inline-block;font:800 ${o.fs||34}px/1 P;padding:16px 26px 12px;border-radius:999px;background:${o.bg||'#fff'};color:${o.col||'#151515'};box-shadow:0 10px 26px rgba(0,0,0,.28);white-space:nowrap">${txt}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:65,float:.15},o));
const STAMP=(t0,t1,x,y,txt,col='#b8935f',o={})=>A(Object.assign({t0,t1,x,y,w:o.w||760,cls:'chipw',html:`<div style="display:inline-block;border:9px solid ${col};color:${col};border-radius:22px;padding:16px 36px 10px;font:900 ${o.fs||84}px/1.1 P;letter-spacing:3px;background:rgba(255,253,249,.85);transform:rotate(${o.rot||-5}deg)">${txt}</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.1,sfxv:.9,z:70,float:0},o));
const GOLD='#b8935f';
const NAVY='#0d1729',RED='#d6342a';
const CUE=window.CUES||[];
// time of the first spoken word containing w, at/after approx time `near` (so re-recorded lines re-time automatically)
function C(w,near=0){const n=s=>s.replace(/[,.?!।]/g,'');const f=CUE.find(o=>o.s>=near-.8&&n(o.w).includes(w));if(!f){console.log('NOCUE',w,near);return near}return f.s}
// full-frame wipe-line transition to the next image (gold line sweeps right->left)
const WIPE=(t,img,dur=.6)=>A({t0:t,t1:t+dur+.04,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="position:relative;width:1080px;height:1920px"><div class="im" style="position:absolute;inset:0;background:url(a/${img}) center/cover"></div><div class="ln" style="position:absolute;top:0;bottom:0;width:10px;background:#f2dfb6;box-shadow:0 0 34px #e8cf9f,0 0 8px #fff"></div></div>`,enter:'fade',din:.01,float:0,z:3,sfx:'swoosh',sfxv:.7,
  draw:(tt,lt,oo)=>{const p=E.inout(clamp(lt/dur));const x=1080*(1-p);oo.el.querySelector('.im').style.clipPath=`inset(0 0 0 ${x}px)`;oo.el.querySelector('.ln').style.left=(x-5)+'px'}});
const NUM=(t0,t1,x,y,big,small,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||560,cls:'chipw',html:`<div style="display:inline-block;background:rgba(255,253,249,.95);border-radius:26px;padding:16px 30px 12px;box-shadow:0 18px 44px rgba(0,0,0,.22);text-align:center"><div style="font:900 ${o.fs||84}px/1 P;color:${o.col||'#151515'}">${big}</div><div style="font:700 28px/1.3 P;color:#6b6b6b">${small}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:65,float:.12},o));

const CARD=(t0,t1,x,y,w,h,img,o={})=>A(Object.assign({t0,t1,x,y,w:w+10,cls:'noshadow',html:`<div style="width:${w}px;height:${h}px;border-radius:30px;background:url(a/${img}) center/cover;box-shadow:0 24px 60px rgba(0,0,0,.28);border:6px solid #faf7f2"></div>`,enter:'up',din:.5,sfx:'whoosh',sfxv:.4,z:40,float:.1},o));

// video background from a jpg frame sequence (drawn synchronously from preloaded frames)
function VBG(o){o=Object.assign({s0:1,s1:1.04,x0:0,x1:0,y0:0,y1:0,fade:.2,filter:''},o);
  o.img=o.dir+'/f_001.jpg';const el=document.createElement('canvas');el.width=1080;el.height=1920;el.className='bg';document.getElementById('bgs').appendChild(el);o.el=el;BGS.push(o);
  const fr=[];window.PRELOAD=window.PRELOAD||[];for(let i=1;i<=o.n;i++){const im=new Image();im.src=`a/${o.dir}/f_${String(i).padStart(3,'0')}.jpg`;fr.push(im);window.PRELOAD.push(im.decode().catch(()=>0))}
  const ctx=el.getContext('2d');HOOKS.push(t=>{if(t<o.t0-.2||t>o.t1+.2)return;const k=Math.min(o.n-1,Math.max(0,Math.floor((t-o.t0)/(o.t1-o.t0)*o.n)));ctx.drawImage(fr[k],0,0,1080,1920)});return o}
// animated curved arrow from (x1,y1) to (x2,y2): line draws, then head pops; small bounce at the tip
const POINT=(t0,t1,x1,y1,x2,y2,o={})=>{const col=o.col||'#fff',bend=o.bend||60;const mx=(x1+x2)/2+bend,my=(y1+y2)/2;
  const ang=Math.atan2(y2-my,x2-mx)*180/Math.PI;
  return A({t0,t1,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible;filter:drop-shadow(0 4px 8px rgba(0,0,0,.55))"><path class="ln" d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="1000"/><g class="hd" transform="translate(${x2},${y2}) rotate(${ang})" opacity="0"><path d="M0 0 L-34 -20 L-26 0 L-34 20 Z" fill="${col}"/></g></svg>`,enter:'fade',din:.05,float:0,z:58,sfx:'swoosh',sfxv:.4,
    draw:(t,lt,oo)=>{const p=E.inout(clamp(lt/.5));oo.el.querySelector('.ln').style.strokeDashoffset=1000*(1-p);const h=oo.el.querySelector('.hd');h.setAttribute('opacity',p>.9?1:0);const b=lt>.5?Math.sin((lt-.5)*6)*6:0;h.setAttribute('transform',`translate(${x2+Math.cos(ang*Math.PI/180)*b},${y2+Math.sin(ang*Math.PI/180)*b}) rotate(${ang})`)}})};
// CIDCO प्लॉट टेंडर - SRS Dwell. Times = Whisper word starts of vo_t.wav (cue_words.json).
// New transition for this reel: TILES (plot-grid tiles flip in, then flip out).
function TILES(t,col='#0d1729'){const cols=6,rows=10,cw=180,ch=192;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const d=(r+c)*.018;
    A({t0:t-.45,t1:t+.6,x:c*cw+cw/2,y:r*ch+ch/2,w:cw+2,cls:'noshadow',html:`<div style="height:${ch+2}px;background:${(r+c)%3?col:'#1b2a45'};box-shadow:inset 0 0 0 1.5px rgba(232,207,159,.45)"></div>`,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,z:700,
      fn:(tt)=>{const a=tt<t?E.inout(clamp((tt-(t-.45+d))/.28)):1-E.inout(clamp((tt-(t+.12+d))/.28));return {s:.2+.8*a,o:a,ry:(1-a)*80}}})}
  sfx(t-.4,'swoosh',.8);sfx(t,'thud',.45);punch(t,.03)}
const SH='drop-shadow(0 34px 40px rgba(0,0,0,.35))';
const OBJ=(t0,t1,x,y,w,img,o={})=>IMG(t0,t1,x,y,w,img,Object.assign({cls:'noshadow',filter:SH},o));
const H2=(t0,t1,y,html,o={})=>PANEL(t0,t1,540,y,o.w||800,`<div style="font:700 ${o.fs||44}px/1.3 P">${html}</div>`,Object.assign({enter:'down',pad:'20px 28px'},o));
const CHK=(t0,t1,x,y,txt,ok,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||620,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:20px;background:rgba(255,253,249,.97);border-radius:26px;padding:18px 26px 14px;box-shadow:0 18px 44px rgba(0,0,0,.22);border-left:12px solid ${ok?'#1f9a52':RED}"><div style="width:74px;flex:none">${ok?IC.check:IC.cross}</div><div style="font:700 40px/1.3 P;text-align:left">${txt}</div></div>`,enter:'left',din:.45,sfx:ok?'ding':'buzz',sfxv:.6,z:62,float:.1},o));

function buildScenes(){
const END=81.4;
const T={twist:5.82,tender:11.47,use:14.31,bid:21.0,s1:24.4,s2:29.97,s3:35.33,s4:43.38,s5:46.8,emd:54.36,cost:60.95,cta:72.22,out:77.8};
const SEC=[0,T.twist,T.tender,T.use,T.bid,T.s1,T.s2,T.s3,T.s4,T.s5,T.emd,T.cost,T.cta,T.out,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.35,'#fffaf0');sfx(t-.15,'whoosh',.5);punch(t,.03)};

// ---------- HUD ----------
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 19px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* माहितीसाठी - अटी प्रत्येक स्कीम बुकलेटनुसार बदलतात</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1 HOOK : 1 plot, 2,125 crore =================
BG({img:'B01_navi_mumbai_aerial.jpg',t0:0,t1:T.twist+.05,s0:1.18,s1:1.0,y0:-60,y1:0,fade:.2});
TINT(0,T.twist,'linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,0) 35%,rgba(0,0,0,0) 65%,rgba(0,0,0,.35))',.2);
{const tp=1.5;
 A({t0:tp,t1:T.twist,x:700,y:1090,w:110,cls:'noshadow',html:`<svg viewBox="0 0 60 80" width="100%" style="filter:drop-shadow(0 10px 12px rgba(0,0,0,.45))"><path d="M30 2C15 2 4 13 4 28c0 20 26 50 26 50s26-30 26-50C56 13 45 2 30 2z" fill="#d6342a"/><circle cx="30" cy="28" r="10" fill="#fff"/></svg>`,enter:'drop',din:.6,sfx:'thud',sfxd:.45,sfxv:.6,z:55,float:0,
   fn:(t,lt)=>({dy:lt>.6?-Math.abs(Math.sin((lt-.6)*3.2))*24:0})});
 A({t0:tp+.5,t1:T.twist,x:700,y:1150,w:200,cls:'noshadow',html:`<div class="rg" style="width:200px;height:64px;border-radius:50%;border:5px solid #ff3b2f;box-sizing:border-box"></div>`,enter:'fade',din:.05,float:0,z:50,
   draw:(t,lt,oo)=>{const q=(lt%1)/1;const r=oo.el.querySelector('.rg');r.style.transform=`scale(${.2+q})`;r.style.opacity=1-q}});
 LBL(tp+.3,T.twist,700,980,'1 प्लॉट',{bg:'#fff',fs:38,w:240});}
A({t0:2.3,t1:T.twist,x:540,y:640,w:900,cls:'noshadow',html:`<div style="text-align:center;background:rgba(13,23,41,.82);border:2px solid rgba(232,207,159,.6);border-radius:30px;padding:26px 30px 22px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><div style="font:600 34px/1.2 P;color:#cfd6e4">बोली लागली तब्बल</div><div class="v" style="font:800 118px/1.1 P;color:#e8cf9f;text-shadow:0 0 40px rgba(232,207,159,.45)">₹0 कोटी</div><div style="font:500 24px/1.3 P;color:#aab3c4;margin-top:4px">खारघर, सेक्टर 23 - 41,994 चौ.मी. प्लॉट</div></div>`,enter:'zoom',din:.4,sfx:'riser',sfxv:.5,z:60,float:.1,shine:[5.3],
  draw:(t,lt,oo)=>{const v=Math.round(2125*E.out(clamp((t-2.9)/2.2)));oo.el.querySelector('.v').textContent='₹'+v.toLocaleString('en-IN')+' कोटी'}});
sfx(2.9,'ticks',.5);punch(5.12,.08);sfx(5.12,'impact',.8);PART({type:'sparks',t0:5.12,t1:5.4,n:80,seed:3,x:540,y:660,speed:900,color:GOLD});

// ================= 2 TWIST : not sold, leased =================
CUT(T.twist);
BG({img:'B02_empty_plot.jpg',t0:T.twist,t1:T.tender+.05,s0:1.0,s1:1.1,fade:.2});
H2(T.twist+.1,T.tender,560,`पण गंमत अशी... हा प्लॉट <span style="color:${RED}">विकलाच</span> गेला नाही!`,{w:820});
OBJ(9.35,T.tender,300,1180,240,'O15_pillar.png',{enter:'rise'});
STAMP(9.95,T.tender,640,960,'विक्री ❌',RED,{fs:76,w:560,rot:-6});
STAMP(10.71,T.tender,640,1200,'LEASE ✅',GOLD,{fs:80,w:560,rot:-4});
shake(10.1,10);

// ================= 3 CIDCO PLOT TENDER title =================
TILES(T.tender);
TINT(T.tender,T.use,'linear-gradient(180deg,#0d1729,#162644)',.05);
A({t0:T.tender+.1,t1:T.use,x:540,y:860,w:960,cls:'noshadow',html:`<div style="text-align:center"><div style="font:600 44px/1.4 P;color:#cfd6e4;margin-bottom:34px">सिडकोचा</div><div style="font:800 120px/1.45 P;color:#e8cf9f;text-shadow:0 0 50px rgba(232,207,159,.5)">प्लॉट टेंडर</div><div style="display:inline-block;margin-top:30px;font:600 34px/1 P;color:#0d1729;background:#e8cf9f;border-radius:999px;padding:16px 30px 12px">e-Tender + e-Auction</div></div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.6,z:50,float:.1,shine:[13.9]});
PART({type:'sparks',t0:13.89,t1:14.1,n:60,seed:5,x:540,y:820,speed:800,color:GOLD});

// ================= 4 USES : fast cuts =================
[['B03_bungalow.jpg','बंगलो',14.31],['B04_residential.jpg','घर',15.11],['B05_shops.jpg','दुकान',15.67],['B06_office.jpg','ऑफिस',16.33],['B07_warehouse.jpg','वेअरहाउस',16.97]].forEach(([img,lbl,t0],i,arr)=>{
  const t1=i<4?arr[i+1][2]:17.6;BG({img,t0,t1:t1+.02,s0:1.12,s1:1.0,fade:.06});CUT(t0);
  LBL(t0+.05,t1,540,1250,lbl,{bg:NAVY,col:'#e8cf9f',fs:60,w:600,enter:'stamp',din:.25,sfx:'stamp'})});
TINT(17.6,T.bid,'#f4f1ec',.1);
[['B03_bungalow.jpg',-2],['B04_residential.jpg',-1],['B05_shops.jpg',0],['B06_office.jpg',1],['B07_warehouse.jpg',2]].forEach(([img,k],i)=>
  CARD(17.6+i*.08,T.bid,540+k*165,940+Math.abs(k)*30,300,500,img,{enter:'up',rot:k*6,z:40+i,sfxv:.25}));
H2(17.7,T.bid,520,`वेगवेगळ्या <span style="color:${GOLD}">वापरासाठी</span>`,{w:720});
A({t0:19.5,t1:T.bid,x:540,y:1340,w:720,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:16px;background:${NAVY};color:#fff;border-radius:999px;padding:16px 30px 12px;font:700 38px/1 P">${IC.cal(54)}सिडको वेळोवेळी प्लॉट्स काढतं</span>`,enter:'up',din:.4,sfx:'pop',z:66,float:0});

// ================= 5 STRAIGHT BID -> 5 STEPS =================
SWEEP(T.bid);
BG({img:'B08_navy_desk.jpg',t0:T.bid,t1:T.emd+.05,s0:1.06,s1:1.0,fade:.2});
A({t0:T.bid+.1,t1:22.8,x:540,y:860,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 92px/1.15 P;color:#faf7f2">सरळ <span style="color:#e8cf9f">बोलीने!</span></div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.5,z:50,float:.1});
// step tracker (persistent through the steps)
const ST=[T.s1,T.s2,T.s3,T.s4,T.s5],SL=['नोंदणी','बुकलेट','फी + EMD','क्लोज्ड बिड','ई-ऑक्शन'];
A({t0:22.84,t1:T.emd,x:540,y:480,w:900,cls:'noshadow',html:`<svg viewBox="0 0 900 175" width="900" style="overflow:visible"><line class="ln" x1="90" y1="50" x2="810" y2="50" stroke="#e8cf9f" stroke-width="5" stroke-dasharray="720" stroke-dashoffset="720"/>${ST.map((s,i)=>`<g class="d" transform="translate(${90+i*180},50)"><circle r="40" fill="#0d1729" stroke="#e8cf9f" stroke-width="5"/><text y="15" text-anchor="middle" font-family="P" font-weight="800" font-size="40" fill="#e8cf9f">${i+1}</text><text y="88" text-anchor="middle" font-family="P" font-weight="600" font-size="22" fill="#cfd6e4">${SL[i]}</text></g>`).join('')}</svg>`,enter:'fade',din:.2,sfx:'swoosh',z:80,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.ln').style.strokeDashoffset=720*(1-E.inout(clamp(lt/1.2)));
    let cur=-1;ST.forEach((s,i)=>{if(t>=s)cur=i});
    oo.el.querySelectorAll('.d').forEach((g,i)=>{const pin=E.back(clamp((lt-i*.2)/.4));const act=i===cur;const done=i<cur;
      g.setAttribute('transform',`translate(${90+i*180},50) scale(${pin*(act?1.18:1)})`);
      const c=g.querySelector('circle');c.setAttribute('fill',act?'#e8cf9f':done?'#1b2a45':'#0d1729');g.querySelector('text').setAttribute('fill',act?'#0d1729':'#e8cf9f');g.style.opacity=done?.6:1})}});
A({t0:22.84,t1:T.s1,x:540,y:960,w:900,cls:'noshadow',html:`<div style="text-align:center;font:700 62px/1.25 P;color:#faf7f2">प्रोसेस ऐका -<br><span style="color:#e8cf9f;font-size:96px;font-weight:800">5 स्टेप्स</span></div>`,enter:'up',din:.4,z:50,float:.1});
ST.forEach(s=>{sfx(s,'ding',.5);punch(s,.03)});
const STEPT=(t0,t1,txt)=>A({t0,t1,x:540,y:660,w:900,cls:'noshadow',html:`<div style="text-align:center;font:700 54px/1.2 P;color:#faf7f2">${txt}</div>`,enter:'down',din:.4,z:70,float:.08,sfx:'whoosh',sfxv:.5});

// --- STEP 1 : registration ---
STEPT(T.s1,T.s2,`<span style="color:#e8cf9f">e-Auction</span> वेबसाइटवर नोंदणी`);
OBJ(T.s1+.1,T.s2,540,1010,820,'O09_laptop.png',{enter:'rise',din:.55});
A({t0:26.2,t1:T.s2,x:500,y:880,w:480,cls:'noshadow',html:`<div style="text-align:left;font:600 22px/1 P;color:#151515">${['नाव / पत्ता','PAN','आधार','बँक IFSC'].map(s=>`<div style="margin:0 0 12px"><div style="margin-bottom:6px">${s}</div><div class="f" style="height:22px;border-radius:6px;background:#eef0f4;border:1.5px solid #cfd4dd"></div></div>`).join('')}</div>`,enter:'fade',din:.3,z:60,float:0,rot:-1,
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.f').forEach((f,i)=>{const p=clamp((t-(27+i*.7))/.5);f.style.background=`linear-gradient(90deg,#c9a66f ${p*100}%,#eef0f4 ${p*100}%)`})}});
[['PAN',27.48,300],['आधार',28.14,540],['बँक डिटेल्स',28.83,790]].forEach(([s,t0,x])=>LBL(t0,T.s2,x,1360,s,{bg:'#faf7f2',col:NAVY,fs:38,w:320}));

// --- STEP 2 : scheme booklet ---
STEPT(T.s2,T.s3,`स्कीम <span style="color:#e8cf9f">बुकलेट</span> डाउनलोड करा`);
OBJ(30.37,32.25,540,1060,560,'O10_booklet.png',{enter:'left',exit:'left',shine:[30.9]});
LBL(30.6,32.25,540,1440,'* प्रतीकात्मक चित्र',{bg:'rgba(255,253,249,.85)',col:'#3d3a35',fs:22,w:300,sfx:null});
CARD(32.25,T.s3,540,1050,440,700,'O11_layout.jpg',{enter:'right',rot:2});
A({t0:32.35,t1:T.s3,x:540,y:1030,w:440,cls:'noshadow',html:`<div class="hl" style="position:relative;left:100px;top:0;width:120px;height:86px;border:6px solid #e8cf9f;border-radius:6px;box-shadow:0 0 30px #e8cf9f,inset 0 0 20px rgba(232,207,159,.5);background:rgba(232,207,159,.25)"></div>`,enter:'pop',din:.35,sfx:'pop',z:45,float:0,pulse:1});
[['📐 आकार',32.35,250],['📍 जागा',32.97,540],['₹ बेस प्राइस',33.59,790]].forEach(([s,t0,x],i)=>LBL(t0,T.s3,x,1450,s,{bg:'#faf7f2',col:NAVY,fs:34,w:300}));

// --- STEP 3 : fee + EMD before deadline ---
STEPT(T.s3,T.s4,`डॉक्युमेंट फी + <span style="color:#e8cf9f">EMD</span>`);
OBJ(T.s3+.1,T.s4,730,1060,280,'O12_hourglass.png',{enter:'drop',din:.6,sfx:'thud',sfxd:.5,
  fn:(t)=>({r:t>39.6?Math.sin((t-39.6)*2.2)*4:0})});
A({t0:37.09,t1:T.s4,x:360,y:900,w:520,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.97);border-radius:28px;padding:22px 24px 18px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:center"><div style="font:800 64px/1 P;color:${NAVY}">EMD</div><div style="font:600 28px/1.2 P;color:#6b6b6b;margin:8px 0 6px">म्हणजे</div><div style="font:800 46px/1.2 P;color:${GOLD}">अनामत रक्कम</div></div>`,enter:'flip',din:.5,sfx:'whoosh',z:62,float:.12});
A({t0:39.64,t1:T.s4,x:360,y:1170,w:520,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:14px;background:#faf7f2;color:#151515;border-radius:999px;padding:14px 26px 10px;font:700 34px/1 P;box-shadow:0 12px 30px rgba(0,0,0,.3)">${IC.cal(46)}ठरलेल्या तारखेआधी</span>`,enter:'up',din:.4,sfx:'clock',sfxv:.6,z:64,float:0});
STAMP(41.2,T.s4,540,1380,'उशीर = बोली नाही ❌',RED,{fs:54,w:900,rot:-3});
shake(41.4,12);

// --- STEP 4 : closed bid ---
STEPT(T.s4,T.s5,`आधी <span style="color:#e8cf9f">क्लोज्ड बिड</span>`);
OBJ(T.s4+.1,T.s5,540,1060,440,'O13_tender_box.png',{enter:'drop',din:.65,sfx:'thud',sfxd:.55});
LBL(45.66,T.s5,540,1420,'🔒 किंमत बंद लिफाफ्यात',{bg:'#faf7f2',col:NAVY,fs:42,w:640});
sfx(46.0,'click',.7);

// --- STEP 5 : live e-auction ---
STEPT(T.s5,T.emd,`मग <span style="color:#e8cf9f">लाईव्ह ई-ऑक्शन</span>`);
A({t0:47.84,t1:T.emd,x:540,y:760,w:300,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:12px;background:${RED};color:#fff;border-radius:12px;padding:12px 22px 8px;font:800 34px/1 P"><span class="dot" style="width:18px;height:18px;border-radius:50%;background:#fff"></span>LIVE</span>`,enter:'pop',din:.3,sfx:'alert',sfxv:.4,z:70,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.dot').style.opacity=Math.sin(lt*8)>0?1:.25}});
OBJ(T.s5+.1,T.emd,320,1150,420,'O14_gavel.png',{enter:'left',
  fn:(t)=>{const h=[50.0,51.3,53.82];let r=0;for(const k of h){const d=t-k;if(d>-.25&&d<.35)r+=d<0?lerp(0,-22,(d+.25)/.25):lerp(-22,0,E.out(clamp(d/.35)))}return {r}}});
[50.0,51.3].forEach(k=>{sfx(k,'thud',.5)});
// rising bid bar with +1000 chips
A({t0:48.96,t1:T.emd,x:720,y:1100,w:240,cls:'noshadow',html:`<div style="position:relative;width:200px;height:560px;margin:0 auto;border-radius:24px;background:rgba(255,255,255,.08);border:2px solid rgba(232,207,159,.5);overflow:hidden"><div class="bar" style="position:absolute;left:0;right:0;bottom:0;height:10%;background:linear-gradient(180deg,#f2dfb6,#b8935f)"></div></div><div style="text-align:center;font:600 24px/1.3 P;color:#cfd6e4;margin-top:10px">बोली / चौ.मी.</div>`,enter:'up',din:.4,z:60,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.bar').style.height=(10+85*E.inout(clamp((t-49.2)/4.4)))+'%'}});
[49.4,50.3,51.1,51.9,52.7].forEach((k,i)=>A({t0:k,t1:k+1.1,x:720,y:1240-i*90,w:300,cls:'chipw',html:`<span style="display:inline-block;background:#1f9a52;color:#fff;border-radius:999px;padding:10px 20px 6px;font:800 32px/1 P">+ ₹1,000</span>`,enter:'pop',din:.25,sfx:'coin',sfxv:.4,z:72,float:0,fn:(t,lt)=>({dy:-lt*60,o:1-clamp((lt-.7)/.4)})}));
STAMP(53.82,T.emd,540,1420,'सर्वात जास्त बोली = प्लॉट! 🏆',GOLD,{fs:46,w:940,rot:-2});
shake(53.9,14);flash(53.82,.4,'#fff4dc');

// ================= 6 EMD : refund vs forfeit =================
BLINDS(T.emd);
TINT(T.emd,T.cost,'#f4f1ec',.05);
H2(T.emd+.1,T.cost,560,`<span style="color:${GOLD}">EMD</span> चं काय होतं?`,{w:640});
CHK(54.82,T.cost,540,820,'हरलात? काळजी नको -<br><b>EMD परत मिळतो</b>',true,{w:860});
CHK(58.85,T.cost,540,1120,'प्लॉट मिळाल्यावर माघार?<br><b style="color:#d6342a">EMD जप्त!</b>',false,{w:860,enter:'right'});
shake(60.49,12);

// ================= 7 EXTRA COSTS =================
RINGT(T.cost);
TINT(T.cost,T.cta,'#f4f1ec',.05);
H2(T.cost+.1,T.cta,560,`लक्षात ठेवा - <span style="color:${RED}">वेगळे</span> भरावे लागतात`,{w:860});
OBJ(T.cost+.2,T.cta,740,1180,280,'O16_calculator.png',{enter:'right'});
const ROWS=[['बोलीची रक्कम',61.97,NAVY],['+ GST',63.21,'#151515'],['+ स्टॅम्प ड्युटी',63.81,'#151515'],['+ रजिस्ट्रेशन',64.89,'#151515'],['+ लीज रेंट',65.8,'#151515']];
ROWS.forEach(([s,t0,c],i)=>A({t0,t1:T.cta,x:360,y:760+i*110,w:560,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.97);border-radius:20px;padding:16px 24px 12px;box-shadow:0 12px 30px rgba(0,0,0,.14);font:700 38px/1.2 P;color:${c};text-align:left;border-left:10px solid ${i?GOLD:NAVY}">${s}</div>`,enter:'left',din:.4,sfx:'pop',sfxv:.5,z:60+i,float:.06}));
A({t0:70.52,t1:T.cta,x:360,y:1340,w:560,cls:'noshadow',html:`<div style="border-top:5px solid #151515;padding-top:14px;font:800 46px/1.2 P;text-align:left">= <span style="color:${RED}">एकूण खर्च</span></div>`,enter:'up',din:.4,sfx:'impact',sfxv:.5,z:66,float:0});
LBL(68.96,T.cta,540,1450,'📖 बिडआधी बुकलेट नीट वाचा',{bg:NAVY,col:'#e8cf9f',fs:36,w:700});
punch(70.52,.05);

// ================= 8 CTA : what will you build? =================
CUT(T.cta);
BG({img:'B01_navi_mumbai_aerial.jpg',t0:T.cta,t1:T.out+.05,s0:1.0,s1:1.1,fade:.2,filter:'brightness(.8)'});
H2(T.cta+.05,T.out,560,`प्लॉट मिळाला तर तुम्ही <span style="color:${GOLD}">काय बांधाल?</span>`,{w:840});
[['B04_residential.jpg','घर',75.34,260],['B03_bungalow.jpg','बंगलो',75.98,540],['B05_shops.jpg','दुकान',76.68,820]].forEach(([img,s,t0,x])=>A({t0,t1:T.out,x,y:960,w:250,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:24px;padding:10px 10px 14px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center"><div style="height:260px;border-radius:16px;background:url(a/${img}) center/cover"></div><div style="font:800 40px/1 P;margin-top:14px">${s}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:60,float:.12}));
A({t0:77.18,t1:T.out,x:540,y:1290,w:820,cls:'chipw',html:`<div style="display:inline-flex;align-items:center;gap:18px;background:${NAVY};color:#fff;border-radius:999px;padding:20px 36px 16px;font:700 40px/1 P;box-shadow:0 18px 44px rgba(0,0,0,.35)"><svg viewBox="0 0 24 24" width="46"><path d="M4 4h16v12H8l-4 4z" fill="#e8cf9f"/></svg>Comment करा 👇</div>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:66,float:0});

// ================= 9 OUTRO =================
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['real',78.34,'ser gd'],['estate',78.62,'ser gd'],['माहितीसाठी',78.88,'']],{st:'font:700 56px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=80.6;
A({t0:80.0,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:700 42px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.7,n:90,seed:41,x:540,y:-40,burst:1,life:2.5,colors:[GOLD,'#ffffff','#f2dfb6',RED]});
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
