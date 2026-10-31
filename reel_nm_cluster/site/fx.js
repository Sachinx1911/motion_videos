// ---------- particles / overlays ----------
const PS=[];
function PART(o){ // {type,t0,t1,n,seed,x,y,spread,colors}
  o=Object.assign({n:120,seed:7,x:540,y:-40},o);const R=rnd(o.seed);o.p=[];
  for(let i=0;i<o.n;i++)o.p.push({b:o.t0+R()*(o.t1-o.t0-(o.life||2.5)*.3),r1:R(),r2:R(),r3:R(),r4:R(),r5:R()});
  PS.push(o);return o;
}
const coinImgs={};
function drawParts(ctx,t){
  for(const o of PS){
    if(t<o.t0||t>o.t1+(o.life||4))continue;
    for(const p of o.p){const a=t-p.b;if(a<0)continue;
      if(o.type==='confetti'){const life=o.life||4;if(a>life)continue;
        const cols=o.colors||['#FF9933','#ffffff','#138808','#FFD84D'];
        const x=o.x+(p.r1-.5)*(o.spread||1300)+Math.sin(a*2+p.r2*6)*40, y=(o.y)+a*(220+p.r3*260)+ (o.burst? -900*Math.exp(-a*2)*(p.r5) :0);
        ctx.save();ctx.translate(x,y);ctx.rotate(a*(3+p.r4*5));ctx.scale(1,Math.cos(a*(4+p.r2*6)));
        ctx.globalAlpha=clamp((life-a)/.8);ctx.fillStyle=cols[Math.floor(p.r5*cols.length)];ctx.fillRect(-9,-14,18,28);ctx.restore();}
      else if(o.type==='coins'){const life=o.life||2.6;if(a>life)continue;const im=coinImgs[o.img||'coinA'];if(!im)continue;
        const sx=o.x+(p.r1-.5)*(o.spread||900), x=sx+(o.fountain?(p.r2-.5)*900*a:(o.vx||0)*a*(0.5+p.r2)), y=o.y+(o.vy0||0)*a*(o.fountain?(0.6+p.r5*.6):1)+ .5*(o.g||1800)*a*a*(0.6+p.r3*.6);
        const sz=(o.size||90)*(0.6+p.r4*.6);ctx.save();ctx.translate(x,y);ctx.rotate(a*3*(p.r2-.5));ctx.scale(Math.cos(a*(5+p.r5*6)),1);
        ctx.globalAlpha=clamp((life-a)/.4);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}
      else if(o.type==='stream'){ // coins flying from (x,y) to (tx,ty)
        const life=o.life||1.1;if(a>life)continue;const im=coinImgs[o.img||'coinA'];if(!im)continue;const q=E.inout(a/life);
        const x=lerp(o.x+(p.r1-.5)*160,o.tx,q), y=lerp(o.y+(p.r2-.5)*160,o.ty,q)-Math.sin(q*Math.PI)*(200+p.r3*200);
        const sz=(o.size||70)*(1-q*.5);ctx.save();ctx.translate(x,y);ctx.scale(Math.cos(a*8+p.r4*6),1);ctx.globalAlpha=clamp((life-a)/.2);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}
      else if(o.type==='sparks'){const life=o.life||2.2;if(a>life)continue;
        const ang=p.r1*Math.PI*2, sp=(o.speed||500)*(0.3+p.r2);const x=o.x+Math.cos(ang)*sp*a, y=o.y+Math.sin(ang)*sp*a+ 200*a*a;
        ctx.globalAlpha=clamp(1-a/life);ctx.fillStyle=o.color||'#FFD84D';ctx.shadowColor=o.color||'#FFD84D';ctx.shadowBlur=18;
        ctx.beginPath();ctx.arc(x,y,3+p.r3*6,0,7);ctx.fill();ctx.shadowBlur=0;}
      else if(o.type==='petals'){const life=o.life||4.5;if(a>life)continue;
        const cols=o.colors||['#ff8c00','#ffb300','#ff6f00','#ffd54f','#e65100'];
        const x=o.x+(p.r1-.5)*(o.spread||1300)+Math.sin(a*1.6+p.r2*6)*60, y=o.y-p.r5*300+a*(260+p.r3*220)+(o.burst?-1100*Math.exp(-a*2.2)*p.r4:0);
        ctx.save();ctx.translate(x,y);ctx.rotate(a*(1.5+p.r4*3)+p.r2*6);ctx.globalAlpha=clamp((life-a)/.8)*clamp(a/.15);
        if(o.img&&p.r5<(o.imgFrac||.12)){const im=coinImgs[o.img];const sz=50+p.r3*50;ctx.scale(1,Math.abs(Math.cos(a*1.3+p.r1*5))*.5+.5);ctx.drawImage(im,-sz/2,-sz/2,sz,sz)}
        else{ctx.scale(1,Math.cos(a*(3+p.r2*4)));ctx.fillStyle=cols[Math.floor(p.r4*cols.length)];ctx.beginPath();ctx.ellipse(0,0,9+p.r3*7,16+p.r1*8,0,0,7);ctx.fill();
          ctx.fillStyle='rgba(255,255,255,.25)';ctx.beginPath();ctx.ellipse(-3,-4,3,7,0,0,7);ctx.fill()}
        ctx.restore();}
      else if(o.type==='soil'){const life=o.life||1.6;if(a>life)continue; // ground impact: soil clumps + dust puffs
        const side=p.r1<.5?-1:1;
        if(p.r5<.68){const vx=side*(250+p.r2*650),vy=-(250+p.r3*700);const x=o.x+side*p.r4*60+vx*a,y=o.y+vy*a+1300*a*a;if(y>o.y+30)continue;
          ctx.globalAlpha=clamp(1-a/life);ctx.fillStyle=['#6b4a2b','#8a6440','#a37c52','#4e3520'][Math.floor(p.r4*4)];ctx.beginPath();ctx.ellipse(x,y,3+p.r3*7,2+p.r2*5,a*4,0,7);ctx.fill();}
        else{const x=o.x+side*(40+p.r2*260)*(1-Math.exp(-a*3)),y=o.y-10-p.r3*90*(1-Math.exp(-a*2)),r=30+p.r4*70+a*90;
          const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(176,146,108,${.5*clamp(1-a/life)})`);g.addColorStop(1,'rgba(176,146,108,0)');ctx.globalAlpha=1;ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();}}
      else if(o.type==='dust'){const life=o.life||6;if(a>life)continue;
        const x=(p.r1*1200-60)+Math.sin(a*.6+p.r2*9)*40, y=1980-(a*(60+p.r3*80))-p.r4*1900;
        ctx.globalAlpha=Math.sin(Math.PI*a/life)*.55*(o.alpha||1);ctx.fillStyle=o.color||'#fff3c8';ctx.beginPath();ctx.arc(x,(y%2000+2000)%2000,1.5+p.r5*3.5,0,7);ctx.fill();}
    }
  }
  ctx.globalAlpha=1;
}
// speed lines (rewind / transitions)
const SPEED=[];
function speedlines(t0,t1,col='rgba(255,240,200,'){SPEED.push({t0,t1,col})}
function drawSpeed(ctx,t){for(const s of SPEED){if(t<s.t0||t>s.t1)continue;
  const p=clamp((t-s.t0)/(s.t1-s.t0));const k=Math.sin(p*Math.PI);const R=rnd(Math.floor(t*30)+3);
  ctx.save();ctx.translate(540,900);
  for(let i=0;i<90;i++){const a=R()*Math.PI*2, r0=200+R()*500, len=200+R()*700;
    ctx.strokeStyle=s.col+(0.15+R()*.5)*k+')';ctx.lineWidth=2+R()*5;ctx.beginPath();ctx.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);ctx.lineTo(Math.cos(a)*(r0+len),Math.sin(a)*(r0+len));ctx.stroke()}
  ctx.restore()}}
// grain
const grains=[];
function makeGrain(){for(let k=0;k<6;k++){const c=document.createElement('canvas');c.width=540;c.height=960;const g=c.getContext('2d');const d=g.createImageData(540,960);const R=rnd(k*99+1);
  for(let i=0;i<d.data.length;i+=4){const v=R()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0);grains.push(c)}}
