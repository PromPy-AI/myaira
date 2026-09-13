from pathlib import Path
import csv, json, html
from engineering_data import PARTS, GPIO, CONNECTORS, POWER

ROOT=Path(__file__).resolve().parents[1]
E=ROOT/'engineering';E.mkdir(exist_ok=True)
def csvwrite(name,headers,rows):
    with (E/name).open('w',newline='',encoding='utf-8-sig') as f:
        w=csv.writer(f);w.writerow(headers);w.writerows(rows)

gpio=[]
for bank,count in [(0,32),(1,16)]:
    for i in range(count):
        pin=f'P{bank}.{i:02d}'
        net,to,direction,note=GPIO.get(pin,('SPARE_NC','No connection','Unused','Disable digital input where appropriate; no floating enabled input. Reserve until verified schematic.'))
        gpio.append((pin,net,to,direction,note,'UNVERIFIED — physical package pad number not assigned'))
csvwrite('mcu-gpio-allocation.csv',['MCU_port_ID','Net','Destination','Direction','Behavior','Physical_pad_status'],gpio)
csvwrite('candidate-bom.csv',['Reference','Function','Candidate_or_specification','Quantity','Proposed_supply','Interface','Selection_notes'],PARTS)
connectorrows=[(name,*row,'Proposed contact numbering only; check mating-side orientation and exact connector drawing') for name,rows in CONNECTORS.items() for row in rows]
csvwrite('connector-pinouts.csv',['Connector','Contact','Net','Function','Release_status'],connectorrows)
csvwrite('power-budget.csv',['Load','Battery_equivalent_target_mA','Conditions'],POWER+[('Engineering contingency',.4,'20% of 2.00 mA subtotal; not measured')])

passives=[
('R1-R2','3V0 I2C pullups','2','4.7 kohm, 1%, 0402 starting value','SCL/SDA to 3V0','Measure rise time and low-state current'),
('R3-R4','1V8 I2C pullups','2','4.7 kohm, 1%, 0402 starting value','PPG SCL/SDA to 1V8','Use translator reference bias; verify effective pullup loading'),
('R5','MCU mic request pulldown','1','47 kohm, 0402 starting value','MCU_MIC_REQUEST to GND','Keeps request low before firmware config'),
('R6','Physical slider default','1','100 kohm, 0402 starting value','SW_ACTIVE to GND','Fail-disabled if switch signal is open'),
('R7','Capture LED limit','1','Starting 22 kohm; final value measured','MIC_3V0 to LED branch','Brightness and current are release gates'),
('R8-R9','PDM source termination','2','33 ohm starting values','Clock/data at respective source','Tune on scope; never place by arbitrary connector side'),
('R10-R11','Optional battery ADC divider','2','2 Mohm upper / 1 Mohm lower, 1%','Gated VBAT to ADC / GND','4.2 V maps to 1.4 V; gate topology and settling pending'),
('R12','PPG interrupt pullup','1','10 kohm starting value','PPG_INT_1V8 to 1V8','Confirm U2 output type'),
('R13','NOR chip select default','1','100 kohm starting value','QSPI_CS_N to 3V0','Confirm flash boot requirements'),
('R14','Reset pullup option','0 or 1','10 kohm starting value','NRESET to 3V0','Review Nordic reset guidance'),
('R15-R17','Rail measurement links','3','0 ohm removable links','MCU/radio, optical, microphone branches','Allow fixture current measurements; avoid RF return disruption'),
('R18','PDM buffer input idle','1','100 kohm starting pulldown','PDM_DATA_MIC to GND at U9 input','Avoid a floating enabled buffer input after mic power-off; include active-state pull current in budget'),
('C1-C14','Local bypass allocations','14 provisional','100 nF, X7R, 10 V, 0402','At digital/analogue supply pins','Final count comes from actual pin-level schematics, not this allowance'),
('C15','Battery-side local reservoir','1','10 uF starting value','Protected VBAT to GND','Effective capacitance and PMIC reference design control final value'),
('C16','Dock input reservoir','1','10 uF starting value','Protected VBUS5 to GND','Input inrush and charger reference design control final value'),
('C17-C18','Optical LED bypass','2','22 uF + 100 nF starting values','3V3_LED to sensor return','Check LED pulse droop, regulator stability and DC-bias derating'),
('C19','Microphone bypass','1','1 uF starting value','MIC_3V0 to GND','MIC1 datasheet controls final selection'),
('C20','Flash reservoir','1','10 uF starting value','U5 3V0 to GND','Verify write pulse and rail droop'),
('C21','MCU local reservoir','1','4.7 uF starting value','U1 3V0 to GND','Additional DEC pin capacitors are separately required'),
('C22','ADC input filter','1','10 nF starting value','VBAT_SENSE to GND','Check leakage, enable settling and SAADC acquisition'),
('MCU_DEC_NETWORK','Required MCU regulator passives','TBD','EXACT NORDIC REFERENCE REQUIRED','All DEC/DCC/regulator pins','No values or connections inferred; blocks schematic release'),
('L_PMIC1/L_PMIC2 + C_PMIC*','PMIC buck inductors/output caps','TBD','EXACT nPM1300 REFERENCE REQUIRED','BUCK1/BUCK2','Saturation, ripple and stability require datasheet'),
('L_BOOST + C_BOOST*','LED buck-boost power network','TBD','EXACT TPS63031 REFERENCE REQUIRED','U7 switching/output loop','Placement, saturation current and compensation cannot be guessed'),
('C_XTAL*','Crystal load caps','TBD','Per selected Y1/Y2 and MCU','Oscillator networks','Compute from crystal load and layout parasitics'),
('L_RF*/C_RF*','RF matching network','TBD','Nordic reference plus VNA tuning','ANT to ANT1','No generic RF values supplied'),
('R_LEVEL*/C_LEVEL*','Translator bias and bypass','TBD','Exact U11/U12 reference network','Level translation supplies/enable','PCA9306 reference bias is not just two supply wires'),
('PROTECTION*','Input ESD/reverse/short network','TBD','Designed against dock and battery limits','Power entry','Do not connect exposed pads directly to cell'),
]
csvwrite('passive-and-support-schedule.csv',['Reference','Function','Quantity','Starting_specification','Connection','Open_validation'],passives)

