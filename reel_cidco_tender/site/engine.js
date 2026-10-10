// ---------- deterministic timeline engine ----------
const W=1080,H=1920;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,p)=>a+(b-a)*p;
const E={
  lin:p=>p,
  out:p=>1-Math.pow(1-p,3),
  inout:p=>p<.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2,
  back:p=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)},
  back2:p=>{const c1=2.6,c3=c1+1;return 1+c3*Math.pow(p-1,3)+c1*Math.pow(p-1,2)},
  bounce:p=>{const n1=7.5625,d1=2.75;if(p<1/d1)return n1*p*p;if(p<2/d1)return n1*(p-=1.5/d1)*p+.75;if(p<2.5/d1)return n1*(p-=2.25/d1)*p+.9375;return n1*(p-=2.625/d1)*p+.984375},
  elastic:p=>p===0?0:p===1?1:Math.pow(2,-10*p)*Math.sin((p*10-.75)*(2*Math.PI)/3)+1,
};
function rnd(seed){let s=seed>>>0||1;return()=>{s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296}}

const ITEMS=[], SFX=[], BGS=[], CAM=[], FLASH=[], HOOKS=[];
const stage=()=>document.getElementById('stage');
function sfx(t,type,vol=1){SFX.push({t:+t.toFixed(3),type,vol})}

