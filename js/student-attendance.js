// Demo Data (Firebase की जगह अभी Temporary Data)

document.getElementById("studentName").textContent = "Demo";

document.getElementById("studentId").textContent = "DCE250001";

document.getElementById("course").textContent = "O Level";

document.getElementById("batch").textContent = "Morning Batch";

document.getElementById("totalClasses").textContent = "120";

document.getElementById("presentClasses").textContent = "110";

document.getElementById("absentClasses").textContent = "10";

document.getElementById("attendancePercent").textContent = "91.67%";
const historyBody = document.getElementById("attendanceHistory");
const monthSelect = document.getElementById("monthSelect");

const monthNames = [
"January","February","March","April","May","June",
"July","August","September","October","November","December"
];

function loadMonth(month){

historyBody.innerHTML="";

const year=2026;

const days=new Date(year,month+1,0).getDate();

for(let i=1;i<=days;i++){

const tr=document.createElement("tr");

const date=new Date(year,month,i);

const day=date.toLocaleDateString("en-US",{weekday:"long"});

let status;

if(day==="Sunday"){

status="Holiday";

}else{

status=Math.random()>0.15?"Present":"Absent";

}

let cls="";

if(status==="Present") cls="present";
if(status==="Absent") cls="absent";
if(status==="Holiday") cls="holiday";

tr.innerHTML=`
<td>${String(i).padStart(2,"0")} ${monthNames[month]}</td>
<td>${day}</td>
<td class="${cls}">${status}</td>
`;

historyBody.appendChild(tr);

}

}

loadMonth(0);

monthSelect.addEventListener("change",function(){

loadMonth(Number(this.value));

});
