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

// ===== एक चुकीचा आकडा - CIDCO bid error (SRS Dwell). LOOK: dark cinematic, auction-terminal UI (mono digits, cyan/amber glow), red ERROR glitch transition.
const CY='#5fd3ff',AM='#ffb347',DK='rgba(6,12,24,.86)';
const MONO="'Courier New',monospace";
const TERM=(t0,t1,x,y,w,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:${DK};border:2px solid rgba(95,211,255,.55);border-radius:18px;padding:${o.pad||'18px 24px'};box-shadow:0 0 40px rgba(95,211,255,.25),inset 0 0 30px rgba(95,211,255,.08);color:#e8f6ff;backdrop-filter:blur(4px)">${html}</div>`,enter:'zoom',din:.35,sfx:'whoosh',sfxv:.5,z:66,float:.03},o));
const GLITCH=(t)=>{A({t0:t-.22,t1:t+.22,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;position:relative;overflow:hidden"><div class="b" style="position:absolute;inset:0;background:#000"></div>${[0,1,2,3,4,5].map(i=>`<div class="s${i}" style="position:absolute;left:0;right:0;height:${60+i*25}px;background:${i%2?'rgba(214,52,42,.85)':'rgba(95,211,255,.6)'};mix-blend-mode:screen"></div>`).join('')}<div class="e" style="position:absolute;left:0;right:0;top:880px;text-align:center;font:900 140px/1 P;color:#ff3b30;letter-spacing:8px;text-shadow:6px 0 #5fd3ff,-6px 0 #ff3b30">ERROR</div></div>`,enter:'fade',din:.01,float:0,z:700,sfx:null,
 draw:(tt,lt,oo)=>{const p=lt/.44;const k=p<.5?p/.5:1-(p-.5)/.5;oo.el.querySelector('.b').style.opacity=k*.9;for(let i=0;i<6;i++){const s=oo.el.querySelector('.s'+i);s.style.top=(((i*373+Math.floor(tt*60)*97)%1800))+'px';s.style.opacity=k;s.style.transform=`translateX(${Math.sin(tt*90+i)*60}px)`}const e=oo.el.querySelector('.e');e.style.opacity=k>.5?1:0;e.style.transform=`translateX(${Math.sin(tt*120)*14}px)`}});
 sfx(t-.2,'buzz',.55);punch(t,.04);shake(t,8)};
const DIG=(t0,t1,x,y,from,to,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||900,cls:'noshadow',html:`<div style="text-align:center"><div style="font:700 ${o.fs1||34}px/1.2 P;color:${o.lc||'#cfe9ff'};text-shadow:0 2px 10px #000">${o.label||''}</div><div class="n" style="font:800 ${o.fs||120}px/1.05 ${MONO};color:${o.col||AM};text-shadow:0 0 30px ${o.col||AM},0 4px 18px #000">0</div><div style="font:600 ${o.fs2||28}px/1.3 P;color:#9fb7cc;text-shadow:0 2px 10px #000">${o.sub||''}</div></div>`,enter:'fade',din:.2,sfx:'ticks',sfxv:.5,z:66,float:.03,
 draw:(t,lt,oo)=>{const p=E.out(clamp(lt/(o.dur||1.1)));const v=from+(to-from)*p;oo.el.querySelector('.n').textContent=(o.pre||'₹')+(o.fmt?o.fmt(v):Math.round(v).toLocaleString('en-IN'))+(o.post||'')}},o));
