from pathlib import Path
import re
base=Path(__file__).resolve().parents[1]
src=base/'output/aira-loop-r02/source'

p=src/'build_model.py';s=p.read_text(encoding='utf8').replace('R01','R02')
s='\n'.join(line for line in s.splitlines() if not line.startswith("add('mic2'") and not line.startswith("add('portB'"))+'\n'
s=s.replace("'BLE audio processor'","'U1 · BLE controller'").replace('Nordic nRF5340 candidate. PDM audio, Bluetooth LE and sensor acquisition. Codec and throughput must be profiled on development hardware.','Nordic nRF52840 candidate. No AI inference. PDM/DMA, light ADPCM framing, encryption and BLE only. See the engineering sheet for proposed GPIO assignments.')
s=s.replace("'Audio storage'","'U5 · Reconnect buffer'").replace('4 Gbit QSPI NAND candidate, 512 MiB nominal. Reserve 20% for ECC/bad blocks, metadata and firmware policy. Driver and wear management required.','Winbond W25Q512JV family candidate, 512 Mbit / 64 MiB NOR. About 1.70 h at the 70 kbps budget after 20% reserve. Phone is the main store. Current and driver need validation.')
s=s.replace("'Motion sensor'","'U3 · Accelerometer'").replace('BMI270 candidate. I²C/SPI plus interrupt. Motion quality flags help reject poor PPG measurements.','Bosch BMA400 candidate. Accelerometer only; no gyro. Proposed low-power motion mode must be selected and measured.')
s=s.replace("'Temperature island'","'U4 · Temperature island'").replace('MAX30208 candidate','TI TMP117 candidate')
s=s.replace("'PPG + optical baffle'","'U2 · PPG + optical baffle'").replace('Green/red/IR architecture for pulse and exploratory oxygen trends.','MAX30101 candidate. Scheduled optical windows for the 72-hour target; no continuous-HR claim.')
s=s.replace("'Power management'","'U6 · Power management'").replace('Charger with power path, protected 1-cell battery, temperature monitoring and regulated sensor rails. Exact circuit remains open.','Nordic nPM1300 candidate; battery charger/power path and proposed 3V0/1V8 rails. Reference circuit and physical pad map remain unverified.')
s=s.replace("'Microphone A on flex'","'MIC1 · Single microphone'").replace('PDM MEMS candidate at outward-facing acoustic port.','TDK/InvenSense ICS-41351 PDM candidate. One outward-facing microphone; exact current, availability and pinout need verification.')
s=s.replace('220 mAh is an unverified capacity target.','230 mAh is an unverified capacity target within the 200–230 mAh constraint.')
s=s.replace("'Main PCB envelope'","'PCB1 · Custom PCB envelope'")
before="add('battery'"
idx=s.index(before)
s=s[:idx]+"""add('ledpower','U7 · LED power supply',solid(3,3,.3,4.2,5.4,6,-4),'#7e8873',2,'TPS63031 candidate buck-boost for optical LED rail. Magnetics and reference circuit are not yet placed or validated.')
add('level','U11/U12 · Optical translators',solid(4,3,.3,4.2,5.3,6,1),'#7e8873',2,'PCA9306 I2C translator and SN74LVC1T45 interrupt translator candidate allocation. Verify voltage domains and all physical pins.')
add('privacygate','U8/U9/U10 · Mic privacy',solid(10,3,.3,4.2,5.3,0,12),'#7e8873',2,'TPS22916 mic supply, SN74LVC2G126 PDM isolation and SN74LVC1G08 permission gate. Allocation only; physical switch cannot be overridden by the phone.')
"""+s[idx:]
p.write_text(s,encoding='utf8')

p=base/'output/aira-loop-r02/cad/aira-loop-r02.scad';s=p.read_text(encoding='utf8').replace('R01','R02').replace('for(y=[-18,15])','for(y=[15])');p.write_text(s,encoding='utf8')

