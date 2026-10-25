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

// ===== ₹177 कोटींचा plot, भाडं ₹100 - 60 वर्षांची lease (SRS Dwell). New transition: KEY TURN (brass key rotates, iris opens next scene)
const KEYT=(t)=>{A({t0:t-.3,t1:t+.32,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;position:relative;overflow:hidden"><div class="cv" style="position:absolute;inset:0;background:${NAVY};clip-path:circle(0% at 50% 50%)"></div><img class="k" src="a/O02_key.png" style="position:absolute;left:50%;top:50%;width:420px;margin:-160px 0 0 -210px;filter:drop-shadow(0 20px 40px rgba(0,0,0,.6));opacity:0"></div>`,enter:'fade',din:.01,float:0,z:700,sfx:null,
 draw:(tt,lt,oo)=>{const p=lt/.62;const open=p<.5?E.inout(p/.5):1-E.inout((p-.5)/.5);oo.el.querySelector('.cv').style.clipPath=`circle(${open*80}% at 50% 50%)`;const k=oo.el.querySelector('.k');k.style.opacity=Math.min(1,open*2);k.style.transform=`rotate(${p*180-90}deg) scale(${.6+open*.6})`}});
 sfx(t-.28,'swoosh',.6);sfx(t,'click',.6);punch(t,.03)};
const SPEC=(t0,t1,rows,o={})=>A(Object.assign({t0,t1,x:540,y:o.y||1000,w:o.w||760,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:10px 26px;box-shadow:0 20px 50px rgba(0,0,0,.35)">${rows.map(([k,v],i)=>`<div class="r r${i}" style="display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 0;border-bottom:${i<rows.length-1?'2px solid #eee':'none'};opacity:0"><span style="font:600 30px/1.2 P;color:#555">${k}</span><span style="font:800 36px/1.2 P;color:#111;text-align:right">${v}</span></div>`).join('')}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04,
 draw:(t,lt,oo)=>{oo.el.querySelectorAll('.r').forEach((r,i)=>{const k=o.ts?o.ts[i]:t0+.3+i*.45;r.style.opacity=clamp((t-k)/.3);r.style.transform=`translateX(${(1-clamp((t-k)/.3))*-30}px)`})}},o));

const CARD2=(t0,t1,x,y,w,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:linear-gradient(160deg,rgba(13,23,41,.93),rgba(27,42,69,.93));border:3px solid #c9a66f;border-radius:28px;padding:20px 28px 16px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff">${html}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04},o));
function buildScenes(){
const END=100.5;
const T={hook:0,why:C('करण',7.2),spec:C('जुलाई',13.3),flat:C('आता',25.9),hits:C('याचा',35.8),h1:C('एक',37.4),h2:C('दोन',42.5),h3:C('तीन',46.9),good:C('पण',58.0),g1:C('एक',59.5),g2:C('दोन',71.1),ask:C('मणुन',79.5),cm:C('आता',87.7),out:C('अचाच',96.4)};
const SEC=[0,T.why,T.spec,T.flat,T.hits,T.h1,T.h2,T.h3,T.good,T.g1,T.g2,T.ask,T.cm,T.out,END];
[T.why,T.flat,T.hits,T.good,T.ask,T.cm].forEach(KEYT);
[T.spec,T.h1,T.h2,T.h3,T.g1,T.g2,T.out].forEach(t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.03)});
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 19px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* CIDCO चा अधिकृत video नाही · माहिती दि. 25 Oct 2026 पर्यंत</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ---- HOOK : plot aerial, 177 cr counter, ₹100 note ----
PB('L01_plot_aerial.jpg',0,T.why+.05,{s0:1.0,s1:1.14,y0:0,y1:30});SHADE(0,T.why);
CHIP(C('मेरूल',0),T.why,540,470,'नेरुळ · CIDCO plot',{bg:'#fff',fs:36,w:460});
A({t0:C('एक्षे',2.3),t1:T.why,x:540,y:760,w:900,cls:'noshadow',html:`<div style="text-align:center"><div class="n" style="font:900 120px/1 P;background:linear-gradient(180deg,#fff1c9,#f2c063 50%,#c8892b);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 18px rgba(0,0,0,.55))">₹0</div><div style="font:800 40px/1.2 P;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.6)">कोटी</div></div>`,enter:'zoom',din:.4,sfx:'ticks',sfxv:.5,z:66,float:.05,draw:(t,lt,oo)=>{oo.el.querySelector('.n').textContent='₹'+Math.round(177*E.out(clamp(lt/.9)))}});
CHIP(C('वार्शिक',4.6),T.why,540,1030,'वार्षिक भाडं?',{bg:'#fff',fs:40,w:400});
OBJ(C('शंभर',5.7),T.why,540,1240,280,'O01_note100.png',{enter:'drop',din:.6,sfx:'thud',sfxv:.5,z:60,fn:(t,lt)=>({r:-8})});
BAN(C('शंभर',5.7)+.3,T.why,1450,'फक्त ₹100!',{fs:60,w:460,rot:-4,x:540});

