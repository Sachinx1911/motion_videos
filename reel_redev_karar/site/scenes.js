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

function buildScenes(){
const END=95.0;
const T={prev:C('मागचे',8.4),today:C('आज',11.2),p1:C('एक',15.42),p2:C('दोन',23.74),p3:C('3',35.56),p4:C('4',42.44),p5:C('पाच',51.42),p6:C('सहा',61.3),p7:C('साथ',70.16),law:C('आणि',77.1),cm:C('तुमचा',82.3),out:C('अणि',90.4)};
const SEC=[0,T.prev,T.today,T.p1,T.p2,T.p3,T.p4,T.p5,T.p6,T.p7,T.law,T.cm,T.out,END];
const CUT=t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.035)};
SEC.slice(1,-1).forEach(CUT);
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});

// ---- HOOK : hand signing in front of old society ----
PB('N01_hook_sign.jpg',0,T.prev+.05,{s0:1.0,s1:1.16,y0:0,y1:40});SHADE(0,T.prev);
A({t0:.05,t1:T.prev,x:430,y:560,w:720,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:30px;padding:24px 34px 20px;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:left"><div style="font:800 50px/1.15 P;color:#111">तुमच्या Society चा</div><div style="font:800 76px/1.1 P;color:${RED}">Redevelopment</div><div style="font:800 50px/1.15 P;color:#111">होतोय?</div></div>`,enter:'left',din:.5,sfx:'whoosh',sfxv:.6,z:66,float:.05});
BAN(C('सही',5.06),T.prev,1080,'सही करू नका!',{icon:'warn',fs:80,is:96,rot:-5,w:880});
CHIP(C('गोष्टी',3.86),T.prev,560,1250,'या 7 गोष्टी नसतील तर...',{bg:'#fff',fs:40,w:560});
A({t0:C('नाही',6.2),t1:T.prev,x:540,y:1400,w:880,cls:'chipw',html:`<span style="display:inline-block;background:${NAVY};color:#fff;font:800 44px/1 P;padding:20px 34px 16px;border-radius:18px;box-shadow:0 14px 34px rgba(0,0,0,.4)">नाहीतर घरही जाईल आणि <span style="color:#f2dfb6">भाडंही!</span></span>`,enter:'up',din:.4,sfx:'thud',sfxv:.5,z:70,float:0});
shake(C('सही',5.06)+.1,9);

// ---- PREV VIDEO : meeting ----
PB('N02_meeting.jpg',T.prev,T.today+.05);SHADE(T.prev,T.today);
A({t0:T.prev+.05,t1:T.today,x:540,y:1180,w:840,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:24px 30px 20px;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center;font:800 46px/1.3 P;color:#111">मागच्या video मध्ये<br>आपण <span style="color:${RED}">सभेचे नवे नियम</span> पाहिले.</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.05});
A({t0:C('नवे',10.3),t1:T.today,x:540,y:1390,w:120,cls:'noshadow',html:`<div style="text-align:center;font:900 90px/1 P;color:#fff;text-shadow:0 6px 16px rgba(0,0,0,.5)">↓</div>`,enter:'down',din:.35,z:66,float:0});

// ---- TODAY : Development Agreement book ----
PB('N03_book.jpg',T.today,T.p1+.05,{s0:1.05,s1:1.15});TINT(T.today,T.p1,'linear-gradient(180deg,rgba(0,0,0,.35),rgba(0,0,0,0) 35%)',.2);
A({t0:C('डेवलप्मेंट',12.5),t1:T.p1,x:520,y:1150,w:900,cls:'noshadow',html:`<div style="transform:rotate(-21deg) skewX(8deg);text-align:center;font:800 64px/1.05 P;letter-spacing:3px;background:linear-gradient(180deg,#f7e2b0,#c9a66f 55%,#9c7a45);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 2px 2px rgba(0,0,0,.6))">DEVELOPMENT<br>AGREEMENT<div style="font:700 40px/1.4 P;letter-spacing:0">Builder सोबतचा करार</div></div>`,enter:'fade',din:.6,sfx:'whoosh',sfxv:.5,z:40,float:0,shine:[C('बिल्डर',14.08)]});
A({t0:T.today+.05,t1:T.p1,x:540,y:520,w:760,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border:5px solid #c9a66f;border-radius:28px;padding:20px 30px 16px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center"><div style="font:700 40px/1.2 P;color:#444">आज पुढचा टप्पा -</div><div style="font:800 64px/1.1 P;color:#111">Development Agreement!</div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.05});

// ---- 1 CARPET ----
PB('B03_empty_flat.jpg',T.p1,T.p2+.05);
HN(1,T.p1+.05,T.p2,`नवीन घराचा <span style="color:#b8935f">Carpet Area</span>`,{});
CHIP(C('अंदाजे',17.66),T.p2,700,660,'अंदाजे',{col:RED,ic:'cross',fs:46,w:330});
CHIP(C('सुमारे',18.7),T.p2,700,780,'सुमारे',{col:RED,ic:'cross',fs:46,w:330});
A({t0:C('नेमका',19.48)-.4,t1:T.p2,x:330,y:1130,w:440,cls:'noshadow',html:`<div style="position:relative;width:420px;height:560px;border-radius:14px;background:url(a/N11_floorplan.jpg) center/cover;border:5px solid #fff;box-shadow:0 20px 44px rgba(0,0,0,.35)"><div class="hl" style="position:absolute;left:95px;top:375px;width:110px;height:120px;background:rgba(247,206,70,.65);outline:4px solid #e6a800;opacity:0"></div></div>`,enter:'rise',din:.5,sfx:'swoosh',sfxv:.5,z:55,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.hl').style.opacity=clamp((t-C('नेमका',19.48))/.3)}});
A({t0:C('नेमका',19.48),t1:T.p2,x:700,y:1060,w:400,cls:'noshadow',html:`<div style="background:#fff;border-radius:26px;padding:20px 24px 18px;box-shadow:0 18px 44px rgba(0,0,0,.3);text-align:center"><div style="font:800 46px/1.15 P;color:#111">नेमके<br>Carpet Area</div><div style="font:700 34px/1.4 P;color:#444">(उदा. 650 sq.ft.)</div><div style="width:64px;margin:6px auto 0">${ICO.tick}</div></div>`,enter:'right',din:.45,sfx:'pop',sfxv:.6,z:66,float:.05});
CHIP(C('रेरा',21.42),T.p2,540,1440,'RERA Carpet नुसार',{bg:NAVY,col:'#fff',fs:42,w:500,ic:'tick'});

// ---- 2 RENT ----
PB('B04_moving_boxes.jpg',T.p2,T.p3+.05);SHADE(T.p2,T.p3);
HN(2,T.p2+.05,T.p3,`भाडं किंवा पर्यायी घर`);
CHIP(C('बंधन',28.6),T.p3,540,630,'Builder ला बंधनकारक',{bg:NAVY,col:'#f2dfb6',fs:40,w:520});
IC2(C('दर',29.9),T.p3,800,'home','मासिक भाडं किती?');
IC2(C('आगाउ',31.5)-.3,T.p3,960,'cal','किती महिने आगाऊ?');
IC2(C('वर्षी',32.8)-.3,T.p3,1120,'chart','दरवर्षी किती वाढ?');
BAN(C('करारात',34.46),T.p3,1320,'करारात लिहून घ्या!',{fs:52,w:700,rot:-3});

// ---- 3 CORPUS ----
PB('N04_corpus.jpg',T.p3,T.p4+.05,{s0:1.0,s1:1.12});SHADE(T.p3,T.p4);
HN(3,T.p3+.05,T.p4,`<span style="color:#b8935f">Corpus Fund</span>`);
IC2(C('रक्कम',36.88),T.p4,880,'coins','रक्कम किती?',{w:600});
IC2(C('कधी',38.1),T.p4,1040,'cal','कधी मिळणार?',{w:600});
IC2(C('पक्क',39.6),T.p4,1200,'doc','करारात अटी स्पष्ट',{w:600});
BAN(C('शक्यतर',40.5),T.p4,1390,'शक्य तर घर सोडण्याआधीच!',{fs:46,w:800,rot:-2});

// ---- 4 BANK GUARANTEE ----
PB('B05_vault.jpg',T.p4,T.p5+.05,{filter:'brightness(.75)'});SHADE(T.p4,T.p5);
HN(4,T.p4+.05,T.p5,`बँक गॅरंटी`);
A({t0:T.p4+.3,t1:T.p5,x:400,y:880,w:420,cls:'noshadow',html:`<div style="position:relative;width:400px;height:520px;border-radius:10px;background:url(a/N12_page.jpg) center/cover;box-shadow:0 22px 46px rgba(0,0,0,.45);transform:rotate(-8deg)"><div style="position:absolute;left:0;right:0;top:46px;text-align:center;font:800 36px/1.1 P;color:${NAVY};letter-spacing:1px;background:#fff;padding:8px 0">BANK GUARANTEE</div></div>`,enter:'rise',din:.55,sfx:'swoosh',sfxv:.5,z:50,float:.05});
OBJ(C('बैंक',43.2),T.p5,690,930,300,'O10_shield.png',{enter:'stamp',din:.4,sfx:'thud',sfxv:.6,z:56,float:.08,allowOver:1});
A({t0:C('अर्धवट',44.7)-.2,t1:T.p5,x:540,y:1260,w:860,cls:'noshadow',html:`<div style="background:linear-gradient(180deg,rgba(13,23,41,.95),rgba(27,42,69,.95));border:3px solid #c9a66f;border-radius:26px;padding:20px 28px 16px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff"><div style="font:700 40px/1.25 P">प्रकल्प अर्धवट सोडला तर</div><div style="font:800 52px/1.2 P"><span style="color:#f2dfb6">बँक Society ला पैसे देते</span></div></div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
CHIP(C('नव्या',47.5),T.p5,540,1440,'नवा नियम: प्रकल्प किमतीच्या प्रमाणात',{bg:'#f2dfb6',col:NAVY,fs:34,w:720});

// ---- 5 TIMELINE ----
PB('B06_construction.jpg',T.p5,T.p6+.05);SHADE(T.p5,T.p6);
HN(5,T.p5+.05,T.p6,`बांधकामाची मुदत`);
IC2(C('दोन',54.3),T.p6,760,'clock','2 वर्षांत पूर्ण करणे',{w:700,bg:NAVY,end:`<div style="width:62px;flex:none;margin-left:auto">${ICO.tick}</div>`});
IC2(C('अपवादाने',55.46),T.p6,930,'cal',`<span style="font-size:34px;color:#444">अपवादात्मक परिस्थितीत</span><br><span style="color:${RED}">कमाल 3 वर्षांपर्यंत</span>`,{w:700,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
BAN(C('उशीर',58.0),T.p6,1140,'उशीर झाल्यास<br>करारात दंडाची अट!',{icon:'warn',fs:46,is:84,w:780,rot:-2});
OBJ(C('कलॉज',59.86),T.p6,300,1360,200,'O03_calendar.png',{enter:'rise',din:.45,z:60});

// ---- 6 PARKING + AMENITIES : 2x2 photo tiles ----
PB('B07_podium.jpg',T.p6,T.p7+.05,{filter:'brightness(.55) blur(3px)'});
HN(6,T.p6+.05,T.p7,`Parking आणि सुविधा`);
[['N06_parking.jpg','Parking',C('पार्किंग',62.0),330,760],['N07_lift.jpg','Lift',C('लिफ्ट',63.4),690,760],['N08_gym.jpg','Gym',C('जिम',64.7),330,1080],['N09_materials.jpg','वापरायचे साहित्य',C('सहीत्ते',65.6),690,1080]].forEach(([img,lb,t0,x,y])=>{
 PHOTO(t0,T.p7,x,y,330,280,img,{});
 CHIP(t0+.15,T.p7,x,y+130,lb,{fs:34,ic:'tick',w:330,z:69});});
CHIP(C('तोंडी',68.6),T.p7,330,1360,'तोंडी आश्वासन',{col:RED,ic:'cross',fs:40,w:400,enter:'stamp',sfx:'buzz'});
CHIP(C('तोंडी',68.6)+.5,T.p7,690,1360,'लेखी करार',{col:GRN,ic:'tick',fs:40,w:320});

// ---- 7 REGISTRATION ----
TINT(T.p7,T.law,'radial-gradient(ellipse 80% 60% at 50% 50%,#fbf7f0,#e3d9c9)',.2);
HN(7,T.p7+.05,T.law,`नोंदणी`);
[['Society<br>Development<br>Agreement',C('सोसाइटीचा',71.5),300,'Society चा करार'],['सभासदाचा<br>पर्यायी घराचा करार<br>(PAAA)',C('प्रत्येक',72.9),780,'प्रत्येक सभासदाचा']].forEach(([ttl,t0,x,lb])=>{
 A({t0,t1:T.law,x,y:930,w:420,cls:'noshadow',html:`<div style="position:relative;width:400px;height:530px;border-radius:8px;background:url(a/N12_page.jpg) center 60%/cover;box-shadow:0 20px 44px rgba(0,0,0,.3)"><div style="position:absolute;left:0;right:0;top:24px;background:#fff;padding:12px 10px;text-align:center;font:800 32px/1.2 P;color:#111">${ttl}</div></div>`,enter:x<540?'left':'right',din:.5,sfx:'swoosh',sfxv:.5,z:50,float:.04});
 CHIP(t0+.3,T.law,x,1260,lb,{bg:NAVY,col:'#fff',fs:32,w:400});});
{const s1=C('दोन',75.3),s2=C('नोंदर्नी',76.1);
 [[s1,300],[s2,780]].forEach(([s,x])=>{
  OBJ(s-.45,s+.35,x,900,170,'O06_stamp.png',{enter:'fade',din:.1,exit:'fade',dout:.15,allowOver:1,z:80,float:0,fn:t=>{const d=t-s;return {dy:d<0?lerp(-160,40,E.inout(clamp((d+.45)/.45))):lerp(40,-160,E.inout(clamp(d/.35)))}}});
  A({t0:s,t1:T.law,x,y:1060,w:400,cls:'noshadow',html:`<div style="transform:rotate(-14deg);display:inline-block;border:7px solid ${RED};border-radius:14px;padding:10px 20px 6px;font:800 50px/1 P;color:${RED};letter-spacing:2px;background:rgba(255,255,255,.75)">REGISTERED</div>`,enter:'stamp',din:.25,sfx:'stamp',sfxv:.8,z:70,float:0,allowOver:1});});}

// ---- LAWYER + PMC ----
PB('N05_lawyer_pmc.jpg',T.law,T.cm+.05,{s0:1.0,s1:1.08});SHADE(T.law,T.cm);
A({t0:C('सही',77.4),t1:T.cm,x:540,y:470,w:700,cls:'noshadow',html:`<div style="text-align:center"><span style="display:inline-block;background:#fff;border-radius:999px;padding:16px 40px 12px;font:800 52px/1 P;color:#111;box-shadow:0 16px 40px rgba(0,0,0,.3)">सही करण्याआधी...</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:70,float:.04});
IC2(C('वकील',79.6),T.cm,1110,'people','Society चा स्वतंत्र वकील',{w:720,fs:38,end:`<div style="width:56px;flex:none;margin-left:auto">${ICO.tick}</div>`});
IC2(C('पीमसी',80.4),T.cm,1260,'helmet','PMC कडून करार तपासणी',{w:720,fs:38,end:`<div style="width:56px;flex:none;margin-left:auto">${ICO.tick}</div>`});
IC2(C('तपा',81.5),T.cm,1410,'doc','सर्व clauses तपासा',{w:720,fs:38,end:`<div style="width:56px;flex:none;margin-left:auto">${ICO.tick}</div>`});

// ---- CTA ----
PB('B09_new_tower.jpg',T.cm,T.out+.05,{y0:0,y1:-30});TINT(T.cm,T.out,'linear-gradient(180deg,rgba(13,23,41,.5),rgba(13,23,41,.1) 50%,rgba(0,0,0,.4))',.2);
A({t0:T.cm+.05,t1:T.out,x:540,y:540,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 50px/1.25 P;color:#111">तुमच्या Society चा redevelopment<br><span style="color:${RED}">कोणत्या टप्प्यावर आहे?</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
[['people','चर्चा',C('चर्चा',85.0),300],['helmet','Builder निवड',C('बिल्डर',85.8),540],['doc','करार',C('करार',86.7),780]].forEach(([ic,s,t0,x])=>A({t0,t1:T.out,x,y:830,w:220,cls:'noshadow',html:`<div style="width:210px;height:200px;border-radius:26px;background:linear-gradient(160deg,#1b2a45,#0d1729);border:3px solid #c9a66f;box-shadow:0 18px 40px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px"><div style="width:76px">${ICO[ic]}</div><div style="font:800 34px/1.1 P;color:#fff;text-align:center">${s}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:62,float:.06}));
{const tc=C('कमेंट',87.2);
 CHIP(tc,T.out,540,1060,'Comment करा!',{bg:NAVY,col:'#fff',fs:46,w:480,ic:'chat',fn:t=>({s:(t>tc+.7&&t<tc+.9?.93:1)})});
 A({t0:tc+.3,t1:C('हा',87.8)+.5,x:700,y:1120,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.75,'click',.8);}
A({t0:C('शेयर',89.8)-.5,t1:T.out,x:540,y:1240,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:4px solid #fff;color:#fff;border-radius:999px;padding:16px 36px 14px 18px;box-shadow:0 18px 44px rgba(0,0,0,.4)"><div style="width:70px">${ICO.wa}</div><div style="font:800 40px/1.15 P;text-align:left">Society group वर<br>Share करा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',C('अशाच',90.7),''],['real',C('रियल',91.1),'ser gd'],['estate',C('एस्टेट',91.4),'ser gd'],['माहितीसाठी',C('महिती',91.6),'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',93.4);
A({t0:C('पेजला',93.1)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
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
