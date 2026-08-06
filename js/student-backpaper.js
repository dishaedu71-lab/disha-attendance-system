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

<div
style="
display:grid;
grid-template-columns:1fr 1fr;
gap:20px;
margin-bottom:20px;">

<div>

<label><b>👤 Student Name</b></label>

<input
id="bpName"
type="text"
readonly
style="
width:100%;
padding:14px;
border-radius:12px;
font-size:16px;">

</div>

<div>

<label><b>🆔 Roll Number</b></label>

<input
id="bpRoll"
type="text"
readonly
style="
width:100%;
padding:14px;
border-radius:12px;
font-size:16px;">

</div>

<div>

<label><b>🎓 Course</b></label>

<input
id="bpCourse"
type="text"
readonly
style="
width:100%;
padding:14px;
border-radius:12px;
font-size:16px;">

</div>

<div>

<label><b>📱 Mobile Number</b></label>

<input
id="bpMobile"
type="text"
readonly
style="
width:100%;
padding:14px;
border-radius:12px;
font-size:16px;">

</div>

</div>

<hr style="margin:25px 0;">

<label style="font-size:18px;">
<b>📚 Back Paper Type</b>
</label>

<select
id="bpSubject"
style="
width:100%;
padding:15px;
border-radius:12px;
font-size:17px;
margin-top:10px;
margin-bottom:25px;">

</select>

<label style="font-size:18px;">
<b>📝 Reason (Optional)</b>
</label>

<textarea
id="bpReason"
rows="5"
placeholder="Write your reason here..."
style="
width:100%;
padding:15px;
border-radius:12px;
font-size:16px;
resize:none;
margin-top:10px;
margin-bottom:20px;"></textarea>

<div
style="
background:#f8f9fa;
padding:15px;
border-radius:12px;
margin-bottom:25px;">

<label
style="
font-size:16px;
cursor:pointer;">

<input
type="checkbox"
id="bpAgree">

I hereby declare that the above information is true and correct.

</label>

</div>

<button
id="submitBackForm"
style="
width:100%;
padding:18px;
border:none;
border-radius:12px;
font-size:20px;
font-weight:bold;
background:#007bff;
color:white;
cursor:pointer;">

🚀 SUBMIT BACK PAPER APPLICATION

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
