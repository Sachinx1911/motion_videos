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
// ===== Bid-error reel v2 (storyboard v2: golden-hour photoreal + orange accent #ff8a2a) =====
// Times = Whisper word starts of vo_t.wav (cue_words.json, 99.12 s). Coordinates = storyboard x2.
const O='#ff8a2a',INK='#17191c',MUTE='#6b6f76';E.sine=E.sine||(p=>-(Math.cos(Math.PI*p)-1)/2);
const WC=(inner,l)=>`<div style="background:rgba(255,255,255,.95);border-radius:28px;box-shadow:0 16px 56px rgba(0,0,0,.28);padding:24px 32px;">${inner}</div>`;
const K=t=>`<div style="font:600 24px/1.3 P;letter-spacing:2px;color:${MUTE};text-transform:uppercase">${t}</div>`;
const CRD=(t0,t1,x,y,w,inner,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:WC(inner,o.l),enter:'up',din:.45,sfx:'whoosh',sfxv:.4,z:60,float:.05},o));
const PL=(t0,t1,x,y,txt,o={})=>A(Object.assign({t0,t1,x,y,w:o.w||800,cls:'chipw',html:`<span style="display:inline-block;background:${o.or?O:'#fff'};color:${o.or?'#fff':INK};font:700 ${o.fs||30}px/1 P;padding:18px 30px 14px;border-radius:999px;box-shadow:0 8px 28px rgba(0,0,0,.3);white-space:nowrap">${txt}</span>`,enter:'pop',din:.35,sfx:'pop',sfxv:.5,z:65,float:.05},o));
const TT=(t0,t1,y,words,o={})=>WORDS(t0,t1,o.x||540,y,o.w||980,words,{align:o.align||'center',st:`font:800 ${o.fs||66}px/1.2 P;color:#fff;text-shadow:0 4px 24px rgba(0,0,0,.6)`,z:62});
// self-drawing orange leader line with a glowing dot at the end
const LINE=(t0,t1,pts,o={})=>A({t0,t1,x:540,y:960,w:1080,cls:'noshadow',over:1,z:o.z||58,enter:'fade',din:.05,float:0,
  html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible"><path class="p" d="M${pts.map(p=>p.join(' ')).join(' L')}" fill="none" stroke="${O}" stroke-width="${o.sw||4}" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 6px rgba(255,138,42,.8))"/><circle class="c" cx="${pts[pts.length-1][0]}" cy="${pts[pts.length-1][1]}" r="12" fill="${O}" stroke="rgba(255,138,42,.35)" stroke-width="12" opacity="0"/></svg>`,
  draw:(t,lt,oo)=>{const p=oo.el.querySelector('.p');if(!oo.L)oo.L=p.getTotalLength();const q=E.inout(clamp(lt/(o.d||.55)));p.style.strokeDasharray=oo.L;p.style.strokeDashoffset=oo.L*(1-q);oo.el.querySelector('.c').setAttribute('opacity',q>.95?1:0)}});
const sfxAt=(t,n,v)=>sfx(t,n,v);
// scene background with Ken-Burns push toward (ox,oy); reveal = "orange frame opens" transition
let SCN=0;
function SC(img,t0,t1,o={}){const z=2+(SCN++);
  const bgc=img?`background:url(a/${img}) center/cover`:`background:${o.color||'#f7f6f3'}`;
  A({t0:t0-.001,t1:t1+.6,x:540,y:960,w:1080,cls:'noshadow',over:1,z,enter:'fade',din:.01,exit:'fade',dout:.01,float:0,
    html:`<div style="position:relative;width:1080px;height:1920px;overflow:hidden"><div class="im" style="position:absolute;inset:-8px;${bgc};transform-origin:${o.ox||540}px ${o.oy||960}px;filter:${o.filter||'none'}"></div>${o.dark?`<div style="position:absolute;left:0;top:0;bottom:0;width:720px;background:linear-gradient(90deg,rgba(20,23,28,.92) 62%,rgba(20,23,28,0))"></div>`:''}<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.30),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 72%,rgba(0,0,0,.25))"></div></div>`,
    draw:(t,lt,oo)=>{const p=E.sine(clamp((t-t0)/(t1-t0)));const q=t0>0?E.out(clamp((t-t0)/.5)):1;oo.el.querySelector('.im').style.transform=`translate(${lerp(0,o.dx||0,p)}px,${lerp(0,o.dy||0,p)}px) scale(${lerp(o.s0||1,o.s1||1.08,p)*lerp(1.07,1,q)})`;oo.el.style.opacity=q;
      oo.el.style.filter=`brightness(${1-.55*clamp((t-t1)/.3)})`}});
  if(t0>0){ // clean zoom-dissolve (no coloured frame - user, 26 Oct 2026)
    sfx(t0-.35,'whoosh',.55)}
}
const COUNT=(el,t,ta,tb,a,b,fmt)=>{const v=lerp(a,b,E.out(clamp((t-ta)/(tb-ta))));el.textContent=fmt(v)};
const INR=v=>Math.round(v).toLocaleString('en-IN');


