# Replace a segment of the trimmed voice with a re-recorded line.
# usage: python3 splice.py BASE.f32 LINE.f32 A B   (A,B = approx start/end sec of old segment in BASE)
# Cuts snap to the quietest 20 ms window within +-0.25 s; line's own leading/trailing silence trimmed
# to 0.08 s / 0.12 s. Writes vo_t.f32 + vo_t.wav and prints the time delta for later words.
import sys, numpy as np, subprocess
SR=44100
def quiet(x,t,win=.25):
    best=None
    for c in np.arange(t-win,t+win,.005):
        s=x[int(c*SR):int((c+.02)*SR)]; e=float((s**2).mean()) if len(s) else 1
        if best is None or e<best[0]: best=(e,c+.01)
    return best[1], 10*np.log10(best[0]+1e-12)
base=np.fromfile(sys.argv[1],np.float32); line=np.fromfile(sys.argv[2],np.float32)
a,da=quiet(base,float(sys.argv[3])); b,db=quiet(base,float(sys.argv[4]))
env=np.convolve(line**2,np.ones(441)/441,'same'); idx=np.where(env>10**(-45/10))[0]
s0=max(0,idx[0]-int(.08*SR)); s1=min(len(line),idx[-1]+int(.12*SR)); seg=line[s0:s1]
f=int(.01*SR); r=np.linspace(0,1,f,dtype=np.float32); ia,ib=int(a*SR),int(b*SR)
seg=seg.copy(); seg[:f]*=r; seg[-f:]*=r[::-1]
pre=base[:ia].copy(); pre[-f:]*=r[::-1]; post=base[ib:].copy(); post[:f]*=r
out=np.concatenate([pre,seg,post]).astype(np.float32); out.tofile('vo_t.f32')
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar',str(SR),'-ac','1','-i','vo_t.f32','-c:a','pcm_s16le','vo_t.wav'])
print(f'cut {a:.2f} ({da:.0f} dB) -> {b:.2f} ({db:.0f} dB); line {len(seg)/SR:.2f}s; delta {len(seg)/SR-(b-a):+.2f}; total {len(out)/SR:.2f}; line_offset {a:.3f} {s0/SR:.3f}')
