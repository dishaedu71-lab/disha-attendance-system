window.addEventListener("firebase-ready", () => {

const table = document.getElementById("backTable");

window.onSnapshot(

window.collection(window.db,"back_forms"),

(snapshot)=>{

table.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

table.innerHTML += `

<tr>

<td>${data.studentName}</td>

<td>${data.studentId}</td>

<td>${data.course}</td>

<td>${data.subject}</td>

<td>

<span style="
padding:6px 12px;
border-radius:20px;
background:#ffd54f;
font-weight:bold;">

${data.status}

</span>

</td>

<td>

<button
onclick="deleteBack('${doc.id}')"
style="
padding:8px 15px;
background:red;
color:white;
border:none;
border-radius:8px;
cursor:pointer;">

Delete

</button>

</td>

</tr>

`;

});

});

});

// ==========================

window.deleteBack = async(id)=>{

if(!confirm("Delete this Back Paper Form?")){

return;

}

await window.deleteDoc(

window.doc(window.db,"back_forms",id)

);

alert("Deleted Successfully");

};
