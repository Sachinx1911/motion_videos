import numpy as np, json, subprocess
from scipy.signal import butter, sosfilt
SR=44100; R=np.random.default_rng(5)
def env(n,a,d): t=np.arange(n)/SR; e=np.minimum(1,t/max(a,1e-4))*np.exp(-t/d); return e
def noise(d): return R.standard_normal(int(d*SR))
def bp(x,lo,hi): return sosfilt(butter(2,[lo,hi],'band',fs=SR,output='sos'),x)
def lp(x,f): return sosfilt(butter(2,f,'low',fs=SR,output='sos'),x)
def hp(x,f): return sosfilt(butter(2,f,'high',fs=SR,output='sos'),x)
def sweep_noise(d,f0,f1,shape):
    n=int(d*SR); x=noise(d); out=np.zeros(n); seg=1024
    for i in range(0,n,seg):
        p=i/n; f=f0*(f1/f0)**p; lo=max(60,f*0.6); hi=min(18000,f*1.6)
        out[i:i+seg]=bp(x[i:i+seg],lo,hi)
    return out*shape(np.linspace(0,1,n))
def tone(f,d,dec,typ='sin'):
    t=np.arange(int(d*SR))/SR; ph=2*np.pi*np.cumsum(np.broadcast_to(f,t.shape) if np.ndim(f) else np.full(t.shape,f))/SR
    x=np.sin(ph) if typ=='sin' else (2*((ph/(2*np.pi))%1)-1)
    return x*np.exp(-t/dec)
