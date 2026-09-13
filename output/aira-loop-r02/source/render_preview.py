"""Render the generated CAD allocation meshes to a static handoff preview."""
from pathlib import Path
import json, math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
model=json.loads((ROOT/'source/model.json').read_text())
im=Image.new('RGB',(1680,1100),'#f3f2eb');d=ImageDraw.Draw(im)
font_path='C:/Windows/Fonts/segoeui.ttf'
def font(n):return ImageFont.truetype(font_path,n)
ink='#233e32';muted='#6c7c70'
d.text((64,36),'A I R A',font=font(28),fill=ink)
d.text((64,97),'Loop, from the inside out.',font=font(48),fill=ink)
d.text((64,164),'R02 virtual prototype   /   48 × 27 × 13 mm body   /   22 mm textile strap',font=font(19),fill=muted)

def render(cx,cy,scale,explode,strap=True):
    yaw=-.45;pitch=.9;triangles=[];centers={}
    def transform(v):
        x,y,z=v;z-=6.5
        a=x*math.cos(yaw)-y*math.sin(yaw);b=x*math.sin(yaw)+y*math.cos(yaw)
        return a,b*math.cos(pitch)+z*math.sin(pitch),-b*math.sin(pitch)+z*math.cos(pitch)
    def project(v):
        return cx+v[0]*scale,cy-v[1]*scale
    for p in model['parts']:
        if p['kind']=='strap' and not strap:continue
        vs=[transform([v[0],v[1],v[2]+p['layer']*explode*10-explode*24]) for v in p['vertices']]
        centers[p['id']]=project([sum(v[i] for v in vs)/len(vs) for i in range(3)])
        rgb=[int(p['color'][i:i+2],16) for i in (1,3,5)]
        for face in p['faces']:
            a,b,c=[vs[i] for i in face];u=[b[i]-a[i] for i in range(3)];v=[c[i]-a[i] for i in range(3)]
            n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];length=math.sqrt(sum(i*i for i in n))
            if length==0 or n[2]<=0:continue
            light=.5+.5*max(0,(-.3*n[0]+.4*n[1]+.87*n[2])/length)
            color=tuple(round(i*light) for i in rgb)
            triangles.append(([(*project(v),v[2]) for v in (a,b,c)],color))
    pixels=np.array(im);depth=np.full((im.height,im.width),-np.inf)
    for vertices,color in triangles:
        (x0,y0,z0),(x1,y1,z1),(x2,y2,z2)=vertices
        xmin=max(0,math.floor(min(x0,x1,x2)));xmax=min(im.width-1,math.ceil(max(x0,x1,x2)))
        ymin=max(0,math.floor(min(y0,y1,y2)));ymax=min(im.height-1,math.ceil(max(y0,y1,y2)))
        if xmin>xmax or ymin>ymax:continue
        denominator=(y1-y2)*(x0-x2)+(x2-x1)*(y0-y2)
        if abs(denominator)<1e-8:continue
        xx,yy=np.meshgrid(np.arange(xmin,xmax+1)+.5,np.arange(ymin,ymax+1)+.5)
        a=((y1-y2)*(xx-x2)+(x2-x1)*(yy-y2))/denominator
        b=((y2-y0)*(xx-x2)+(x0-x2)*(yy-y2))/denominator;c=1-a-b
        z=a*z0+b*z1+c*z2
        region=depth[ymin:ymax+1,xmin:xmax+1];mask=(a>=-1e-7)&(b>=-1e-7)&(c>=-1e-7)&(z>region)
        region[mask]=z[mask];pixels[ymin:ymax+1,xmin:xmax+1][mask]=color
    im.paste(Image.fromarray(pixels))
    return centers

d.rounded_rectangle((55,232,794,905),radius=20,fill='#e3e8dd')
d.rounded_rectangle((820,232,1625,905),radius=20,fill='#e3e8dd')
d.text((83,255),'01   ASSEMBLED FORM',font=font(16),fill=ink)
d.text((851,255),'02   INTERNAL LAYERS',font=font(16),fill=ink)
render(420,578,6.7,0)
centers=render(1120,571,6.1,.95,False)
labels=[('lid','Upper cover',357),('battery','Cell allocation',469),('pcb','Main PCB + RF',599),('sensor','Optical module',703),('base','Lower housing',808)]
for key,label,y in labels:
    x0,y0=centers[key]
    d.line([(x0+20,y0),(1370,y),(1400,y)],fill='#869987',width=1)
    d.text((1408,y-10),label,font=font(17),fill=ink)
d.text((84,864),'Screenless body, physical mic switch and visible indicator',font=font(16),fill=muted)
d.text((851,864),'Component envelopes; flex, seals and fixings need engineering',font=font(15),fill=muted)
d.text((64,949),'230 mAh target. AI processing on the phone.',font=font(27),fill=ink)
d.text((64,995),'72-hour objective: 2.40 mA allocated average. Scheduled optical windows; runtime requires hardware validation.',font=font(18),fill=muted)
d.text((64,1035),'Unvalidated concept. Not a routed PCB, production release, tested battery life or certified wearable.',font=font(17),fill=muted)
im.save(ROOT/'preview.png')
print('Rendered preview.png from the generated component meshes.')
