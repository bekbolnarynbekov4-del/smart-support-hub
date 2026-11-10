let d=baseData();
const labels={planning:"Планирование",setup:"Настройка",training:"Обучение",production:"В эксплуатации"};
function render(){
 document.querySelector("#content").innerHTML=`
 <div class="notice">Здесь команда контролирует заказчиков, этап внедрения и процент готовности.</div>
 <section class="card"><div class="toolbar"><h2 class="section-title">Список внедрений</h2><button id="addBtn">+ Добавить внедрение</button></div>
 <div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Заказчик / продукт</th><th>Этап</th><th>Ответственный</th><th>Готовность</th><th>Срок</th></tr></thead><tbody>
 ${d.deployments.map(x=>{let pct=Math.round(x.done/x.total*100);return `<tr><td>${x.id}</td><td><b>${x.client}</b><br><span class="sub">${x.product}</span></td><td>${labels[x.stage]}</td><td>${x.owner}</td><td><div>${pct}%</div><div class="progress"><span style="width:${pct}%"></span></div></td><td>${x.plannedDate}</td></tr>`}).join("")}
 </tbody></table></div></section>
 <section class="card" id="formCard" style="margin-top:16px;display:none"><h2 class="section-title">Новое внедрение</h2><form id="deploymentForm"><div class="form-grid">
 <div class="field"><label>Заказчик</label><input name="client" required></div><div class="field"><label>Продукт</label><input name="product" required></div>
 <div class="field"><label>Ответственный</label><input name="owner" required></div><div class="field"><label>Этап</label><select name="stage"><option value="planning">Планирование</option><option value="setup">Настройка</option><option value="training">Обучение</option><option value="production">В эксплуатации</option></select></div>
 <div class="field"><label>Дата завершения</label><input type="date" name="plannedDate" required></div><div class="field"><label>Всего этапов</label><input type="number" name="total" min="1" value="3" required></div></div><div class="form-actions"><button>Сохранить</button><button type="button" class="secondary" id="cancelBtn">Отмена</button></div></form></section>`;
 document.querySelector("#addBtn").onclick=()=>document.querySelector("#formCard").style.display="block";
 document.querySelector("#cancelBtn").onclick=()=>document.querySelector("#formCard").style.display="none";
 document.querySelector("#deploymentForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);d.deployments.push({id:"DEP-"+String(d.deployments.length+1).padStart(2,"0"),client:f.get("client"),product:f.get("product"),owner:f.get("owner"),stage:f.get("stage"),plannedDate:f.get("plannedDate"),total:+f.get("total"),done:0,version:"v1.2.1"});saveAll(d);render();};
}
render();
