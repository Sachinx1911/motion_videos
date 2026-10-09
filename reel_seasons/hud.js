// ---------- extra particles ----------
const _dp=drawParts;
drawParts=function(ctx,t){_dp(ctx,t);
  for(const o of PS){
    if(t<o.t0-1||t>o.t1+3)continue;
    if(o.type==='rain'){const fade=clamp((t-o.t0)/.5)*clamp((o.t1-t)/.5);if(fade<=0)continue;const R=rnd(o.seed);
      ctx.save();ctx.strokeStyle=o.color||'rgba(200,225,255,1)';ctx.lineCap='round';
      for(let i=0;i<(o.n||260);i++){const sp=1600+R()*1200,len=40+R()*70,x0=R()*1500-200,ph=R()*3,w=1.5+R()*2.5;
        const y=((t+ph)*sp)%2200-150;const x=x0-(y+150)*(o.slant||.22);
        ctx.globalAlpha=fade*(.25+R()*.45);ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-len*(o.slant||.22),y+len);ctx.stroke()}
      ctx.restore()}
    else if(o.type==='snow'){const fade=clamp((t-o.t0)/.6)*clamp((o.t1-t)/.6);if(fade<=0)continue;const R=rnd(o.seed);
      for(let i=0;i<(o.n||140);i++){const sp=70+R()*130,x0=R()*1080,ph=R()*30,r=2+R()*6,sw=20+R()*50;
        const y=((t+ph)*sp)%2050-60;const x=x0+Math.sin((t+ph)*(.8+R()))*sw;
        ctx.globalAlpha=fade*(.35+R()*.6);ctx.fillStyle='#fff';ctx.shadowColor='#cfe9ff';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
      ctx.shadowBlur=0}
    else if(o.type==='embers'){const fade=clamp((t-o.t0)/.6)*clamp((o.t1-t)/.6);if(fade<=0)continue;const R=rnd(o.seed);
      for(let i=0;i<(o.n||90);i++){const sp=120+R()*220,x0=R()*1080,ph=R()*20,r=2+R()*5;
        const y=1980-((t+ph)*sp)%2100;const x=x0+Math.sin((t+ph)*1.3+i)*40;
        ctx.globalAlpha=fade*(.3+R()*.6)*clamp(y/1900);ctx.fillStyle=o.color||'#ffb347';ctx.shadowColor='#ff7a00';ctx.shadowBlur=16;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}
      ctx.shadowBlur=0}
    else if(o.type==='stars'){const fade=clamp((t-o.t0)/.4)*clamp((o.t1-t)/.4);if(fade<=0)continue;const R=rnd(o.seed);
      for(let i=0;i<(o.n||120);i++){const x=R()*1080,y=R()*1920,r=1+R()*2.6,ph=R()*9;
        ctx.globalAlpha=fade*(.3+.7*Math.abs(Math.sin(t*(1+R()*2)+ph)));ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}}
  }
  ctx.globalAlpha=1;
};
// ---------- heading ----------
const HEADS=[];
function HEAD(t,txt){HEADS.push({t,txt})}
let lastHead=-1;
function renderHead(t){const el=document.getElementById('head');let k=-1;for(let i=0;i<HEADS.length;i++)if(t>=HEADS[i].t)k=i;
  if(k<0){el.style.opacity=0;return}
  const h=HEADS[k];if(k!==lastHead){el.innerHTML=`<div class="ht">${h.txt}</div>`;lastHead=k}
  const nx=HEADS[k+1];const p=clamp((t-h.t)/.45);let op=E.out(p),dy=(1-E.back(p))*-50;
  if(nx&&t>nx.t-.25){op*=clamp((nx.t-t)/.25)}
  if(!h.txt)op=0;
  el.style.opacity=op;el.style.transform=`translate(-50%,0) translateY(${dy}px)`;
}
// ---------- season tracker (top) ----------
const SEAS=[['उन्हाळा','I1_sun.png','#ff8a00'],['पावसाळा','I2_rain.png','#3d8bff'],['हिवाळा','I3_snow.png','#4dd0e1']];
const SK=[[35.13,0],[46.98,1],[64.33,2]];
const TLV=[35.0,84.4];
function buildTimeline(){const tl=document.getElementById('tl');let h='<div class="trk"></div><div class="fill"></div>';
  SEAS.forEach(([n,im,c],i)=>{h+=`<div class="sn" style="left:${TXS(i)}px;--c:${c}"><img src="a/${im}"><span>${n}</span></div>`});
  tl.innerHTML=h}
const TXS=k=>150+k*330;
function sAt(t){let v=0;for(let i=0;i<SK.length;i++){const [tt,k]=SK[i];if(t>=tt){const pv=i?SK[i-1][1]:0;v=lerp(pv,k,E.inout(clamp((t-tt)/.9)))}}return v}
const ERAS=[[-9,'ऋतू कसे बदलतात?','#ffd84d'],[35.13,'उन्हाळा','#ff8a00'],[46.98,'पावसाळा','#3d8bff'],[64.33,'हिवाळा','#4dd0e1'],[76.81,'भन्नाट गोष्ट','#ff4d6d'],[84.6,'थोडक्यात','#ffd84d'],[88.0,'स्पर्धा टाइम्स','#ff3b3b']];
let lastEra='';
function renderTimeline(t){const tl=document.getElementById('tl');const vis=clamp((t-TLV[0])/.5)*clamp((TLV[1]-t)/.5);tl.style.opacity=vis;
  tl.style.transform=`translate(-50%,0) translateY(${(1-vis)*-60}px) scale(${lerp(.8,1,vis)})`;
  const k=sAt(t);const x=TXS(k);tl.querySelector('.fill').style.width=(x-150)+'px';
  tl.querySelectorAll('.sn').forEach((el,i)=>{const d=Math.abs(i-k);el.classList.toggle('on',i<=k+.01);el.style.transform=`translateX(-50%) scale(${1+.28*clamp(1-d*2)})`});
  let e=ERAS[0];for(const r of ERAS)if(t>=r[0])e=r;const er=document.getElementById('era');
  if(e[1]!==lastEra){er.innerHTML=`<i style="background:${e[2]};color:${e[2]}"></i>${e[1]}`;lastEra=e[1];er.dataset.t=t}
  const ep=clamp((t-parseFloat(er.dataset.t||0))/.4);er.style.transform=`scale(${lerp(.6,1,E.back(ep))})`;er.style.opacity=clamp((t-.3)/.4)*clamp((88.0-t)/.3);
}