const SCAN=(t0,t1)=>A({t0,t1,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 2px,transparent 2px 5px);pointer-events:none"></div>`,enter:'fade',din:.3,float:0,z:640});
const DARK=(img,t0,t1,o={})=>{BG(Object.assign({img,t0,t1,s0:1.0,s1:1.1,fade:.25,filter:'brightness(.7) saturate(.9)'},o));TINT(t0,t1,'linear-gradient(180deg,rgba(2,6,14,.55),rgba(2,6,14,.1) 35%,rgba(2,6,14,.2) 65%,rgba(2,6,14,.75))',.25)};
const NEON=(t0,t1,y,html,o={})=>A(Object.assign({t0,t1,x:540,y,w:o.w||860,cls:'noshadow',html:`<div style="text-align:center;font:800 ${o.fs||56}px/1.2 P;color:#fff;text-shadow:0 0 18px ${o.glow||CY},0 4px 14px #000">${html}</div>`,enter:'fade',din:.3,sfx:'whoosh',sfxv:.45,z:66,float:.04},o));
const TAG=(t0,t1,x,y,txt,col,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||420,cls:'chipw',html:`<span style="display:inline-block;font:700 ${o.fs||34}px/1 P;padding:14px 24px 11px;border-radius:10px;border:2px solid ${col};color:${col};background:rgba(4,10,20,.8);box-shadow:0 0 18px ${col}55">${txt}</span>`,enter:'pop',din:.3,sfx:'pop',sfxv:.5,z:68,float:.05},o));

const CARD2=(t0,t1,x,y,w,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html,enter:'up',din:.45,z:66},o));
function buildScenes(){
const END=98.8;
const T={plot:C('तलोजा',8.9),proof:C('ये',20.5),guess:C('एकुन',35.7)-.6,rule:C('आता',41.7),vc:C('निर्णये',54.0),strict:C('मनचे',57.8),four:C('मणुन',68.9),cm:C('आता',87.0),out:C('अशाच',95.28)};
[T.plot,T.guess,T.rule,T.strict,T.four,T.cm].forEach(GLITCH);
[T.proof,T.vc,T.out].forEach(t=>{flash(t,.25,'#cfe9ff');sfx(t-.12,'whoosh',.5);punch(t,.03)});
SCAN(0,T.out);
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 0 20px rgba(95,211,255,.3)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:650});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 18px/1.35 P;color:#cfe9ff;background:rgba(4,10,20,.8);border:1px solid rgba(95,211,255,.4);border-radius:10px;padding:8px 12px 6px;white-space:nowrap;line-height:1.4">* CIDCO निकाल, स्कीम 51 (जुलै 2026)<br>bidder चं नाव दिलेलं नाही · अधिकृत video नाही</span></div>`,enter:'fade',din:.5,float:0,z:650});

// ---- HOOK : laptop at night, 35 cr -> 2170 cr ----
DARK('E01_laptop_night.jpg',0,T.plot+.05,{s0:1.0,s1:1.16,y0:0,y1:40});
NEON(0.05,T.plot,500,`एक <span style="color:#ff3b30">चुकीचा</span> आकडा`,{fs:68,glow:'#ff3b30'});
DIG(C('35',1.6),C('2170',3.3),540,820,0,35,{label:'Plot ची खरी किंमत',post:' कोटी',col:CY,fs:110,sub:'(खरी पुढची बोली ₹2.89 लाख/चौ.मी.)',dur:.6});
DIG(C('2170',3.3),T.plot,540,820,35,2170,{label:'आणि झाली...',post:' कोटी',col:'#ff3b30',fs:120,sub:'(हिशोब: ₹1.81 कोटी × 1,199 चौ.मी.)',dur:1.2,sfx:'riser'});
shake(C('2170',3.3)+1.2,10);
TAG(C('आक्षन',6.2),T.plot,540,1300,'CIDCO auction · bid आधी हे बघा',AM,{w:640,fs:32});

