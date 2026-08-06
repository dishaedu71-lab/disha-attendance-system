window.addEventListener("firebase-ready", () => {

const tbody = document.getElementById("backTable");

window.onSnapshot(

window.collection(window.db,"back_forms"),

(snapshot)=>{

tbody.innerHTML="";

snapshot.forEach((doc)=>{

const data = doc.data();

tbody.innerHTML += `

<tr>

<td>${data.studentName}</td>

<td>${data.studentId}</td>

<td>${data.course}</td>

<td>${data.subject}</td>

<td>${data.status}</td>

<td>

<button
onclick="deleteBackForm('${doc.id}')">

Delete

</button>

</td>

</tr>

`;

});

});

});

// =====================

window.deleteBackForm = async(id)=>{

if(!confirm("Delete this Form?")) return;

await window.deleteDoc(

window.doc(window.db,"back_forms",id)

);

alert("Deleted Successfully");

}
