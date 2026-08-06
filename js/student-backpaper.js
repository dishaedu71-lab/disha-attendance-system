window.addEventListener("firebase-ready", async () => {

const ref = window.doc(
window.db,
"portal_settings",
"backpaper"
);

const snap = await window.getDoc(ref);

if(!snap.exists()){

alert("Setting Not Found");

return;

}

if(!snap.data().active){

document.querySelector(".card").innerHTML = `

<h2 style="color:red;">
🚫 Back Paper Form Closed
</h2>

<p>

Back Paper Form is currently closed.

</p>

`;

return;

}

document.querySelector(".card").innerHTML = `

<h2 style="text-align:center;color:#00ff99;">
📝 BACK PAPER FORM
</h2>

<hr><br>

<label><b>Student Name</b></label>

<input
id="bpName"
type="text"
readonly
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;">

<label><b>Roll Number</b></label>

<input
id="bpRoll"
type="text"
readonly
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;">

<label><b>Course</b></label>

<input
id="bpCourse"
type="text"
readonly
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;">

<label><b>Mobile Number</b></label>

<input
id="bpMobile"
type="text"
readonly
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;">

<label><b>Back Subject</b></label>

<select
id="bpSubject"
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;">

<option value="">Select Subject</option>

<option>MS Office</option>

<option>Internet</option>

<option>LibreOffice</option>

<option>HTML & CSS</option>

<option>Python</option>

</select>

<label><b>Reason (Optional)</b></label>

<textarea
id="bpReason"
rows="4"
style="width:100%;padding:12px;border-radius:10px;margin:8px 0;"></textarea>

<label>

<input type="checkbox" id="bpAgree">

I declare that all information is correct.

</label>

<br><br>

<button
id="submitBackForm"
class="login-btn"
style="width:100%;">

SUBMIT APPLICATION

</button>

`;

  // ============================
// AUTO FILL STUDENT DETAILS
// ============================

document.getElementById("bpName").value =
localStorage.getItem("studentName") || "";

document.getElementById("bpRoll").value =
localStorage.getItem("studentId") || "";

document.getElementById("bpCourse").value =
localStorage.getItem("selectedCourse") || "";

document.getElementById("bpMobile").value =
localStorage.getItem("studentMobile") || "";
  
});
