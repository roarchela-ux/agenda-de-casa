const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function load(seed={},blocked=false){
  const disk={...seed},status={textContent:''};let submit;
  const ctx={window:{},Date,FormData:class{constructor(form){this.form=form}get(key){return this.form[key]}},localStorage:{getItem:key=>disk[key]||null,setItem(key,value){if(blocked)throw Error('full');disk[key]=value}},document:{addEventListener(type,handler){submit=handler},querySelector(){return status}}};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../projects.js'),'utf8'),ctx);
  return {ctx,disk,status,render:route=>ctx.window.ProjectLibrary.render(route),save(note,stage='Viver'){submit({preventDefault(){},target:{id:'project-notes',dataset:{project:'closet'},note,stage}})}};
}
test('all environment and project links resolve with the complete continuous cycle',()=>{
  const app=load(),data=app.ctx.window.HOUSE_PROJECTS;
  assert.equal(data.projects.length,12);
  assert.equal(new Set(data.projects.map(p=>p.id)).size,12);
  for(const room of data.rooms){assert.match(app.render('ambiente/'+room.id),new RegExp(room.title));assert(data.projects.some(p=>p.room===room.id));}
  for(const project of data.projects){const html=app.render('projeto/'+project.id);assert(html.includes(project.title));for(const label of ['Observar','Escolher','Testar','Viver','Ajustar'])assert(html.includes(label));assert(html.includes('O estoque está na loja'));}
  assert.match(app.render('ambientes'),/melhoria contínua/);
  assert.match(app.render('projeto/inexistente'),/não foi encontrado/);
});
test('notes persist across reopening, escape markup and preserve existing care storage',()=>{
  const old='{"records":[{"title":"Cuidado anterior"}]}',app=load({'roarchela-essential-v1':old});
  app.save('<img src=x onerror=alert(1)>');
  const reopened=load(app.disk),html=reopened.render('projeto/closet');
  assert(html.includes('&lt;img'));assert(!html.includes('<img src=x'));assert(html.includes('<option selected>Viver</option>'));assert(reopened.render('ambientes').includes('Seus projetos para retomar'));
  assert.equal(app.disk['roarchela-essential-v1'],old);
});
test('storage failure reports failure and does not pretend a project was saved',()=>{
  const app=load({},true);app.save('Anotação importante');assert.match(app.status.textContent,/Não foi possível guardar/);assert(!app.render('ambientes').includes('Seus projetos para retomar'));
});
