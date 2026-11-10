const d=baseData();
const active=d.deployments.filter(x=>x.stage!=="production").length;
const open=d.incidents.filter(x=>x.status!=="resolved").length;
document.querySelector("#content").innerHTML=`
<div class="grid">
 <div class="card"><div class="kpi-label">Активных внедрений</div><div class="kpi-value">${active}</div><div class="kpi-note">Текущие проекты</div></div>
 <div class="card"><div class="kpi-label">Открытых инцидентов</div><div class="kpi-value">${open}</div><div class="kpi-note">Требуют внимания</div></div>
 <div class="card"><div class="kpi-label">SLA выполнен</div><div class="kpi-value">${getSlaPercent(d.incidents)}%</div><div class="kpi-note">Среди решённых</div></div>
 <div class="card"><div class="kpi-label">Текущая версия</div><div class="kpi-value">${latestVersion(d.releases)}</div><div class="kpi-note">Последний выпуск</div></div>
</div>
<div class="two-col">
 <section class="card"><h2 class="section-title">Инциденты по приоритетам</h2><div class="chart-wrap"><canvas id="priorityChart"></canvas></div></section>
 <section class="card"><h2 class="section-title">Заявки по видам сопровождения</h2><div class="chart-wrap"><canvas id="requestChart"></canvas></div></section>
</div>
<section class="card" style="margin-top:17px"><h2 class="section-title">Последние инциденты</h2><div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>Описание</th><th>Приоритет</th><th>Статус</th><th>SLA</th></tr></thead><tbody>
${d.incidents.slice(0,5).map(x=>`<tr><td>${x.id}</td><td>${x.title}</td><td>${x.priority}</td><td>${x.status}</td><td>${getSlaState(x)}</td></tr>`).join("")}
</tbody></table></div></section>`;
const colors=["#ff7185","#f2bd62","#6d9cff","#39c99a"];
new Chart(document.querySelector("#priorityChart"),{type:"bar",data:{labels:["critical","high","medium","low"],datasets:[{label:"Инциденты",data:["critical","high","medium","low"].map(p=>d.incidents.filter(x=>x.priority===p).length),backgroundColor:colors,borderRadius:7}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}}}});
new Chart(document.querySelector("#requestChart"),{type:"doughnut",data:{labels:["corrective","adaptive","perfective","preventive"],datasets:[{data:["corrective","adaptive","perfective","preventive"].map(t=>d.requests.filter(x=>x.type===t).length),backgroundColor:colors,borderWidth:0}]},options:{maintainAspectRatio:false,plugins:{legend:{position:"bottom"}}}});
