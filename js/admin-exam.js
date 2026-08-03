// =======================================
// ADMIN EXAM SETTINGS
// DISHA COMPUTER EDUCATION
// =======================================

window.addEventListener("firebase-ready", () => {

const db = window.db;

const course = document.getElementById("course");

const examCode = document.getElementById("examCode");

const examTime = document.getElementById("examTime");

const totalQuestions = document.getElementById("totalQuestions");

const randomQuestion = document.getElementById("randomQuestion");

const examStatus = document.getElementById("examStatus");

const saveBtn = document.getElementById("saveSettings");

async function loadSettings(){

try{

const ref = window.doc(db,"exam_settings",course.value);

const snap = await window.getDoc(ref);

if(!snap.exists()){

alert("Settings Not Found");

return;

}

const data = snap.data();

examCode.value = data.examCode;

examTime.value = data.examTime;

totalQuestions.value = data.totalQuestions;

randomQuestion.checked = data.random;

examStatus.checked = data.active;

}catch(err){

console.error(err);

}

}

loadSettings();

course.onchange = loadSettings;
    // ================= SAVE SETTINGS =================

saveBtn.onclick = async () => {

    try{

        const ref = window.doc(db,"exam_settings",course.value);

        await window.updateDoc(ref,{

            course: course.value,

            examCode: examCode.value,

            examTime: Number(examTime.value),

            totalQuestions: Number(totalQuestions.value),

            random: randomQuestion.checked,

            active: examStatus.checked

        });

        alert("Settings Saved Successfully");

        await loadSettings();

    }catch(err){

        console.error(err);

        alert(err.message);

    }

};
    // ================= START =================

}); // firebase-ready end
