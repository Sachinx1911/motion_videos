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

// ===== मोरबे कोरडं, नवी मुंबई अडकणार? (SRS Dwell). New transition: WATER DRAIN (water level drains down revealing next scene)
const DRAIN=(t)=>{A({t0:t-.3,t1:t+.32,x:540,y:960,w:1080,cls:'noshadow',html:`<div style="width:1080px;height:1920px;position:relative;overflow:hidden"><div class="w" style="position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(180deg,rgba(40,120,170,.95),rgba(13,60,95,.98));box-shadow:0 -10px 40px rgba(120,200,240,.6)"><div style="position:absolute;left:-10%;right:-10%;top:-18px;height:36px;background:radial-gradient(circle at 10% 50%,rgba(255,255,255,.5) 0 8px,transparent 9px) 0 0/80px 36px repeat-x;opacity:.7"></div></div></div>`,enter:'fade',din:.01,float:0,z:700,sfx:null,
 draw:(tt,lt,oo)=>{const p=lt/.62;const h=p<.5?E.inout(p/.5):1-E.inout((p-.5)/.5);oo.el.querySelector('.w').style.height=(h*105)+'%'}});
 sfx(t-.28,'swoosh',.6);sfx(t,'thud',.4);punch(t,.03)};
const LEVEL=(t0,t1,x,y,tk)=>A({t0,t1,x,y,w:260,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.96);border-radius:26px;padding:16px 18px 14px;box-shadow:0 18px 44px rgba(0,0,0,.3);text-align:center"><div style="font:700 26px/1.2 P;color:#444">मोरबे धरण</div><div style="position:relative;width:120px;height:300px;margin:10px auto;border:5px solid ${NAVY};border-radius:14px;overflow:hidden;background:#eef2f6"><div class="lv" style="position:absolute;left:0;right:0;bottom:0;height:100%;background:linear-gradient(180deg,#5fb3e0,#1f6fa8)"></div><div style="position:absolute;left:0;right:0;top:31%;border-top:3px dashed ${RED}"></div></div><div class="pc" style="font:900 56px/1 P;color:${RED}">100%</div><div style="font:700 24px/1.3 P;color:#666">10 वर्षांतलं कमी</div></div>`,enter:'pop',din:.45,sfx:'pop',sfxv:.6,z:66,float:.04,
 draw:(t,lt,oo)=>{const v=100-31*E.out(clamp((t-tk)/1.2));oo.el.querySelector('.lv').style.height=v+'%';oo.el.querySelector('.pc').textContent=Math.round(v)+'%'}});

const CARD2=(t0,t1,x,y,w,html,o={})=>A(Object.assign({t0,t1,x,y,w,cls:'noshadow',html:`<div style="background:linear-gradient(160deg,rgba(13,23,41,.93),rgba(27,42,69,.93));border:3px solid #c9a66f;border-radius:28px;padding:20px 28px 16px;box-shadow:0 20px 50px rgba(0,0,0,.45);text-align:center;color:#fff">${html}</div>`,enter:'up',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04},o));
function buildScenes(){
const END=110.9;
const T={num:C('आकडा',9.1),fine:C('बांधकाम',25.1),cidco:C('सिडकोचा',33.3),three:C('आता',41.3),h1:C('एक',43.0),h2:C('दोन',47.5),h3:C('तीन',52.2),quote:C('सभावरुहातस',57.3),prop:C('दुशकाल',61.6),chk:C('मनुन',70.2),q1:C('एक',75.3),q2:C('सोसाइटीला',79.7),q3:C('टैंकरचा',82.4),q4:C('प्रोजेक्ट',84.9),q5:C('पाच',88.4),cm:C('आता',93.9),out:C('अशाच',107.2)};
const SEC=[0,T.num,T.fine,T.cidco,T.three,T.h1,T.h2,T.h3,T.quote,T.prop,T.chk,T.cm,T.out,END];
[T.num,T.cidco,T.three,T.quote,T.chk,T.cm].forEach(DRAIN);
[T.fine,T.h1,T.h2,T.h3,T.prop,T.out].forEach(t=>{flash(t,.3,'#fffaf0');sfx(t-.12,'whoosh',.5);punch(t,.03)});
A({t0:0,t1:T.out,x:205,y:300,w:170,cls:'noshadow',html:`<div style="background:rgba(255,253,249,.95);border-radius:16px;padding:8px 12px;box-shadow:0 8px 20px rgba(0,0,0,.2)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'fade',din:.5,float:0,z:600});
A({t0:.5,t1:T.out,x:620,y:300,w:500,cls:'noshadow',html:`<div style="text-align:left"><span style="display:inline-block;font:600 20px/1.35 P;color:#3d3a35;background:rgba(255,253,249,.9);border-radius:12px;padding:8px 14px 6px;white-space:nowrap">* NMMC विशेष सभा 23 Oct 2026 · CIDCO कपात मे 2026</span></div>`,enter:'fade',din:.5,float:0,z:600});

// ---- HOOK : low dam ----
PB('W01_low_dam.jpg',0,T.num+.05,{s0:1.0,s1:1.14,y0:0,y1:30});SHADE(0,T.num);
BAN(C('दहा',0),T.num,520,'10 वर्षांत पहिल्यांदा!',{fs:56,w:760,rot:-3});
CHIP(C('मोर्बे',1.7),T.num,540,680,'मोरबे धरण सगळ्यात खालच्या पातळीवर',{bg:'#fff',fs:32,w:760});
[['घर आहे',C('घर',4.7),215,190],['घर घेताय',C('घेता',5.7),435,210],['Redevelopment',C('रीडेवलप्मेंट',6.4),705,290]].forEach(([s,t0,x,w])=>A({t0,t1:T.num,x,y:1180,w:w+10,cls:'noshadow',html:`<div style="width:${w}px;height:150px;border-radius:24px;background:linear-gradient(160deg,#1b2a45,#0d1729);border:3px solid #c9a66f;display:flex;align-items:center;justify-content:center;font:800 28px/1.15 P;color:#fff;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.45)">${s}</div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:62,float:.06}));
BAN(C('फटका',8.2),T.num,1400,'तिघांनाही फटका!',{icon:'warn',fs:52,is:80,w:700,rot:-2});

