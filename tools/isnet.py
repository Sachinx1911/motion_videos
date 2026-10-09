import numpy as np, cv2, glob, os, onnxruntime as ort
from PIL import Image
from scipy import ndimage
R=os.environ.get('RAW','raw/')
S=ort.InferenceSession(os.path.expanduser('~/.u2net/isnet.onnx'),providers=['CPUExecutionProvider'])
def mask(im):
    h,w=im.shape[:2]
    x=cv2.resize(im,(1024,1024),interpolation=cv2.INTER_LANCZOS4).astype(np.float32)/255.0
    x=(x-0.5)/1.0
    x=x.transpose(2,0,1)[None]
    o=S.run(None,{S.get_inputs()[0].name:x})[0][0,0]
    o=(o-o.min())/(o.max()-o.min()+1e-8)
    return cv2.resize(o,(w,h),interpolation=cv2.INTER_LINEAR)
def cut(n,keep_glow=False):
    im=cv2.cvtColor(cv2.imread(R+n+'.jpg'),cv2.COLOR_BGR2RGB); h,w=im.shape[:2]
    m=mask(im)
    hard=m>0.5
    hard=ndimage.binary_fill_holes(hard)
    lab,k=ndimage.label(hard)
    if k>1:
        sizes=ndimage.sum(hard,lab,range(1,k+1)); big=max(sizes)
        hard=np.isin(lab,[i+1 for i,s in enumerate(sizes) if s>big*0.02])
    a=np.where(hard,np.maximum(m,0.0),m)
    a=np.clip((a-0.08)/0.84,0,1)
    a[ndimage.binary_erosion(hard,iterations=3)]=1.0
    near=ndimage.binary_dilation(hard,iterations=25)
    dark=(im.min(2)<190)&near
    lab2,k2=ndimage.label(dark|hard)
    keep=np.unique(lab2[hard]);dark=dark&np.isin(lab2,keep[keep>0])
    a[dark]=np.maximum(a[dark],1.0)
    # unpremultiply against white at soft edges
    af=a[...,None]; rgb=im.astype(np.float32)
    edge=(a>0.02)&(a<0.98)
    un=np.clip((rgb-(1-af)*255)/np.maximum(af,0.05),0,255)
    rgb=np.where(edge[...,None],un,rgb)
    rgba=np.dstack([rgb,a*255]).astype(np.uint8)
    ys,xs=np.where(a>0.04);p=8
    y0,y1,x0,x1=max(0,ys.min()-p),min(h,ys.max()+p),max(0,xs.min()-p),min(w,xs.max()+p)
    o=Image.fromarray(rgba[y0:y1,x0:x1]);o.thumbnail((1100,1100),Image.LANCZOS);return o
if __name__=='__main__':
    import sys
    for n in sys.argv[1:]:
        o=cut(n);o.save(os.environ.get('OUT','site/a/')+n+'.png');print(n,o.size)
