// =====================================
// DISHA COMPUTER EDUCATION
// ADMIN RESULT PANEL
// =====================================

window.addEventListener("firebase-ready", async () => {

const table = document.getElementById("resultTable");

table.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";

try{

const snap = await window.getDocs(

window.collection(window.db,"results")

);

table.innerHTML = "";

if(snap.empty){

table.innerHTML =

"<tr><td colspan='7'>No Result Found</td></tr>";

return;

}

snap.forEach(doc=>{

const r = doc.data();

table.innerHTML += `

<tr>

<td>${r.studentName}</td>

<td>${r.course}</td>

<td>${r.correct}</td>

<td>${r.wrong}</td>

<td>${r.score}</td>

<td>${r.percentage}%</td>

<td>${r.date}</td>

</tr>

`;

});

}catch(err){

console.error(err);

table.innerHTML =

"<tr><td colspan='7'>Error Loading Results</td></tr>";

}

});