// ---- NUMBERS : 69%, 480->400 ----
PB('W03_hall.jpg',T.num,T.fine+.05,{s0:1.0,s1:1.08,filter:'brightness(.8)'});SHADE(T.num,T.fine);
LEVEL(T.num+.05,T.fine,300,900,C('71',11.0));
CARD2(C('महापालीकेने',13.3),T.fine,720,760,420,`<div style="font:700 28px/1.2 P;color:#cfd6e4">23 ऑक्टोबर निर्णय</div><div style="font:700 30px/1.3 P">रोज पाणी उपसा</div><div class="n" style="font:900 80px/1.1 P;color:#f2dfb6">480</div><div style="font:700 30px/1.2 P">MLD</div>`,{draw:(t,lt,oo)=>{oo.el.querySelector('.n').textContent=Math.round(480-80*E.out(clamp((t-C('400',17.0))/.9)))}});
BAN(C('MLD',19.0),T.fine,1230,'-80 MLD कपात!',{fs:54,w:560,rot:-3,x:720});
[['बांधकाम',C('बांधकाम',21.0),260],['बागा',C('बागा',21.9),540],['Car wash',C('कारवाश',22.6),820]].forEach(([s,t0,x])=>CHIP(t0,T.fine,x,1440,s,{col:RED,ic:'cross',fs:34,w:270}));