def S(name):
    if name=='whoosh': return 0.5*sweep_noise(.55,300,4000,lambda p:np.sin(np.pi*p)**2)
    if name=='swoosh': return 0.35*sweep_noise(.32,800,6000,lambda p:np.sin(np.pi*p)**2)
    if name=='rewind':
        d=2.3;n=int(d*SR);t=np.arange(n)/SR
        x=0.35*sweep_noise(d,6000,400,lambda p:np.sin(np.pi*p)**.5)
        f=900*np.exp(-t*1.2)+120; x+=0.18*tone(f,d,9,'saw')*np.sin(np.pi*t/d)*(0.6+0.4*np.sin(2*np.pi*14*t))
        return lp(x,5000)
    if name=='impact':
        t=np.arange(int(.9*SR))/SR; f=110*np.exp(-t*6)+45
        x=0.9*np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.25)+0.4*lp(noise(.9),2500)*np.exp(-t/0.08)
        return x
    if name=='boom':
        t=np.arange(int(2.2*SR))/SR; f=80*np.exp(-t*3)+32
        x=1.0*np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.7)+0.5*lp(noise(2.2),1800)*np.exp(-t/0.3)+0.25*hp(noise(2.2),3000)*np.exp(-t/0.15)
        return x
    if name=='thud':
        t=np.arange(int(.6*SR))/SR; f=90*np.exp(-t*10)+50
        return 0.9*np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.15)+0.3*lp(noise(.6),900)*np.exp(-t/0.06)
    if name=='stamp':
        t=np.arange(int(.5*SR))/SR
        return 0.7*lp(noise(.5),3000)*np.exp(-t/0.04)+0.7*np.sin(2*np.pi*(70*np.exp(-t*8)+60)*t)*np.exp(-t/0.12)
    if name=='pop':
        t=np.arange(int(.18*SR))/SR; f=500+900*np.exp(-t*40)
        return 0.45*np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.05)
    if name=='coin':
        x=0
        for k,(f,dc) in enumerate([(2350,.5),(3180,.35),(4410,.25),(5870,.18)]):
            x=x+tone(f,.9,dc)*(.4/(k+1))
        x2=np.zeros(int(1.1*SR)); x2[:len(x)]+=x; d=int(.12*SR); x2[d:d+len(x)]+=x*.6
        return x2*0.7
    if name=='coins':
        out=np.zeros(int(1.6*SR))
        for i in range(14):
            c=S('coin')*R.uniform(.2,.5); o=int(R.uniform(0,1.0)*SR); f=R.uniform(.85,1.2)
            idx=np.clip((np.arange(len(c))*f).astype(int),0,len(c)-1); c=c[idx]
            out[o:o+len(c)]+=c[:len(out)-o]
        return out
    if name=='paper': return 0.4*hp(sweep_noise(.4,2000,7000,lambda p:np.sin(np.pi*p)*(0.5+0.5*np.sin(60*p))),1500)
    if name=='ticks':
        out=np.zeros(int(.9*SR))
        for i in range(12):
            t=np.arange(int(.03*SR))/SR; c=0.35*np.sin(2*np.pi*(1800+i*60)*t)*np.exp(-t/0.008); o=int(i*.065*SR); out[o:o+len(c)]+=c
        return out
    if name=='buzz':
        t=np.arange(int(.45*SR))/SR; x=0.25*(np.sign(np.sin(2*np.pi*140*t))+0.5*np.sign(np.sin(2*np.pi*147*t)))
        return lp(x,2500)*np.minimum(1,(0.45-t)/0.05)
    if name=='alert':
        out=np.zeros(int(.7*SR))
        for i,f in enumerate([880,660]):
            c=0.3*tone(f,.3,.2); o=int(i*.18*SR); out[o:o+len(c)]+=c
        return out
    if name=='ding': return 0.45*(tone(1568,1.2,.4)+.5*tone(2352,1.2,.3)+.3*tone(3136,1.2,.2))
    if name=='chime':
        out=np.zeros(int(1.8*SR))
        for i,f in enumerate([1047,1319,1568,2093]):
            c=0.28*(tone(f,1.4,.5)+.3*tone(f*2,1.4,.3)); o=int(i*.08*SR); out[o:o+len(c)]+=c
        return out
    if name=='question':
        out=np.zeros(int(.8*SR))
        for i,f in enumerate([660,880]):
            c=0.35*tone(f,.5,.25); o=int(i*.14*SR); out[o:o+len(c)]+=c
        return out
    if name=='reveal':
        t=np.arange(int(1.2*SR))/SR; x=0.3*sweep_noise(1.2,800,9000,lambda p:np.exp(-p*4)) + 0.25*(tone(784,1.2,.5)+tone(1175,1.2,.4)+tone(1568,1.2,.3))
        return x
    if name=='scratch':
        t=np.arange(int(.45*SR))/SR; f=600+500*np.sin(2*np.pi*5*t); x=0.5*bp(noise(.45),300,3000)*(0.5+0.5*np.sin(2*np.pi*np.cumsum(f)/SR))
        return x*np.minimum(1,(0.45-t)/0.05)
    if name=='riser':
        d=2.25;n=int(d*SR);t=np.arange(n)/SR;p=t/d
        x=0.35*sweep_noise(d,300,8000,lambda q:q**2)+0.18*tone(110*2**(p*2),d,99,'saw')*p**2
        return lp(x,9000)
    if name=='heart':
        t=np.arange(int(.35*SR))/SR; x=0.9*np.sin(2*np.pi*55*t)*np.exp(-t/0.06); d=int(.14*SR); x[d:]+=0.6*np.sin(2*np.pi*50*t[:-d])*np.exp(-t[:-d]/0.06)
        return x
    if name=='clock':
        out=np.zeros(int(1.6*SR))
        for i in range(4):
            t=np.arange(int(.05*SR))/SR; c=0.4*hp(noise(.05),2000)*np.exp(-t/0.006); o=int(i*.4*SR); out[o:o+len(c)]+=c
        return out
    if name=='pen': return 0.25*bp(noise(1.5),2500,7000)*(0.5+0.5*np.abs(np.sin(np.linspace(0,30,int(1.5*SR)))))*np.sin(np.linspace(0,np.pi,int(1.5*SR)))
    if name=='click':
        t=np.arange(int(.08*SR))/SR; return 0.6*hp(noise(.08),1500)*np.exp(-t/0.01)+0.4*np.sin(2*np.pi*1200*t)*np.exp(-t/0.015)
    if name=='cheer':
        d=3.0;n=int(d*SR);t=np.arange(n)/SR
        x=0.3*bp(noise(d),400,3500)*(np.minimum(1,t/0.3))*np.exp(-np.maximum(0,t-1.5)/0.8)
        c=S('chime');return x+np.pad(c,(0,max(0,n-len(c))))[:n]*.6
    if name=='chisel':
        t=np.arange(int(.25*SR))/SR
        return 0.5*(np.sin(2*np.pi*2950*t)*np.exp(-t/0.05)+.6*np.sin(2*np.pi*4420*t)*np.exp(-t/0.03))+0.5*hp(noise(.25),2500)*np.exp(-t/0.012)
    if name=='brush': return 0.45*hp(sweep_noise(.5,1200,5000,lambda p:np.sin(np.pi*p)**1.5),900)
    if name=='tutari':
        d=1.6;t=np.arange(int(d*SR))/SR
        f=np.where(t<0.35,233+78*np.clip(t/0.3,0,1),311)*(1+0.012*np.sin(2*np.pi*5.5*t)*np.clip((t-.4)/.3,0,1))
        ph=2*np.pi*np.cumsum(f)/SR; x=sum((1/k)*np.sin(k*ph) for k in range(1,9))
        e=np.minimum(1,t/0.06)*np.clip((d-t)/0.35,0,1)
        return 0.35*lp(x*e,3200)
    if name=='dhol':
        t=np.arange(int(.4*SR))/SR
        return 0.8*np.sin(2*np.pi*np.cumsum(70+60*np.exp(-t*30))/SR)*np.exp(-t/0.16)+0.35*bp(noise(.4),250,1800)*np.exp(-t/0.04)
    if name=='bell':
        t=np.arange(int(2.5*SR))/SR
        return 0.3*sum(a*np.sin(2*np.pi*f*t)*np.exp(-t/d) for f,a,d in [(587,1,1.4),(1180,.6,1.0),(1765,.4,.7),(2620,.25,.5),(3500,.15,.35)])
    if name=='rumble':
        d=2.2;t=np.arange(int(d*SR))/SR
        return 0.9*lp(noise(d),140)*np.minimum(1,t/0.05)*np.exp(-t/0.9)+0.3*np.sin(2*np.pi*38*t)*np.exp(-t/0.7)
    if name=='sparkle':
        out=np.zeros(int(1.0*SR))
        for i,f in enumerate([3136,3951,4699,3520,5274,4186]):
            tt=np.arange(int(.35*SR))/SR; j=int(i*.07*SR); out[j:j+len(tt)]+=0.18*np.sin(2*np.pi*f*tt)*np.exp(-tt/0.12)
        return out
    if name=='wind':
        d=2.2;return 0.5*lp(sweep_noise(d,300,1200,lambda p:np.sin(np.pi*p)**1.5),1500)
    if name=='rain':
        d=3.0;n=int(d*SR);x=hp(noise(d),2500)*0.25;env_=np.minimum(1,np.arange(n)/SR/0.5)*np.minimum(1,(d-np.arange(n)/SR)/0.8);return x*env_
    if name=='thunder':
        t=np.arange(int(2.2*SR))/SR;x=0.9*lp(noise(2.2),400)*np.exp(-t/0.6)*(0.6+0.4*np.sin(2*np.pi*3*t))+0.5*hp(noise(2.2),1500)*np.exp(-t/0.05);return x
    return np.zeros(100)
