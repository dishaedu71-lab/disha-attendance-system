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

  // ===========================
// COURSE WISE SUBJECT LIST
// ===========================

const subject =
document.getElementById("bpSubject");

const course =
localStorage.getItem("selectedCourse") || "";

subject.innerHTML =
'<option value="">Select Subject</option>';

if(course=="ADCA"){

subject.innerHTML += `
<option>Theory</option>
<option>Practical</option>
`;

}

else if(course=="O Level"){

subject.innerHTML += `
<option>M1 (IT Tools & Network Basics)</option>
<option>M2 (Web Designing)</option>
<option>M3 (Python Programming)</option>
<option>M4 (IoT)</option>
<option>Practical</option>
`;

}

else if(course=="CCC"){

subject.innerHTML += `
<option>CCC Theory</option>
<option>CCC Practical</option>
`;

}

else if(course=="Web Development"){

subject.innerHTML += `
<option>Theory</option>
<option>Practical</option>
`;

}

else{

subject.innerHTML += `
<option>Theory</option>
<option>Practical</option>
`;

}
  

 // =====================================
// SUBMIT BACK PAPER FORM
// =====================================

document.getElementById("submitBackForm").onclick = async () => {

  console.log("Submit Button Clicked");

    const subject =
    document.getElementById("bpSubject").value;

    const reason =
    document.getElementById("bpReason").value;

    const agree =
    document.getElementById("bpAgree").checked;

    if(subject==""){

        alert("Please Select Back Subject");

        return;

    }

    if(!agree){

        alert("Please Accept Declaration");

        return;

    }

    try{

        await window.addDoc(

            window.collection(window.db,"back_forms"),

            {

                studentId: localStorage.getItem("studentId"),

                studentName: localStorage.getItem("studentName"),

                mobile: localStorage.getItem("studentMobile"),

                course: localStorage.getItem("selectedCourse"),

                subject: subject,

                reason: reason,

                status: "Pending",

                date: new Date().toLocaleString()

            }

        );

        alert("✅ Back Paper Form Submitted Successfully");

        document.getElementById("bpSubject").value="";

        document.getElementById("bpReason").value="";

        document.getElementById("bpAgree").checked=false;

    }catch(err){

        console.error(err);

        alert(err.message);

    }

};
  
});
