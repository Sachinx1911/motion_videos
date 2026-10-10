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
const PLOT=window.PLOT_IMG||'B02_empty_plot.jpg';
const END=81.4;
const T={twist:5.82,tender:11.47,use:14.31,bid:21.0,s1:24.4,s2:29.97,s3:35.33,s4:43.38,s5:46.8,emd:54.36,cost:60.95,cta:72.22,out:77.8};
const SEC=[0,T.twist,T.tender,T.use,T.bid,T.s1,T.s2,T.s3,T.s4,T.s5,T.emd,T.cost,T.cta,T.out,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.03*E.inout(p)})`});
const CUT=t=>{flash(t,.35,'#fffaf0');sfx(t-.15,'whoosh',.5);punch(t,.03)};

// ---------- HUD ----------
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.92);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.15)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});

// ================= 1 HOOK : 1 plot, 2,125 crore =================
// --- 0-1.7s: real satellite map, Maharashtra -> zoom to Navi Mumbai (Kharghar) ---
const MAPEND=1.75, KH=[188.1,904.0], MUM=[126.3,898.4];
TINT(0,MAPEND,'#060b16',.05);
A({t0:0,t1:MAPEND,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="position:relative;width:1080px;height:1920px;overflow:hidden"><div class="mc" style="position:absolute;left:0;top:0;width:${MH.W}px;height:${MH.H}px;transform-origin:0 0">
  <img src="a/bm_mh_hi.jpg" style="position:absolute;left:0;top:0;width:${MH.W}px;height:${MH.H}px;filter:saturate(1.15) brightness(1.05)">
  <svg viewBox="0 0 ${MH.W} ${MH.H}" style="position:absolute;left:0;top:0;width:${MH.W}px;height:${MH.H}px;overflow:visible"><defs><mask id="mkh"><rect width="${MH.W}" height="${MH.H}" fill="#fff"/><path d="${MH.state}" fill="#000"/></mask></defs>
   <rect x="-4000" y="-4000" width="12000" height="12000" fill="rgba(6,11,22,.55)" mask="url(#mkh)"/>
   <path class="st" d="${MH.state}" fill="none" stroke="#f2dfb6" stroke-width="5" stroke-linejoin="round" style="filter:drop-shadow(0 0 8px #e8cf9f)"/></svg>
  <div class="lb" data-x="${MUM[0]}" data-y="${MUM[1]}" style="position:absolute;left:${MUM[0]}px;top:${MUM[1]}px"><div style="transform:translate(-100%,-50%);padding-right:22px;font:700 40px/1 P;color:#fff;text-shadow:0 3px 12px rgba(0,0,0,.9);white-space:nowrap">मुंबई</div></div>
  <div class="lb" data-x="${KH[0]}" data-y="${KH[1]}" style="position:absolute;left:${KH[0]}px;top:${KH[1]}px"><div class="kp" style="transform:translate(-50%,-50%)"><div class="rg" style="position:absolute;left:50%;top:50%;width:120px;height:120px;margin:-60px;border-radius:50%;border:5px solid #e8cf9f"></div><div style="width:26px;height:26px;border-radius:50%;background:#d6342a;border:5px solid #fff;box-shadow:0 0 20px #d6342a"></div></div>
   <div class="kl" style="position:absolute;left:40px;top:-46px;white-space:nowrap;background:rgba(13,23,41,.9);border:2px solid #e8cf9f;border-radius:18px;padding:12px 20px 8px;text-align:left"><div style="font:800 46px/1.1 P;color:#e8cf9f">नवी मुंबई</div><div style="font:600 26px/1.3 P;color:#cfd6e4">खारघर</div></div></div>
 </div></div>`,enter:'fade',din:.01,exit:'fade',dout:.25,float:0,z:5,over:1,
 draw:(t,lt,oo)=>{const p=E.inout(clamp((t-.15)/1.25));const s0=1000/MH.W,s1=3.2;const s=s0*Math.pow(s1/s0,p);
   const cx=lerp(1230,KH[0],p),cy=lerp(960,KH[1],p);
   oo.el.querySelector('.mc').style.transform=`translate(${540-cx*s}px,${900-cy*s}px) scale(${s})`;
   const st=oo.el.querySelector('.st');if(!oo.SL)oo.SL=st.getTotalLength();st.style.strokeDasharray=oo.SL;st.style.strokeDashoffset=oo.SL*(1-E.out(clamp(lt/.7)));st.style.strokeWidth=3/s;
   oo.el.querySelectorAll('.lb').forEach((l,k)=>{l.style.transform=`scale(${1/s})`;l.style.opacity=clamp((t-(k?0.9:0.7))/.25)});
   const q=(t*1.1)%1;const rg=oo.el.querySelector('.rg');rg.style.transform=`scale(${.3+q})`;rg.style.opacity=1-q}});
