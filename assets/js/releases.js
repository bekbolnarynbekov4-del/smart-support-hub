let d=baseData();
function render(){
 const current=latestVersion(d.releases);
 document.querySelector("#content").innerHTML=`
 <div class="notice">Текущая версия: <b>${current}</b>. Выбери уровень изменения, чтобы рассчитать следующий номер версии.</div>
 <section class="card"><h2 class="section-title">Рассчитать следующую версию</h2><div class="form-grid">
 <div class="field"><label>Тип выпуска</label><select id="level"><option value="patch">Patch — исправления</option><option value="minor">Minor — новая функция</option><option value="major">Major — крупные изменения</option></select></div>
 <div class="field"><label>Следующая версия</label><input id="nextVersion" readonly value="${getNextVersion(current,"patch")}"></div></div></section>
 <section class="card" style="margin-top:16px"><div class="toolbar"><h2 class="section-title">История релизов</h2><button id="addBtn">+ Выпустить версию</button></div>
 ${d.releases.slice().sort((a,b)=>b.date.localeCompare(a.date)).map(x=>`<div style="padding:13px 0;border-bottom:1px solid var(--line)"><div style="display:flex;justify-content:space-between;gap:10px"><b>${x.version}</b><span class="pill">${x.level} · ${x.date}</span></div><ul>${x.changes.map(c=>`<li>${c}</li>`).join("")}</ul></div>`).join("")}
 </section>
 <section class="card" id="formCard" style="display:none;margin-top:16px"><h2 class="section-title">Новый релиз</h2><form id="releaseForm"><div class="form-grid"><div class="field"><label>Уровень</label><select name="level"><option value="patch">patch</option><option value="minor">minor</option><option value="major">major</option></select></div><div class="field"><label>Изменения (каждое с новой строки)</label><textarea name="changes" rows="3" required></textarea></div></div><div class="form-actions"><button>Сохранить релиз</button><button type="button" class="secondary" id="cancelBtn">Отмена</button></div></form></section>`;
 document.querySelector("#level").onchange=e=>document.querySelector("#nextVersion").value=getNextVersion(current,e.target.value);
 document.querySelector("#addBtn").onclick=()=>document.querySelector("#formCard").style.display="block";
 document.querySelector("#cancelBtn").onclick=()=>document.querySelector("#formCard").style.display="none";
 document.querySelector("#releaseForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);let version=getNextVersion(latestVersion(d.releases),f.get("level"));d.releases.push({id:"REL-"+String(d.releases.length+1).padStart(3,"0"),version,date:new Date().toISOString().slice(0,10),level:f.get("level"),changes:f.get("changes").split("\n").map(s=>s.trim()).filter(Boolean)});saveAll(d);render();};
}
render();
