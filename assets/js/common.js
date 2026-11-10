const pageNames={index:"Панель",deployments:"Внедрения",incidents:"Инциденты",maintenance:"Заявки",releases:"Релизы"};
function setupLayout(){
 const current=location.pathname.split("/").pop().replace(".html","")||"index";
 document.querySelector("#pageTitle").textContent=pageNames[current]||"Smart Support Hub";
 document.querySelectorAll(".nav a").forEach(a=>{if(a.dataset.page===current)a.classList.add("active")});
 const theme=localStorage.getItem("theme");
 if(theme==="light")document.body.classList.add("light");
 document.querySelector("#themeButton").addEventListener("click",()=>{
  document.body.classList.toggle("light");
  localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark");
 });
}
function baseData(){
 return {
  deployments:loadData("deployments",startDeployments),
  incidents:loadData("incidents",startIncidents),
  requests:loadData("requests",startRequests),
  releases:loadData("releases",startReleases)
 };
}
function saveAll(d){
 saveData("deployments",d.deployments);saveData("incidents",d.incidents);
 saveData("requests",d.requests);saveData("releases",d.releases);
}
function shell(){
 return `<div class="app"><aside class="sidebar">
 <div class="brand">SMART <span>SUPPORT</span></div><div class="nav-label">Рабочее пространство</div>
 <nav class="nav">
 <a data-page="index" href="index.html">▦ Панель</a>
 <a data-page="deployments" href="deployments.html">🚀 Внедрения</a>
 <a data-page="incidents" href="incidents.html">⚠ Инциденты</a>
 <a data-page="maintenance" href="maintenance.html">🛠 Заявки</a>
 <a data-page="releases" href="releases.html">📦 Релизы</a>
 </nav></aside><main class="main"><header class="topbar"><div><h1 id="pageTitle"></h1><p class="sub">Внедрение · Эксплуатация · Сопровождение</p></div>
 <div class="top-actions"><span class="pill">v1.2.1</span><button class="secondary" id="themeButton">◐ Тема</button></div></header><div id="content"></div></main></div>`;
}
