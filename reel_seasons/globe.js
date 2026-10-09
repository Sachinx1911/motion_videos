// ===== photoreal NASA globe renderer (orthographic, tilt, sun lighting) =====
const GL_={tex:null,tw:0,th:0,buf:{}};
async function loadGlobe(){const im=new Image();im.src='a/world.jpg';await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  GL_.tex=g.getImageData(0,0,c.width,c.height).data;GL_.tw=c.width;GL_.th=c.height;
  const s=new Image();s.src='a/I1b_sun_real.png';await s.decode();GL_.sun=s;}
const vn=v=>{const l=Math.hypot(v[0],v[1],v[2]);return [v[0]/l,v[1]/l,v[2]/l]};
const vd=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const vx=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const vs=(a,k)=>[a[0]*k,a[1]*k,a[2]*k];const va=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const D2R=Math.PI/180;
// frame: A axis (view coords, y up, z to viewer). lon0 = texture longitude placed toward vector F (default viewer)
function gFrame(A,lon0,F=[0,0,1]){A=vn(A);let r=[0,0,1];if(Math.abs(vd(r,A))>.97)r=[1,0,0];const e1=vn(va(r,vs(A,-vd(r,A))));const e2=vx(A,e1);
  const fl=Math.atan2(vd(F,e2),vd(F,e1))/D2R;return {A,e1,e2,spin:lon0-fl}}
