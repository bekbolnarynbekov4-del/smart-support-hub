function loadData(key,fallback){
 const raw=localStorage.getItem(key);
 if(!raw)return structuredClone(fallback);
 try{return JSON.parse(raw)}catch{return structuredClone(fallback)}
}
function saveData(key,value){localStorage.setItem(key,JSON.stringify(value))}
function getSlaState(item,now=Date.now()){
 const hours=settings.slaHours[item.priority];
 const deadline=new Date(item.createdAt).getTime()+hours*3600000;
 if(item.status==="resolved"){
  const resolved=new Date(item.resolvedAt).getTime();
  return resolved<=deadline?"met":"breached";
 }
 return now>deadline?"breached":"on_track";
}
function getSlaPercent(list){
 const resolved=list.filter(x=>x.status==="resolved");
 if(!resolved.length)return 100;
 const met=resolved.filter(x=>getSlaState(x)==="met").length;
 return Math.round(met/resolved.length*100);
}
function getNextVersion(current,level){
 const p=current.replace(/^v/,"").split(".").map(Number);
 if(level==="major")return `v${p[0]+1}.0.0`;
 if(level==="minor")return `v${p[0]}.${p[1]+1}.0`;
 return `v${p[0]}.${p[1]}.${p[2]+1}`;
}
function latestVersion(releases){
 return releases.slice().sort((a,b)=>b.date.localeCompare(a.date))[0]?.version||"v1.0.0";
}