p=src/'viewer.template.html';s=p.read_text(encoding='utf8').replace('R01','R02').replace('aira-loop-r01.scad','aira-loop-r02.scad')
s=s.replace('512 MiB','64 MiB').replace('nRF5340','nRF52840').replace('220 mAh','230 mAh').replace('NAND','NOR').replace('1 fitted + 1 optional','1 fitted microphone').replace('PPG, IMU, skin temperature','PPG, accelerometer, temperature')
s=s.replace('QSPI, device-specific ECC and bad-block policy','QSPI NOR, wear-leveling and power-loss recovery')
s=s.replace('An adjustable planning model, not measured performance. Capacity edits do not resize the CAD. Continuous optical sampling, RF conditions and encoding choices can change these estimates substantially.','An allocated engineering budget, not a measured prediction. The 230 mAh, 72-hour objective allows 2.56 mA average after 20% capacity reserve. Health sampling, RF and firmware must meet that ceiling on hardware.')
s=s.replace('Transcription and AI can run through an explicitly enabled cloud path; the band does not run a large language model.','AI, transcription and health interpretation belong on the phone, with an explicitly authorized service only when needed. The band performs acquisition and lightweight transport work.')
s=s.replace('Explore the physical layers, signal paths and first-build assumptions.','Phone-based AI, a 200–230 mAh cell constraint and a 72-hour design objective. Explore the connections and the required power budget.')
s=s.replace('<h2>A considered first build.</h2>','<h2>230 mAh. Phone-processed.</h2><p><a href="engineering.html">Open parts, PCB and pin schedules</a></p>')
s=s.replace('Cell target, unverified fit','Cell target; 72 h unvalidated')
s=s.replace('<div class="downloads">','<div class="downloads"><div class="download"><a href="engineering.html">Full engineering schedules</a><p>Named parts, all 48 logical MCU ports, 39 connector contacts, PCB floorplan and unresolved physical pad maps.</p></div>')
s=s.replace('PPG with signal-quality flags and motion context.','Scheduled PPG windows with quality flags; continuous optical mode needs a separate budget.')
s=s.replace('No pin mapping, schematic netlist or PCB routing is implied.','Logical ports and connector contacts are documented separately; physical IC pad maps and routing remain open.')
s=s.replace('min="60" max="500" step="10" value="220"','min="200" max="230" step="10" value="230"')
s=s.replace('<output id="hours-out">16</output>','<output id="hours-out">24</output>').replace('step="1" value="16"','step="1" value="24"')
profile='''<label class="field"><span>Optical sampling profile</span><select id="profile"><option value="scheduled">Scheduled PPG · 5 min each 15 min</option><option value="continuous">Continuous optical · sensitivity budget</option></select></label><label class="field"><span>Active-mode budget, battery mA</span><input id="current" type="number" min="0.5" max="12" step="0.01" value="2.4"></label>'''
s=s.replace('<label class="field"><span>Capture hours each day:',profile+'<label class="field"><span>Capture hours each day:')
s=s.replace('Assumptions: 9 mA capture + wellness, 1.4 mA wellness-only. Active current includes nominal BLE transfer. No tested battery or firmware exists in this package.','Allocated target: 2.00 mA subtotal + 20% contingency = 2.40 mA Active. Scheduled wellness-only allocation: 0.90 mA. These targets are not datasheet-derived or measured. Continuous optical mode adds an illustrative 0.84 mA before contingency.')
s=s.replace('<span id="runtime">27.2</span>','<span id="runtime">76.7</span>')
s=s.replace('<div id="average" class="power-caption"></div>','<div id="average" class="power-caption"></div><p id="target-status" class="warning" aria-live="polite"></p>')
start=s.index('function budget(){');end=s.index("document.querySelectorAll('[role=tab]')",start)
s=s[:start]+"""function budget(){const capacity=Math.min(230,Math.max(200,+$('#capacity').value||230)),hours=+$('#hours').value,derate=+$('#derating').value/100,rate=+$('#codec').value,current=Math.max(.5,Math.min(12,+$('#current').value||2.4));const continuous=$('#profile').value==='continuous',idle=continuous?1.908:.9,audio=hours/24*current,wellness=(24-hours)/24*idle,average=audio+wellness,runtime=capacity*derate/average,buffer=64*1024*1024*.8/(rate*1000/8*3600);$('#hours-out').value=hours;$('#derating-out').value=Math.round(derate*100);$('#runtime').textContent=rate===70?runtime.toFixed(1):'—';$('#average').textContent=average.toFixed(3)+' mA allocation · '+Math.round(capacity*derate)+' mAh usable · '+(capacity*derate/72).toFixed(2)+' mA ceiling for 72 h';$('#audio-bar').style.width=Math.min(100,audio/6*100)+'%';$('#wellness-bar').style.width=Math.min(100,wellness/6*100)+'%';$('#audio-ma').textContent=audio.toFixed(2)+' mA avg';$('#wellness-ma').textContent=wellness.toFixed(2)+' mA avg';$('#buffer-hours').textContent=buffer.toFixed(2)+' h';$('#transfer-min').textContent=(rate/400*60).toFixed(1)+' min';$('#target-status').textContent=rate!==70?'Raw PCM has no qualified power budget here. Storage arithmetic alone does not establish runtime.':(runtime>=72?'Arithmetic meets the target; physical 72-hour operation remains unvalidated.':'This budget misses 72 hours within the selected cell capacity.')+(continuous?' Continuous optical mode is outside the proposed three-day profile.':' Scheduled optical windows do not provide continuous heart-rate coverage.');$('#buffer-warning').textContent=hours>buffer?'Phone sync required. Local NOR is a short reconnect buffer; stop and notify if unacknowledged audio fills it.':'Nominal buffer covers the selected capture duration. Validate wear, encryption and recovery.';}
['capacity','hours','derating','codec','current'].forEach(id=>$('#'+id).addEventListener('input',budget));$('#profile').addEventListener('input',()=>{$('#current').value=$('#profile').value==='continuous'?'3.408':'2.4';budget()});budget();
"""+s[end:]
p.write_text(s,encoding='utf8')

p=src/'render_preview.py';s=p.read_text(encoding='utf8').replace('R01','R02').replace('Built for a manufacturer’s feasibility review.','230 mAh target. AI processing on the phone.').replace('Editable CAD source + form-fit STL blanks + component assembly + proposed electronics and verification plan.','72-hour objective: 2.40 mA allocated average. Scheduled optical windows; runtime requires hardware validation.')
p.write_text(s,encoding='utf8')
print('Prepared R02: original small enclosure, one mic, phone-processed architecture and 200–230 mAh power controls.')
