// Isolated logic checks with a minimal DOM fixture. This is not browser visual QA.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)[1];
const elements=new Map();
class Element{
 constructor(id=''){this.id=id;this.value='';this.style={};this.dataset={};this.attributes={};this.events={};this.children=[];this.hidden=false;this.textContent=''}
 setAttribute(k,v){this.attributes[k]=v}getAttribute(k){return this.attributes[k]}
 addEventListener(k,f){this.events[k]=f}appendChild(e){this.children.push(e)}append(...e){this.children.push(...e)}replaceChildren(...e){this.children=e}focus(){}click(){this.events.click?.({})}
 getBoundingClientRect(){return{width:800,height:560}}getContext(){return new Proxy({}, {get:()=>()=>true})}
}
for(const [,id] of html.matchAll(/id="([^"]+)"/g))elements.set(id,new Element(id));
for(const [id,value] of Object.entries({capacity:220,hours:16,derating:80,codec:70,explode:0,component:'all'}))elements.get(id).value=String(value);
const tabs=['device','architecture','power','package'].map(id=>{const e=elements.get('tab-'+id);e.setAttribute('aria-controls',id);return e});
const panels=['device','architecture','power','package'].map(id=>elements.get(id));
const states=['active','mute','block'].map(s=>{const e=new Element();e.dataset.state=s;return e});
const document={querySelector:s=>elements.get(s.slice(1)),querySelectorAll:s=>s==='[role=tab]'?tabs:s==='[role=tabpanel]'?panels:s==='[data-state]'?states:[],createElement:()=>new Element(),createTextNode:text=>({textContent:text})};
const sandbox={document,ResizeObserver:class{observe(){}},requestAnimationFrame:()=>{},devicePixelRatio:1,console};
vm.createContext(sandbox);vm.runInContext(script,sandbox);
assert.equal(elements.get('runtime').textContent,'27.2');
assert.equal(elements.get('buffer-hours').textContent,'13.6 h');
assert.equal(elements.get('transfer-min').textContent,'10.5 min');
elements.get('hours').value='24';elements.get('hours').events.input();assert.equal(elements.get('runtime').textContent,'19.6');
elements.get('hours').value='0';elements.get('hours').events.input();assert.equal(elements.get('runtime').textContent,'125.7');
elements.get('codec').value='256';elements.get('codec').events.input();assert.equal(elements.get('buffer-hours').textContent,'3.7 h');
states[1].click();assert.equal(states[1].attributes['aria-pressed'],'true');assert.equal(states[0].attributes['aria-pressed'],'false');
states[2].click();assert.match(elements.get('state-readout').children[1].textContent,/excludes this interval/);
tabs[1].click();assert.equal(elements.get('architecture').hidden,false);assert.equal(elements.get('device').hidden,true);
elements.get('component').value='battery';elements.get('component').events.change({target:elements.get('component')});assert.match(elements.get('component-info').textContent,/unverified capacity/);assert.equal(elements.get('xray').attributes['aria-pressed'],'true');
elements.get('reset').click();assert.equal(elements.get('component').value,'all');
elements.get('underside').click();assert(vm.runInContext('Math.cos(pitch)<0',sandbox),'Skin-side view must expose the underside.');
const links=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);for(const link of links)assert(fs.existsSync(path.join(root,link)),`Missing download ${link}`);
const model=JSON.parse(fs.readFileSync(path.join(root,'source/model.json'),'utf8'));
const box=p=>[0,1,2].map(i=>[Math.min(...p.vertices.map(v=>v[i])),Math.max(...p.vertices.map(v=>v[i]))]);
const physical=model.parts.filter(p=>p.kind==='internal');
let pairs=0;for(let i=0;i<physical.length;i++)for(let j=i+1;j<physical.length;j++){
 const a=box(physical[i]),b=box(physical[j]);const penetrates=a.every((r,k)=>Math.min(r[1],b[k][1])-Math.max(r[0],b[k][0])>1e-5);
 assert(!penetrates,`Internal allocation overlap: ${physical[i].id}/${physical[j].id}`);pairs++;
}
const report={passed:true,individual_meshes:23,internal_bounding_box_pairs:pairs,checks:['JavaScript parses and executes in isolated DOM fixture','Privacy state transitions','Power estimates at 0 / 16 / 24 capture hours','ADPCM and PCM storage formulas','Tab visibility','Component selection and reset','Skin-side camera orientation','All download targets exist','No bounding-box penetration between internal allocation blocks'],limits:['Not a browser render or real Bluetooth/audio test','No electrical or OpenSCAD-kernel validation','No enclosure tolerance or flex/cable collision validation']};
fs.writeFileSync(path.join(root,'engineering/verification.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