// ---- FINES : site tanker ----
PB('W04_site_tanker.jpg',T.fine,T.cidco+.05,{s0:1.0,s1:1.1});SHADE(T.fine,T.cidco);
CHIP(C('प्रोसेस्ट',26.5),T.cidco,540,560,'बांधकामाला फक्त processed पाणी',{bg:NAVY,col:'#f2dfb6',fs:34,w:760});
[['₹25,000',C('पंच्विस',28.8),300,'पहिल्यांदा'],['₹50,000',C('पंचास',29.8),540,'दुसऱ्यांदा'],['₹1 लाख',C('एक',31.6),780,'तिसऱ्यांदा']].forEach(([s,t0,x,l])=>A({t0,t1:T.cidco,x,y:1000,w:240,cls:'noshadow',html:`<div style="transform:rotate(-6deg);background:#fff;border:6px solid ${RED};border-radius:20px;padding:14px 10px 10px;text-align:center;box-shadow:0 16px 40px rgba(0,0,0,.35)"><div style="font:900 44px/1 P;color:${RED}">${s}</div><div style="font:700 24px/1.3 P;color:#444">${l}</div></div>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.8,z:68,float:0}));
CHIP(C('दंड',32.6),T.cidco,540,1250,'पिण्याचं पाणी वापरलं तर दंड!',{bg:'#fff',col:RED,fs:36,w:700});

// ---- CIDCO : towers + nodes + cracked earth ----
PB('W02_nm_towers.jpg',T.cidco,T.three+.05,{s0:1.0,s1:1.1});SHADE(T.cidco,T.three);
HN('!',T.cidco+.05,T.three,'CIDCO च्या भागात');
[['खारघर',C('खारघर',34.2),300,760],['पनवेल',C('पनवेल',35.0),780,760],['उलवे',C('उल्वे',35.6),300,880],['तळोजा',C('तलोजा',36.1),780,880]].forEach(([s,t0,x,y])=>CHIP(t0,T.three,x,y,s,{bg:'#fff',fs:40,w:300}));
IC2(C('दहा',37.8),T.three,1120,'chart','मे पासून 10% कपात',{w:700,fs:40,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
IC2(C('आठावडातून',39.2),T.three,1290,'cal','आठवड्यातून 1 दिवस पाणी बंद',{w:700,fs:38,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});

// ---- THREE HITS ----
TINT(T.three,T.h1,'linear-gradient(180deg,#0d1729,#162644)',.15);
A({t0:T.three+.05,t1:T.h1,x:540,y:900,w:900,cls:'noshadow',html:`<div style="text-align:center;font:800 76px/1.2 P;color:#fff">तिघांना <span style="color:#f2dfb6">फटका</span><br>कसा?</div>`,enter:'zoom',din:.4,sfx:'impact',sfxv:.6,z:60,float:.05});
PB('W05_tanker_buckets.jpg',T.h1,T.h2+.05,{s0:1.0,s1:1.08});SHADE(T.h1,T.h2);
HN(1,T.h1+.05,T.h2,'आत्ताची Society');
IC2(C('कपात',44.6),T.h2,900,'chart','कपात वाढते',{w:620,fs:40,x:540});
IC2(C('टैंकर',45.5),T.h2,1060,'home','Tanker येतो',{w:620,fs:40,x:540});
IC2(C('मेंटेनंस',46.6),T.h2,1220,'coins','Maintenance वाढतं',{w:620,fs:40,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
PB('W06_stalled_tower.jpg',T.h2,T.h3+.05,{s0:1.0,s1:1.08});SHADE(T.h2,T.h3);
HN(2,T.h2+.05,T.h3,'नवीन Flat');
IC2(C('पाणी',49.6),T.h3,900,'doc','बांधकामाला पाणी कमी',{w:620,fs:40,x:540});
IC2(C('काम',50.3),T.h3,1060,'clock','काम हळू',{w:620,fs:40,x:540});
IC2(C('ताबा',51.3),T.h3,1220,'cal','ताबा लांबतो',{w:620,fs:40,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});
PB('W07_rented_flat.jpg',T.h3,T.quote+.05,{s0:1.0,s1:1.08});SHADE(T.h3,T.quote);
HN(3,T.h3+.05,T.quote,'Redevelopment');
IC2(C('घर',53.6),T.quote,900,'home','घर सोडलंय',{w:620,fs:40,x:540});
IC2(C('भड़',54.6),T.quote,1060,'coins','भाडं चालू',{w:620,fs:40,x:540});
IC2(C('वाट',56.6),T.quote,1220,'clock','नवीन building ची वाट वाढते',{w:680,fs:36,x:540,bg:`linear-gradient(145deg,#e2463b,#b8261d)`});

// ---- QUOTE + PROPOSAL : hall ----
PB('W03_hall.jpg',T.quote,T.chk+.05,{s0:1.05,s1:1.12,filter:'brightness(.7)'});SHADE(T.quote,T.chk);
A({t0:C('वाक्याल',58.2),t1:T.chk,x:540,y:700,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-left:14px solid ${GOLD};border-radius:26px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:left"><div style="font:600 28px/1.2 P;color:#666">सभागृहातलं वाक्य:</div><div style="font:800 42px/1.3 P;color:#111">"पाण्याचं नियोजन न करता<br>परवानग्या दिल्या!"</div></div>`,enter:'left',din:.5,sfx:'whoosh',sfxv:.5,z:66,float:.04});
BAN(C('प्रस्ताव',63.5),T.chk,1120,'टंचाईच्या भागांत नवीन<br>बांधकाम परवानग्या थांबवा!',{icon:'warn',fs:42,is:80,w:860,rot:-2});
CHIP(C('अजुन',67.8),T.chk,540,1400,'प्रस्ताव, अजून आदेश नाही',{bg:'#fff',col:NAVY,fs:34,w:560});

// ---- CHECKLIST : site office + tiles ----
PB('W08_site_office.jpg',T.chk,T.cm+.05,{s0:1.0,s1:1.08});SHADE(T.chk,T.cm);
A({t0:T.chk+.05,t1:T.q1,x:540,y:900,w:800,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 46px/1.25 P;color:#111">घर घेण्याआधी<br>हे <span style="color:${RED}">5 प्रश्न</span> विचारा!</div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
[['home','पाणी कुठून? महापालिका / CIDCO / tanker',T.q1],['chart','Society ला रोज किती units?',T.q2],['coins','Tanker चा खर्च maintenance मध्ये?',T.q3],['doc','STP + rainwater harvesting आहे?',T.q4],['cal','ताबा तारीख + उशीर = व्याज/भाडं',T.q5]].forEach(([ic,s,t0],i)=>IC2(t0,T.cm,560+i*170,ic,s,{w:800,fs:32,x:540,end:`<div style="width:48px;flex:none;margin-left:auto">${ICO.tick}</div>`}));
[['W09_stp.jpg',T.q4,300],['W10_rainwater.jpg',T.q4+.4,540],['W11_meter.jpg',T.q2+.3,780]].forEach(([img,t0,x])=>PHOTO(t0,T.cm,x,1440,200,160,img,{allowOver:1}));
OBJ(T.q1+.3,T.cm,880,1300,120,'O01_tap.png',{enter:'rise',din:.5,z:60,allowOver:1});

// ---- CTA ----
PB('W02_nm_towers.jpg',T.cm,T.out+.05,{s0:1.1,s1:1.18,filter:'brightness(.55) blur(4px)'});
A({t0:T.cm+.05,t1:T.out,x:540,y:520,w:860,cls:'noshadow',html:`<div style="background:rgba(255,255,255,.97);border-radius:28px;padding:22px 30px 18px;box-shadow:0 20px 50px rgba(0,0,0,.4);text-align:center;font:800 50px/1.25 P;color:#111">तुमचं घर<br><span style="color:${RED}">कोणत्या गटात?</span></div>`,enter:'down',din:.45,sfx:'whoosh',sfxv:.5,z:66,float:.04});
[['1','आत्ताची society',C('एक',96.2),300],['2','नवीन flat',C('दोन',97.4),540],['3','Redevelopment',C('तीन',99.1),780]].forEach(([n,s,t0,x])=>A({t0:t0-.2,t1:T.out,x,y:800,w:230,cls:'noshadow',html:`<div style="width:220px;height:200px;border-radius:26px;background:linear-gradient(160deg,#1b2a45,#0d1729);border:3px solid #c9a66f;box-shadow:0 18px 40px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><div style="font:900 76px/1 P;color:#f2dfb6">${n}</div><div style="font:800 26px/1.15 P;color:#fff;text-align:center">${s}</div></div>`,enter:'pop',din:.4,sfx:'pop',sfxv:.6,z:62,float:.06}));
{const tc=C('कॉमेंट',101.3);
 CHIP(C('नंबर',100.9),T.out,540,1020,'फक्त नंबर Comment करा!',{bg:NAVY,col:'#fff',fs:40,w:620,ic:'chat',fn:t=>({s:(t>tc+.6&&t<tc+.8?.93:1)})});
 A({t0:tc+.2,t1:C('हाँ',104.7)+.3,x:740,y:1080,w:90,cls:'noshadow',html:CURSOR,enter:'up',din:.35,z:75,float:0,allowOver:1});sfx(tc+.65,'click',.8);}
CHIP(C('आठावडयात',102.2),T.out,540,1180,'आठवड्यात किती दिवस tanker?',{bg:'#fff',col:NAVY,fs:34,w:640});
A({t0:C('मित्रान्ना',105.6)-.4,t1:T.out,x:540,y:1340,w:760,cls:'noshadow',html:`<div style="display:flex;justify-content:center"><div style="display:inline-flex;align-items:center;gap:20px;background:${GRN};border:4px solid #fff;color:#fff;border-radius:999px;padding:16px 36px 14px 18px;box-shadow:0 18px 44px rgba(0,0,0,.4)"><div style="width:66px">${ICO.wa}</div><div style="font:800 36px/1.15 P;text-align:left">नवी मुंबईतल्या<br>मित्रांना पाठवा!</div></div></div>`,enter:'up',din:.45,sfx:'swoosh',sfxv:.6,z:66,float:0});

// ---- OUTRO ----
TINT(T.out,END+1,'linear-gradient(180deg,#0d1729,#162644)',.25);
WORDS(T.out+.05,END+1,540,560,860,[['अशाच',T.out,''],['माहितीसाठी',C('महीती',107.5),'gd']],{st:'font:800 60px/1.3 P;color:#fff'});
A({t0:T.out+.4,t1:END+1,x:540,y:900,w:560,cls:'noshadow',html:`<div style="background:#faf7f2;border-radius:28px;padding:44px 50px 38px;box-shadow:0 30px 70px rgba(0,0,0,.45)"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'whoosh',sfxv:.6,z:50,float:.15,shine:[T.out+1.2]});
const FT=C('फॉलो',109.6);
A({t0:C('पेजला',109.2)-.4,t1:END+1,x:500,y:1260,w:760,cls:'chipw',html:`<span style="display:inline-block;background:${GOLD};color:#111;font:800 44px/1 P;padding:22px 40px 16px;border-radius:999px">आमच्या पेज ला Follow करा ➜</span>`,enter:'up',din:.4,sfx:'pop',sfxv:.8,z:54,float:0,fn:t=>({s:(t>FT+.3&&t<FT+.5?.93:1)})});
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