function gPoint(fr,lat,lon){const l=(lon-fr.spin)*D2R,c=Math.cos(lat*D2R);return va(va(vs(fr.e1,c*Math.cos(l)),vs(fr.e2,c*Math.sin(l))),vs(fr.A,Math.sin(lat*D2R)))}
// draw globe pixels
function drawGlobe(ctx,cx,cy,R,fr,S,o={}){
  const x0=Math.max(0,Math.floor(cx-R)),x1=Math.min(1080,Math.ceil(cx+R)),y0=Math.max(0,Math.floor(cy-R)),y1=Math.min(1920,Math.ceil(cy+R));
  const w=x1-x0,h=y1-y0;if(w<=0||h<=0)return;
  const key=w+'x'+h;let id=GL_.buf[key];if(!id){id=new ImageData(w,h);GL_.buf[key]=id}const d=id.data;
  const T=GL_.tex,tw=GL_.tw,th=GL_.th;const A=fr.A,e1=fr.e1,e2=fr.e2,sp=fr.spin;S=vn(S);
  const night=o.night===undefined?.10:o.night,hot=o.hot||0,cool=o.cool||0,amb=o.amb||0;const iR=1/R;
  for(let j=0;j<h;j++){const y=(cy-(y0+j+.5))*iR;const yy=y*y;
    for(let i=0;i<w;i++){const x=(x0+i+.5-cx)*iR;const r2=x*x+yy;const k=(j*w+i)*4;
      if(r2>=1){d[k+3]=0;continue}
      const z=Math.sqrt(1-r2);
      const pa=x*A[0]+y*A[1]+z*A[2];const lat=Math.asin(pa>1?1:pa<-1?-1:pa);
      const u=x*e1[0]+y*e1[1]+z*e1[2],v=x*e2[0]+y*e2[1]+z*e2[2];let lon=Math.atan2(v,u)/D2R+sp;
      lon=((lon+180)%360+360)%360;const tx=(lon/360*tw)|0,ty=Math.min(th-1,((90-lat/D2R)/180*th)|0);const ti=(ty*tw+tx)*4;
      const dd=x*S[0]+y*S[1]+z*S[2];let L=(dd+.08)/.28;L=L<0?0:L>1?1:L;const sh=night+(1-night)*L*(.55+.45*(dd>0?dd:0))+amb;
      let r=T[ti]*sh,g=T[ti+1]*sh,b=T[ti+2]*sh;
      if(hot>0&&dd>0){const q=Math.pow(dd,30)*hot;r+=255*q;g+=150*q;b+=30*q;const q2=Math.pow(dd,6)*hot*.25;r+=120*q2;g+=50*q2}
      if(cool>0){r=r*(1-cool*.5);g=g*(1-cool*.2);b=b+(255-b)*cool*.35}
      const rim=Math.pow(1-z,3)*(.25+.75*L);r+=60*rim;g+=130*rim;b+=255*rim;
      const ed=(1-Math.sqrt(r2))*R;const al=ed<1.2?ed/1.2:1;
      d[k]=r>255?255:r;d[k+1]=g>255?255:g;d[k+2]=b>255?255:b;d[k+3]=255*al}}
  if(!GL_.oc){GL_.oc=document.createElement('canvas');GL_.oc.width=1080;GL_.oc.height=1920;GL_.og=GL_.oc.getContext('2d')}
  GL_.og.clearRect(0,0,1080,1920);GL_.og.putImageData(id,x0,y0);
  ctx.save();ctx.globalAlpha=o.alpha===undefined?1:o.alpha;
  // atmosphere glow
  const gr=ctx.createRadialGradient(cx,cy,R*.95,cx,cy,R*1.12);gr.addColorStop(0,'rgba(90,170,255,.55)');gr.addColorStop(1,'rgba(90,170,255,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(cx,cy,R*1.12,0,7);ctx.fill();
  ctx.drawImage(GL_.oc,x0,y0,w,h,x0,y0,w,h);ctx.restore();
}
const gProj=(cx,cy,R,P)=>[cx+R*P[0],cy-R*P[1]];
// latitude circle (front part)
function gLat(ctx,cx,cy,R,fr,lat,col,lw,o={}){ctx.save();ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.lineCap='round';if(o.dash)ctx.setLineDash(o.dash);if(o.glow){ctx.shadowColor=col;ctx.shadowBlur=o.glow}
  ctx.globalAlpha=o.alpha===undefined?1:o.alpha;ctx.beginPath();let pen=false;let best=null;const N=180;
  for(let i=0;i<=N;i++){const P=gPoint(fr,lat,i*2);const vis=P[2]>0.02;const [sx,sy]=gProj(cx,cy,R,P);
    if(vis){if(!pen){ctx.moveTo(sx,sy);pen=true}else ctx.lineTo(sx,sy);if(P[2]>.25&&(!best||sx>best[0]))best=[sx,sy]}else pen=false}
  ctx.stroke();ctx.restore();return best}
// axis line through poles
function gAxis(ctx,cx,cy,R,fr,col='#ffc94d',ext=1.32,front=true){const A=fr.A;const p1=gProj(cx,cy,R,vs(A,ext)),p0=gProj(cx,cy,R,vs(A,1)),q1=gProj(cx,cy,R,vs(A,-ext)),q0=gProj(cx,cy,R,vs(A,-1));
  ctx.save();ctx.strokeStyle=col;ctx.lineWidth=9;ctx.lineCap='round';ctx.shadowColor=col;ctx.shadowBlur=18;ctx.beginPath();
  if(front){if(A[2]>=0){ctx.moveTo(...p0);ctx.lineTo(...p1)}else{ctx.moveTo(...q0);ctx.lineTo(...q1)}}else{if(A[2]>=0){ctx.moveTo(...q0);ctx.lineTo(...q1)}else{ctx.moveTo(...p0);ctx.lineTo(...p1)}}
  ctx.stroke();ctx.restore()}
// pill label on canvas
function cPill(ctx,x,y,txt,bg,fs=34,o={}){ctx.save();ctx.font=`800 ${fs}px B`;const w=ctx.measureText(txt).width+fs*1.1,h=fs*1.55;const al=o.align||'c';const bx=al==='l'?x:al==='r'?x-w:x-w/2;
  ctx.globalAlpha=o.alpha===undefined?1:o.alpha;ctx.shadowColor='rgba(0,0,0,.5)';ctx.shadowBlur=14;ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(bx,y-h/2,w,h,h/2);ctx.fill();ctx.shadowBlur=0;
  ctx.lineWidth=4;ctx.strokeStyle='#fff';ctx.stroke();ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,bx+w/2,y+fs*.06);ctx.restore()}