function buildScenes(){
window.ANIM_SLOW=1.4;
// Repair or redevelopment (SRS Dwell). Look: monsoon-morning photoreal, plain white cards, red/amber only for danger. Times = cue_words.json (vo_t.wav 72.02 s).
const END=73.0;window.END=END;
const RD='#e5483b',AMB='#ffb020';
const S={s1:0,s2:6.16,s3:14.78,s4:23.64,s5:32.70,s6:43.88,s7:55.10,s8:63.04,s9:69.46};

// ---------- HUD ----------
A({t0:0,t1:S.s9,x:122,y:292,w:140,cls:'noshadow',html:`<div style="background:#fff;border-radius:16px;padding:10px 12px;box-shadow:0 4px 20px rgba(0,0,0,.25)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.4,float:0,z:600});
A({t0:.3,t1:S.s9,x:500,y:296,w:580,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:500 21px/1.4 P;color:#fff;background:rgba(20,22,26,.55);padding:9px 16px 7px;border-radius:12px">* NMMC धोकादायक इमारती यादी 2026-27<br>Model bye-law 76(a) · माहिती दि. 27 ऑक्टो 2026</span></div>`,enter:'fade',din:.4,float:0,z:600});

// ================= S1 HOOK =================
SC('R1_old_block.jpg',S.s1,S.s2,{ox:540,oy:900,s0:1.0,s1:1.12});
TT(0,S.s2,420,[['तीस',0],['वर्षं',.28],['झाली,',.62],['म्हणजे',1.12],['पाडा?',2.14,'o1']]);
A({t0:2.14,t1:S.s2,x:540,y:900,w:900,cls:'noshadow',enter:'pop',din:.3,sfx:'stamp',sfxv:.9,z:66,float:0,
  html:`<div style="display:flex;justify-content:center"><div style="position:relative;display:inline-block;border:8px solid ${RD};color:${RD};border-radius:20px;padding:16px 36px 10px;font:900 76px/1.1 P;background:rgba(255,255,255,.92);white-space:nowrap">30 वर्षं = पाडा?<div class="st" style="position:absolute;left:-10px;right:-10px;top:50%;height:10px;background:#17191c;transform-origin:left;transform:scaleX(0)"></div></div></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.st').style.transform=`scaleX(${E.out(clamp((t-5.28)/.35))})`}});
shake(2.2,10);punch(2.2,.04);
PL(5.28,S.s2,540,1120,'गैरसमज!',{or:1,w:420,fs:52});sfx(5.28,'impact',.6);

// ================= S2 504 =================
SC('R2_node_aerial.jpg',S.s2,S.s3,{ox:540,oy:1300,s0:1.0,s1:1.1});
PL(S.s2+.3,S.s3,540,430,'NMMC यादी 2026-27',{w:600,fs:36});
CRD(7.4,S.s3,540,640,560,`<div style="text-align:center">${K('धोकादायक इमारती')}<div class="b" style="font:900 120px/1.05 P;color:${INK}">0</div></div>`,{
  draw:(t,lt,oo)=>COUNT(oo.el.querySelector('.b'),t,8.2,9.3,0,504,v=>INR(v))});
sfx(8.2,'ticks',.45);
A({t0:10.9,t1:S.s3,x:500,y:810,w:760,cls:'noshadow',enter:'up',din:.4,z:62,float:0,sfx:'whoosh',sfxv:.4,
  html:`<div style="height:64px;border-radius:16px;overflow:hidden;display:flex;box-shadow:0 10px 30px rgba(0,0,0,.35);background:#fff"><div class="r" style="width:0;background:${RD}"></div><div class="a" style="flex:1;background:${AMB};opacity:0"></div></div>`,
  draw:(t,lt,oo)=>{oo.el.querySelector('.r').style.width=(10.3*E.out(clamp((t-11.66)/.5)))+'%';oo.el.querySelector('.a').style.opacity=clamp((t-11.66)/.4)}});
PL(11.66,S.s3,330,1000,'52 · रिकाम्या करून पाडा',{w:560,fs:32,col:RD,
  draw:(t,lt,oo)=>{oo.el.querySelector('span').style.color=RD}});
sfx(11.66,'thud',.7);

// ================= S3 REPAIR =================
SC('R3_repair_scaffold.jpg',S.s3,S.s4,{ox:540,oy:700,s0:1.0,s1:1.08});
TT(S.s3,S.s4,400,[['बाकीच्यांना',15.24],['दुरुस्ती!',17.38,'o1']],{fs:62});
CRD(16.16,S.s4,540,640,980,`<table style="width:100%;border-collapse:collapse;font:600 32px/1.6 P;color:${INK};text-align:left"><tr style="font:600 22px/1.4 P;letter-spacing:1.5px;color:${MUTE}"><td>गट</td><td>अर्थ</td><td style="text-align:right">इमारती</td></tr>${[['C-1','रिकामी करून पाडा','52',RD,15.0],['C-2A','घर सोडून दुरुस्ती','102','#c98a00',18.4],['C-2B','घर न सोडता दुरुस्ती','297',INK,21.78],['C-3','छोटी दुरुस्ती','53',INK,22.2]].map(([g,m,n,c,k],i)=>`<tr class="tr" data-k="${k}" style="border-top:2px solid #ece8e2"><td style="font-weight:800;color:${c}">${g}</td><td>${m}</td><td style="text-align:right;font-weight:800">${n}</td></tr>`).join('')}</table>`,{
  draw:(t,lt,oo)=>{oo.el.querySelectorAll('.tr').forEach(r=>{const q=clamp((t-(+r.dataset.k))/.25);r.style.opacity=Math.max(q,.0)})}});
[18.4,21.78].forEach(k=>sfx(k,'pop',.45));
PL(16.16,S.s4,540,1000,'452 · दुरुस्ती पुरेशी',{or:1,w:520,fs:36});

// ================= S4 OPTION, NOT FORCE =================
SC('R4_old_vs_new.jpg',S.s4,S.s5,{ox:300,oy:900,s0:1.06,s1:1.06,dx:-60});
TT(S.s4,S.s5,400,[['30',24.02],['वर्षं',24.38],['=',29.56],['पर्याय',29.56,'o1']],{fs:66});
CRD(25.4,S.s5,540,600,980,`<div style="text-align:center;font:700 34px/1.45 P;color:${INK}">सिडको building 30+ वर्षं →<br>redevelopment <span style="color:${O};white-space:nowrap">करू शकता</span></div><div style="text-align:center;margin-top:6px">${K('UDCPR 10.10.2')}</div>`);
PL(30.92,S.s5,280,1250,'पर्याय ✓',{w:360,fs:44,draw:(t,lt,oo)=>{oo.el.querySelector('span').style.color='#1d8a4a'}});
PL(31.68,S.s5,660,1250,'सक्ती ✗',{w:360,fs:44,draw:(t,lt,oo)=>{oo.el.querySelector('span').style.color=RD}});
sfx(31.68,'buzz',.4);

// ================= S5 AUDIT =================
SC('R5_audit_engineer.jpg',S.s5,S.s6,{ox:380,oy:920,s0:1.0,s1:1.1});
TT(S.s5,S.s6,400,[['खरं',32.70],['उत्तर:',33.06],['audit',34.54,'o1']],{fs:64});
A({t0:33.6,t1:36.0,x:362,y:905,w:240,cls:'noshadow',over:1,z:35,enter:'fade',din:.05,float:0,html:`<div class="rg" style="width:240px;height:240px;border-radius:50%;border:7px solid #fff;box-sizing:border-box"></div>`,
  draw:(t,lt,oo)=>{const q=(lt%.9)/.9;const r=oo.el.querySelector('.rg');r.style.transform=`scale(${.3+q*.9})`;r.style.opacity=1-q}});
sfx(33.68,'click',.6);
CRD(36.2,S.s6,450,1270,800,`<div class="r1" style="display:flex;justify-content:space-between;align-items:center"><span style="font:700 40px P;color:${INK}">15–30 वर्षं</span><span class="v1" style="font:800 46px P;color:${INK};opacity:0">दर 5 वर्षांनी</span></div><div style="height:2px;background:#ece8e2;margin:14px 0"></div><div class="r2" style="display:flex;justify-content:space-between;align-items:center;opacity:0"><span style="font:700 40px P;color:${INK}">30+ वर्षं</span><span class="v2" style="font:800 46px P;color:${O};opacity:0">दर 3 वर्षांनी</span></div><div style="margin-top:10px">${K('Model bye-law 76(a)')}</div>`,{
  draw:(t,lt,oo)=>{oo.el.querySelector('.v1').style.opacity=clamp((t-38.98)/.25);oo.el.querySelector('.r2').style.opacity=clamp((t-40.28)/.25);oo.el.querySelector('.v2').style.opacity=clamp((t-42.34)/.25)}});
[38.98,40.28,42.34].forEach(k=>sfx(k,'pop',.45));

// ================= S6 DANGER SIGNS =================
SC('R1_old_block.jpg',S.s6,S.s7,{ox:540,oy:960,s0:1.05,s1:1.1,filter:'blur(12px) brightness(.5)'});
TT(S.s6,S.s7,400,[['पण',43.88],['इथे',44.06],['एक',44.36],['धोका',44.48,'o1']],{fs:64});
PL(45.5,49.6,540,620,'चर्चा वर्षानुवर्षं → दुरुस्ती थांबते',{w:860,fs:36,exit:'fade',dout:.2});
[['R6a_crack.jpg','भिंतीला भेगा',170,50.22],['R6b_rusted_bars.jpg','गंजलेल्या सळ्या',450,50.98],['R6c_ceiling_plaster.jpg','छताचं plaster',730,52.34]].forEach(([img,lab,x,t0])=>{
  A({t0,t1:S.s7,x,y:960,w:270,cls:'noshadow',enter:'pop',din:.35,sfx:'pop',sfxv:.55,z:62,float:.04,
    html:`<div style="text-align:center"><div style="width:250px;height:250px;border-radius:22px;background:url(a/${img}) center/cover;border:6px solid ${AMB};box-shadow:0 18px 44px rgba(0,0,0,.5)"></div><div style="margin-top:18px;font:800 28px/1.2 P;color:#fff;text-shadow:0 2px 12px #000;white-space:nowrap">${lab}</div></div>`})});
PL(53.86,S.s7,450,1260,'⚠ ही धोक्याची लक्षणं',{w:560,fs:36,draw:(t,lt,oo)=>{const s=oo.el.querySelector('span');s.style.background=AMB;s.style.color=INK}});

// ================= S7 DECISION =================
SC('R7_audit_report.jpg',S.s7,S.s8,{ox:380,oy:1300,s0:1.0,s1:1.08});
TT(S.s7,S.s8,400,[['आधी',55.48],['audit,',55.84],['मग',56.26],['निर्णय',56.26,'o1']],{fs:62});
A({t0:56.6,t1:S.s8,x:540,y:960,w:1080,cls:'noshadow',over:1,z:58,enter:'fade',din:.05,float:0,
  html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible"><path class="p" d="M475 500 L475 560 M475 560 L270 620 M475 560 L680 620" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))"/></svg>`,
  draw:(t,lt,oo)=>{const p=oo.el.querySelector('.p');if(!oo.L)oo.L=p.getTotalLength();p.style.strokeDasharray=oo.L;p.style.strokeDashoffset=oo.L*(1-E.inout(clamp(lt/.6)))}});
CRD(57.28,S.s8,270,720,380,`<div style="text-align:center"><div style="font:800 40px/1.2 P;color:#1d8a4a">दुरुस्ती</div><div style="font:600 30px/1.3 P;color:${INK};margin-top:6px">वाट बघू नका</div></div>`,{enter:'pop'});
CRD(60.56,S.s8,680,720,380,`<div style="text-align:center"><div style="font:800 40px/1.2 P;color:${RD}">पाडायची</div><div style="font:600 30px/1.3 P;color:${INK};margin-top:6px">निर्णय वेगाने</div></div>`,{enter:'pop'});

// ================= S8 COMMENT =================
SC('R8_society_evening.jpg',S.s8,S.s9,{ox:540,oy:1100,s0:1.0,s1:1.1});
CRD(63.2,S.s9,540,520,960,`<div style="text-align:center;font:800 44px/1.35 P;color:${INK}">तुमची building <span style="color:${O}">किती वर्षांची</span>, शेवटचा audit कधी?</div>`);
COMMENT_BOX(64.3,S.s9-.05,65.6,66.76,'32 वर्षं, audit 2024',{y:1320,typeDur:.8});
PL(67.6,S.s9,540,700,'📤 society च्या group वर पाठवा',{w:760,fs:32});

// ================= S9 OUTRO =================
SC(null,S.s9,END+1,{color:'#f7f6f3',s0:1,s1:1});
A({t0:S.s9+.2,t1:END+1,x:540,y:900,w:500,cls:'noshadow',over:1,z:50,enter:'zoom',din:.5,float:0,sfx:'whoosh',sfxv:.4,html:`<div style="position:relative;width:500px;height:340px;background:#fff;border-radius:32px;box-shadow:0 20px 60px rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center"><img src="a/logo_gold.png" style="width:410px;filter:none"></div>`});
WORDS(69.46,END+1,540,600,900,[['अशाच',69.46],['माहितीसाठी',69.86,'o1']],{st:`font:800 60px/1.2 P;color:${INK}`});
A({t0:69.8,t1:END+1,x:540,y:1150,w:700,cls:'noshadow',enter:'fade',din:.4,z:40,float:0,html:`<div style="height:2px;background:#e2ded7"></div>`});
FOLLOW_FLIP(70.3,END+1,71.40,{y:1250});

// orange accent for words marked o1
HOOKS.push(()=>{document.querySelectorAll('.wd.o1').forEach(e=>e.style.color=O)});

// ---- sound rules: no bell-type sounds, one sound per beat ----
const NOBELL={ding:'pop',chime:'pop',bell:'thud',coin:'click',reveal:'whoosh',alert:'pop',question:'pop',sparkle:null};
for(let i=SFX.length-1;i>=0;i--){const m=NOBELL[SFX[i].type];if(m===undefined)continue;if(m===null)SFX.splice(i,1);else SFX[i].type=m}
{const PR={stamp:9,impact:8,thud:7,buzz:6,click:5,pop:4,riser:3,ticks:3,clock:3,whoosh:2,swoosh:1};SFX.sort((x,y)=>x.t-y.t);const keep=[];
 for(const e of SFX){const l=keep[keep.length-1];if(l&&e.t-l.t<.15){if((PR[e.type]||0)>(PR[l.type]||0))keep[keep.length-1]=e}else keep.push(e)}SFX.length=0;SFX.push(...keep)}
}
if(window.SAFE_GUIDE){const g=document.createElement('div');g.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:9999';
 g.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:220px;background:rgba(255,0,0,.2);border-bottom:3px solid #ff4040"></div><div style="position:absolute;left:0;right:0;bottom:0;height:420px;background:rgba(255,0,0,.2);border-top:3px solid #ff4040"></div><div style="position:absolute;left:890px;right:35px;top:860px;bottom:420px;background:rgba(255,140,0,.3)"></div>`;
 document.getElementById('root').appendChild(g)}
