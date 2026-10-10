import sys,glob
from PIL import Image,ImageDraw
fs=sorted(glob.glob('out/sh/*.jpg'));W=int(sys.argv[1]) if len(sys.argv)>1 else 5
S=(360,640);im=Image.new('RGB',(W*S[0],((len(fs)+W-1)//W)*(S[1]+24)),'black');d=ImageDraw.Draw(im)
for i,f in enumerate(fs):
    t=Image.open(f).resize(S);x=(i%W)*S[0];y=(i//W)*(S[1]+24);im.paste(t,(x,y+24));d.text((x+5,y+5),f.split('_')[-1],fill='yellow')
im.save('out/sheet.jpg',quality=85); print('out/sheet.jpg')