// sun rays: parallel beams from direction S, fanned north-south
function gRays(ctx,cx,cy,R,fr,S,o={}){S=vn(S);const A=fr.A;let u=va(A,vs(S,-vd(A,S)));u=vn(u);const n=o.n||9;const L=o.len||3.2;const p=o.p===undefined?1:o.p;
  ctx.save();ctx.lineCap='round';
  for(let k=0;k<n;k++){const a=-.9+1.8*k/(n-1);const H=va(vs(u,a),vs(S,Math.sqrt(1-a*a)));if(H[2]<-.05)continue;const F=va(H,vs(S,L));
    const [hx,hy]=gProj(cx,cy,R,H),[fx,fy]=gProj(cx,cy,R,F);const ex=fx+(hx-fx)*p,ey=fy+(hy-fy)*p;
    const gr=ctx.createLinearGradient(fx,fy,hx,hy);gr.addColorStop(0,'rgba(255,214,90,0)');gr.addColorStop(.6,'rgba(255,214,90,.75)');gr.addColorStop(1,'rgba(255,240,180,1)');
    ctx.strokeStyle=gr;ctx.lineWidth=7;ctx.shadowColor='#ffb300';ctx.shadowBlur=14;ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(ex,ey);ctx.stroke();
    if(p>=1){ctx.fillStyle='rgba(255,236,160,.9)';ctx.beginPath();ctx.arc(hx,hy,5,0,7);ctx.fill()}}
  // main direct ray
  if(o.main!==false){const H=S,F=va(S,vs(S,L));const [hx,hy]=gProj(cx,cy,R,H),[fx,fy]=gProj(cx,cy,R,F);const ex=fx+(hx-fx)*p,ey=fy+(hy-fy)*p;
    ctx.strokeStyle='#fff6c8';ctx.lineWidth=16;ctx.shadowColor='#ffcc33';ctx.shadowBlur=30;ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(ex,ey);ctx.stroke();
    if(p>=1&&H[2]>0){const pu=1+.25*Math.sin(performance_t*8);ctx.fillStyle='#fff';ctx.shadowBlur=40;ctx.beginPath();ctx.arc(hx,hy,15*pu,0,7);ctx.fill();
      ctx.strokeStyle='rgba(255,240,170,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(hx,hy,30+12*((performance_t*1.5)%1),0,7);ctx.stroke()}}
  ctx.restore()}
let performance_t=0;
// beam footprint arc on globe surface (shows spread of same beam)
function gBeam(ctx,cx,cy,R,fr,S,a0,a1,col,o={}){S=vn(S);const A=fr.A;let u=vn(va(A,vs(S,-vd(A,S))));const L=3.4;
  const H=a=>va(vs(u,a),vs(S,Math.sqrt(1-a*a)));const Fp=a=>va(H(a),vs(S,L));
  ctx.save();const p=o.p===undefined?1:o.p;
  const h0=gProj(cx,cy,R,H(a0)),h1=gProj(cx,cy,R,H(a1)),f0=gProj(cx,cy,R,Fp(a0)),f1=gProj(cx,cy,R,Fp(a1));
  ctx.globalAlpha=.45*p;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(...f0);ctx.lineTo(...h0);
  for(let i=1;i<=20;i++){ctx.lineTo(...gProj(cx,cy,R,H(a0+(a1-a0)*i/20)))}ctx.lineTo(...f1);ctx.closePath();ctx.fill();
  ctx.globalAlpha=p;ctx.strokeStyle=col;ctx.lineWidth=14;ctx.lineCap='round';ctx.shadowColor=col;ctx.shadowBlur=22;ctx.beginPath();
  for(let i=0;i<=20;i++){const q=gProj(cx,cy,R,H(a0+(a1-a0)*i/20));i?ctx.lineTo(...q):ctx.moveTo(...q)}ctx.stroke();ctx.restore();
  return gProj(cx,cy,R,H((a0+a1)/2))}
// season geometry: phi=0 June solstice, 90 Sept? (we use: delta = 23.44*cos(phi))
// side view: sun at left-front. beta = camera yaw toward sun
function sideGeo(phi,beta=35){const t=23.44*D2R,f=phi*D2R,b=beta*D2R;const Aw=[-Math.sin(t)*Math.cos(f),Math.cos(t),Math.sin(t)*Math.sin(f)];const Sw=[-1,0,0];
  const R=v=>[v[0]*Math.cos(b)+v[2]*Math.sin(b),v[1],-v[0]*Math.sin(b)+v[2]*Math.cos(b)];return {A:R(Aw),S:R(Sw)}}
