const startDeployments = [
 {id:"DEP-01",client:"Колледж, учебная часть",product:"Система расписания",version:"v1.2.0",stage:"training",owner:"Иванов А.",plannedDate:"2026-11-20",done:2,total:3},
 {id:"DEP-02",client:"Библиотека",product:"Электронный каталог",version:"v1.1.0",stage:"setup",owner:"Петрова М.",plannedDate:"2026-11-24",done:1,total:4},
 {id:"DEP-03",client:"Учебный отдел",product:"Портал заявок",version:"v1.2.1",stage:"production",owner:"Садыков Н.",plannedDate:"2026-11-18",done:3,total:3}
];
const startIncidents = [
 {id:"INC-001",title:"Не открывается отчёт",priority:"high",status:"in_progress",createdAt:"2026-11-02T10:00:00",resolvedAt:null},
 {id:"INC-002",title:"Ошибка входа",priority:"critical",status:"new",createdAt:"2026-11-09T09:00:00",resolvedAt:null},
 {id:"INC-003",title:"Медленная загрузка",priority:"medium",status:"new",createdAt:"2026-11-08T12:00:00",resolvedAt:null},
 {id:"INC-004",title:"Не отображается расписание",priority:"high",status:"resolved",createdAt:"2026-11-01T10:00:00",resolvedAt:"2026-11-01T14:00:00"},
 {id:"INC-005",title:"Опечатка в профиле",priority:"low",status:"new",createdAt:"2026-11-07T10:00:00",resolvedAt:null},
 {id:"INC-006",title:"Сбой экспорта",priority:"medium",status:"in_progress",createdAt:"2026-11-09T08:00:00",resolvedAt:null}
];
const startRequests = [
 {id:"REQ-001",title:"Добавить экспорт отчёта в PDF",type:"perfective",status:"planned",targetVersion:"v1.3.0"},
 {id:"REQ-002",title:"Исправить ошибку авторизации",type:"corrective",status:"new",targetVersion:"v1.2.2"},
 {id:"REQ-003",title:"Поддержка нового браузера",type:"adaptive",status:"planned",targetVersion:"v1.3.0"},
 {id:"REQ-004",title:"Обновить устаревшую библиотеку",type:"preventive",status:"done",targetVersion:"v1.2.1"}
];
const startReleases = [
 {id:"REL-005",version:"v1.2.1",date:"2026-11-05",level:"patch",changes:["Исправлено открытие отчёта","Обновлено руководство пользователя"]},
 {id:"REL-004",version:"v1.2.0",date:"2026-10-25",level:"minor",changes:["Добавлена панель показателей","Улучшен интерфейс заявок"]}
];
const settings = {slaHours:{critical:4,high:8,medium:24,low:72}};