rails=[
('VBUS5_IN','J1.1 / external dock','5 V nominal','Input protection, U6 charger','Separate dock USB-C configuration and short protection required'),
('VBAT','Protected BAT1','Cell-specific operating range, max 4.2 V target','U6 and U7','Approved cell, NTC, protection and charging limits first'),
('3V0','U6 BUCK1 proposal','3.0 V','U1/U3/U4/U5/U8-U10/U13 and logic','Verify every part and PMIC I/O domain before wiring'),
('1V8_PPG','U6 BUCK2 proposal','1.8 V','U2 core; translator low side','PPG rail sequencing and safe shutdown required'),
('3V3_LED','U7 buck-boost','3.3 V target','U2 LED supply','Peak pulse capability and noise must be checked'),
('MIC_3V0','U8 output','3.0 V when permitted','MIC1 and capture indication','Mute cuts supply AND isolates CLK/DATA'),
('GND','Board reference','0 V','All returns with engineered current paths','Continuous reference plane; manage optical and switch-current loops'),
]
csvwrite('power-rails.csv',['Net','Source','Voltage_target','Loads','Validation'],rails)

testpoints=[('TP1','GND'),('TP2','VBUS5_PROTECTED'),('TP3','VBAT'),('TP4','3V0'),('TP5','1V8_PPG'),('TP6','3V3_LED'),('TP7','MIC_3V0'),('TP8','SW_ACTIVE'),('TP9','MCU_MIC_REQUEST'),('TP10','CAPTURE_EN'),('TP11','PDM_CLK_MIC'),('TP12','PDM_DATA_MIC'),('TP13','I2C_SCL_3V0'),('TP14','I2C_SDA_3V0'),('TP15','PPG_INT_1V8'),('TP16','PPG_INT_3V0'),('TP17','QSPI_CS_N'),('TP18','QSPI_SCK'),('TP19','NRESET')]
csvwrite('test-points.csv',['Reference','Net'],testpoints)

def table(headers,rows):
    return '<div class="table-wrap"><table><thead><tr>'+''.join('<th>'+html.escape(s)+'</th>' for s in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+html.escape(str(s))+'</td>' for s in row)+'</tr>' for row in rows)+'</tbody></table></div>'

