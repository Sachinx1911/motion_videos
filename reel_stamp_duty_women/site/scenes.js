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

// ===== Stamp duty - महिलांना 1% सूट (SRS Dwell). New transition: GOLD COIN FLIP (rupee coin spins across, reveals next scene)
const COIN=(t)=>{A({t0:t-.35,t1:t+.35,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;position:relative"><div class="cv" style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,#f7e2b0,#c9a66f 45%,#8a6a3c);clip-path:circle(0% at 50% 50%)"></div><div class="cc" style="position:absolute;left:50%;top:50%;width:260px;height:260px;margin:-130px 0 0 -130px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3cf,#e2bd72 45%,#9c7a45);box-shadow:0 0 60px rgba(242,192,99,.8),inset 0 0 0 10px rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font:900 150px/1 P;color:#7a5a2a">₹</div></div>`,enter:'fade',din:.01,float:0,z:700,sfx:null,
 draw:(tt,lt,oo)=>{const p=lt/.7;const open=p<.5?E.inout(p/.5):1-E.inout((p-.5)/.5);oo.el.querySelector('.cv').style.clipPath=`circle(${open*80}% at 50% 50%)`;const c=oo.el.querySelector('.cc');c.style.transform=`rotateY(${p*720}deg) scale(${.4+open*.9})`;c.style.opacity=Math.min(1,open*2)}});
 sfx(t-.3,'swoosh',.7);sfx(t,'thud',.4);punch(t,.03)};
const PCT=(t0,t1,x,y,lbl,a,b,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'noshadow',html:`<div style="background:#fff;border-radius:28px;padding:18px 22px 16px;box-shadow:0 18px 44px rgba(0,0,0,.3);text-align:center"><div style="font:800 36px/1.2 P;color:#111">${lbl}</div><div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-top:6px"><div style="text-align:center"><div style="font:700 26px/1 P;color:#666">पुरुष</div><div style="font:900 74px/1.1 P;color:#888;position:relative">${a}%<div class="st" style="position:absolute;left:-6px;right:-6px;top:50%;height:8px;background:${RED};transform:scaleX(0);transform-origin:left"></div></div></div><div style="font:900 50px/1 P;color:${GOLD}">→</div><div class="w" style="text-align:center;opacity:0"><div style="font:700 26px/1 P;color:#c2185b">महिला</div><div style="font:900 84px/1.1 P;background:linear-gradient(180deg,#f7e2b0,#c9a66f 55%,#9c7a45);-webkit-background-clip:text;color:transparent">${b}%</div></div></div></div>`,enter:'up',din:.45,sfx:'pop',sfxv:.6,z:66,float:.05,
 draw:(t,lt,oo)=>{const k=o.tk;oo.el.querySelector('.st').style.transform=`scaleX(${E.out(clamp((t-k)/.3))})`;oo.el.querySelector('.w').style.opacity=clamp((t-k-.15)/.3)}},o));
const CNT=(t0,t1,x,y,pre,to,unit,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||760,cls:'noshadow',html:`<div style="text-align:center"><div style="font:700 ${o.fs1||40}px/1.2 P;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.6)">${pre}</div><div class="n" style="font:900 ${o.fs||150}px/1 P;background:linear-gradient(180deg,#fff1c9,#f2c063 50%,#c8892b);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 6px 18px rgba(0,0,0,.55))">₹0</div><div style="font:800 40px/1.2 P;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.6)">${unit}</div></div>`,enter:'zoom',din:.4,sfx:'ticks',sfxv:.5,z:66,float:.05,
 draw:(t,lt,oo)=>{const v=Math.round(to*E.out(clamp(lt/.9)));oo.el.querySelector('.n').textContent='₹'+v.toLocaleString('en-IN')}},o));