// ---- WHY : lease, applies to your flat ----
PB('L02_lease_money.jpg',T.why,T.spec+.05,{s0:1.0,s1:1.1});SHADE(T.why,T.spec);
CARD2(C('सिड',7.7),T.spec,540,640,800,`<div style="font:700 36px/1.2 P;color:#cfd6e4">CIDCO जमीन</div><div style="font:800 64px/1.1 P;color:#f2dfb6"><s style="color:#ff8f86">विकत</s> नाही</div><div style="font:800 52px/1.2 P">60 वर्षांच्या lease वर!</div>`);
OBJ(C('साथ',9.3),T.spec,230,1050,150,'O03_hourglass.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:Math.sin(lt*2)*5})});
BAN(C('तुमचा',11.9),T.spec,1340,'हेच तुमच्या flat लाही लागू!',{icon:'warn',fs:42,is:72,w:720,rot:-2,x:560});

// ---- SPEC : plot details ----
PB('L01_plot_aerial_b.jpg',T.spec,T.flat+.05,{s0:1.1,s1:1.18});SHADE(T.spec,T.flat);
HN('₹',T.spec+.05,T.flat,'नेरुळ Plot 3, Sector 52A');
SPEC(C('सेक्टर',15.1),T.flat,[['जमीन','5,785 चौ.मी.'],['एकरकमी premium','₹177 कोटी'],['Stamp duty','₹8 कोटी'],['करार','60 वर्षं'],['वार्षिक भाडं','₹100']],{y:1050,ts:[C('पांच',17.1),C('प्रिमियम',20.1),C('स्टाम',22.9),C('करार',24.6),C('करार',24.6)+.4]});

// ---- FLAT vs LAND ----
PB('L03_building.jpg',T.flat,T.hits+.05,{s0:1.0,s1:1.08});SHADE(T.flat,T.hits);
CHIP(C('फ्लाट',26.8),T.hits,540,560,'Flat = तुमचा ✓',{bg:'#1f9a52',col:'#fff',fs:44,w:440});
A({t0:C('जमिन',29.9),t1:T.hits,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><rect class="g" x="40" y="1560" width="1000" height="200" rx="12" fill="rgba(214,52,42,.35)" stroke="#d6342a" stroke-width="7" stroke-dasharray="2400" stroke-dashoffset="2400"/></svg>`,enter:'fade',din:.1,float:0,z:40,draw:(t,lt,oo)=>{oo.el.querySelector('.g').style.strokeDashoffset=2400*(1-E.inout(clamp(lt/.8)))}});
BAN(C('जमिन',29.9)+.3,T.hits,1460,'जमीन = CIDCO ची (lease)',{fs:44,w:760,rot:0});
OBJ(C('लीजवर',32.3),T.hits,760,1030,220,'O04_lease_page.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:8})});
CHIP(C('माल',34.2),T.hits,330,1140,'मालकी CIDCO ची!',{bg:NAVY,col:'#f2dfb6',fs:36,w:400});

// ---- 3 HITS ----
TINT(T.hits,T.h1,'linear-gradient(180deg,#0d1729,#162644)',.15);
A({t0:T.hits+.05,t1:T.h1,x:540,y:900,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 76px/1.2 P;color:#fff">फटका <span style="color:#f2dfb6">3</span> ठिकाणी</div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.6,z:60,float:.05});
PB('L04_broker.jpg',T.h1,T.h2+.05,{s0:1.0,s1:1.08});SHADE(T.h1,T.h2);
HN(1,T.h1+.05,T.h2,'Resale');
IC2(C('अनोसी',40.5),T.h2,1100,'doc','CIDCO ची NOC',{w:620,fs:40,x:540});
IC2(C('ट्रांसफर',41.3),T.h2,1260,'coins','Transfer charges',{w:620,fs:40,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
PB('L05_demolition.jpg',T.h2,T.h3+.05,{s0:1.0,s1:1.08});SHADE(T.h2,T.h3);
HN(2,T.h2+.05,T.h3,'Redevelopment');
IC2(C('लेखी',45.6),T.h3,1180,'doc','CIDCO ची लेखी परवानगी लागते',{w:720,fs:36,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
PB('L06_old_building.jpg',T.h3,T.good+.05,{s0:1.0,s1:1.08});SHADE(T.h3,T.good);
HN(3,T.h3+.05,T.good,'60 वर्षं संपली तर?');
OBJ(C('लीज',48.5),T.good,175,1080,110,'O03_hourglass.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:180*E.inout(clamp((t-C('संपली',47.9))/.8))})});
IC2(C('नूतनी',49.0),T.good,1000,'cal','Lease नूतनीकरण',{w:560,fs:38,x:560});
IC2(C('प्रीमियम',50.7),T.good,1160,'coins','Premium लागू शकतो (दर CIDCO ठरवतं)',{w:580,fs:30,x:560,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
A({t0:C('वाशी',53.1),t1:T.good,x:540,y:1400,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:26px;padding:16px 26px;box-shadow:0 18px 44px rgba(0,0,0,.3)"><div style="position:relative;height:14px;border-radius:7px;background:#e2ddd4"><div class="p" style="position:absolute;left:0;top:0;bottom:0;width:0;border-radius:7px;background:linear-gradient(90deg,#c9a66f,#d6342a)"></div></div><div style="display:flex;justify-content:space-between;font:700 28px/1.4 P;color:#444;margin-top:8px"><span>1975 वाशी / CBD</span><span style="color:${RED}">60 वर्षं = 2035</span></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.5,z:66,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.p').style.width=(85*E.inout(clamp(lt/1.4)))+'%'}});

// ---- GOOD NEWS ----
TINT(T.good,T.g1,'linear-gradient(180deg,#0d2a1a,#164a2e)',.15);
A({t0:T.good+.05,t1:T.g1,x:540,y:900,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 72px/1.2 P;color:#fff">पण <span style="color:#7fe0a4">2 चांगल्या</span><br>बातम्या!</div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.6,z:60,float:.05});
PB('L07_high_court.jpg',T.g1,T.g2+.05,{s0:1.0,s1:1.1});SHADE(T.g1,T.g2);
HN(1,T.g1+.05,T.g2,'High Court, 9 Oct 2026');
CARD2(C('फेबरुवरी',62.0),T.g2,540,860,820,`<div style="font:700 34px/1.3 P;color:#cfd6e4">8 फेब्रुवारी 1990 आधीचा lease करार,</div><div style="font:800 44px/1.25 P;color:#f2dfb6">transfer charge ची अट नसेल तर</div><div style="font:800 52px/1.2 P;color:#7fe0a4">CIDCO मागू शकत नाही!</div>`);
A({t0:C('24',69.0),t1:T.g2,x:540,y:1300,w:600,cls:'noshadow',html:`<div style="text-align:center;position:relative"><div style="font:900 80px/1 P;color:#fff;text-shadow:0 6px 18px rgba(0,0,0,.6)">₹24.58 लाख</div><div class="st" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-14deg) scale(0);border:8px solid ${RED};border-radius:16px;padding:8px 22px 4px;font:900 60px/1 P;color:${RED};background:rgba(255,255,255,.85)">रद्द</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:66,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.transform=`translate(-50%,-50%) rotate(-14deg) scale(${E.out(clamp((t-C('रद्ध',70.4))/.3))})`}});
sfx(C('रद्ध',70.4),'stamp',.9);
PB('L08_society_key.jpg',T.g2,T.ask+.05,{s0:1.0,s1:1.08});SHADE(T.g2,T.ask);
HN(2,T.g2+.05,T.ask,'Freehold, जुलै 2025 पासून');
A({t0:C('लीज',73.1),t1:T.ask,x:540,y:1060,w:900,cls:'noshadow',html:`<div style="display:flex;align-items:center;justify-content:center;gap:22px"><div style="background:rgba(255,255,255,.95);border-radius:24px;padding:18px 26px;font:800 40px/1.1 P;color:#9a958c;text-decoration:line-through">Leasehold</div><div style="font:900 70px/1 P;color:#f2dfb6;text-shadow:0 4px 12px rgba(0,0,0,.5)">→</div><div style="background:#1f9a52;border-radius:24px;padding:18px 26px;font:800 40px/1.1 P;color:#fff">Freehold</div></div>`,enter:'pop',din:.45,sfx:'pop',sfxv:.6,z:66,float:.05});
CHIP(C('कायम',76.6),T.ask,540,1250,'जमीन कायमची society ची',{bg:'#fff',fs:36,w:620});
CHIP(C('बंद',79.1),T.ask,540,1400,'Transfer charges बंद ✓',{bg:'#1f9a52',col:'#fff',fs:38,w:560});

// ---- ASK : 2 questions ----
PB('L04_broker.jpg',T.ask,T.cm+.05,{s0:1.06,s1:1.12,filter:'brightness(.75)'});SHADE(T.ask,T.cm);
A({t0:T.ask+.05,t1:T.cm,x:540,y:520,w:800,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:20px 30px 16px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 44px/1.25 P;color:#111">Flat घेताना broker ला<br><span style="color:${RED}">2 प्रश्न</span> विचारा</div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
IC2(C('लीज',83.1),T.cm,1000,'cal','Lease किती वर्षं उरली?',{w:760,fs:40,x:540,end:`<div style="width:52px;flex:none;margin-left:auto">${ICO.tick}</div>`});
IC2(C('सुसाइटी',85.1),T.cm,1170,'doc','Society ने freehold अर्ज केला?',{w:760,fs:38,x:540,end:`<div style="width:52px;flex:none;margin-left:auto">${ICO.tick}</div>`});

// ---- CTA ----
PB('L08_society_key.jpg',T.cm,T.out+.05,{s0:1.1,s1:1.18,filter:'brightness(.55) blur(4px)'});
A({t0:T.cm+.05,t1:T.out,x:540,y:540,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 46px/1.25 P;color:#111">तुमच्या society ची lease<br><span style="color:${RED}">किती वर्षं उरली, माहीत आहे?</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
CHIP(C('हो',91.4),T.out,330,820,'हो',{bg:'#1f9a52',col:'#fff',fs:50,w:240,ic:'tick'});
CHIP(C('नाही',92.1),T.out,750,820,'नाही',{bg:RED,col:'#fff',fs:50,w:280,ic:'cross'});
{const tc=C('कमेंट',93.4);
 CHIP(C('नोड',93.0),T.out,540,1020,'+ तुमचा node Comment करा!',{bg:NAVY,col:'#fff',fs:38,w:680,ic:'chat',fn:t=>({s:(t>tc+.6&&t<tc+.8?.93:1)})});
 A({t0:tc+.2,t1:C('हाँ',94.1)+.5,x:760,y:1080,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.65,'click',.8);}
A({t0:C('ग्रूप',95.3)-.4,t1:T.out,x:540,y:1250,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:4px solid #fff;color:#fff;border-radius:999px;padding:16px 36px 14px 18px;box-shadow:0 18px 44px rgba(0,0,0,.4)"><div style="width:66px">${ICO.wa}</div><div style="font:800 38px/1.15 P;text-align:left">Society group वर<br>पाठवा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['माहितीसाठी',C('महिती',97.2),'gd']],{st:'font:800 60px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',99.2);
A({t0:C('पेजला',98.8)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
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