// ---- PLOT : Taloja dusk, base vs bid ----
DARK('E02_plot_dusk_b.jpg',T.plot,T.proof+.05,{s0:1.12,s1:1.0});
A({t0:T.plot+.1,t1:T.proof,x:420,y:900,w:300,cls:'noshadow',html:`<svg viewBox="0 0 300 300" width="300"><rect class="r" x="20" y="20" width="260" height="260" rx="6" fill="rgba(95,211,255,.12)" stroke="${CY}" stroke-width="6" stroke-dasharray="1100" stroke-dashoffset="1100" style="filter:drop-shadow(0 0 10px ${CY})"/></svg>`,enter:'fade',din:.1,float:0,z:40,draw:(t,lt,oo)=>{oo.el.querySelector('.r').style.strokeDashoffset=1100*(1-E.inout(clamp(lt/.9)))}});
TAG(C('तलोजा',8.9)+.2,T.proof,540,480,'तळोजा · Sector 10 · ~1,200 चौ.मी.',CY,{w:700,fs:34});
TERM(C('बेस',12.0),T.proof,540,1220,820,`<div style="display:flex;justify-content:space-between;align-items:center;font:600 28px/1.6 P;color:#9fb7cc"><span>BASE RATE / चौ.मी.</span><span style="font:800 46px/1 ${MONO};color:${CY}">₹75,500</span></div><div class="bid" style="display:flex;justify-content:space-between;align-items:center;font:600 28px/1.6 P;color:#9fb7cc;opacity:0;border-top:1px solid rgba(95,211,255,.3);margin-top:8px;padding-top:8px"><span>एका bidder ची बोली</span><span style="font:800 46px/1 ${MONO};color:#ff3b30;text-shadow:0 0 16px #ff3b30">₹1,81,00,000</span></div>`,{pad:'16px 26px',draw:(t,lt,oo)=>{oo.el.querySelector('.bid').style.opacity=clamp((t-C('एक',17.1))/.3)}});

// ---- PROOF : 3 bids table, 4 minutes, x200 ----
DARK('E01_laptop_night.jpg',T.proof,T.guess+.05,{s0:1.2,s1:1.28,y0:-80,y1:-80,filter:'brightness(.45) blur(3px)'});
NEON(T.proof+.05,T.guess,470,`हे <span style="color:${AM}">खरं</span> आहे`,{fs:60});
TAG(C('स्कीम',21.9),T.guess,540,590,'CIDCO स्कीम 51 · निकाल',CY,{w:520,fs:32});
TERM(C('तलोजाचा',23.5),T.guess,540,960,880,`<div style="font:700 24px/1.4 ${MONO};color:#9fb7cc;display:grid;grid-template-columns:1.3fr 1fr 1.4fr .9fr;gap:6px 10px;text-align:left"><span>PLOT</span><span>BASE</span><span>BID / चौ.मी.</span><span>TIME</span>${[['Sec 10 · 1&2','75,500','1,81,00,000','22:31'],['Sec 11 · 20','64,000','1,27,00,000','22:33'],['Sec 2 · 183','68,000','1,36,00,000','22:35']].map((r,i)=>`<span class="c${i}" style="color:#e8f6ff">${r[0]}</span><span class="c${i}" style="color:${CY}">${r[1]}</span><span class="c${i}" style="color:#ff3b30;font-weight:800">${r[2]}</span><span class="c${i}" style="color:${AM}">${r[3]}</span>`).join('')}</div>`,{pad:'18px 22px',draw:(t,lt,oo)=>{for(let i=0;i<3;i++)oo.el.querySelectorAll('.c'+i).forEach(e=>e.style.opacity=clamp((t-(C('तलोजाचा',23.5)+.5+i*.7))/.25))}});
TAG(C('चार',26.1),T.guess,330,1250,'⏱ 4 मिनिटांत',AM,{w:340,fs:36});
TAG(C('दोन',29.2),T.guess,750,1250,'× 200 पट',`#ff3b30`,{w:300,fs:40});
DIG(C('खरी',31.0),T.guess,540,1420,0,289500,{label:'खरी पुढची बोली (प्रति चौ.मी.)',col:CY,fs:72,dur:1.2,fs1:30,w:760});