function buildScenes(){
const END=79.0;
const T={hook:0,rate:C('आईका',6.3),save:C('पन्नास',17.1),myth:C('अनेक',23.4),cond:C('पंड',33.7),c1:C('एक',35.7),c2:C('दोन',42.0),c3:C('3',52.0),plan:C('मुणं',55.8),cm:C('आता',64.3),out:C('अशाच',74.6)};
const SEC=[0,T.rate,T.save,T.myth,T.cond,T.c1,T.c2,T.c3,T.plan,T.cm,T.out,END];
[T.rate,T.save,T.myth,T.cond,T.plan,T.cm].forEach(COIN);
[T.c1,T.c2,T.c3,T.out].forEach(t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.03)});
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* व्यवहाराआधी दुय्यम निबंधक / IGR वर खात्री करा</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ---- HOOK : wife with keys ----
PB('N01_hook_keys.jpg',0,T.rate+.05,{s0:1.0,s1:1.14,y0:0,y1:30});SHADE(0,T.rate);
A({t0:.05,t1:T.rate,x:540,y:520,w:820,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:30px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center"><div style="font:800 48px/1.2 P;color:#111">₹50 लाखांचं घर घेताय?</div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.6,z:66,float:.04});
BAN(C('नाव',2.7),T.rate,1040,'फक्त एक नाव बदला!',{icon:'warn',fs:62,is:80,rot:-4,w:820,bg:1});
CNT(C('थेट',3.6),T.rate,540,1290,'थेट वाचवा',50000,'रुपये!',{fs:140});
PART({type:'sparks',t0:C('थेट',3.6)+.8,t1:C('थेट',3.6)+1.1,n:70,seed:3,x:540,y:1290,speed:800,color:GOLD});

// ---- RATES : registrar office ----
PB('N02_registrar.jpg',T.rate,T.save+.05,{filter:'brightness(.7)'});SHADE(T.rate,T.save);
HN('₹',T.rate+.05,T.save,'Stamp Duty किती?');
PCT(C('मुंबई',9.5),T.save,540,820,'मुंबई',6,5,{tk:C('महिले',13.5),w:560});
PCT(C('पुणे',10.7),T.save,540,1140,'पुणे · ठाणे · नागपूर',7,6,{tk:C('महिले',13.5)+.3,w:620});
BAN(C('कमी',16.3)-.2,T.save,1400,'महिलेच्या नावावर = 1% कमी!',{fs:46,w:820,rot:-2});

// ---- SAVINGS : money ----
PB('N04_money_agreement.jpg',T.save,T.myth+.05,{s0:1.05,s1:1.15,filter:'brightness(.75) blur(1px)'});SHADE(T.save,T.myth);
A({t0:T.save+.05,t1:T.myth,x:540,y:620,w:860,cls:'noshadow',html:`<div style="background:linear-gradient(160deg,rgba(13,23,41,.92),rgba(27,42,69,.92));border:3px solid #c9a66f;border-radius:30px;padding:24px 30px 20px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff"><div style="font:700 38px/1.2 P;color:#cfd6e4">₹50 लाखांचं घर</div><div class="a" style="font:900 96px/1.1 P;color:#f2dfb6">₹0</div><div style="font:700 32px/1.2 P">वाचतात</div></div>`,enter:'left',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.a').textContent='₹'+Math.round(50000*E.out(clamp((t-C('पन्नास',18.5))/.8))).toLocaleString('en-IN')}});
A({t0:C('एक',19.9),t1:T.myth,x:540,y:1060,w:860,cls:'noshadow',html:`<div style="background:linear-gradient(160deg,rgba(13,23,41,.92),rgba(27,42,69,.92));border:3px solid #c9a66f;border-radius:30px;padding:24px 30px 20px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff"><div style="font:700 38px/1.2 P;color:#cfd6e4">₹1 कोटीचं घर</div><div class="a" style="font:900 110px/1.1 P;background:linear-gradient(180deg,#fff1c9,#f2c063 50%,#c8892b);-webkit-background-clip:text;color:transparent">₹0</div><div style="font:700 32px/1.2 P">वाचतात!</div></div>`,enter:'right',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.a').textContent='₹'+Math.round(100000*E.out(clamp((t-C('लाख',22.1))/.8))).toLocaleString('en-IN')}});
PART({type:'sparks',t0:C('लाख',22.1)+.7,t1:C('लाख',22.1)+1,n:80,seed:5,x:540,y:1060,speed:900,color:GOLD});

// ---- MYTH : padlock door ----
PB('N05_padlock_door.jpg',T.myth,T.cond+.05,{s0:1.0,s1:1.12});SHADE(T.myth,T.cond);
A({t0:T.myth+.05,t1:T.cond,x:540,y:520,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:30px;padding:20px 28px 16px;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:center"><div style="font:700 36px/1.2 P;color:#666">अनेक जण म्हणतात...</div><div style="font:800 46px/1.25 P;color:#111">"<span class="y" style="position:relative">15 वर्षं<span class="st" style="position:absolute;left:-6px;right:-6px;top:52%;height:9px;background:${RED};transform:scaleX(0);transform-origin:left"></span></span> घर विकताच येत नाही!"</div></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04,draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.transform=`scaleX(${E.out(clamp((t-C('अट',28.3))/.35))})`}});
A({t0:C('रद्द',29.9)-.1,t1:T.cond,x:540,y:1000,w:760,cls:'noshadow',html:`<div style="text-align:center"><div style="display:inline-block;transform:rotate(-8deg);border:9px solid #1f9a52;border-radius:22px;padding:16px 34px 10px;background:rgba(255,255,255,.88);font:900 64px/1.1 P;color:#1f9a52">2023 मध्येच<br>रद्द ✓</div></div>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.9,z:70,float:0});shake(C('रद्द',29.9)+.2,9);
OBJ(C('आता',30.4),T.cond,540,1330,220,'O01_padlock.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:Math.sin(lt*2)*6})});
CHIP(C('कधी',31.9),T.cond,540,1480,'आता कधीही, कोणालाही विका!',{bg:'#1f9a52',col:'#fff',fs:40,w:640});

// ---- 3 CONDITIONS title ----
TINT(T.cond,T.c1,'linear-gradient(180deg,#0d1729,#162644)',.15);
A({t0:T.cond+.05,t1:T.c1,x:540,y:760,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 70px/1.2 P;color:#fff">पण <span style="background:linear-gradient(180deg,#fff1c9,#f2c063 50%,#c8892b);-webkit-background-clip:text;color:transparent">3 अटी</span><br>लक्षात ठेवा!</div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.6,z:60,float:.05});
[0,1,2].forEach(i=>A({t0:C('तीन',34.1)+.2+i*.18,t1:T.c1,x:300+i*240,y:1120,w:200,cls:'noshadow',html:`<div style="width:180px;height:180px;border-radius:40px;background:linear-gradient(145deg,#d9b67a,#a9824c);display:flex;align-items:center;justify-content:center;font:900 110px/1 P;color:${NAVY};box-shadow:0 18px 40px rgba(0,0,0,.4)">${i+1}</div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.5,z:60,float:.15}));

// ---- C1 : only homes - 2x2 tiles ----
TINT(T.c1,T.c2,'radial-gradient(ellipse 80% 60% at 50% 50%,#fbf7f0,#e3d9c9)',.2);
HN(1,T.c1+.05,T.c2,'फक्त घरासाठी');
[['N09_flat_tower.jpg','Flat',C('फ्लाट',37.4),330,740,1],['N10_bungalow.jpg','Bungalow / Row house',C('बंगलो',37.9),750,740,1],['N11_commercial.jpg','दुकान / Office',C('दुकान',39.4),330,1120,0],['N12_plot.jpg','जमीन',C('जमीनीला',40.6),750,1120,0]].forEach(([img,lb,t0,x,y,ok])=>{
 PHOTO(t0,T.c2,x,y,360,300,img,{allowOver:1,filter:ok?'':'grayscale(.6)'});
 CHIP(t0+.15,T.c2,x,y+150,lb,{col:ok?'#111':RED,ic:ok?'tick':'cross',fs:30,w:380,z:69,allowOver:1});});
BAN(C('सूट',41.4),T.c2,1420,'दुकान, office, जमीन = सूट नाही',{fs:40,w:820,rot:-2});

// ---- C2 : only women ----
PB('N06_three_gen.jpg',T.c2,C('अणिहो',46.4)+.05,{s0:1.0,s1:1.1});SHADE(T.c2,C('अणिहो',46.4));
HN(2,T.c2+.05,C('अणिहो',46.4),'खरेदीदार फक्त महिला');
[['आई',C('आई',44.5),250],['पत्नी',C('पत्नी',45.0),450],['बहीण',C('बहीन',45.6),650],['मुलगी',C('मुल्गी',46.1),850]].forEach(([s,t0,x])=>CHIP(t0,C('अणिहो',46.4),x,1400,s,{bg:'#fff',col:'#c2185b',fs:40,w:200,ic:'tick'}));
PB('N07_couple_sign.jpg',C('अणिहो',46.4),T.c3+.05,{s0:1.05,s1:1.12});SHADE(C('अणिहो',46.4),T.c3);
HN(2,C('अणिहो',46.4),T.c3,'खरेदीदार फक्त महिला');
BAN(C('जोडला',48.2),T.c3,900,'नवऱ्याचं नाव जोडलं<br>= सूट गेली!',{icon:'warn',fs:54,is:90,w:820,rot:-4});shake(C('जोडला',48.2)+.15,10);
CHIP(C('असेल',50.4),T.c3,540,1200,'सह-मालक? तीही महिलाच हवी',{bg:NAVY,col:'#fff',fs:38,w:680});

// ---- C3 : registration fee ----
PB('N02_registrar.jpg',T.c3,T.plan+.05,{s0:1.12,s1:1.2,filter:'brightness(.6) blur(2px)'});
HN(3,T.c3+.05,T.plan,'Registration Fee');
PHOTO(C('रजिस्ट्रेशन',52.6),T.plan,540,900,400,520,'O02_stamp_card.jpg',{enter:'rise',din:.5,z:55});
A({t0:C('फी',53.2),t1:T.plan,x:540,y:900,w:360,cls:'noshadow',html:`<div style="text-align:center;font:800 40px/1.3 P;color:${NAVY}">Registration Fee<br><span style="font-size:56px">1%</span><br><span style="font:700 28px/1.3 P;color:#555">(कमाल ₹30,000)</span></div>`,enter:'fade',din:.35,z:58,float:0,allowOver:1});
IC2(C('सार्खीच',54.4)-.3,T.plan,1300,'people','सगळ्यांना सारखीच - सूट नाही',{w:760,fs:38,x:540});

// ---- PLAN : couple planning ----
PB('N08_planning.jpg',T.plan,T.cm+.05,{s0:1.0,s1:1.1});SHADE(T.plan,T.cm);
A({t0:T.plan+.05,t1:T.cm,x:540,y:480,w:760,cls:'noshadow',html:`<div style="text-align:center"><span style="display:inline-block;background:#fff;border-radius:999px;padding:16px 36px 12px;font:800 48px/1 P;color:#111;box-shadow:0 16px 40px rgba(0,0,0,.3)">घर घेण्याआधी विचार करा</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:70,float:.04});
IC2(C('लोन',57.7),T.cm,700,'doc','Loan कोणाच्या नावावर?',{w:720,fs:40});
IC2(C('EMI',59.0),T.cm,860,'coins','EMI कोण भरणार?',{w:720,fs:40});
IC2(C('नावावर',61.5)-.4,T.cm,1020,'home','घर कोणाच्या नावावर?',{w:720,fs:40});
BAN(C('नंतर',61.9),T.cm,1260,'नंतर नाव बदललं<br>= परत Stamp Duty!',{icon:'warn',fs:46,is:80,w:780,rot:-2});

// ---- CTA ----
PB('N01_hook_keys.jpg',T.cm,T.out+.05,{s0:1.12,s1:1.2,filter:'brightness(.55) blur(4px)'});
A({t0:T.cm+.05,t1:T.out,x:540,y:540,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 52px/1.25 P;color:#111">तुमचं घर<br><span style="color:${RED}">कोणाच्या नावावर?</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
[['1','स्वतःच्या',C('स्वताहचा',67.3),300],['2','पत्नीच्या',C('पत्नीचा',68.5),540],['3','दोघांच्या',C('दोघानचा',69.7),780]].forEach(([n,s,t0,x])=>A({t0:t0-.2,t1:T.out,x,y:850,w:220,cls:'noshadow',html:`<div style="width:210px;height:200px;border-radius:26px;background:linear-gradient(160deg,#1b2a45,#0d1729);border:3px solid #c9a66f;box-shadow:0 18px 40px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><div style="font:900 80px/1 P;color:#f2dfb6">${n}</div><div style="font:800 32px/1.1 P;color:#fff">${s}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:62,float:.06}));
{const tc=C('कॉमेंट',71.3);
 CHIP(C('नंबर',70.9),T.out,540,1080,'फक्त नंबर Comment करा!',{bg:NAVY,col:'#fff',fs:42,w:620,ic:'chat',fn:t=>({s:(t>tc+.6&&t<tc+.8?.93:1)})});
 A({t0:tc+.2,t1:C('वीडियो',72.3)+.5,x:740,y:1140,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.65,'click',.8);}
A({t0:C('मित्राला',73.2)-.3,t1:T.out,x:540,y:1250,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:4px solid #fff;color:#fff;border-radius:999px;padding:16px 36px 14px 18px;box-shadow:0 18px 44px rgba(0,0,0,.4)"><div style="width:66px">${ICO.wa}</div><div style="font:800 38px/1.15 P;text-align:left">घर घेणाऱ्या मित्राला<br>पाठवा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['real',C('रियल',75.0),'ser gd'],['estate',C('एस्टेट',75.3),'ser gd'],['माहितीसाठी',C('महिती',75.6),'']],{st:'font:800 58px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉ',77.6);
A({t0:C('पेजला',77.2)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
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
