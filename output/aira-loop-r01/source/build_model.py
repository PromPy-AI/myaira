"""AIRA Loop R01: deterministic concept geometry, not released production CAD.
Python 3 standard library only. Run from any directory. Units: millimetres.
"""
from pathlib import Path
import json, math, struct

ROOT = Path(__file__).resolve().parents[1]
N = 96
parts = []

def outline(w, h, r, cx=0, cy=0):
    points=[]
    for sx,sy,start in [(1,1,0),(-1,1,90),(-1,-1,180),(1,-1,270)]:
        for i in range(N//4):
            a=math.radians(start+i*90/(N//4))
            points.append([cx+sx*(w/2-r)+r*math.cos(a),cy+sy*(h/2-r)+r*math.sin(a)])
    return points

def mesh_rings(rings, connections, caps=()):
    v=[[x,y,z] for poly,z in rings for x,y in poly]; f=[]
    n=len(rings[0][0])
    for a,b,reverse in connections:
        for i in range(n):
            j=(i+1)%n
            for tri in [(a*n+i,a*n+j,b*n+j),(a*n+i,b*n+j,b*n+i)]:
                f.append(list(reversed(tri)) if reverse else list(tri))
    for ring,reverse in caps:
        center=len(v); poly,z=rings[ring]
        v.append([sum(p[0] for p in poly)/n,sum(p[1] for p in poly)/n,z])
        for i in range(n):
            tri=[center,ring*n+i,ring*n+(i+1)%n]
            f.append(list(reversed(tri)) if reverse else tri)
    return v,f

def solid(w,h,r,z0,z1,x=0,y=0):
    p=outline(w,h,r,x,y)
    return mesh_rings([(p,z0),(p,z1)],[(0,1,False)],[(0,True),(1,False)])

def ring(w,h,r,wi,hi,ri,z0,z1):
    o=outline(w,h,r); i=outline(wi,hi,ri)
    return mesh_rings([(o,z0),(o,z1),(i,z0),(i,z1)],[(0,1,False),(2,3,True),(1,3,False),(0,2,True)])

def add(id,name,mesh,color,layer,description,kind='internal'):
    v,f=mesh
    parts.append(dict(id=id,name=name,vertices=v,faces=f,color=color,layer=layer,description=description,kind=kind))

# Bottom shell includes the central optical opening. Fit blanks have no side ports.
o=outline(27,48,6); i=outline(24.2,45.2,4.6); hole=outline(8,12,2); seat=outline(10.4,14.4,2.7)
base=mesh_rings([(o,0),(o,11.8),(i,1.2),(i,11.8),(seat,.4),(seat,1.2),(hole,0),(hole,.4)],
                [(0,1,False),(2,3,True),(1,3,False),(0,6,True),(2,5,False),(4,5,True),(4,7,False),(6,7,True)])
add('base','Lower housing',base,'#43584e',0,'27 × 48 × 11.8 mm shell. 1.4 mm wall, 1.2 mm floor. Optical aperture 8 × 12 mm. Ports and strap mounts are detailed in the OpenSCAD source.','shell')
add('lens','Optical window',solid(10,14,2.5,.4,1.2),'#203133',0,'10 × 14 × 0.8 mm insert in a 10.4 × 14.4 mm recess. Nominal radial clearance 0.2 mm. Peripheral seat and adhesive thickness need optical and sealing validation.')
add('sensor','PPG + optical baffle',solid(10,14,2,1.3,3.1),'#25352d',1,'Reserved 10 × 14 × 1.8 mm volume for optical module and black isolation baffle. Green/red/IR architecture for pulse and exploratory oxygen trends.')
add('pcb','Main PCB envelope',solid(23,42,4,3.4,4.2),'#427d65',2,'23 × 42 × 0.8 mm four-layer PCB planning envelope. Components and RF region are allocation blocks, not a routed PCB.')
add('mcu','BLE audio processor',solid(7,7,.3,4.2,5.3,0,5),'#283239',2,'Nordic nRF5340 candidate. PDM audio, Bluetooth LE and sensor acquisition. Codec and throughput must be profiled on development hardware.')
add('flash','Audio storage',solid(8,6,.4,4.2,5.3,-5,-6),'#2d3435',2,'4 Gbit QSPI NAND candidate, 512 MiB nominal. Reserve 20% for ECC/bad blocks, metadata and firmware policy. Driver and wear management required.')
add('pmic','Power management',solid(5,5,.3,4.2,5.4,6,-10),'#383d36',2,'Charger with power path, protected 1-cell battery, temperature monitoring and regulated sensor rails. Exact circuit remains open.')
add('imu','Motion sensor',solid(3,3,.3,4.2,5.2,7,5),'#7a8874',2,'BMI270 candidate. I²C/SPI plus interrupt. Motion quality flags help reject poor PPG measurements.')
add('temp','Temperature island',solid(3,3,.3,1.4,2.2,8,-12),'#81948a',1,'MAX30208 candidate on a thermally isolated flex island near the skin. Not a core body temperature measurement.')
add('haptic','Haptic motor envelope',solid(7,5,1,4.2,6.3,-6,-16),'#a4ada5',2,'7 × 5 × 2.1 mm allocation only. Select an actuator and driver after supplier review. Avoid coupling vibration into microphone and PPG.')
add('antenna','RF clearance region',solid(19,4,1,4.25,4.35,0,19),'#c29e61',2,'Indicative antenna keepout, y = 17 to 21 mm. Reserve all layers and nearby enclosure space per the chosen antenna reference layout. Gold region is not a copper design.','rf')
add('battery','Protected LiPo envelope',solid(18,28,1.4,6.8,10.8,0,-1),'#c8c6b6',3,'18 × 28 × 4 mm allocation including assumed protection/tab allowance. 220 mAh is an unverified capacity target. Supplier drawing must confirm both fit and capacity.')
add('mic1','Microphone A on flex',solid(4,3,0.4,9.7,11.1,0,15),'#969c8d',4,'PDM MEMS candidate at outward-facing acoustic port. Nominal allocation clears battery and RF region by 0.5 mm in Y. Flex and gasket need further allowance; acoustic testing is required.')
add('mic2','Microphone B option',solid(4,3,.4,9.7,11.1,0,-18),'#969c8d',4,'Optional second PDM microphone. DNP on first acoustic comparison build if one microphone is adequate. No beamforming performance claim.')
add('lid','Upper cover blank',solid(27,48,6,11.8,13),'#c8b795',5,'1.2 mm upper cover. Matte polymer with optional nonconductive finish. The viewer shows a form blank with feature markers; the CAD source cuts the ports.','shell')
add('led','Capture indicator',solid(.9,8,.4,13.02,13.18,-7,0),'#e8e5c8',5,'Light-pipe marker. Proposed hardware capture permit gate plus firmware health checks. An illuminated light alone does not prove recording or consent.','feature')
add('switch','Physical privacy slider',solid(2.5,9,1,13.05,13.9,8,0),'#344d42',5,'Two-position physical mic-disable slider. MUTE removes mic power and isolates PDM lines. BLOCK is a separate firmware/app exclusion state.','feature')
add('portA','Acoustic port A',solid(1,1,.5,13.05,13.15,0,15),'#182b25',5,'Acoustic port marker, nominal Ø1 mm. Membrane and cavity tuning remain open.','feature')
add('portB','Acoustic port B',solid(1,1,.5,13.05,13.15,0,-18),'#182b25',5,'Optional second acoustic port. Close with solid cover if MIC2 is not fitted.','feature')
for x in [-3,3]:
    add('contact'+str(x),'Charging contact',solid(2,2,1,-.3,.05,x,-18),'#c7a460',0,'Two recessed contacts to an external dock. Dock supplies protected 5 V input. Recessed gold contacts, ESD and short/reverse protection required.','feature')

# Render-only straps. Their outline communicates 22 mm webbing, not a textile pattern.
for sign in [-1,1]:
    add('strap'+str(sign),'22 mm textile strap',solid(22,36,2,4,6,0,sign*42),'#848675',0,'22 mm replaceable textile strap. Flat display segments only; buckle, wrist curvature and textile cut pattern remain supplier work.','strap')

model={'revision':'R01','units':'mm','body':{'width':27,'length':48,'height':13},'parts':parts}
(ROOT/'source'/'model.json').write_text(json.dumps(model,separators=(',',':')),encoding='utf8')

def normal(a,b,c):
    u=[b[i]-a[i] for i in range(3)]; v=[c[i]-a[i] for i in range(3)]
    n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]]
    length=math.sqrt(sum(t*t for t in n))
    return [t/length for t in n] if length else [0,0,0]

def export_stl(path, mesh):
    v,f=mesh
    with path.open('wb') as out:
        out.write(b'AIRA R01 FORM FIT BLANK - mm - NOT PRODUCTION'.ljust(80,b' '));out.write(struct.pack('<I',len(f)))
        for face in f:
            a,b,c=[v[k] for k in face]
            out.write(struct.pack('<12fH',*normal(a,b,c),*a,*b,*c,0))

export_stl(ROOT/'cad'/'lower-shell-fit-blank.stl',base)
export_stl(ROOT/'cad'/'upper-cover-fit-blank.stl',solid(27,48,6,0,1.2))

# A portable OBJ assembly in mm, retaining group names. Placeholder electronics.
lines=['# AIRA Loop R01; millimetres; conceptual component envelopes'];offset=1
for p in parts:
    lines.append('o '+p['id'])
    lines += ['v '+' '.join(f'{c:.5f}' for c in v) for v in p['vertices']]
    lines += ['f '+' '.join(str(i+offset) for i in f) for f in p['faces']]
    offset+=len(p['vertices'])
(ROOT/'cad'/'aira-loop-assembly.obj').write_text('\n'.join(lines),encoding='utf8')

# Validate generated closed solids and signed volume. Not a DFM or electrical test.
checks=[]
for p in parts:
    edges={}; vol=0
    for a,b,c in p['faces']:
        for u,v in [(a,b),(b,c),(c,a)]:
            key=tuple(sorted((u,v)));edges[key]=edges.get(key,0)+1
        va,vb,vc=[p['vertices'][i] for i in (a,b,c)]
        vol+=(va[0]*(vb[1]*vc[2]-vb[2]*vc[1])+va[1]*(vb[2]*vc[0]-vb[0]*vc[2])+va[2]*(vb[0]*vc[1]-vb[1]*vc[0]))/6
    assert all(n==2 for n in edges.values()),p['id']+' is not closed'
    assert vol>0,p['id']+' has reversed orientation'
    checks.append({'part':p['id'],'closed_edge_manifold':True,'volume_mm3':round(vol,3)})
checks.append({'battery_top_clearance_mm':1.0,'battery_to_tallest_under_battery_block_mm':1.4,'pcb_to_optical_module_mm':.3,'note':'Nominal allocation gaps only; adhesives, flex bends, tolerance and swelling budgets still require mechanical engineering.'})
(ROOT/'engineering'/'geometry-checks.json').write_text(json.dumps(checks,indent=2),encoding='utf8')
template=(ROOT/'source'/'viewer.template.html').read_text(encoding='utf8')
(ROOT/'index.html').write_text(template.replace('__MODEL_JSON__',json.dumps(model,separators=(',',':'))),encoding='utf8')
print(f'Built {len(parts)} component meshes, two closed STL form blanks and OBJ assembly. All individual meshes passed edge/volume checks.')