// ---- GUESS : finger on Enter, total vs per sqm ----
DARK('E03_finger_enter.jpg',T.guess,T.rule+.05,{s0:1.0,s1:1.12});
NEON(T.guess+.05,T.rule,470,`म्हणजे <span style="color:${AM}">बहुधा...</span>`,{fs:58});
TERM(C('रक्कम',36.2),T.rule,540,780,820,`<div style="display:flex;align-items:center;justify-content:space-between;gap:16px"><div style="text-align:center"><div style="font:600 26px/1.3 P;color:#9fb7cc">टाकायचं होतं</div><div style="font:800 40px/1.2 P;color:${CY}">प्रति चौ.मी.</div></div><div class="sw" style="font:900 60px/1 P;color:${AM}">⇄</div><div style="text-align:center"><div style="font:600 26px/1.3 P;color:#9fb7cc">टाकली गेली</div><div style="font:800 40px/1.2 P;color:#ff3b30">एकूण रक्कम</div></div></div>`,{pad:'18px 28px',draw:(t,lt,oo)=>{oo.el.querySelector('.sw').style.transform=`rotate(${Math.sin(lt*3)*20}deg)`}});
OBJ(C('निकालात',38.7),T.rule,860,1150,200,'O03_enter_key.png',{enter:'drop',din:.5,sfx:'thud',sfxv:.5,z:60,allowOver:1});
A({t0:C('पहिला',40.3),t1:T.rule,x:450,y:1260,w:480,cls:'noshadow',html:`<div style="text-align:center"><div style="display:inline-block;transform:rotate(-8deg);border:7px solid #ff3b30;border-radius:14px;padding:10px 26px 6px;font:900 58px/1 P;color:#ff3b30;background:rgba(4,10,20,.85);box-shadow:0 0 30px #ff3b3088">RANK 1</div><div style="font:600 26px/1.4 P;color:#cfe9ff;margin-top:12px;text-shadow:0 2px 10px #000">निकालात आजही पहिल्या क्रमांकावर</div></div>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.9,z:70,float:0});

// ---- RULE : booklet + magnifier, clause 34 ----
DARK('E06_booklet_lamp.jpg',T.rule,T.vc+.05,{s0:1.0,s1:1.1,filter:'brightness(.85)'});
NEON(T.rule+.05,T.vc,470,`चूक झाली तर <span style="color:${AM}">काय होतं?</span>`,{fs:54});
OBJ(C('बुकलेट',44.5),T.vc,760,880,300,'O02_magnifier.png',{enter:'rise',din:.5,z:60,fn:(t,lt)=>({r:Math.sin(lt*1.5)*6})});
TERM(C('अवास्तव',46.4),T.vc,500,1170,780,`<div style="font:700 26px/1.3 ${MONO};color:${AM}">BOOKLET · CLAUSE 34</div><div style="font:700 34px/1.35 P;color:#e8f6ff;margin-top:6px">चुकीची, अवास्तव बोली + समाधानकारक कारण</div><div style="font:800 40px/1.3 P;color:${CY}">→ अनामत रक्कम परत</div><div class="m" style="font:800 40px/1.3 P;color:#ff3b30;opacity:0">पण 3% कापले जातात</div>`,{pad:'18px 26px',draw:(t,lt,oo)=>{oo.el.querySelector('.m').style.opacity=clamp((t-C('तीन',52.3))/.3)}});

// ---- VC & MD : govt building ----
DARK('E05_govt_building.jpg',T.vc,T.strict+.05,{s0:1.0,s1:1.1});
TAG(T.vc+.1,T.strict,540,560,'निर्णय कोण घेतं?',AM,{w:420,fs:36});
NEON(C('उपाध्यक्ष',55.2),T.strict,760,`सिडको चे<br><span style="color:${CY}">उपाध्यक्ष आणि<br>व्यवस्थापकीय संचालक</span>`,{fs:52});

// ---- STRICT : gavel ----
DARK('E07_gavel.jpg',T.strict,T.four+.05,{s0:1.05,s1:1.15,filter:'brightness(.9)'});
NEON(T.strict+.05,T.four,480,`परतावा <span style="color:#ff3b30">हक्क नाही</span>`,{fs:62,glow:'#ff3b30'});
TERM(C('क्लोज',62.0),T.four,540,1100,780,`<div style="font:800 40px/1.4 P;color:#e8f6ff">Close bid बदल: <span style="color:${AM}">फक्त 1 वेळा</span></div>`,{pad:'16px 24px'});
TERM(C('तीन',65.4),T.four,540,1280,780,`<div style="font:800 40px/1.4 P;color:#e8f6ff">3 महिन्यांत माघार → <span style="color:#ff3b30">EMD जप्त</span></div>`,{pad:'16px 24px',sfx:'stamp'});
sfx(C('घेतली',66.4),'thud',.6);shake(C('जब्त',68.4),9);

// ---- FOUR RULES : dawn desk ----
DARK('E08_dawn_desk.jpg',T.four,T.cm+.05,{s0:1.0,s1:1.08,filter:'brightness(.75)'});
NEON(T.four+.05,T.cm,470,`bid आधी <span style="color:${AM}">4 नियम</span>`,{fs:60});
[['बोली प्रति चौ.मी., एकूण नाही',C('एक',72.6)],['Submit आधी शून्य 2 दा मोजा',C('दोन',75.9)],['Close bid बदल फक्त 1 वेळा',C('तीन',79.0)],['Booklet वाचा: EMD कधी जप्त?',C('चार',82.2)]].forEach(([s,t0],i)=>TERM(t0,T.cm,540,650+i*175,820,`<div style="display:flex;align-items:center;gap:18px"><span style="font:800 46px/1 ${MONO};color:${AM}">0${i+1}</span><span style="font:700 36px/1.3 P;color:#e8f6ff;text-align:left">${s}</span><span style="margin-left:auto;font:800 40px/1 P;color:#4cd964">✓</span></div>`,{pad:'16px 24px',enter:'left',din:.4}));
OBJ(C('शुन्य',77.8),T.cm,880,1430,170,'O01_calculator.png',{enter:'rise',din:.5,z:60,allowOver:1});

// ---- CTA ----
DARK('E04_shocked_man.jpg',T.cm,T.out+.05,{s0:1.1,s1:1.18,filter:'brightness(.45) blur(4px)'});
NEON(T.cm+.05,T.out,520,`तुम्ही कधी online auction /<br><span style="color:${AM}">tender मध्ये भाग घेतला आहे?</span>`,{fs:48});
TAG(C('हो',91.0),T.out,330,800,'हो ✓','#4cd964',{w:240,fs:52});
TAG(C('की',91.2)+.2,T.out,750,800,'नाही ✕','#ff3b30',{w:280,fs:52});
{const tc=C('कॉमेंट',91.6);
 TAG(tc,T.out,540,1000,'💬 Comment करा!',CY,{w:480,fs:42});
 A({t0:tc+.2,t1:C('हाँ',92.4)+.5,x:700,y:1060,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.65,'click',.8);}
A({t0:C('मित्रानना',93.7)-.4,t1:T.out,x:540,y:1200,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:3px solid #fff;color:#fff;border-radius:999px;padding:14px 32px 12px 16px;box-shadow:0 0 24px #1f9a5288"><div style="width:60px">${ICO.wa}</div><div style="font:800 34px/1.15 P;text-align:left">plot घेणाऱ्या मित्रांना<br>पाठवा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#02060e,#0b1a30)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['माहितीसाठी',C('महिती',95.7),'gd']],{st:'font:800 60px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 0 60px rgba(95,211,255,.35)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',97.6);
A({t0:C('पेजला',97.2)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
A({t0:FT-.2,t1:END+1,x:760,y:1350,w:110,cls:'noshadow',html:CURSOR,enter:'up',din:.4,z:56,float:0,allowOver:1,fn:t=>({s:t>FT+.3&&t<FT+.5?.85:1})});
sfx(FT+.35,'click',.9);PART({type:'confetti',t0:FT+.4,t1:FT+.7,n:90,seed:41,x:540,y:-40,burst:1,life:2.5,colors:[CY,'#ffffff',AM,'#ff3b30']});
const NOBELL={ding:'pop',chime:'pop',bell:'thud',coin:'click',reveal:'whoosh',alert:'pop',question:'pop',sparkle:null};
for(let i=SFX.length-1;i>=0;i--){const m=NOBELL[SFX[i].type];if(m===undefined)continue;if(m===null)SFX.splice(i,1);else SFX[i].type=m}
// one sound per beat: within 0.15 s keep only the strongest (user: extra sounds)
{const PR={stamp:9,impact:8,thud:7,buzz:6,click:5,pop:4,riser:3,ticks:3,clock:3,whoosh:2,swoosh:1};SFX.sort((x,y)=>x.t-y.t);const keep=[];
 for(const e of SFX){const l=keep[keep.length-1];if(l&&e.t-l.t<.15){if((PR[e.type]||0)>(PR[l.type]||0))keep[keep.length-1]=e}else keep.push(e)}SFX.length=0;SFX.push(...keep)}
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