sfx(.05,'whoosh',.7);sfx(.9,'pop',.6);sfx(1.0,'ding',.4);
// --- 1.7s+: CIDCO plot ---
BG({img:PLOT,t0:MAPEND-.1,t1:T.tender+.05,s0:1.12,s1:1.0,fade:.2});
CUT(MAPEND-.05);
TINT(MAPEND,T.twist,'linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,0) 35%,rgba(0,0,0,0) 65%,rgba(0,0,0,.35))',.2);
LBL(1.85,T.twist,540,1330,'📍 सिडकोचा प्लॉट - खारघर',{bg:'#fff',fs:36,w:620});
A({t0:2.3,t1:T.twist,x:540,y:640,w:900,cls:'noshadow',html:`<div style="text-align:center;background:rgba(13,23,41,.82);border:2px solid rgba(232,207,159,.6);border-radius:30px;padding:26px 30px 22px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><div style="font:600 34px/1.2 P;color:#cfd6e4">बोली लागली तब्बल</div><div class="v" style="font:800 118px/1.1 P;color:#e8cf9f;text-shadow:0 0 40px rgba(232,207,159,.45)">₹0 कोटी</div><div style="font:500 24px/1.3 P;color:#aab3c4;margin-top:4px">खारघर, सेक्टर 23 - 41,994 चौ.मी. प्लॉट</div></div>`,enter:'zoom',din:.4,sfx:'riser',sfxv:.5,z:60,float:.1,shine:[5.3],
  draw:(t,lt,oo)=>{const v=Math.round(2125*E.out(clamp((t-2.9)/2.2)));oo.el.querySelector('.v').textContent='₹'+v.toLocaleString('en-IN')+' कोटी'}});
sfx(2.9,'ticks',.5);punch(5.12,.08);sfx(5.12,'impact',.8);PART({type:'sparks',t0:5.12,t1:5.4,n:80,seed:3,x:540,y:660,speed:900,color:GOLD});

// ================= 2 TWIST : not sold, leased =================
CUT(T.twist);
H2(T.twist+.1,T.tender,560,`पण गंमत अशी... हा प्लॉट <span style="color:${RED}">विकलाच</span> गेला नाही!`,{w:820});
OBJ(9.35,T.tender,300,1180,240,'O15_pillar.png',{enter:'drop',din:.55,sfx:null,fn:(t,lt)=>({dy:lt>.55&&lt<.75?Math.sin((lt-.55)/.2*Math.PI)*-10:0})});
{const tl=9.35+.2;sfx(tl,'thud',1);sfx(tl,'impact',.5);shake(tl,16);punch(tl,.04);PART({type:'soil',t0:tl,t1:tl+.02,n:150,seed:17,x:300,y:1335,life:1.8});}
STAMP(9.95,T.tender,680,960,'विक्री ❌',RED,{fs:64,w:440,rot:-5});
STAMP(10.71,T.tender,680,1180,'LEASE ✅',GOLD,{fs:64,w:440,rot:-4});
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
[['B03_bungalow.jpg',260,760,240,210],['B04_residential.jpg',540,760,240,210],['B05_shops.jpg',820,760,240,210],['B06_office.jpg',370,1060,280,290],['B07_warehouse.jpg',710,1060,280,290]].forEach(([img,x,y,w,h],i)=>
  CARD(17.6+i*.08,T.bid,x,y,w,h,img,{enter:'pop',z:40+i,sfxv:.25}));
