let d=baseData();
const typeNames={corrective:"Корректирующее",adaptive:"Адаптивное",perfective:"Совершенствующее",preventive:"Профилактическое"};
function render(){
 document.querySelector("#content").innerHTML=`
 <section class="card"><div class="toolbar"><h2 class="section-title">Заявки на сопровождение</h2><button id="addBtn">+ Добавить заявку</button></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Заявка</th><th>Вид</th><th>Статус</th><th>Целевая версия</th></tr></thead><tbody>
 ${d.requests.map(x=>`<tr><td>${x.id}</td><td>${x.title}</td><td>${typeNames[x.type]}</td><td>${x.status}</td><td>${x.targetVersion}</td></tr>`).join("")}
 </tbody></table></div></section>
 <section class="card" id="formCard" style="display:none;margin-top:16px"><h2 class="section-title">Новая заявка</h2><form id="requestForm"><div class="form-grid">
 <div class="field"><label>Название</label><input name="title" required></div><div class="field"><label>Вид сопровождения</label><select name="type"><option value="corrective">Корректирующее</option><option value="adaptive">Адаптивное</option><option value="perfective">Совершенствующее</option><option value="preventive">Профилактическое</option></select></div>
 <div class="field"><label>Статус</label><select name="status"><option>new</option><option>planned</option><option>done</option></select></div><div class="field"><label>Целевая версия</label><input name="targetVersion" value="v1.3.0" required></div></div>
 <div class="form-actions"><button>Сохранить</button><button type="button" class="secondary" id="cancelBtn">Отмена</button></div></form></section>`;
 document.querySelector("#addBtn").onclick=()=>document.querySelector("#formCard").style.display="block";
 document.querySelector("#cancelBtn").onclick=()=>document.querySelector("#formCard").style.display="none";
 document.querySelector("#requestForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);d.requests.push({id:"REQ-"+String(d.requests.length+1).padStart(3,"0"),title:f.get("title"),type:f.get("type"),status:f.get("status"),targetVersion:f.get("targetVersion")});saveAll(d);render();};
}
render();