report=(E/'manufacturer-brief.md').read_text(encoding='utf8')
sections=[
('parts','Named parts','Candidate families, quantities and functions. No component has been sourcing- or footprint-approved.',table(['Ref','Function','Candidate','Qty','Supply proposal','Interface','Validation'],PARTS)),
('gpio','All 48 MCU GPIO allocations','P0.xx/P1.xx are programmable port identifiers, NOT physical package pad numbers. Unused ports are explicitly reserved. Dedicated power, RF, oscillator, USB and debug package pads still require the exact verified datasheet.',table(['MCU port','Net','Destination','Direction','Notes'],[r[:5] for r in gpio])),
('connectors','Every proposed connector contact','These contact numbers are our proposed harness design, not pin numbers copied from unverified components. A mating-side drawing and connector MPN are required before manufacture.',table(['Connector','Contact','Net','Function'],[r[:4] for r in connectorrows])),
('passives','Passives and reference circuits','Starting values support discussion. Regulator, MCU DEC, RF, oscillator and protection networks are deliberately unresolved until their official reference designs can be verified.',table(['Ref','Function','Qty','Starting value','Net','Validation'],passives)),
('rails','Power rails and voltage domains','The supply schedule is a proposal. Confirm absolute maxima, sequencing, pullups and powered-off leakage for each chosen ordering code.',table(['Rail','Source','Voltage target','Loads','Checks'],rails)),
('budget','The 72-hour load budget','These are maximum engineering allocations at the battery, not measured part currents or predictions. Profile: one microphone, 70 kbps framed mono audio, nearby connected phone, optical sampling 5 minutes per 15 minutes, low-power motion sensing.',table(['Subsystem','Allocated battery mA','Condition'],POWER+[('Contingency',.4,'20% of 2.00 mA subtotal'),('TOTAL TARGET',2.4,'230 mAh × 80% / 2.4 mA = 76.7 h; must be measured')])),
('tests','Factory test access','Nineteen proposed measurement nets plus SWD and factory UART. Locations and fixture are not released.',table(['Test point','Net'],testpoints)),
]
head='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AIRA Loop R02 — engineering schedules</title><style>
*{box-sizing:border-box}body{margin:0;background:#f3f2eb;color:#203b32;font:15px/1.6 system-ui,sans-serif}main{max-width:1400px;margin:auto;padding:36px}header{border-bottom:1px solid #cdd7ca;padding-bottom:24px}h1{font-size:40px;font-weight:450;letter-spacing:-.04em;margin:14px 0}h2{font-weight:500;font-size:25px;letter-spacing:-.02em}p{max-width:900px;color:#596e5e}a{color:#315848;text-underline-offset:4px}nav{display:flex;gap:20px;flex-wrap:wrap;margin-top:20px}section{padding:30px 0;border-bottom:1px solid #cdd7ca}.eyebrow{letter-spacing:.2em;font-size:12px}.table-wrap{overflow:auto}table{border-collapse:collapse;width:100%;font-size:13px}td,th{text-align:left;vertical-align:top;border-bottom:1px solid #d9dfd4;padding:11px 10px;min-width:65px}th{font-weight:600;background:#e6ebdf}td:first-child{font-weight:550}input{font:inherit;padding:10px;border:1px solid #a9bba7;border-radius:5px;background:transparent;width:min(440px,100%)}.flag{border-left:3px solid #af8750;padding-left:15px}.summary{display:flex;gap:35px;flex-wrap:wrap}.summary strong{font-size:30px;font-weight:450;display:block}img{max-width:100%;height:auto}.small{font-size:12px}pre{white-space:pre-wrap;word-break:break-word;font:13px/1.6 system-ui}button{font:inherit}a:focus-visible,input:focus-visible{outline:3px solid #b78752;outline-offset:3px}@media(max-width:650px){main{padding:20px}h1{font-size:31px}td,th{padding:8px}}@media print{nav,input,label{display:none}.table-wrap{overflow:visible}main{padding:0}section{break-before:page}table{font-size:10px}h1{font-size:28px}}</style><main><header><div class="eyebrow">AIRA / LOOP R02 / ENGINEERING ALLOCATIONS</div><h1>Every connection, with its status.</h1><p>Small-cell, phone-processed architecture. Detailed candidate inventory, MCU port allocation, harness contacts and custom-PCB floorplan.</p><p class="flag"><strong>Pre-schematic revision.</strong> GPIO and connector assignments are proposed. Manufacturer physical pad maps, reference circuits, footprints and routing remain unverified. Do not fabricate from these schedules.</p><div class="summary"><span><strong>230 mAh</strong>Cell target, supplier fit unverified</span><span><strong>2.56 mA</strong>72 h ceiling with 20% reserve</span><span><strong>2.40 mA</strong>Allocated target, unmeasured</span></div><nav><a href="index.html">3D device</a>'''
head+=''.join(f'<a href="#{s[0]}">{html.escape(s[1])}</a>' for s in sections)
head+='''<a href="#pcb">PCB floorplan</a><a href="#sources">Sources and limits</a></nav><p><label for="filter">Find a part, port or net </label><input id="filter" type="search" placeholder="e.g. U8, P0.25, MIC_3V0" aria-label="Filter engineering table rows"></p></header>'''
body=''.join(f'<section id="{id}"><h2>{html.escape(title)}</h2><p>{html.escape(desc)}</p>{content}</section>' for id,title,desc,content in sections)
body+='''<section id="pcb"><h2>Custom PCB floorplan</h2><p>23 × 42 mm four-layer planning envelope. Boxes are allocations, not footprints. Main-board top shown; U2 and U4 sit on flex near the skin. Exact routing and assembly data do not exist yet.</p><img src="engineering/pcb-floorplan.svg" alt="AIRA main PCB floorplan showing proposed RF, controller, storage, power, microphone privacy and sensor interface regions"></section><section id="sources"><h2>Source verification and release gaps</h2><p>The user supplied Neo 1 references below and a 150 mAh / 2–3 day claim. Browser access failed before the pages could be read. The claim is recorded as user-supplied, not independently confirmed. No WHOOP or NeoSapien internal circuit or component identity is assumed.</p><ul><li><a href="https://neosapien.ai/">NeoSapien official site — supplied by user</a></li><li><a href="https://www.91mobiles.com/reviews/neosapien-neo1-review/">91mobiles Neo 1 review — supplied by user</a></li><li><a href="https://www.moneycontrol.com/technology/neosapien-neo-1-review-a-really-interesting-ai-wearable-article-13735411.html">Moneycontrol Neo 1 review — supplied by user</a></li></ul><p>Review recording hours, continuous versus standby conditions, phone connection, radio behavior and presence of optical health sensors before comparing runtime. Phone offloading alone does not establish 72-hour operation.</p><p><a href="engineering/manufacturer-brief.md" download>Download full design brief</a> · <a href="engineering/mcu-gpio-allocation.csv" download>GPIO CSV</a> · <a href="engineering/connector-pinouts.csv" download>Connector CSV</a> · <a href="engineering/candidate-bom.csv" download>BOM CSV</a></p><details><summary>Read the complete manufacturer brief</summary><pre>'''+html.escape(report)+'''</pre></details></section></main><script>const input=document.getElementById('filter');input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();document.querySelectorAll('tbody tr').forEach(row=>row.hidden=q&&!row.textContent.toLowerCase().includes(q))});</script></html>'''
(ROOT/'engineering.html').write_text(head+body,encoding='utf8')

# Footprint-free floorplan: spatial allocations and layers, no invented pad shapes.
alloc=[('RF keepout',0,19,15,4),('U1 MCU',0,5,7,7),('U5 NOR',-5,-6,8,6),('U6 PMIC',6,-10,5,5),('U3 accel',7,5,3,3),('U7 LED rail',6,-4,3,3),('U11/U12',6,1,4,3),('U8/U9/U10',0,12,10,3),('M1 optional',-6,-16,7,5),('Power passives',6,-16,8,3)]
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="820" viewBox="0 0 1200 820"><rect width="1200" height="820" fill="#f3f2eb"/><g font-family="sans-serif" fill="#203b32"><text x="35" y="42" font-size="25">AIRA Loop R02 — PCB allocation, top view</text><text x="35" y="72" font-size="15">23 × 42 × 0.8 mm · dimensions in mm · no copper routing or component pads</text><rect x="80" y="120" width="345" height="630" rx="60" fill="#e0e8d9" stroke="#507057" stroke-width="2"/>']
for name,x,y,w,h in alloc:
    sx=252.5+(x-w/2)*15;sy=435-(y+h/2)*15
    svg.append(f'<rect x="{sx}" y="{sy}" width="{w*15}" height="{h*15}" rx="5" fill="'+('#d8c59e' if name=='RF keepout' else '#a9bda4')+'" stroke="#647e62"/><text x="'+str(sx+w*7.5)+'" y="'+str(sy+h*7.5+4)+'" text-anchor="middle" font-size="11">'+html.escape(name)+'</text>')
notes=['L1: components and short signals','L2: continuous GND reference','L3: rails and slow signals','L4: signals and reference copper','','RF region: no battery or metal intrusion','Actual antenna clearance comes from reference design','Y1/Y2, debug pads and connectors not placed yet','U2 PPG: underside optical flex','U4 temperature: isolated skin-side flex','MIC1: top port on a separate flex','','Before release:','1. Verify every IC package pin and supply limit','2. Import reviewed footprints and reference circuits','3. Place all passives, flex connectors and test pads','4. Route with approved stackup and antenna constraints','5. Run ERC/DRC and hardware review','6. Export Gerbers and assembly files from reviewed CAD']
for i,line in enumerate(notes):svg.append(f'<text x="490" y="{155+i*29}" font-size="16">{html.escape(line)}</text>')
svg.append('</g></svg>');(E/'pcb-floorplan.svg').write_text(''.join(svg),encoding='utf8')
print(f'Generated {len(PARTS)} BOM blocks, {len(gpio)} GPIO rows, {len(connectorrows)} connector contacts, {len(passives)} support groups and {len(testpoints)} test points.')
