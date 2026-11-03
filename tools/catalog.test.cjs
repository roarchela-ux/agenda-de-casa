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
    location:{hash:'#hoje',replace(hash){this.hash=hash}},crypto:{randomUUID:()=> 'test-id'},setTimeout:()=>1,clearTimeout(){},setInterval(){},
  };
  sandbox.document.createElement=()=>({});
  sandbox.document.head={appendChild(script){sandbox.recoveryAsset=script.src;sandbox.window.AGENDA_CATALOG={version,missions};script.onload()}};
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8'),sandbox);
  return sandbox;
}
test('additional suggestions cover each room and time without replacing an active care',()=>{
  const sandbox=appContext({mission:{title:'Meu cuidado ativo',room:'Sala',minutes:15,remaining:900,started:true}});
  vm.runInContext(`
    const original=mission;
    for(let r=0;r<rooms.length;r++)for(const duration of [5,15,30]){
      room=r;minutes=duration;extraDraft=null;
      const pool=matchingMissions(rooms[r],duration),seen=new Set();
      for(let n=0;n<pool.length;n++){
        newMission();
        if(seen.has(extraDraft.catalogId))throw new Error('Repeated extra before pool exhaustion');
        if(extraDraft.room!==rooms[r]||extraDraft.minutes!==duration)throw new Error('Incompatible extra');
        if(mission!==original)throw new Error('Active mission replaced');
        seen.add(extraDraft.catalogId);
        const template=pool.find(m=>m.id===extraDraft.catalogId);
        if(extraDraft.directions===template.directions||extraDraft.directions[0]===template.directions[0])throw new Error('Instructions were not snapshotted');
      }
    }
  `,sandbox);
});
test('daily rotation reaches all 188 missions, follows weekdays and alternates Tuesday rooms',()=>{
  const sandbox=appContext();
  vm.runInContext(`
    const allSeen=new Set(),perRoom=new Map();
    for(let w=0;w<104;w++)for(let day=0;day<7;day++){
      const date=new Date(2026,10,2+w*7+day,12);
      const result=dailyMissionOn(date),focus=dayFocus(date);
      if(!result||!focus.rooms.includes(result.room))throw new Error('Daily mission outside weekday focus');
      if(result.id!==dailyMissionOn(new Date(date.getFullYear(),date.getMonth(),date.getDate(),23,59)).id)throw new Error('Daily suggestion changed during day');
      if(day===1&&result.room!==(w%2===0?'Cozinha':'Área de serviço'))throw new Error('Tuesday rooms do not alternate');
      let seen=perRoom.get(result.room)||new Set();
      if(seen.size===rotationPool(result.room).length)seen=new Set();
      if(seen.has(result.id))throw new Error('Daily care repeats before its room pool is exhausted');
      seen.add(result.id);perRoom.set(result.room,seen);allSeen.add(result.id);
    }
    if(allSeen.size!==188)throw new Error('Not all missions participate in the daily rotation');
  `,sandbox);
});
test('extra care leaves the daily suggestion stable, and queueing avoids duplicates',()=>{
  const sandbox=appContext();
  vm.runInContext(`
    const date=new Date(2026,10,3,12),original=dailyMissionOn(date).id;
    room=2;minutes=5;newMission();
    queueCare(extraDraft,'2026-11-03');queueCare(extraDraft,'2026-11-03');
    if(plans.length!==1)throw new Error('Duplicate queued care');
    if(dailyMissionOn(date).id!==original)throw new Error('Extra care changed daily recommendation');
  `,sandbox);
});
test('starting daily care keeps an existing active mission and queues the daily care instead',()=>{
  const sandbox=appContext({mission:{title:'Cuidado em andamento',room:'Sala',minutes:15,remaining:600,started:true,running:false}});
  vm.runInContext(`
    const current=mission;
    chooseDaily();chooseDaily();
    if(mission!==current||mission.remaining!==600)throw new Error('Active care was replaced');
    if(plans.length!==1||plans[0].dailyDate!==dateKey())throw new Error('Daily care was not queued once');
    if(!plans[0].directions.length)throw new Error('Daily instructions were lost');
  `,sandbox);
});
test('daily selection preserves its date and instructions and reuses its queued plan',()=>{
  const sandbox=appContext();
  vm.runInContext(`
    const template=dailyMissionOn();
    const plan=queueCare({...snapshotTemplate(template),dailyDate:dateKey()});
    chooseDaily();
    if(mission.planId!==plan.id||mission.dailyDate!==dateKey()||mission.catalogId!==template.id)throw new Error('Daily plan not reused');
    if(mission.started||mission.running)throw new Error('Daily timer started without consent');
    const current=mission;chooseDaily();
    if(mission!==current)throw new Error('Opening daily care resets saved progress');
  `,sandbox);
});
test('catalogue links are removed and old routes show only the method and app indication',()=>{
  const sandbox=appContext();
  vm.runInContext(`
    if(today().includes('#catalogo')||chooser().includes('#catalogo')||method().includes('#catalogo'))throw new Error('Catalogue is still exposed in navigation');
    if(!method().includes('Métodos da RoArchela (app)'))throw new Error('Missing app indication');
    location.hash='#catalogo';render();
    if(location.hash!=='#metodo')throw new Error('Old catalogue URL was not redirected');
    location.hash='#cuidado/42';render();
    if(location.hash!=='#metodo')throw new Error('Old care detail URL was not redirected');
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
