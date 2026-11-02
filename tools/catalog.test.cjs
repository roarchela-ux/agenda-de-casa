const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../catalog.js'),'utf8'),context);
const {version,missions}=JSON.parse(JSON.stringify(context.window.AGENDA_CATALOG));
const byId=id=>missions.find(m=>m.id===String(id));
test('complete published catalogue has every room and duration with instructions',()=>{
  assert.equal(version,'guide-optimized-5-15-30-1.12');
  assert.equal(missions.length,188);
  assert.equal(new Set(missions.map(m=>m.id)).size,188);
  assert.deepEqual([5,15,30].map(t=>missions.filter(m=>m.minutes===t).length),[40,108,40]);
  const rooms=['Sala','Cozinha','Quarto','Banheiro','Área de serviço','Escritório','Área externa','Outro'];
  for(const room of rooms)for(const minutes of [5,15,30])assert(missions.some(m=>m.room===room&&m.minutes===minutes));
  for(const m of missions){assert(m.title&&m.scope&&m.tip);assert(m.directions.length>=2);for(const d of m.directions)assert(d.title&&d.text)}
});
test('final editorial corrections and bounded safety instructions survive export',()=>{
  assert.match(byId(30).directions[1].text,/páginas legíveis/);
  assert.equal(byId(42).title,'Um forno');
  assert.match(byId(42).directions[0].text,/frio e desligado/);
  assert.match(byId(55).scope,/Recolha um conjunto limpo e seco/);
  assert.equal(byId(91).title,'Colocar uma pequena quantidade de roupas para lavar');
  assert.match(byId(93).scope,/completamente secas/);
  assert.match(byId(97).scope,/casa, do trabalho ou da vida pessoal/);
  assert.match(byId(119).title,/porta e seu batente/);
  assert.match(byId(139).directions[0].text,/já desconectados/);
  assert.equal(missions.filter(m=>Number(m.id)>150).length,38);
  assert.match(byId(151).directions[1].text,/Não suba em móveis/);
});
test('web catalogue exposes editorial content without app identifiers or source documents',()=>{
  for(const m of missions)assert.deepEqual(Object.keys(m).sort(),['id','room','minutes','title','scope','directions','tip'].sort());
  assert(!JSON.stringify(missions).includes('docs.google.com'));
});
function appContext(saved={},withoutCatalog=false){
  const element={innerHTML:'',textContent:'',addEventListener(){},setAttribute(){},removeAttribute(){},focus(){}};
  const sandbox={
    window:{AGENDA_CATALOG:withoutCatalog?undefined:{version,missions},addEventListener(){}},
    document:{querySelector:()=>element,querySelectorAll:()=>[],documentElement:{style:{setProperty(){}}}},
    localStorage:{getItem:()=>JSON.stringify(saved),setItem(){}},
    location:{hash:'#hoje'},crypto:{randomUUID:()=> 'test-id'},setTimeout:()=>1,clearTimeout(){},setInterval(){},
  };
  sandbox.document.createElement=()=>({});
  sandbox.document.head={appendChild(script){sandbox.recoveryAsset=script.src;sandbox.window.AGENDA_CATALOG={version,missions};script.onload()}};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),sandbox);
  return sandbox;
}
test('suggestions visit every compatible mission before repeating and freeze their instructions',()=>{
  const sandbox=appContext();
  vm.runInContext(`
    for(let r=0;r<rooms.length;r++)for(const duration of [5,15,30]){
      room=r;minutes=duration;mission=null;
      const pool=matchingMissions(rooms[r],duration),seen=new Set();
      for(let n=0;n<pool.length;n++){
        newMission();
        if(seen.has(mission.catalogId))throw new Error('Repeated mission before pool exhaustion');
        if(mission.room!==rooms[r]||mission.minutes!==duration)throw new Error('Incompatible suggestion');
        seen.add(mission.catalogId);
        const template=pool.find(m=>m.id===mission.catalogId);
        if(mission.directions===template.directions||mission.directions[0]===template.directions[0])throw new Error('Instructions were not snapshotted');
      }
      if(seen.size!==pool.length)throw new Error('Missing suggestions');
    }
    mission.started=true;
    const current=mission;
    newMission();
    if(current!==mission)throw new Error('Active care was replaced');
  `,sandbox);
});
test('existing records and legacy active care remain intact when catalogue is added',()=>{
  const saved={records:[{id:'old-record',title:'Cuidado anterior',room:'Sala',seconds:12,date:'2026-11-01T12:00:00Z'}],mission:{title:'Meu cuidado guardado',room:'Sala',minutes:5,remaining:120,started:true,running:false}};
  const sandbox=appContext(saved);
  assert.equal(vm.runInContext('records[0].title',sandbox),'Cuidado anterior');
  assert.equal(vm.runInContext('records[0].seconds',sandbox),12);
  assert.equal(vm.runInContext('mission.title',sandbox),'Meu cuidado guardado');
  assert.equal(vm.runInContext('mission.remaining',sandbox),120);
});

test('cached HTML without the new script recovers the catalogue asset',()=>{
  const sandbox=appContext({},true);
  assert.equal(sandbox.recoveryAsset,'catalog.js');
  assert.equal(vm.runInContext('catalogMissions.length',sandbox),188);
});
