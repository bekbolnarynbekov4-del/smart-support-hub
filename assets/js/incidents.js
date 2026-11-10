let d=baseData();
const statusNames={new:"Новый",in_progress:"В работе",resolved:"Решён"};
const slaNames={on_track:"В срок",breached:"Нарушен",met:"Решён вовремя"};
function render(){
 const filter=document.querySelector("#statusFilter")?.value||"all";
 const list=filter==="all"?d.incidents:d.incidents.filter(x=>x.status===filter);
 document.querySelector("#content").innerHTML=`
 <div class="toolbar"><select id="statusFilter"><option value="all">Все статусы</option><option value="new">Новые</option><option value="in_progress">В работе</option><option value="resolved">Решённые</option></select><button id="addBtn">+ Новый инцидент</button></div>
 <section class="card"><div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Описание</th><th>Приоритет</th><th>Статус</th><th>SLA</th><th>Действие</th></tr></thead><tbody>
 ${list.map(x=>`<tr><td>${x.id}</td><td>${x.title}</td><td>${x.priority}</td><td>${statusNames[x.status]}</td><td><span class="pill ${getSlaState(x)==="breached"?"red":"green"}">${slaNames[getSlaState(x)]}</span></td><td>${x.status!=="resolved"?`<button class="secondary resolve" data-id="${x.id}">Решить</button>`:"—"}</td></tr>`).join("")}
 </tbody></table></div></section>
 <section class="card" id="formCard" style="margin-top:16px;display:none"><h2 class="section-title">Создать инцидент</h2><form id="incidentForm"><div class="form-grid">
 <div class="field"><label>Описание</label><input name="title" required placeholder="Например, не открывается отчёт"></div>
 <div class="field"><label>Приоритет</label><select name="priority"><option>critical</option><option>high</option><option selected>medium</option><option>low</option></select></div>
 </div><div class="form-actions"><button>Создать</button><button type="button" class="secondary" id="cancelBtn">Отмена</button></div></form></section>`;
 document.querySelector("#statusFilter").value=filter;
 document.querySelector("#statusFilter").onchange=render;
 document.querySelector("#addBtn").onclick=()=>document.querySelector("#formCard").style.display="block";
 document.querySelector("#cancelBtn").onclick=()=>document.querySelector("#formCard").style.display="none";
 document.querySelector("#incidentForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);let title=f.get("title").trim();if(!title){alert("Введите описание");return;}d.incidents.push({id:"INC-"+String(d.incidents.length+1).padStart(3,"0"),title,priority:f.get("priority"),status:"new",createdAt:new Date().toISOString(),resolvedAt:null});saveAll(d);render();};
 document.querySelectorAll(".resolve").forEach(b=>b.onclick=()=>{let item=d.incidents.find(x=>x.id===b.dataset.id);item.status="resolved";item.resolvedAt=new Date().toISOString();saveAll(d);render();});
}
render();