function A(o){
  o=Object.assign({enter:'pop',exit:'fade',din:.5,dout:.35,float:1,z:10,x:540,y:960,w:400,t1:9999,ph:ITEMS.length*1.37},o);
  const el=document.createElement('div');el.className='item '+(o.cls||'');
  el.style.width=o.w+'px';el.style.zIndex=o.z;
  if(o.img){const im=document.createElement('img');im.src='a/'+o.img;im.style.width='100%';im.style.display='block';el.appendChild(im);o.imgEl=im}
  if(o.html!==undefined){const d=document.createElement('div');d.className='inner';d.innerHTML=o.html;el.appendChild(d);o.inner=d}
  if(o.shine){const wr=document.createElement('div');wr.className='shinewrap';const s=document.createElement('div');s.className='shine';wr.appendChild(s);el.appendChild(wr);o.shineEl=s;if(o.img){wr.style.webkitMaskImage=`url(a/${o.img})`;wr.style.webkitMaskSize='100% 100%'}}
  if(o.mask){el.style.webkitMaskImage=o.mask}
  (o.parent||stage()).appendChild(el);o.el=el;o.lastHtml=null;
  if(o.sfx)sfx(o.t0+(o.sfxd||0),o.sfx,o.sfxv||1);
  if(o.sfxOut)sfx(o.t1-o.dout,o.sfxOut,.7);
  ITEMS.push(o);return o;
}
function kfval(list,t,key,def){ // list of {t,dur,ease,...}
  let v=def;
  for(const k of list){ if(k[key]===undefined)continue; if(t<k.t){break}
    const p=clamp((t-k.t)/(k.dur||.6)); v=lerp(v,k[key],(E[k.ease||'inout'])(p)); }
  return v;
}
function renderItem(o,t){
  const el=o.el;
  if(t<o.t0-0.001||t>o.t1){el.style.display='none';return}
  el.style.display='block';
  let pi=clamp((t-o.t0)/o.din), po=clamp((t-(o.t1-o.dout))/o.dout);
  let fF='';let x=+o.x,y=+o.y,w=o.w,s=1,r=o.rot||0,rx=0,ry=0,op=1,blur=0,dx=0,dy=0;
  if(o.moves){x=kfval(o.moves,t,'x',o.x);y=kfval(o.moves,t,'y',o.y);s*=kfval(o.moves,t,'s',1);r=kfval(o.moves,t,'r',r);op*=kfval(o.moves,t,'o',1)}
  // enter
  const en=o.enter;
  if(pi<1){
    if(en==='pop'){s*=lerp(.15,1,E.back2(pi));op*=clamp(pi*3)}
    else if(en==='flip'){ry+=lerp(-110,0,E.back(pi));op*=clamp(pi*4);s*=lerp(.7,1,E.out(pi))}
    else if(en==='flipx'){rx+=lerp(100,0,E.back(pi));op*=clamp(pi*4)}
    else if(en==='drop'){dy+=lerp(-300,0,E.bounce(pi));op*=clamp(pi*5)}
    else if(en==='up'){dy+=lerp(280,0,E.back(pi));op*=clamp(pi*3)}
    else if(en==='down'){dy+=lerp(-280,0,E.back(pi));op*=clamp(pi*3)}
    else if(en==='left'){dx+=lerp(-1000,0,E.back(pi));r+=lerp(-15,0,E.out(pi))}
    else if(en==='right'){dx+=lerp(1000,0,E.back(pi));r+=lerp(15,0,E.out(pi))}
    else if(en==='stamp'){s*=lerp(1.45,1,E.out(pi));op*=clamp(pi*2.5);r+=lerp(-14,0,E.out(pi))}
    else if(en==='zoom'){s*=lerp(1.9,1,E.out(pi));op*=clamp(pi*3)}
    else if(en==='fade'){op*=pi}
    else if(en==='rise'){dy+=lerp(700,0,E.out(pi));s*=lerp(.6,1,E.back(pi));op*=clamp(pi*2)}
    else if(en==='spin'){r+=lerp(-200,0,E.out(pi));s*=lerp(.1,1,E.back(pi));op*=clamp(pi*3)}
    else if(en==='wipe'){el.style.clipPath=`inset(0 ${(1-E.out(pi))*100}% 0 0 round 30px)`}
  } else if(en==='wipe') el.style.clipPath='none';
  // exit
  const ex=o.exit;
  if(po>0){
    const q=E.inout(po);
    if(ex==='fade'){op*=1-po}
    else if(ex==='pop'){s*=lerp(1,.1,q);op*=1-po}
    else if(ex==='left'){dx+=lerp(0,-1200,q)}
    else if(ex==='right'){dx+=lerp(0,1200,q)}
    else if(ex==='up'){dy+=lerp(0,-1300,q);op*=1-po*.3}
    else if(ex==='down'){dy+=lerp(0,1300,q)}
    else if(ex==='flip'){ry+=lerp(0,95,q);op*=1-po*.5}
    else if(ex==='zoom'){s*=lerp(1,2.2,q);op*=1-po}
    else if(ex==='spin'){r+=lerp(0,360,q);s*=lerp(1,0,q)}
  }
  // ambient float / 3d wobble
  const lt=t-o.t0;
  if(o.float){const f=o.float;dy+=Math.sin(lt*1.7+o.ph)*7*f;rx+=Math.sin(lt*1.1+o.ph)*5*f;ry+=Math.cos(lt*.9+o.ph)*7*f}
  if(o.coin){ry+=Math.sin(lt*2.2+o.ph)*38}
  if(o.pulse){s*=1+Math.max(0,Math.sin(lt*6))*.04*o.pulse}
  if(o.over)o.allowOver=1;
  if(o.fn){const z=o.fn(t,lt,o);if(z){dx+=z.dx||0;dy+=z.dy||0;s*=z.s||1;r+=z.r||0;op*=(z.o===undefined?1:z.o);if(z.ry)ry+=z.ry;if(z.filter)fF=z.filter}}
  el.style.left=x+'px';el.style.top=y+'px';
  el.style.transform=`translate(-50%,-50%) translate(${dx}px,${dy}px) perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${r}deg) scale(${s})`;
  el.style.opacity=clamp(op);
  el.style.filter=(blur>0.3?`blur(${blur}px) `:'')+(o.filter||'')+' '+fF;
  // text swaps
  if(o.texts){let h=o.texts[0][1],ts=o.texts[0][0];for(const [tt,hh] of o.texts){if(t>=tt){h=hh;ts=tt}}
    if(h!==o.lastHtml){o.inner.innerHTML=h;o.lastHtml=h}
    const bp=clamp((t-ts)/.35); if(ts>o.t0+.01&&bp<1){o.inner.style.transform=`scale(${1+Math.sin(bp*Math.PI)*.18})`}else o.inner.style.transform='';}
  if(o.count){const c=o.count;const p=E.out(clamp((t-c.t0)/(c.t1-c.t0)));const v=Math.round(lerp(c.from,c.to,p));const h=c.fmt(v);if(h!==o.lastHtml){o.inner.innerHTML=h;o.lastHtml=h}}
  if(o.shineEl){let sp=-1;for(const st of o.shine){const p=(t-st)/.9;if(p>=0&&p<=1)sp=p}
    o.shineEl.style.opacity=sp<0?0:1;o.shineEl.style.transform=`translateX(${lerp(-130,130,sp<0?0:sp)}%) skewX(-20deg)`}
  if(o.draw){o.draw(t,lt,o)}
}
// SVG path item that draws itself
function ARROW(o){ // o:{t0,t1,d,color,width,draw}
  o=Object.assign({enter:'fade',din:.01,exit:'fade',float:0,x:540,y:960,w:1080,color:'#FFD84D',sw:12,drawT:.6,z:30,head:true},o);
  o.html=`<svg viewBox="0 0 1080 1920" width="1080" height="1920" style="overflow:visible"><defs><filter id="gl${ITEMS.length}" filterUnits="userSpaceOnUse" x="-100" y="-100" width="1280" height="2120"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000" flood-opacity=".5"/></filter></defs>
   <path d="${o.d}" fill="none" stroke="${o.color}" stroke-width="${o.sw}" stroke-linecap="round" stroke-dasharray="${o.dash||''}" filter="url(#gl${ITEMS.length})"/>
   <polygon class="hd" points="0,-22 34,0 0,22" fill="${o.color}" filter="url(#gl${ITEMS.length})"/></svg>`;
  o.cls='arrow';
  o.draw=(t,lt,oo)=>{const p=E.out(clamp(lt/oo.drawT));const path=oo.el.querySelector('path');if(!oo.L){oo.L=path.getTotalLength()}
    path.style.strokeDasharray=oo.dash?oo.dash:oo.L;path.style.strokeDashoffset=oo.dash?0:oo.L*(1-p);
    if(oo.dash){path.style.clipPath='';path.setAttribute('stroke-dasharray',oo.dash);}
    const hd=oo.el.querySelector('.hd');const L=oo.L*p;const a=path.getPointAtLength(Math.max(0,L-1)),b=path.getPointAtLength(L);
    const ang=Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI;hd.setAttribute('transform',`translate(${b.x},${b.y}) rotate(${ang})`);hd.style.opacity=oo.head&&p>.05?1:0;
    if(oo.dash){path.style.strokeDashoffset=-lt*60; path.style.opacity=p}};
  if(o.sfx===undefined)o.sfx='swoosh';
  return A(o);
}
function BG(o){ // {img,t0,t1,s0,s1,x0,x1,y0,y1,filter,fade}
  o=Object.assign({s0:1.08,s1:1.22,x0:0,x1:0,y0:0,y1:0,fade:.5,filter:''},o);
  const el=document.createElement('div');el.className='bg';el.style.backgroundImage=`url(a/${o.img})`;
  document.getElementById('bgs').appendChild(el);o.el=el;BGS.push(o);return o;
}
function renderBG(o,t){
  if(t<o.t0-o.fade/2||t>o.t1+o.fade/2){o.el.style.display='none';return}
  o.el.style.display='block';
  const p=clamp((t-o.t0)/(o.t1-o.t0));const op=Math.min(clamp((t-o.t0+o.fade/2)/o.fade),clamp((o.t1+o.fade/2-t)/o.fade));
  const s=lerp(o.s0,o.s1,E.inout(p)),x=lerp(o.x0,o.x1,E.inout(p)),y=lerp(o.y0,o.y1,E.inout(p));
  o.el.style.opacity=op;o.el.style.transform=`translate(${x}px,${y}px) scale(${s})`;
  let f=typeof o.filter==='function'?o.filter(t):o.filter; o.el.style.filter=f;
}
// camera
function punch(t,a=.06){CAM.push({t,type:'p',a})}
function shake(t,a=18){CAM.push({t,type:'s',a})}
function flash(t,a=.8,c='#fff'){FLASH.push({t,a,c})}
function camAt(t){let s=1,x=0,y=0,r=0;
  s+=Math.sin(t*.37)*.012;x+=Math.sin(t*.23)*8;y+=Math.cos(t*.29)*8;
  for(const c of CAM){const d=t-c.t;if(d<0||d>1.2)continue;
    if(c.type==='p'){s+=c.a*Math.exp(-d*6)*Math.sin(Math.min(d*20,Math.PI/2))}
    if(c.type==='s'){const k=c.a*Math.exp(-d*7);x+=Math.sin(d*90)*k;y+=Math.cos(d*77)*k;r+=Math.sin(d*60)*k*.04}}
  return {s,x,y,r}}
