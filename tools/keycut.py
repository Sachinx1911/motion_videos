# White-background key cut-out (for product shots where ISNet fails:
# kraft paper on white, screens, tripods). Background = near-white pixels
# connected to the border; its grey shadows become a soft black shadow.
# Usage: python3 keycut.py [--all-white] name1 name2 ...   (reads RAW/name.jpg, writes OUT/name.png)
#   --all-white also removes enclosed white areas (e.g. between tripod legs).
import numpy as np, cv2, os, sys
from PIL import Image
from scipy import ndimage
R=os.environ.get('RAW','raw/'); O=os.environ.get('OUT','site/a/')
def cut(n,all_white=False,thr=236):
    im=cv2.cvtColor(cv2.imread(R+n+'.jpg'),cv2.COLOR_BGR2RGB).astype(np.float32); h,w=im.shape[:2]
    mn=im.min(2); sat=im.max(2)-mn
    light=(mn>thr)&(sat<18)
    if all_white: bg=light
    else:
        lab,k=ndimage.label(light)
        border=np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]]))
        bg=np.isin(lab,border[border>0])
    # grow background through soft shadows (grey, unsaturated, connected to bg)
    shadow=(sat<14)&(mn>150)
    lab2,_=ndimage.label(shadow|bg); keep=np.unique(lab2[bg]); bgx=np.isin(lab2,keep[keep>0])
    fg=~bgx
    fg=ndimage.binary_opening(fg,iterations=1)
    lab3,k3=ndimage.label(fg)
    if k3>1:
        s=ndimage.sum(fg,lab3,range(1,k3+1)); fg=np.isin(lab3,[i+1 for i,v in enumerate(s) if v>s.max()*0.01])
    soft=cv2.GaussianBlur(fg.astype(np.float32),(0,0),1.2)
    a=np.clip(soft*1.4-0.2,0,1)
    rgb=im.copy()
    # shadow: black with alpha from darkness, only outside object
    lum=im.mean(2); sh=np.clip((246-lum)/90,0,0.55)*(1-a)
    out_a=a+sh
    rgb=np.where((a<0.5)[...,None],0,rgb)
    rgba=np.dstack([np.clip(rgb,0,255),np.clip(out_a,0,1)*255]).astype(np.uint8)
    ys,xs=np.where(out_a>0.04);p=8
    y0,y1,x0,x1=max(0,ys.min()-p),min(h,ys.max()+p),max(0,xs.min()-p),min(w,xs.max()+p)
    o=Image.fromarray(rgba[y0:y1,x0:x1]);o.thumbnail((1100,1100),Image.LANCZOS);return o
if __name__=='__main__':
    aw='--all-white' in sys.argv
    for n in [a for a in sys.argv[1:] if not a.startswith('--')]:
        o=cut(n,aw);o.save(O+n+'.png');print(n,o.size)