H2(17.7,T.bid,560,`वेगवेगळ्या <span style="color:${GOLD}">वापरासाठी</span>`,{w:720});
A({t0:19.5,t1:T.bid,x:540,y:1330,w:720,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:16px;background:${NAVY};color:#fff;border-radius:999px;padding:16px 30px 12px;font:700 38px/1 P">${IC.cal(54)}सिडको वेळोवेळी प्लॉट्स काढतं</span>`,enter:'up',din:.4,sfx:'pop',z:66,float:0});

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
const SCX=480,SCY=847;
const STEPT=(t0,t1,txt)=>A({t0,t1,x:540,y:640,w:900,cls:'noshadow',html:`<div style="text-align:center;font:700 54px/1.2 P;color:#faf7f2">${txt}</div>`,enter:'fade',din:.35,exit:'fade',dout:.15,z:70,float:.08,sfx:'whoosh',sfxv:.5});

// --- STEP 1 : registration ---
STEPT(T.s1,T.s2,`<span style="color:#e8cf9f">e-Auction</span> वेबसाइटवर नोंदणी`);
OBJ(T.s1+.1,T.s2,540,920,480,'O09_laptop.png',{enter:'rise',din:.55});
A({t0:T.s1+.5,t1:T.s2,x:SCX,y:SCY,w:260,cls:'noshadow',over:1,html:`<div style="text-align:center;font:700 23px/1.3 P;color:${NAVY}">e-Auction<div style="font:600 17px/1.3 P;color:#6b6b6b">Bidder Registration</div></div>`,enter:'fade',din:.3,z:60,float:0});
A({t0:26.88,t1:T.s2,x:520,y:1320,w:700,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.97);border-radius:26px;padding:20px 30px 14px;box-shadow:0 24px 60px rgba(0,0,0,.35)">${['PAN','आधार','बँक डिटेल्स'].map(s=>`<div class="rw" style="display:flex;align-items:center;gap:18px;margin:0 0 12px"><div style="width:210px;text-align:left;font:700 32px/1.2 P;color:${NAVY}">${s}</div><div style="flex:1;height:26px;border-radius:8px;background:#eef0f4;border:1.5px solid #cfd4dd;overflow:hidden"><div class="f" style="height:100%;width:0;background:linear-gradient(90deg,#e8cf9f,#b8935f)"></div></div><div class="ok" style="width:44px;opacity:0">${IC.check}</div></div>`).join('')}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:62,float:0,
  draw:(t,lt,oo)=>{const ts=[27.48,28.14,28.83];oo.el.querySelectorAll('.rw').forEach((r,i)=>{const p=E.out(clamp((t-ts[i])/.5));r.querySelector('.f').style.width=(p*100)+'%';r.querySelector('.ok').style.opacity=clamp((t-ts[i]-.45)/.2)})}});
[27.48,28.14,28.83].forEach(k=>{sfx(k,'pen',.4);sfx(k+.5,'ding',.35)});

// --- STEP 2 : scheme booklet ---
STEPT(T.s2,T.s3,`स्कीम <span style="color:#e8cf9f">बुकलेट</span> डाउनलोड करा`);
OBJ(30.37,32.25,540,1075,470,'O10_booklet.png',{enter:'left',exit:'left',shine:[30.9]});
LBL(30.6,32.25,540,1405,'* प्रतीकात्मक चित्र',{bg:'rgba(255,253,249,.85)',col:'#3d3a35',fs:22,w:300,sfx:null});
CARD(32.25,T.s3,540,1010,440,620,'O11_layout_plan.jpg',{enter:'right',rot:1.5});
A({t0:32.35,t1:T.s3,x:540,y:1010,w:440,cls:'noshadow',html:`<div style="position:relative;width:440px;height:620px"><div style="position:absolute;left:140px;top:282px;width:86px;height:66px;border:5px solid #b8935f;border-radius:4px;background:rgba(232,207,159,.55);box-shadow:0 0 0 4px rgba(255,255,255,.9),0 0 34px #e8cf9f"></div><div style="position:absolute;left:100px;top:210px;white-space:nowrap;font:700 26px/1 P;color:#fff;background:${NAVY};border-radius:999px;padding:10px 16px 7px">📍 तुमचा प्लॉट</div></div>`,enter:'fade',din:.3,sfx:'pop',z:45,float:0,rot:1.5,over:1});
[['📐 आकार',32.35,250],['📍 जागा',32.97,515],['₹ बेस प्राइस',33.59,770]].forEach(([s,t0,x],i)=>LBL(t0,T.s3,x,1395,s,{bg:'#faf7f2',col:NAVY,fs:32,w:220}));

// --- STEP 3 : fee + EMD before deadline ---
STEPT(T.s3,T.s4,`डॉक्युमेंट फी + <span style="color:#e8cf9f">EMD</span>`);
OBJ(T.s3+.1,T.s4,740,1110,250,'O12_hourglass.png',{enter:'up',din:.55,sfx:'thud',sfxd:.35,
  fn:(t)=>({r:t>39.6?Math.sin((t-39.6)*2.2)*4:0})});
A({t0:37.09,t1:T.s4,x:340,y:940,w:470,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.97);border-radius:28px;padding:22px 24px 18px;box-shadow:0 24px 60px rgba(0,0,0,.35);text-align:center"><div style="font:800 64px/1 P;color:${NAVY}">EMD</div><div style="font:600 28px/1.2 P;color:#6b6b6b;margin:8px 0 6px">म्हणजे</div><div style="font:800 46px/1.2 P;color:${GOLD}">अनामत रक्कम</div></div>`,enter:'flip',din:.5,sfx:'whoosh',z:62,float:.12});
A({t0:39.64,t1:T.s4,x:340,y:1190,w:470,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:14px;background:#faf7f2;color:#151515;border-radius:999px;padding:14px 26px 10px;font:700 34px/1 P;box-shadow:0 12px 30px rgba(0,0,0,.3)">${IC.cal(46)}ठरलेल्या तारखेआधी</span>`,enter:'up',din:.4,sfx:'clock',sfxv:.6,z:64,float:0});
STAMP(41.2,T.s4,340,1320,'<span style="white-space:nowrap">उशीर = बोली नाही ❌</span>',RED,{fs:32,w:470,rot:-3});
shake(41.4,12);

// --- STEP 4 : closed bid ---
STEPT(T.s4,T.s5,`आधी <span style="color:#e8cf9f">क्लोज्ड बिड</span>`);
OBJ(T.s4+.1,T.s5,540,1005,330,'O13_tender_box.png',{enter:'up',din:.55,sfx:'thud',sfxd:.35});
LBL(45.66,T.s5,540,1395,'🔒 किंमत बंद लिफाफ्यात',{bg:'#faf7f2',col:NAVY,fs:42,w:640});
sfx(46.0,'click',.7);

// --- STEP 5 : live e-auction ---
STEPT(T.s5,T.emd,`मग <span style="color:#e8cf9f">लाईव्ह ई-ऑक्शन</span>`);
A({t0:47.84,t1:T.emd,x:300,y:790,w:200,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:12px;background:${RED};color:#fff;border-radius:12px;padding:12px 22px 8px;font:800 34px/1 P"><span class="dot" style="width:18px;height:18px;border-radius:50%;background:#fff"></span>LIVE</span>`,enter:'pop',din:.3,sfx:'alert',sfxv:.4,z:70,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.dot').style.opacity=Math.sin(lt*8)>0?1:.25}});
OBJ(T.s5+.1,53.95,245,1090,310,'O14_gavel.png',{enter:'left',
  fn:(t)=>{const h=[50.0,51.3,53.82];let r=0;for(const k of h){const d=t-k;if(d>-.25&&d<.35)r+=d<0?lerp(0,-14,(d+.25)/.25):lerp(-14,0,E.out(clamp(d/.35)))}return {r}}});
[50.0,51.3].forEach(k=>{sfx(k,'thud',.5)});
// rising bid bar with +1000 chips
A({t0:48.96,t1:53.95,x:750,y:1060,w:200,cls:'noshadow',html:`<div style="position:relative;width:170px;height:520px;margin:0 auto;border-radius:24px;background:rgba(255,255,255,.08);border:2px solid rgba(232,207,159,.5);overflow:hidden"><div class="bar" style="position:absolute;left:0;right:0;bottom:0;height:10%;background:linear-gradient(180deg,#f2dfb6,#b8935f)"></div></div><div style="text-align:center;font:600 24px/1.3 P;color:#cfd6e4;margin-top:10px">बोली / चौ.मी.</div>`,enter:'up',din:.4,z:60,float:0,
  draw:(t,lt,oo)=>{oo.el.querySelector('.bar').style.height=(10+85*E.inout(clamp((t-49.2)/4.4)))+'%'}});
[49.4,50.3,51.1,51.9,52.7].forEach((k,i)=>A({t0:k,t1:k+1.1,x:545,y:1240-i*90,w:190,cls:'chipw',html:`<span style="display:inline-block;background:#1f9a52;color:#fff;border-radius:999px;padding:10px 20px 6px;font:800 32px/1 P">+ ₹1,000</span>`,enter:'pop',din:.25,sfx:'coin',sfxv:.4,z:72,float:0,fn:(t,lt)=>({dy:-lt*60,o:1-clamp((lt-.7)/.4)})}));
STAMP(54.05,T.emd,540,1080,'सर्वात जास्त बोली<br>= प्लॉट तुमचा! 🏆',GOLD,{fs:56,w:820,rot:-2});
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
OBJ(T.cost+.2,T.cta,765,1120,210,'O16_calculator.png',{enter:'right'});
const ROWS=[['बोलीची रक्कम',61.97,NAVY],['+ GST',63.21,'#151515'],['+ स्टॅम्प ड्युटी',63.81,'#151515'],['+ रजिस्ट्रेशन',64.89,'#151515'],['+ लीज रेंट',65.8,'#151515']];
ROWS.forEach(([s,t0,c],i)=>A({t0,t1:T.cta,x:340,y:740+i*100,w:500,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.97);border-radius:20px;padding:16px 24px 12px;box-shadow:0 12px 30px rgba(0,0,0,.14);font:700 38px/1.2 P;color:${c};text-align:left;border-left:10px solid ${i?GOLD:NAVY}">${s}</div>`,enter:'left',din:.4,sfx:'pop',sfxv:.5,z:60+i,float:.06}));
A({t0:70.52,t1:T.cta,x:340,y:1250,w:500,cls:'noshadow',html:`<div style="border-top:5px solid #151515;padding-top:14px;font:800 46px/1.2 P;text-align:left">= <span style="color:${RED}">एकूण खर्च</span></div>`,enter:'fade',din:.4,sfx:'impact',sfxv:.5,z:66,float:0});
LBL(68.96,T.cta,540,1370,'📖 बिडआधी बुकलेट नीट वाचा',{bg:NAVY,col:'#e8cf9f',fs:36,w:700});
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