import os; END=float(os.environ.get("END","93.8")); N=int(END*SR)
fx=np.zeros(N)
for e in json.load(open('out/sfx.json',encoding='utf-8')):
    s=S(e['type'])*e['vol']; o=int(e['t']*SR)
    if o<0: s=s[-o:]; o=0
    m=min(len(s),N-o); fx[o:o+m]+=s[:m]
# ---- music ----
bpm=104; beat=60/bpm; t=np.arange(N)/SR
mus=np.zeros(N)
prog=[(57,[57,60,64]),(53,[53,57,60]),(48,[48,52,55]),(55,[55,59,62])] # Am F C G
def mtof(m): return 440*2**((m-69)/12)
bar=beat*4
nb=int(END/bar)+1
for b in range(nb):
    root,ch=prog[b%4]; t0=b*bar; i0=int(t0*SR); L=int(bar*SR)
    if i0>=N: break
    seg=np.arange(min(L,N-i0))/SR
    pad=sum(np.sin(2*np.pi*mtof(n)*seg)+0.3*np.sin(2*np.pi*mtof(n+12)*seg*1.002) for n in ch)
    pad*=np.minimum(1,seg/0.4)*np.minimum(1,(bar-seg)/0.4)*0.05
    mus[i0:i0+len(seg)]+=pad
    for k in range(8): # pluck arp eighths
        ts=t0+k*beat/2; j=int(ts*SR); 
        if j>=N: break
        n=ch[[0,1,2,1,0,2,1,2][k]]+12; d=int(.4*SR); tt=np.arange(min(d,N-j))/SR
        mus[j:j+len(tt)]+=0.06*np.sign(np.sin(2*np.pi*mtof(n)*tt))*np.exp(-tt/0.09)*0.6+0.05*np.sin(2*np.pi*mtof(n)*tt)*np.exp(-tt/0.2)
    for k in range(4): # kick + bass
        j=int((t0+k*beat)*SR)
        if j>=N: break
        tt=np.arange(min(int(.3*SR),N-j))/SR
        mus[j:j+len(tt)]+=0.35*np.sin(2*np.pi*np.cumsum(60*np.exp(-tt*25)+45)/SR)*np.exp(-tt/0.12)
        tb=np.arange(min(int(beat*SR),N-j))/SR
        mus[j:j+len(tb)]+=0.09*np.sin(2*np.pi*mtof(root-24)*tb)*np.exp(-tb/0.3)
        jh=int((t0+k*beat+beat/2)*SR)
        if jh<N:
            th=np.arange(min(int(.05*SR),N-jh))/SR; mus[jh:jh+len(th)]+=0.08*hp(noise(.05)[:len(th)],7000)*np.exp(-th/0.015)
