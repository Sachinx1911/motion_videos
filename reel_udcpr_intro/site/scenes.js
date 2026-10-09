// SRS Dwell - UDCPR म्हणजे काय? (series भाग 1). Times = cue_words.json (after cut of 1.005 s at 26.955)
function buildScenes(){
const END=85.9;
const SEC=[0,7.9,13.0,17.75,26.98,39.85,50.2,65.35,73.95,END];
HOOKS.push(t=>{let i=0;while(i<SEC.length-2&&t>=SEC[i+1])i++;const p=clamp((t-SEC[i])/(SEC[i+1]-SEC[i]));document.getElementById('stage').style.transform=`scale(${1+.035*E.inout(p)})`});
BOKEH_ON=t=>(t<7.8||(t>13&&t<17.8)||(t>17.7&&t<27)||(t>39.8&&t<50.2)||t>73.9)?0:1;

// ---------- transitions ----------
BLINDS(7.9);SWEEP(13.0);BARS(17.75);SWEEP(26.98);RINGT(39.85);BARS(50.2,['#b8935f','#faf7f2','#0d1729','#e8cf9f']);BLINDS(65.35,'#121d33');SWEEP(73.95);
for(const [t,a] of [[0.36,.04],[2.44,.04],[3.38,.04],[5.5,.06],[6.86,.07],[16.94,.06],[25.72,.05],[33.52,.06],[37.96,.06],[40.82,.05],[46.82,.06],[52.18,.06],[64.84,.05],[9.66,.03],[10.42,.03],[11.72,.03],[12.18,.03],[18.34,.03],[19.5,.03],[34.44,.04],[53.16,.03],[57.52,.03],[60.62,.03],[62.8,.03],[65.82,.03],[69.46,.03],[71.26,.04],[84.4,.04]])punch(t,a);

// ---------- HUD ----------
A({t0:0,t1:END+1,x:128,y:108,w:190,img:'logo_white.png',cls:'noshadow',enter:'fade',din:.6,float:0,z:600,fn:t=>({o:t>81.0?1-clamp((t-81)/.4):1})});
A({t0:0.3,t1:81.0,x:880,y:108,w:360,cls:'chipw',html:`<span class="pill p-glass" style="font:700 30px/1 P;padding:14px 24px 10px">UDCPR series - भाग 1</span>`,enter:'fade',din:.6,float:0,z:600});
TXT(0.5,81.0,540,1872,`<div style="font:500 24px/1.4 P;color:rgba(255,255,255,.55)">* UDCPR-2020, 30 जानेवारी 2025 पर्यंत सुधारित - मुंबई (MCGM) सोडून</div>`,{enter:'fade',din:.6,float:0,sfx:null,z:600});

// ---------- 3D book (HTML cover) ----------
function BOOK3D(o){const Wd=o.bw||420,Hd=Math.round(Wd*1.38),T=o.T||70;
  const f=(st,h='')=>`<div style="position:absolute;left:0;top:0;backface-visibility:hidden;${st}">${h}</div>`;
  const edge='repeating-linear-gradient(90deg,#f6f3ec 0 2px,#d6d0c3 2px 3px)',edgeH='repeating-linear-gradient(0deg,#f6f3ec 0 2px,#d6d0c3 2px 3px)';
  const k=Wd/420;
  const cover=`<div style="position:absolute;inset:${22*k}px;border:${3*k}px solid #c9a66f;border-radius:${8*k}px"></div><div style="position:absolute;inset:${32*k}px;border:${1*k}px solid rgba(232,207,159,.5);border-radius:${6*k}px"></div>
   <div style="position:absolute;left:0;right:0;top:${62*k}px;text-align:center;font:700 ${24*k}px/1.2 P;color:#e8cf9f;letter-spacing:${2*k}px">महाराष्ट्र शासन</div>
   <div style="position:absolute;left:0;right:0;top:${150*k}px;text-align:center"><div class="gold" style="font:900 ${118*k}px/1 P;letter-spacing:${4*k}px">UDCPR</div><div style="font:800 ${54*k}px/1.2 P;color:#fff;letter-spacing:${10*k}px;margin-top:${6*k}px">2020</div></div>
   <div style="position:absolute;left:${50*k}px;right:${50*k}px;top:${360*k}px;height:${2*k}px;background:linear-gradient(90deg,transparent,#c9a66f,transparent)"></div>
   <div style="position:absolute;left:${40*k}px;right:${40*k}px;top:${380*k}px;text-align:center;font:600 ${21*k}px/1.35 P;color:rgba(255,255,255,.85)">Unified Development Control and Promotion Regulations</div>
   <div style="position:absolute;left:0;right:0;bottom:${56*k}px;text-align:center;font:600 ${20*k}px/1.2 P;color:#e8cf9f">नगरविकास विभाग</div>
   <div class="gloss" style="position:absolute;top:-10%;bottom:-10%;width:45%;left:-50%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45) 50%,transparent);mix-blend-mode:screen"></div>`;
  const html=`<div style="width:${Wd}px;height:${Hd}px;perspective:2600px"><div class="bk" style="position:relative;width:${Wd}px;height:${Hd}px;transform-style:preserve-3d">
   ${f(`width:${Wd}px;height:${Hd}px;transform:translateZ(${T/2}px);background:linear-gradient(135deg,#22345a,#0d1729 60%,#1a2949);border-radius:4px 14px 14px 4px;overflow:hidden;box-shadow:inset 10px 0 16px rgba(0,0,0,.45)`,cover)}
   ${f(`width:${Wd}px;height:${Hd}px;transform:rotateY(180deg) translateZ(${T/2}px);background:linear-gradient(160deg,#1b2a45,#0a1220);border-radius:14px 4px 4px 14px`)}
   ${f(`width:${T}px;height:${Hd}px;left:${(Wd-T)/2}px;transform:rotateY(-90deg) translateZ(${Wd/2}px);background:linear-gradient(90deg,#0d1729,#22345a 50%,#0d1729)`,`<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(90deg);white-space:nowrap;font:900 ${T*.42}px P;color:#e8cf9f;letter-spacing:3px">UDCPR - 2020</div>`)}
   ${f(`width:${T}px;height:${Hd}px;left:${(Wd-T)/2}px;transform:rotateY(90deg) translateZ(${Wd/2-4}px);background:${edge}`)}
   ${f(`width:${Wd-6}px;height:${T}px;top:${(Hd-T)/2}px;transform:rotateX(90deg) translateZ(${Hd/2-3}px);background:${edgeH}`)}
   ${f(`width:${Wd-6}px;height:${T}px;top:${(Hd-T)/2}px;transform:rotateX(-90deg) translateZ(${Hd/2-3}px);background:${edgeH}`)}
  </div></div>`;
  return A(Object.assign({x:540,y:960,w:Wd,html,cls:'noshadow',enter:'fade',din:.3,exit:'fade',dout:.35,float:0,z:30,
    draw:(t,lt,oo)=>{oo.el.querySelector('.bk').style.transform=`rotateX(${6+Math.sin(t*.7)*2}deg) rotateY(${o.RY?o.RY(t,lt):(-22+Math.sin(t*.9)*9)}deg)`;
      const g=oo.el.querySelector('.gloss');let sp=-1;for(const st of (o.gloss||[])){const p=(t-st)/.9;if(p>=0&&p<=1)sp=p}g.style.left=lerp(-50,110,sp<0?0:sp)+'%'}},o));
}

// ---------- real book images ----------
function BOOKIMG(o){const sp=o.spin||1.0;return A(Object.assign({img:o.open?'O16_book_open.png':'O15_book_closed.png',enter:'fade',din:.15,float:.25,z:40,
  fn:(t,lt)=>({s:lerp(.25,1,E.back(clamp(lt/sp))),ry:o.open?0:lerp(-75,0,E.out(clamp(lt/sp)))+Math.sin(t*.9)*6,dy:-(1-E.out(clamp(lt/sp)))*80})},o));}
const spinIn=(t0,d=1.2)=>(t,lt)=>lt<d?lerp(-560,-22,E.out(clamp(lt/d))):-22+Math.sin(t*.9)*9;

// ---------- satellite map ----------
const MS=1080/MH.W, MW=1080, MHh=Math.round(MH.H*MS);
const mp=n=>[MH.city[n][0]*MS,MH.city[n][1]*MS];
function MAP(o){
  const dist=Object.entries(MH.dist).sort((a,b)=>a[1].c[0]-b[1].c[0]);
  const html=`<div style="position:relative;width:${MW}px;height:${MHh}px;overflow:hidden;-webkit-mask-image:radial-gradient(ellipse 72% 68% at 50% 50%,#000 62%,transparent 100%)">
   <img src="a/mh_sat.jpg" style="width:100%;display:block;filter:none">
   <svg viewBox="0 0 ${MH.W} ${MH.H}" style="position:absolute;left:0;top:0;width:100%;height:100%">
    <defs><mask id="mkst${o.id}"><rect width="${MH.W}" height="${MH.H}" fill="#fff"/><path d="${MH.state}" fill="#000"/></mask></defs>
    <rect width="${MH.W}" height="${MH.H}" fill="rgba(6,11,22,.62)" mask="url(#mkst${o.id})"/>
    ${dist.map(([n,v],i)=>`<path class="d" data-i="${i}" d="${v.d}" fill="#e8cf9f" fill-opacity="0" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>`).join('')}
    <path class="st" d="${MH.state}" fill="none" stroke="#f2dfb6" stroke-width="9" stroke-linejoin="round" style="filter:drop-shadow(0 0 14px #e8cf9f)"/>
   </svg>${o.inner||''}</div>`;
  const ud=o.draw;o.draw=(t,lt,oo)=>{const st=oo.el.querySelector('.st');if(!oo.SL)oo.SL=st.getTotalLength();st.style.strokeDasharray=oo.SL;st.style.strokeDashoffset=oo.SL*(1-E.inout(clamp(lt/1.4)));oo.el.querySelectorAll('.rp').forEach((r,k)=>{const f=(t*0.9+k*.37)%1;r.style.transform=`translate(-50%,-50%) scale(${1+f*2.2})`;r.style.opacity=(1-f)*.9});const im=oo.el.querySelector('img');im.style.transform=`scale(${1.06-.06*E.out(clamp(lt/1.2))})`;im.style.filter=`blur(${(1-E.out(clamp(lt/.8)))*6}px)`;if(ud)ud(t,lt,oo)};return A(Object.assign({x:540,y:960,w:MW,html,cls:'noshadow',enter:'zoom',din:.6,sfx:'whoosh',z:20,float:.08},o));
}
const pin=(n,cls,html,dx=0,dy=0)=>{const [x,y]=mp(n);return `<div class="${cls}" style="position:absolute;left:${x+dx}px;top:${y+dy}px;transform:translate(-50%,-50%);opacity:0">${html}</div>`};
const show=(el,t,t0,sc=true)=>{const p=clamp((t-t0)/.35);el.style.opacity=p;if(sc)el.style.transform=`translate(-50%,-50%) scale(${t0>0?E.back2(p):1})`};

// ================= HOOK 0 - 7.9 =================
BG({img:'B06_blueprint.jpg',t0:0,t1:7.95,s0:1.18,s1:1.04,y0:-40,y1:20,fade:.2,filter:'brightness(.62) saturate(.9)'});
PART({type:'dust',t0:0,t1:END,n:70,seed:5,life:7,color:'#f2dfb6',alpha:.8});
{const fl=[];for(let k=0;k<8;k++){const y=1500-k*95;fl.push(`M380,${y} L700,${y}`)}const bw=`M380,1500 L380,740 L700,740 L700,1500 ${fl.join(' ')} M440,1500 L440,740 M540,1500 L540,740 M640,1500 L640,740 M360,740 L720,740 L720,715 L360,715 Z`;
 A({t0:0.1,t1:4.4,x:540,y:960,w:1080,cls:'noshadow',html:`<svg viewBox="0 0 1080 1920" width="1080" height="1920"><path class="wf" d="${bw}" fill="none" stroke="#f2dfb6" stroke-width="5" stroke-linecap="round" style="filter:drop-shadow(0 0 10px #e8cf9f)"/>
  <g class="dim" opacity="0"><path d="M760,740 L760,1500 M745,740 L775,740 M745,1500 L775,1500" stroke="#fff" stroke-width="4"/><text x="790" y="1130" fill="#fff" font-family="P" font-weight="800" font-size="46">G+7</text></g>
  <g class="dim2" opacity="0"><path d="M380,1560 L700,1560 M380,1545 L380,1575 M700,1545 L700,1575" stroke="#fff" stroke-width="4"/><text x="470" y="1630" fill="#f2dfb6" font-family="P" font-weight="800" font-size="46">FSI ?</text></g></svg>`,
  enter:'fade',din:.2,exit:'fade',dout:.3,float:0,z:12,
  draw:(t,lt,oo)=>{const p=oo.el.querySelector('.wf');if(!oo.L)oo.L=p.getTotalLength();p.style.strokeDasharray=oo.L;p.style.strokeDashoffset=oo.L*(1-E.inout(clamp(lt/3.2)));
   oo.el.querySelector('.dim').setAttribute('opacity',clamp((t-2.3)/.4));oo.el.querySelector('.dim2').setAttribute('opacity',clamp((t-3.2)/.4))}});
 sfx(0.15,'pen',.5);sfx(2.3,'pop',.4);sfx(3.2,'pop',.4);}
TINT(0,7.9,'linear-gradient(180deg,rgba(6,11,22,.7),rgba(6,11,22,.1) 35%,rgba(6,11,22,.15) 65%,rgba(6,11,22,.85))',.2);
[['घर किती मोठं?',0.36,300,560,-6],['किती मजले?',2.1,770,860,5],['किती parking?',3.06,330,1160,-4]].forEach(([s,t0,x,y,r],i)=>
  A({t0,t1:7.9,x,y,w:560,cls:'chipw',html:`<span class="pill p-glass" style="font:800 52px/1 P;padding:24px 40px 18px">${s}</span>`,enter:'pop',din:.4,sfx:'pop',sfxv:.7,z:45,float:.3,rot:r,
    fn:t=>{const p=E.in3(clamp((t-4.3-i*.08)/.5));return {dx:(540-x)*p,dy:(980-y)*p,s:1-p*.85,o:1-clamp((t-4.7-i*.08)/.15)}}}));
sfx(4.35,'whoosh',.8);
BOOKIMG({t0:4.75,t1:7.9,x:540,y:1000,w:480,shine:[5.9,7.1],sfx:'impact',sfxd:.7,sfxv:.6});
TXT(5.5,7.9,540,330,`<div style="font:800 62px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">सगळं <span class="gold">एका पुस्तकात</span> ठरतं!</div>`,{enter:'down',din:.4});
A({t0:6.86,t1:7.9,x:540,y:1560,w:900,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.7);font-size:110px;letter-spacing:6px">UDCPR</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.9,z:60,float:0,rot:-4});
flash(6.95,.35,'#fff4dc');PART({type:'sparks',t0:6.95,t1:7.15,n:60,seed:3,x:540,y:1560,speed:800,color:'#f2dfb6'});

// ================= MEANING 7.9 - 13.0 =================
TXT(8.42,13.0,540,330,`<div class="lab" style="font-size:40px">UDCPR म्हणजे?</div>`,{enter:'down'});
[['U','Unified',9.66,'एकत्रित'],['D','Development',10.42,'विकास'],['C','Control',10.86,'नियंत्रण'],['P','Promotion',11.72,'प्रोत्साहन'],['R','Regulations',12.18,'नियमावली']].forEach(([l,w,t1,mr],i)=>{
  const y=560+i*230;
  A({t0:8.42+i*.07,t1:13.0,x:170,y,w:190,cls:'noshadow',html:`<div style="width:170px;height:170px;border-radius:34px;background:linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.03));border:2px solid rgba(232,207,159,.45);display:flex;align-items:center;justify-content:center"><span class="gold" style="font:900 120px/1 P">${l}</span></div>`,enter:'pop',din:.4,sfx:i?null:'whoosh',z:40,float:.2,
    fn:t=>({s:t>t1&&t<t1+.35?1+.15*Math.sin((t-t1)/.35*Math.PI):1})});
  A({t0:t1,t1:13.0,x:680,y,w:740,cls:'noshadow',html:`<div style="text-align:left"><div style="font:800 64px/1.1 P;color:#fff">${w}</div><div class="gold" style="font:800 44px/1.3 P">${mr}</div></div>`,enter:'fade',din:.35,sfx:'swoosh',sfxv:.6,z:40,float:.15,shine:[t1+.25],fn:(t,lt)=>({dx:(1-E.out(clamp(lt/.4)))*60})});
});

// ================= SIMPLE 13.0 - 17.75 =================
BG({img:'B05_city.jpg',t0:13.0,t1:17.8,s0:1.05,s1:1.18,y0:30,y1:-30,fade:.3,filter:'brightness(.55)'});
TINT(13.0,17.75,'linear-gradient(180deg,rgba(6,11,22,.75),rgba(6,11,22,.1) 40%,rgba(6,11,22,.2) 60%,rgba(6,11,22,.85))',.3);
TXT(13.1,17.75,540,420,`<div class="lab" style="font-size:40px">सोप्या भाषेत</div>`,{enter:'down'});
GL(13.96,17.75,540,800,920,`<div style="font:800 60px/1.3 P">महाराष्ट्रात कोणतंही</div><div class="gold" style="font:900 84px/1.2 P">बांधकाम</div>`,{enter:'up',pad:'34px 30px',dark:true});
A({t0:16.94,t1:17.75,x:540,y:1250,w:1000,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.7);font-size:96px">एकच नियमावली</div>`,enter:'stamp',din:.3,sfx:'stamp',sfxd:.12,sfxv:.9,z:60,float:0,rot:-4});

// ================= CHAOS 17.75 - 26.98 =================
const RB=(c)=>`<div style="width:64px;height:86px;border-radius:4px 10px 10px 4px;background:linear-gradient(135deg,${c},#000 160%);box-shadow:0 10px 20px rgba(0,0,0,.6),inset 6px 0 0 rgba(0,0,0,.25);border:2px solid rgba(255,255,255,.35)"></div>`;
const LB=(s)=>`<div style="margin-top:6px;font:800 30px/1 P;color:#fff;white-space:nowrap;text-shadow:0 2px 8px #000;background:rgba(6,11,22,.7);padding:8px 14px 6px;border-radius:12px">${s}</div>`;
const CITIES=[['Pune','पुण्याचे','#c0392b',18.34,0,0],['Nashik','नाशिकचे','#27ae60',18.88,0,-60],['Nagpur','नागपूरचे','#2e86de',19.5,-250,0],['Thane','ठाण्याचे','#e67e22',20.1,0,-70]];
MAP({id:1,t0:17.85,t1:26.98,y:930,
  inner:CITIES.map(([n,mr,c,,dx,dy])=>pin(n,'cb cb-'+n,`<div style="display:flex;align-items:center;gap:8px;position:relative"><div class="rp" style="position:absolute;left:32px;top:50%;width:60px;height:60px;border-radius:50%;border:4px solid ${c};opacity:0"></div>${RB(c)}${LB(mr+' नियम')}</div>`,140+dx,dy)).join('')+
   `<svg class="ar" viewBox="0 0 ${MW} ${MHh}" style="position:absolute;left:0;top:0;width:100%;height:100%;opacity:0"><path class="ap" d="M${mp('Pune')[0]},${mp('Pune')[1]} Q${mp('Pune')[0]+30},${(mp('Pune')[1]+mp('Nashik')[1])/2} ${mp('Nashik')[0]+10},${mp('Nashik')[1]+20}" fill="none" stroke="#f2dfb6" stroke-width="7" stroke-dasharray="14 12"/></svg>
   <div class="bd" style="position:absolute;left:0;top:0;opacity:0;width:60px;height:70px"><svg viewBox="0 0 60 70" width="60"><rect x="8" y="10" width="44" height="58" rx="3" fill="#f2dfb6" stroke="#fff" stroke-width="3"/><g fill="#0d1729"><rect x="16" y="18" width="8" height="8"/><rect x="36" y="18" width="8" height="8"/><rect x="16" y="34" width="8" height="8"/><rect x="36" y="34" width="8" height="8"/><rect x="25" y="50" width="10" height="18"/></g></svg></div>
   <div class="bx" style="position:absolute;left:0;top:0;opacity:0;font:900 44px/1 P;color:#fff;background:#d1301f;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;border:4px solid #fff">✕</div>
   <div class="bv" style="position:absolute;left:0;top:0;opacity:0;font:900 40px/1 P;color:#fff;background:#1f9a52;border-radius:50%;width:66px;height:66px;display:flex;align-items:center;justify-content:center;border:4px solid #fff">✓</div>`,
  draw:(t,lt,oo)=>{CITIES.forEach(([n,,,t0])=>show(oo.el.querySelector('.cb-'+n),t,t0));
    const ar=oo.el.querySelector('.ar');ar.style.opacity=clamp((t-22.58)/.3)*(1-clamp((t-25.6)/.3));
    const ap=oo.el.querySelector('.ap');if(!oo.L)oo.L=ap.getTotalLength();ap.style.strokeDashoffset=-t*40;
    const p=E.inout(clamp((t-23.36)/.9));const pt=ap.getPointAtLength(oo.L*p);
    const bv=oo.el.querySelector('.bv');bv.style.left=(mp('Pune')[0]-33-50)+'px';bv.style.top=(mp('Pune')[1]-33)+'px';bv.style.opacity=clamp((t-23.0)/.2)*(1-clamp((t-25.6)/.3));
    const bx=oo.el.querySelector('.bx');bx.style.left=(mp('Nashik')[0]-35+70)+'px';bx.style.top=(mp('Nashik')[1]-35+10)+'px';bx.style.opacity=clamp((t-25.04)/.2)*(1-clamp((t-25.6)/.3));bx.style.transform=`scale(${lerp(2,1,E.out(clamp((t-25.04)/.3)))})`;
    oo.bld=oo.bld||oo.el.querySelector('.bd');if(oo.bld){oo.bld.style.left=(pt.x-30)+'px';oo.bld.style.top=(pt.y-70)+'px';oo.bld.style.opacity=clamp((t-23.3)/.2)*(1-clamp((t-25.5)/.2))}},
  fn:t=>({o:1-.6*clamp((t-25.6)/.3),s:1-.06*clamp((t-25.6)/.3)})});
// building icon travelling Pune -> Nashik (inside a separate overlay item using same geometry)
TXT(20.5,25.6,540,330,`<div style="font:800 58px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">प्रत्येक शहराचे <span class="gold">नियम वेगळे</span></div>`,{enter:'down',din:.4});
sfx(18.34,'pop',.6);sfx(18.88,'pop',.6);sfx(19.5,'pop',.6);sfx(20.1,'pop',.6);sfx(25.04,'buzz',.55);
PILL(22.58,25.6,540,1560,'पुण्यात चालणारं बांधकाम ➜ नाशिकमध्ये नाही','p-glass',{st:'font-size:40px'});
IMG(25.6,26.98,540,1050,520,'O14_books.png',{enter:'drop',din:.6,sfx:'thud',sfxd:.4,float:0,z:44,fn:(t,lt)=>({r:Math.sin(lt*9)*3*clamp(lt-.4)})});
shake(26.0,14);
A({t0:25.72,t1:26.98,x:280,y:1600,w:460,cls:'chipw',html:`<span class="pill p-red" style="font-size:56px">गोंधळ</span>`,enter:'stamp',din:.3,sfx:'stamp',sfxv:.6,z:60,float:0,rot:-8});
A({t0:26.52,t1:26.98,x:800,y:1600,w:460,cls:'chipw',html:`<span class="pill p-red" style="font-size:56px">⏳ उशीर</span>`,enter:'stamp',din:.25,sfx:'stamp',sfxv:.6,z:60,float:0,rot:6});

// ================= 2 DEC 2020 26.98 - 39.85 =================
GL(27.4,39.85,540,400,880,`<div class="lab">शासन निर्णय</div><div style="font:800 82px/1.25 P;color:#fff"><span style="display:inline-block;vertical-align:-14px;margin-right:16px">${IC.cal(84)}</span>2 डिसेंबर <span class="gold">2020</span></div>`,{enter:'down',pad:'24px 30px',shine:[28.6],
  fn:t=>({o:1-clamp((t-34.3)/.3),dy:-40*clamp((t-34.3)/.3)})});
PILL(29.38,34.4,540,610,'नगरविकास विभाग, महाराष्ट्र शासन','p-glass',{st:'font-size:42px'});
IMG(31.74,33.9,540,1150,500,'O14_books.png',{enter:'up',din:.45,float:.2,z:40,exit:'zoom',dout:.35});
A({t0:33.52,t1:34.2,x:540,y:1150,w:700,cls:'chipw',html:`<div class="stampbox" style="color:#ff4a3a;background:rgba(40,0,0,.6);font-size:120px">रद्द</div>`,enter:'stamp',din:.25,sfx:'stamp',sfxd:.1,sfxv:1,z:60,float:0,rot:-10});
shake(33.6,14);flash(33.6,.3,'#ff5a4a');
PART({type:'petals',t0:33.6,t1:34.0,n:70,seed:31,x:540,y:1150,spread:500,burst:1,life:1.1,colors:['#f6f3ec','#e9e2d0','#fffaf0','#d9cfb8']});sfx(33.7,'paper',.7);
MAP({id:2,t0:34.2,t1:39.85,y:1150,sfx:'whoosh',inner:`<div class="scan" style="position:absolute;top:0;bottom:0;width:120px;background:linear-gradient(90deg,transparent,rgba(242,223,182,.85),transparent);mix-blend-mode:screen;opacity:0"></div>`,
  draw:(t,lt,oo)=>{const sc=oo.el.querySelector('.scan');if(sc){const q=clamp((t-34.44)/1.1);sc.style.left=(q*1200-120)+'px';sc.style.opacity=q>0&&q<1?1:0}oo.el.querySelectorAll('.d').forEach(p=>{const q=clamp((t-34.44-(+p.dataset.i)*.03)/.3);p.setAttribute('fill-opacity',(q*.5).toFixed(3));p.setAttribute('stroke-opacity',(.45+q*.5).toFixed(3))})},
  fn:t=>({s:1-.25*E.inout(clamp((t-35.4)/.6)),dy:120*E.inout(clamp((t-35.4)/.6)),o:1-.55*clamp((t-35.4)/.6)})});
TXT(34.44,35.5,540,430,`<div style="font:800 64px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">संपूर्ण <span class="gold">राज्यासाठी</span></div>`,{enter:'down',din:.35,exit:'fade',dout:.2});
BOOKIMG({t0:35.55,t1:39.85,x:540,y:830,w:470,z:45,spin:1.1,shine:[37.0,38.9],sfx:'reveal',sfxv:.6});
PART({type:'sparks',t0:36.9,t1:37.1,n:70,seed:8,x:540,y:820,speed:800,color:'#f2dfb6'});
A({t0:37.96,t1:39.85,x:540,y:1500,w:1040,cls:'chipw',html:`<div class="stampbox" style="color:#e8cf9f;background:rgba(13,23,41,.75);font-size:72px;line-height:1.25">एक राज्य,<br>एक नियमावली!</div>`,enter:'stamp',din:.3,sfx:'impact',sfxd:.1,sfxv:.7,z:60,float:0,rot:-3});
PART({type:'confetti',t0:38.9,t1:39.2,n:80,seed:12,x:540,y:-40,burst:1,life:2.5,colors:['#f2dfb6','#ffffff','#c9a66f','#1b2a45']});

// ================= EXCEPTIONS 39.85 - 50.2 =================
const EXC=[['Mumbai','मुंबई महापालिका',40.82,1,-90],['Navi Mumbai (NAINA)','NAINA',43.18,1,-25],['Lonavala','लोणावळा',43.98,1,35],['Mahabaleshwar','hill stations',44.78,1,0]];
TXT(39.88,46.7,540,280,`<div style="font:800 60px/1.25 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">पण <span class="gold">लक्षात ठेवा!</span></div>`,{enter:'down',din:.4});
MAP({id:3,t0:39.95,t1:50.2,y:1000,
  inner:EXC.map(([n,mr,,dx,dy])=>pin(n,'ex ex-'+n.split(' ')[0],`<div style="position:relative"><div class="rp" style="position:absolute;left:22px;top:22px;width:50px;height:50px;border-radius:50%;border:4px solid #ff4a3a;opacity:0"></div><div style="width:44px;height:44px;border-radius:50%;background:#d1301f;border:4px solid #fff;display:flex;align-items:center;justify-content:center;font:900 26px/1 P;color:#fff;box-shadow:0 0 24px #ff4a3a">✕</div><div style="position:absolute;left:${dx>0?52:'auto'}px;${dx<0?'right:52px;':''}top:${-4+dy}px;font:800 30px/1 P;color:#fff;white-space:nowrap;background:rgba(160,20,10,.85);padding:10px 16px 8px;border-radius:12px">${mr}</div></div>`)).join(''),
  draw:(t,lt,oo)=>{EXC.forEach(([n,,t0])=>show(oo.el.querySelector('.ex-'+n.split(' ')[0]),t,t0));
    oo.el.querySelectorAll('.d').forEach(p=>{const q=clamp((t-47.48-(+p.dataset.i)*.025)/.3);p.setAttribute('fill-opacity',(q*.5).toFixed(3));p.setAttribute('stroke-opacity',(.45+q*.5).toFixed(3))})},
  fn:t=>{const z=E.inout(clamp((t-40.3)/.8))*(1-E.inout(clamp((t-47.2)/.8)));const mx=95,my=470,sc=1+.6*z;return {s:sc,dx:-(mx-MW/2)*sc*z,dy:-(my-MHh/2)*sc*z}}});
GL(42.16,47.4,540,1640,860,`<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;font:800 40px/1.2 P"><span style="color:#ff8a7a">✕ MIDC</span><span style="color:#ff8a7a">✕ NAINA</span><span style="color:#ff8a7a">✕ JNPT</span><span style="color:#ff8a7a">✕ इको-सेन्सिटिव्ह झोन</span></div>`,{enter:'up',pad:'24px 26px',dark:true});
PILL(46.06,47.4,540,1420,'इथे UDCPR लागू नाही','p-red',{st:'font-size:56px',sfx:'buzz',sfxv:.5});
TXT(47.48,50.2,540,1640,`<div style="font:800 56px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">बाकी जवळपास <span class="gold">संपूर्ण महाराष्ट्र</span> ✓</div>`,{enter:'up',din:.4,sfx:'chime',sfxv:.5});

// ================= 15 CHAPTERS 50.2 - 65.35 =================
BOOKIMG({t0:50.3,t1:65.35,x:300,y:470,w:440,open:true,z:45,shine:[52.2,64.9],sfx:'whoosh',float:.15});
A({t0:51.72,t1:65.35,x:760,y:430,w:500,cls:'noshadow',html:'',enter:'pop',din:.4,sfx:'ticks',sfxv:.6,z:46,float:.2,
  count:{t0:51.75,t1:52.55,from:0,to:15,fmt:v=>`<div style="text-align:left"><div class="lab" style="font-size:38px">तब्बल</div><div><span class="gold" style="font:900 190px/1 P">${v}</span></div><div style="font:800 58px/1.1 P;color:#fff">प्रकरणं</div></div>`}});
sfx(52.6,'ding',.6);
const CH=[['📝','बांधकाम परवानगी, OC',53.16],['🏢','FSI, इमारतीची उंची',55.46],['🚗','Parking, Lift',57.52],['🏗️','जुन्या इमारतींचा Redevelopment',58.82],['🔁','TDR',60.62],['🏘️','झोपडपट्टी पुनर्वसन',61.34],['☀️','Rainwater, Solar',62.8],['➕','आणि बरंच काही',64.2]];
CH.forEach(([ic,s,t0],i)=>{const x=i%2?800:280,y=820+Math.floor(i/2)*270;
  ARROW({t0:t0-.15,t1:65.35,d:`M300,660 C300,${y-120} ${x},${y-160} ${x},${y-70}`,color:'rgba(232,207,159,.75)',sw:4,head:false,drawT:.45,z:35,sfx:null});
  GL(t0,65.35,x,y,500,`<div style="display:flex;align-items:center;gap:18px;text-align:left"><div style="flex:none;width:96px;height:96px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff7e6,#e8cf9f 45%,#b8935f);display:flex;align-items:center;justify-content:center;font-size:52px">${ic}</div><div style="font:800 38px/1.25 P">${s}</div></div>`,{enter:i%2?'right':'left',din:.4,pad:'22px 24px',sfx:'whoosh',sfxv:.5,float:.2,
    fn:t=>({s:t>64.84&&t<65.25?1+.07*Math.sin((t-64.84)/.4*Math.PI):1})})});
PART({type:'sparks',t0:64.85,t1:65.1,n:80,seed:19,x:540,y:1220,speed:900,color:'#f2dfb6'});

// ================= FOR YOU 65.35 - 73.95 =================
const YOU=[['O11_keys.png','contain','तुम्ही flat घेत असाल',65.82,560],['B03_meeting.jpg','cover','सोसायटीचा redevelopment',66.64,900],['P07_plot.jpg','cover','स्वतःच्या plot वर घर',69.46,1240]];
YOU.forEach(([img,fit,s,t0,y],i)=>GL(t0,73.95,540,y,960,`<div style="display:flex;align-items:center;gap:30px;text-align:left"><div style="flex:none;width:250px;height:220px;border-radius:24px;overflow:hidden;background:${fit==='contain'?'rgba(255,255,255,.06)':'#000'}"><img src="a/${img}" style="width:100%;height:100%;object-fit:${fit};filter:none"></div><div style="font:800 52px/1.25 P">${s}</div></div>`,{enter:i%2?'left':'right',din:.45,pad:'22px 26px',float:.15,
  fn:t=>({o:1-.4*clamp((t-72.9)/.4),s:1-.06*clamp((t-72.9)/.4)})}));
TXT(70.82,73.95,540,1540,`<div style="font:800 60px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.8)">तुमचे <span class="gold">हक्क</span> आणि <span class="gold">नियम</span></div>`,{enter:'up',din:.4});
BOOKIMG({t0:72.9,t1:73.95,x:540,y:1000,w:440,z:60,spin:.6,shine:[73.35],sfx:'impact',sfxv:.5});
TXT(73.06,73.95,540,330,`<div style="font:800 60px/1.25 P;color:#fff">सगळं <span class="gold">याच पुस्तकात!</span></div>`,{enter:'down',din:.3,z:500});

// ================= OUTRO 73.95 - END =================
BG({img:'B05_city.jpg',t0:73.95,t1:END+1,s0:1.2,s1:1.02,y0:40,y1:-20,fade:.3,filter:'brightness(.7)'});
TINT(73.95,END+1,'linear-gradient(180deg,rgba(6,11,22,.8),rgba(6,11,22,.15) 35%,rgba(6,11,22,.25) 60%,rgba(6,11,22,.9))',.3);
TXT(74.14,80.9,540,380,`<div class="lab" style="font-size:40px">पुढच्या videos मध्ये</div><div style="font:800 64px/1.25 P;color:#fff">UDCPR चा <span class="gold">एकेक नियम</span></div><div style="font:700 44px/1.4 P;color:rgba(255,255,255,.85)">सोप्या भाषेत</div>`,{enter:'down',din:.45,exit:'up',dout:.3});
['Carpet area','FSI','Redevelopment','TDR','OC','Parking','Lift','Balcony'].forEach((s,i)=>{const t0=76.6+i*.22;const x=i%2?760:320,y=760+Math.floor(i/2)*190;
  PILL(t0,80.9,x,y,s,'p-glass',{w:460,st:'font-size:46px',sfx:i%2?null:'pop',sfxv:.4,exit:'pop',dout:.25,float:.9})});
PILL(79.88,80.9,540,1600,'🔔 ही series miss करू नका','p-gold',{st:'font-size:52px'});
TXT(81.04,END+1,540,380,`<div style="font:800 58px/1.3 P;color:#fff;text-shadow:0 8px 30px rgba(0,0,0,.7)">अशाच <span class="gold">Real Estate</span><br>माहितीसाठी</div>`,{enter:'down',din:.45});
A({t0:81.3,t1:END+1,x:540,y:1010,w:860,cls:'gl w',html:`<div style="padding:50px 60px 44px"><img src="a/logo_gold.png" style="width:100%;filter:none"></div>`,enter:'zoom',din:.6,sfx:'reveal',sfxv:.6,z:50,float:.15,shine:[82.3,85.0]});
PART({type:'sparks',t0:81.5,t1:81.8,n:60,seed:44,x:540,y:1010,speed:800,color:'#f2dfb6'});
A({t0:82.8,t1:END+1,x:540,y:1560,w:1040,cls:'chipw',html:`<span class="pill p-gold" style="font-size:56px;padding:28px 60px 22px">Follow करा ➜</span>`,enter:'up',din:.45,sfx:'pop',sfxv:.8,z:54,float:0,
  fn:t=>({s:(t>84.35&&t<84.55?.93:1)*(1+Math.max(0,Math.sin((t-84.6)*5))*.04*(t>84.6?1:0))})});
A({t0:83.6,t1:END+1,x:830,y:1680,w:120,cls:'noshadow',html:`<svg viewBox="0 0 120 140" width="100%"><path d="M45 10c8 0 12 6 12 13v40l6-2c6-1 11 3 11 3l5-1c6-1 10 3 11 4l5-1c7 0 12 5 12 12v22c0 18-12 32-32 32H62c-12 0-20-6-26-14L12 85c-4-6-2-13 4-15 5-2 10 0 13 4l6 8V23c0-7 4-13 10-13z" fill="#fff" stroke="#222" stroke-width="5"/></svg>`,enter:'up',din:.4,z:56,float:0,fn:t=>({s:t>84.35&&t<84.55?.85:1})});
sfx(84.4,'click',.9);PART({type:'confetti',t0:84.45,t1:84.8,n:110,seed:41,x:540,y:-40,burst:1,life:3,colors:['#f2dfb6','#ffffff','#c9a66f','#1b2a45']});
}
