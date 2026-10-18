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
const SH='drop-shadow(0 34px 40px rgba(0,0,0,.35))';
const OBJ=(t0,t1,x,y,w,img,o={})=>IMG(t0,t1,x,y,w,img,Object.assign({cls:'noshadow',filter:SH},o));
const H2=(t0,t1,y,html,o={})=>PANEL(t0,t1,540,y,o.w||800,`<div style="font:700 ${o.fs||44}px/1.3 P">${html}</div>`,Object.assign({enter:'down',pad:'20px 28px'},o));
const CHK=(t0,t1,x,y,txt,ok,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||620,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:20px;background:rgba(255,253,249,.97);border-radius:26px;padding:18px 26px 14px;box-shadow:0 18px 44px rgba(0,0,0,.22);border-left:12px solid ${ok?'#1f9a52':RED}"><div style="width:74px;flex:none">${ok?IC.check:IC.cross}</div><div style="font:700 40px/1.3 P;text-align:left">${txt}</div></div>`,enter:'left',din:.45,sfx:ok?'ding':'buzz',sfxv:.6,z:62,float:.1},o));

// Redevelopment करार - 7 गोष्टी (SRS Dwell). Times = word cues C(word, approx).
const HEAD=(n,t0,t1,html)=>A({t0,t1,x:540,y:500,w:880,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:22px;background:rgba(255,253,249,.96);border-radius:30px;padding:16px 28px 14px 18px;box-shadow:0 22px 56px rgba(0,0,0,.22)"><div style="width:88px;height:88px;flex:none;border-radius:50%;background:${NAVY};color:#e8cf9f;font:700 54px/92px P;text-align:center">${n}</div><div style="font:700 44px/1.25 P;text-align:left;color:#151515">${html}</div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:60,float:.1});
const ROW=(t0,t1,y,txt,o={})=>A(Object.assign({t0,t1,x:540,y,w:720,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:18px;background:rgba(255,253,249,.97);border-radius:24px;padding:16px 24px 12px;box-shadow:0 16px 40px rgba(0,0,0,.22);border-left:10px solid ${GOLD}"><div style="width:58px;flex:none">${IC.check}</div><div style="font:600 38px/1.3 P;text-align:left">${txt}</div></div>`,enter:'left',din:.45,sfx:'pop',sfxv:.55,z:62,float:.08},o));
const NO=(t0,t1,x,y,txt)=>A({t0,t1,x,y,w:380,cls:'chipw',html:`<span style="display:inline-block;font:700 42px/1 P;padding:18px 30px 14px;border-radius:999px;background:#fff;color:${RED};box-shadow:0 12px 30px rgba(0,0,0,.25)"><s>${txt}</s> ✗</span>`,enter:'pop',din:.35,sfx:'buzz',sfxv:.5,z:65,float:.1});
const CURSOR=`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`;

// ===== v2 : reference-board style (photo bg + white icon cards + navy number pills + red banners) =====
const GRN='#1f9a52';
const G=(d,c='#fff')=>`<svg viewBox="0 0 24 24" width="100%" fill="${c}">${d}</svg>`;
const ICO={
 home:G('<path d="M12 3 2.5 11.2h2.8V21h5.2v-6h3v6h5.2v-9.8h2.8z"/>'),
 cal:G('<rect x="3" y="5" width="18" height="16" rx="2.5"/><rect x="7" y="2.5" width="2.2" height="5" rx="1"/><rect x="14.8" y="2.5" width="2.2" height="5" rx="1"/><g fill="#0d1729"><rect x="5.5" y="10" width="13" height="1.4"/><rect x="6.5" y="13" width="2.6" height="2.4"/><rect x="10.7" y="13" width="2.6" height="2.4"/><rect x="14.9" y="13" width="2.6" height="2.4"/><rect x="6.5" y="17" width="2.6" height="2.4"/><rect x="10.7" y="17" width="2.6" height="2.4"/></g>'),
 chart:G('<rect x="3" y="13" width="4.5" height="8" rx="1"/><rect x="9.75" y="8" width="4.5" height="13" rx="1"/><rect x="16.5" y="3" width="4.5" height="18" rx="1"/>'),
 coins:G('<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 8.5c0 1.7 3.6 3 8 3s8-1.3 8-3V11c0 1.7-3.6 3-8 3s-8-1.3-8-3zM4 13.5c0 1.7 3.6 3 8 3s8-1.3 8-3V16c0 1.7-3.6 3-8 3s-8-1.3-8-3z"/>'),
 doc:G('<path d="M6 2h8.5L19 6.5V22H6z"/><g fill="#0d1729"><rect x="8.5" y="9" width="8" height="1.4"/><rect x="8.5" y="12.2" width="8" height="1.4"/><rect x="8.5" y="15.4" width="5.5" height="1.4"/></g>'),
 warn:G('<path d="M12 2 23 21H1z"/><g fill="#d6342a"><rect x="10.8" y="8" width="2.4" height="7.5" rx="1"/><circle cx="12" cy="18" r="1.4"/></g>'),
 clock:G('<circle cx="12" cy="12" r="10"/><path d="M11 6h2v6.2l4 2.4-1 1.7-5-3z" fill="#0d1729"/>'),
 people:G('<circle cx="12" cy="7" r="3.3"/><circle cx="5" cy="9" r="2.6"/><circle cx="19" cy="9" r="2.6"/><path d="M5.5 21c0-4 2.9-7.2 6.5-7.2s6.5 3.2 6.5 7.2zM0 20c0-3 2-5.5 5-5.5 1 0 1.8.2 2.5.6C5.8 16.5 4.8 18.2 4.6 20zM24 20c0-3-2-5.5-5-5.5-1 0-1.8.2-2.5.6 1.7 1.4 2.7 3.1 2.9 4.9z"/>'),
 helmet:G('<path d="M3 16a9 9 0 0 1 18 0zM1.5 17h21v2.5h-21z"/><rect x="10.8" y="4.5" width="2.4" height="6" rx="1" fill="#0d1729"/>'),
 chat:G('<path d="M3 4h18v12H8l-5 4z"/>'),
 wa:G('<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path d="M8.6 7.4c.3-.6.6-.6 1-.6l.7 1.6c.1.3 0 .5-.2.8l-.5.6c.6 1.3 1.7 2.4 3 3l.6-.6c.2-.2.5-.3.8-.2l1.6.8c0 .5-.2 1-.6 1.3-.7.6-1.7.7-2.6.3-2-.8-3.7-2.5-4.4-4.5-.3-.9 0-2 .6-2.6z" fill="#1f9a52"/>'),
 tick:G('<circle cx="12" cy="12" r="11" fill="#1f9a52"/><path d="M6.5 12.5 10.3 16 17.5 8.5" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>'),
 cross:G('<circle cx="12" cy="12" r="11" fill="#d6342a"/><path d="M8 8l8 8M16 8l-8 8" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>'),
};
const TILE=(k,bg=`linear-gradient(145deg,#d9b67a,#a9824c)`,s=84)=>`<div style="width:${s}px;height:${s}px;flex:none;border-radius:${s*.26}px;background:${bg};padding:${s*.18}px;box-sizing:border-box;box-shadow:0 6px 14px rgba(0,0,0,.18)">${ICO[k]}</div>`;
// number header pill like the board: navy circle + bold title
const HN=(n,t0,t1,html,o={})=>A(Object.assign({t0,t1,x:540,y:o.y||470,w:900,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:22px;background:#fff;border-radius:999px;padding:12px 40px 10px 12px;box-shadow:0 16px 40px rgba(0,0,0,.28)"><div style="width:96px;height:96px;border-radius:50%;background:${NAVY};color:#fff;font:800 58px/100px P;text-align:center">${n}</div><div style="font:800 54px/1.15 P;color:#111">${html}</div></div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.55,z:70,float:.06},o));
// white icon card (one line or two)
const IC2=(t0,t1,y,icon,html,o={})=>A(Object.assign({t0,t1,x:o.x||500,y,w:o.w||700,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:24px;background:rgba(255,255,255,.97);border-radius:28px;padding:18px 30px 16px 18px;box-shadow:0 18px 44px rgba(0,0,0,.28)">${TILE(icon,o.bg)}<div style="font:800 ${o.fs||44}px/1.2 P;color:#111;text-align:left">${html}</div>${o.end||''}</div>`,enter:'left',din:.45,sfx:'pop',sfxv:.6,z:66,float:.06},o));
const BAN=(t0,t1,y,html,o={})=>A(Object.assign({t0,t1,x:o.x||540,y,w:o.w||860,cls:'noshadow',html:`<div style="display:flex;align-items:center;gap:22px;justify-content:center;background:linear-gradient(180deg,#e2463b,#b8261d);border:5px solid #fff;border-radius:26px;padding:20px 30px 16px;box-shadow:0 20px 46px rgba(0,0,0,.4);transform:rotate(${o.rot||0}deg)">${o.icon?`<div style="width:${o.is||80}px;flex:none">${ICO[o.icon]}</div>`:''}<div style="font:800 ${o.fs||54}px/1.15 P;color:#fff;text-align:${o.icon?'left':'center'}">${html}</div></div>`,enter:'stamp',din:.35,sfx:'stamp',sfxv:.8,z:72,float:0},o));
const CHIP=(t0,t1,x,y,html,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'chipw',html:`<span style="display:inline-flex;align-items:center;gap:12px;font:800 ${o.fs||42}px/1 P;padding:16px 26px 13px;border-radius:999px;background:${o.bg||'#fff'};color:${o.col||'#111'};box-shadow:0 12px 30px rgba(0,0,0,.28);white-space:nowrap">${html}${o.ic?`<span style="width:${o.fs||42}px;display:inline-block">${ICO[o.ic]}</span>`:''}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:68,float:.08},o));
const PHOTO=(t0,t1,x,y,w,h,img,o={})=>A(Object.assign({t0,t1,x,y,w:w+12,cls:'noshadow',html:`<div style="width:${w}px;height:${h}px;border-radius:24px;background:url(a/${img}) center/cover;border:6px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.35)"></div>`,enter:'pop',din:.45,sfx:'swoosh',sfxv:.5,z:50,float:.06},o));
const PB=(img,t0,t1,o={})=>BG(Object.assign({img,t0,t1,s0:1.0,s1:1.1,fade:.25},o));
const SHADE=(t0,t1)=>TINT(t0,t1,'linear-gradient(180deg,rgba(0,0,0,.28),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 62%,rgba(0,0,0,.42))',.2);

// ===== Open parking - बेकायदेशीर (SRS Dwell). New transition: BARRIER GATE (parking boom barrier sweeps down/up across the frame)
const GATE=(t)=>{A({t0:t-.3,t1:t+.3,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;position:relative;overflow:hidden"><div class="cv" style="position:absolute;inset:0;background:${NAVY}"></div><div class="arm" style="position:absolute;left:-60px;top:900px;width:1200px;height:70px;transform-origin:30px 35px;background:repeating-linear-gradient(90deg,#fff 0 120px,#e2463b 120px 240px);border-radius:35px;box-shadow:0 20px 50px rgba(0,0,0,.5)"></div></div>`,enter:'fade',din:.01,float:0,z:700,sfx:null,
 draw:(tt,lt,oo)=>{const p=lt/.6;const a=p<.5?lerp(-80,0,E.inout(p/.5)):lerp(0,-80,E.inout((p-.5)/.5));oo.el.querySelector('.arm').style.transform=`rotate(${a}deg)`;const cover=p<.5?E.inout(clamp((p-.3)/.2)):1-E.inout(clamp((p-.5)/.2));oo.el.querySelector('.cv').style.opacity=cover}});
 sfx(t-.28,'swoosh',.7);sfx(t,'thud',.5);punch(t,.03)};
const CARD2=(t0,t1,x,y,w,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:linear-gradient(160deg,rgba(13,23,41,.93),rgba(27,42,69,.93));border:3px solid #c9a66f;border-radius:28px;padding:20px 28px 16px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff">${html}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04},o));

function buildScenes(){
const END=84.8;
const T={hook:0,open:C('कारण',8.1),cov:C('मग',21.0),notsale:C('पंलक्षा',27.2),rule:C('आणि',35.6),oral:C('फक्त',49.5),complain:C('और',55.0),soc:C('अजुनेक',66.3),cm:C('आता',72.2),out:C('अशाच्छ',80.6)};
const SEC=[0,T.open,T.cov,T.notsale,T.rule,T.oral,T.complain,T.soc,T.cm,T.out,END];
[T.open,T.cov,T.rule,T.complain,T.cm].forEach(GATE);
[T.notsale,T.oral,T.soc,T.out].forEach(t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.03)});
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* MahaRERA परिपत्रक 36/2021, आदेश 54/2024</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ---- HOOK : man with money ----
PB('P01_hook_money.jpg',0,T.open+.05,{s0:1.0,s1:1.12});SHADE(0,T.open);
A({t0:.05,t1:T.open,x:540,y:500,w:820,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:30px;padding:20px 30px 16px;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center;font:800 48px/1.2 P;color:#111">Parking साठी <span style="color:${RED}">₹3-4 लाख</span> दिले?</div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.6,z:66,float:.04});
CHIP(C('ओपन',3.5),T.open,540,1120,'Open parking?',{bg:'#fff',fs:44,w:420});
BAN(C('बेकाईदेशी',7.2),T.open,1360,'एक रुपयाही घेणं बेकायदेशीर!',{icon:'warn',fs:46,is:80,rot:-4,w:880});shake(C('बेकाईदेशी',7.2)+.1,10);

// ---- OPEN = common area ----
PB('P02_open_parking.jpg',T.open,T.cov+.05,{s0:1.0,s1:1.1});SHADE(T.open,T.cov);
HN('!',T.open+.05,T.cov,'MahaRERA चा नियम स्पष्ट');
A({t0:C('आकाश',11.7),t1:T.cov,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible"><path class="ar" d="M540 1000 L540 640" fill="none" stroke="#f2dfb6" stroke-width="10" stroke-linecap="round" stroke-dasharray="400" stroke-dashoffset="400" style="filter:drop-shadow(0 0 10px #e8cf9f)"/><path class="hd" d="M540 600 L500 660 L580 660 Z" fill="#f2dfb6" opacity="0"/></svg>`,enter:'fade',din:.05,float:0,z:50,draw:(t,lt,oo)=>{const p=E.out(clamp(lt/.5));oo.el.querySelector('.ar').style.strokeDashoffset=400*(1-p);oo.el.querySelector('.hd').setAttribute('opacity',p>.9?1:0)}});
CHIP(C('आकाश',11.7)+.3,T.cov,540,560,'आकाश दिसणारी = OPEN',{bg:'#fff',fs:40,w:560});
CARD2(C('कॉमन',14.7),T.cov,540,1150,760,`<div style="font:700 36px/1.2 P;color:#cfd6e4">Open parking =</div><div style="font:800 60px/1.15 P;color:#f2dfb6">Common Area</div><div style="font:700 36px/1.3 P">सगळ्या सभासदांची</div>`);
CHIP(C('विकू',17.8),T.cov,330,1420,'विक्री',{col:RED,ic:'cross',fs:40,w:260});
CHIP(C('मागू',20.1),T.cov,720,1420,'पैसे',{col:RED,ic:'cross',fs:40,w:260});

// ---- COVERED : 4 tiles ----
PB('P03_stilt.jpg',T.cov,T.notsale+.05,{filter:'brightness(.55) blur(3px)'});
HN('₹',T.cov+.05,T.notsale,'Covered parking?');
[['P03_stilt.jpg','Stilt',C('स्टिल्ट',22.5),330,760],['P04_basement.jpg','Basement',C('बेस्मेंट',23.2),750,760],['P11_podium_b.jpg','Podium',C('पोडियम',24.0),330,1100],['P10_mechanised.jpg','Mechanised',C('मेकनाइस्ट',24.6),750,1100]].forEach(([img,lb,t0,x,y])=>{
 PHOTO(t0,T.notsale,x,y,360,300,img,{allowOver:1});
 CHIP(t0+.15,T.notsale,x,y+150,lb,{fs:32,ic:'tick',w:340,z:69,allowOver:1});});
CHIP(C('घ्युशकतो',26.7)-.3,T.notsale,540,1400,'इथे पैसे घेता येतात ✓',{bg:'#1f9a52',col:'#fff',fs:40,w:560});

// ---- NOT A SALE ----
PB('P03_stilt.jpg',T.notsale,T.rule+.05,{s0:1.0,s1:1.1});SHADE(T.notsale,T.rule);
BAN(C('विक्री',28.4),T.rule,560,'पण ही विक्री नाही!',{icon:'warn',fs:54,is:84,w:760,rot:-3});
IC2(C('फ्लाट',29.8),T.rule,820,'home','Flat सोबत जोडलेला वापराचा हक्क',{w:760,fs:36});
CHIP(C('विकता',33.0),T.rule,330,1080,'वेगळी विक्री',{col:RED,ic:'cross',fs:38,w:380});
CHIP(C('गहां',34.4),T.rule,750,1080,'वेगळं गहाण',{col:RED,ic:'cross',fs:38,w:380});

// ---- ORDER 54 : agreement checklist + plan + tape ----
PB('P05_agreement.jpg',T.rule,T.oral+.05,{s0:1.0,s1:1.08});SHADE(T.rule,T.oral);
HN(54,T.rule+.05,T.oral,'MahaRERA आदेश 54');
CHIP(C('अलोट्मेंट',39.4),T.oral,540,620,'Allotment letter + Agreement मध्ये:',{bg:NAVY,col:'#fff',fs:30,w:760});
[['doc','Parking चा प्रकार',C('प्रकार',41.9)],['chart','Parking नंबर',C('नंबर',42.9)],['cal','लांबी-रुंदी (covered: उंची पण)',C('लांबीर',43.7)],['doc','Approved plan वर खूण',C('अप्रूव्ड',47.2)]].forEach(([ic,s,t0],i)=>IC2(t0,T.oral,760+i*150,ic,s,{w:760,fs:36,x:540,end:`<div style="width:52px;flex:none;margin-left:auto">${ICO.tick}</div>`}));
OBJ(C('लांबीर',43.7)+.3,T.oral,860,1420,170,'O01_tape.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:Math.sin(lt*2)*8})});
OBJ(C('अप्रूव्ड',47.2)+.2,T.oral,230,1400,200,'O02_parking_plan.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:-8})});

// ---- ORAL promise ----
PB('P06_sales_office.jpg',T.oral,T.complain+.05,{s0:1.0,s1:1.1});SHADE(T.oral,T.complain);
A({t0:C('तुम्हादा',50.5)-.2,t1:T.complain,x:700,y:620,w:520,cls:'noshadow',html:`<div style="position:relative;background:#fff;border-radius:28px;padding:18px 26px 14px;box-shadow:0 18px 44px rgba(0,0,0,.3);font:700 38px/1.25 P;color:#111;text-align:center">"तुम्हाला parking देतो"<div style="position:absolute;left:60px;bottom:-22px;width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-top:26px solid #fff"></div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:66,float:.06});
BAN(C('कागद',53.0),T.complain,1250,'कागद नसेल<br>तर हक्क नाही!',{icon:'warn',fs:52,is:86,w:760,rot:-3});

// ---- COMPLAIN ----
PB('P07_laptop.jpg',T.complain,T.soc+.05,{s0:1.0,s1:1.08});SHADE(T.complain,T.soc);
HN('!',T.complain+.05,T.soc,'MahaRERA कडे तक्रार');
CHIP(C('तकरार',58.7),T.soc,540,640,'maharera.mahaonline.gov.in',{bg:NAVY,col:'#f2dfb6',fs:30,w:700});
CARD2(C('प्रकरणात',60.6),T.soc,540,1000,760,`<div style="font:700 34px/1.2 P;color:#cfd6e4">एका प्रकरणात open parking चे</div><div class="a" style="font:900 96px/1.1 P;color:#f2dfb6">₹0</div><div style="font:700 34px/1.3 P">माफ!</div>`,{draw:(t,lt,oo)=>{oo.el.querySelector('.a').textContent='₹'+Math.round(400000*E.out(clamp((t-C('चार',62.1))/.8))).toLocaleString('en-IN')}});
A({t0:C('माफ',63.2),t1:T.soc,x:760,y:1000,w:300,cls:'noshadow',html:`<div style="transform:rotate(-14deg);display:inline-block;border:8px solid #1f9a52;border-radius:16px;padding:10px 22px 6px;font:900 54px/1 P;color:#1f9a52;background:rgba(255,255,255,.8)">माफ ✓</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.9,z:72,float:0,allowOver:1});
CHIP(C('परत',65.4),T.soc,540,1360,'Builder ला पैसे परत करायला लावले',{bg:'#1f9a52',col:'#fff',fs:34,w:760});

// ---- SOCIETY ----
PB('P08_residents.jpg',T.soc,T.cm+.05,{s0:1.0,s1:1.08});SHADE(T.soc,T.cm);
CHIP(C('रजिस्टर्ड',67.7),T.cm,540,560,'Society registered झाली की...',{bg:'#fff',fs:38,w:700});
A({t0:C('उरलेली',68.9),t1:T.cm,x:540,y:1300,w:900,cls:'noshadow',html:`<div style="display:flex;align-items:center;justify-content:center;gap:24px"><div style="background:rgba(255,255,255,.95);border-radius:24px;padding:18px 26px;font:800 40px/1.1 P;color:#9a958c;text-decoration:line-through">Builder</div><div style="font:900 70px/1 P;color:#f2dfb6;text-shadow:0 4px 12px rgba(0,0,0,.5)">→</div><div style="background:#1f9a52;border-radius:24px;padding:18px 26px;font:800 40px/1.1 P;color:#fff">Society ची!</div></div>`,enter:'pop',din:.45,sfx:'pop',sfxv:.6,z:66,float:.05});
CHIP(C('पार्किंग',69.7),T.cm,540,1150,'उरलेली सगळी parking',{bg:NAVY,col:'#fff',fs:38,w:560});

// ---- CTA ----
PB('P08_residents.jpg',T.cm,T.out+.05,{s0:1.1,s1:1.18,filter:'brightness(.55) blur(4px)'});
A({t0:T.cm+.05,t1:T.out,x:540,y:540,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 50px/1.25 P;color:#111">तुम्ही parking साठी<br><span style="color:${RED}">किती पैसे दिले?</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
CHIP(C('ओपन',75.1),T.out,330,820,'Open',{bg:NAVY,col:'#fff',fs:46,w:300});
CHIP(C('कवर्ड',76.1),T.out,750,820,'Covered',{bg:GOLD,col:'#111',fs:46,w:340});
{const tc=C('कमेंट',76.6);
 CHIP(tc,T.out,540,1040,'रक्कम + प्रकार Comment करा!',{bg:NAVY,col:'#fff',fs:40,w:700,ic:'chat',fn:t=>({s:(t>tc+.6&&t<tc+.8?.93:1)})});
 A({t0:tc+.2,t1:C('वीडियो',77.8)+.5,x:760,y:1100,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.65,'click',.8);}
A({t0:C('ग्रूप',79.0)-.4,t1:T.out,x:540,y:1250,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:4px solid #fff;color:#fff;border-radius:999px;padding:16px 36px 14px 18px;box-shadow:0 18px 44px rgba(0,0,0,.4)"><div style="width:66px">${ICO.wa}</div><div style="font:800 38px/1.15 P;text-align:left">Society group वर<br>share करा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['real',C('रियल',81.1),'ser gd'],['estate',C('एस्टेट',81.3),'ser gd'],['माहितीसाठी',C('महिती',81.6),'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',83.5);
A({t0:C('पेजला',83.1)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
A({t0:FT-.2,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:CURSOR,enter:'up',din:.4,z:56,float:0,allowOver:1,fn:t=>({s:t>FT+.3&&t<FT+.5?.85:1})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.7,n:90,seed:41,x:540,y:-40,burst:1,life:2.5,colors:[GOLD,'#ffffff','#f2dfb6',RED]});
const NOBELL={ding:'pop',chime:'pop',bell:'thud',coin:'click',reveal:'whoosh',alert:'pop',question:'pop',sparkle:null};
for(let i=SFX.length-1;i>=0;i--){const m=NOBELL[SFX[i].type];if(m===undefined)continue;if(m===null)SFX.splice(i,1);else SFX[i].type=m}
// one sound per beat: within 0.15 s keep only the strongest (user: extra sounds)
{const PR={stamp:9,impact:8,thud:7,buzz:6,click:5,pop:4,riser:3,ticks:3,clock:3,whoosh:2,swoosh:1};SFX.sort((x,y)=>x.t-y.t);const keep=[];
 for(const e of SFX){const l=keep[keep.length-1];if(l&&e.t-l.t<.15){if((PR[e.type]||0)>(PR[l.type]||0))keep[keep.length-1]=e}else keep.push(e)}SFX.length=0;SFX.push(...keep)}
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