mus=lp(mus,9000)
# music dynamics: drop during 89.2-91.4 build, lift after
g=np.ones(N)
def ramp(a,b,v0,v1):
    i,j=int(a*SR),int(b*SR); g[i:j]=np.linspace(v0,v1,j-i)
g[:]=1

mus*=0
vo=np.fromfile('vo_t.f32',np.float32).astype(np.float64)
vo=np.resize(np.concatenate([vo,np.zeros(max(0,N-len(vo)))]),N) if len(vo)<N else vo[:N]
# sidechain duck music under VO
envv=np.convolve(np.abs(vo),np.ones(2205)/2205,'same'); duck=1-0.45*np.clip(envv*12,0,1)
FXG=float(os.environ.get('FXG','0.16')); DUCK=float(os.environ.get('DUCK','0.5'))  # SFX gain / duck depth under voice
fxd=1-DUCK*np.clip(envv*12,0,1)
mix=vo*1.0+fx*FXG*fxd
sp=np.abs(vo)>0.02
g=0.17/np.sqrt((mix[sp]**2).mean()); mix*=g
th=0.8; a=np.abs(mix); over=a>th
mix[over]=np.sign(mix[over])*(th+(1-th)*np.tanh((a[over]-th)/(1-th)))
mix*=0.95
st=np.stack([mix,mix],1).astype(np.float32)
st.tofile('out/mix.f32')
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','2','-i','out/mix.f32','-ar','44100','-c:a','aac','-b:a','192k','out/mix.m4a'])
print('ok')
