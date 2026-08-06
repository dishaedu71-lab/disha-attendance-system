window.addEventListener("firebase-ready", () => {

const table =
document.getElementById("backTable");

const search =
document.getElementById("searchBox");

let allForms = [];

window.onSnapshot(

window.collection(window.db,"back_forms"),

(snapshot)=>{

allForms=[];

snapshot.forEach((doc)=>{

allForms.push({

id:doc.id,

...doc.data()

});

});

renderTable(allForms);

});

search.onkeyup=()=>{

const keyword=
search.value.toLowerCase();

const filter=

allForms.filter(x=>

(x.studentName||"")
.toLowerCase()
.includes(keyword)

||

(x.studentId||"")
.toLowerCase()
.includes(keyword)

||

(x.course||"")
.toLowerCase()
.includes(keyword)

||

(x.subject||"")
.toLowerCase()
.includes(keyword)

);

renderTable(filter);

};
  // =========================
// TABLE RENDER
// =========================

function renderTable(list){

table.innerHTML="";

list.forEach((item)=>{

let color="#ffc107";

if(item.status=="Approved") color="#28a745";

if(item.status=="Rejected") color="#dc3545";

table.innerHTML += `

<tr>

<td>${item.studentName||""}</td>

<td>${item.studentId||""}</td>

<td>${item.course||""}</td>

<td>${item.mobile||""}</td>

<td>${item.subject||""}</td>

<td>${item.reason||""}</td>

<td>${item.date||""}</td>

<td>

<span
style="
background:${color};
color:white;
padding:6px 12px;
border-radius:20px;
font-weight:bold;">

${item.status||"Pending"}

</span>

</td>

<td>

<button
onclick="approveBack('${item.id}')"
style="
background:green;
color:white;
border:none;
padding:8px 12px;
border-radius:8px;
cursor:pointer;">

Approve

</button>

<button
onclick="rejectBack('${item.id}')"
style="
background:orange;
color:white;
border:none;
padding:8px 12px;
border-radius:8px;
cursor:pointer;
margin-left:5px;">

Reject

</button>

<button
onclick="deleteBack('${item.id}')"
style="
background:red;
color:white;
border:none;
padding:8px 12px;
border-radius:8px;
cursor:pointer;
margin-left:5px;">

Delete

</button>

</td>

</tr>

`;

});

}
  // =========================
// APPROVE
// =========================

window.approveBack = async(id)=>{

await window.updateDoc(

window.doc(window.db,"back_forms",id),

{

status:"Approved"

}

);

};

// =========================
// REJECT
// =========================

window.rejectBack = async(id)=>{

await window.updateDoc(

window.doc(window.db,"back_forms",id),

{

status:"Rejected"

}

);

};

// =========================
// DELETE
// =========================

window.deleteBack = async(id)=>{

if(!confirm("Delete this Back Paper Form?")){

return;

}

await window.deleteDoc(

window.doc(window.db,"back_forms",id)

);

alert("Deleted Successfully");

};

});
