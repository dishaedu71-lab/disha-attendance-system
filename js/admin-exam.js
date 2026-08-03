alert("ADMIN JS RUNNING");
// ==========================================
// DISHA COMPUTER EDUCATION
// ADMIN EXAM SETTINGS
// ==========================================

window.addEventListener("firebase-ready", () => {
    alert("Firebase Ready");

const db = window.db;

const course = document.getElementById("course");
const examCode = document.getElementById("examCode");
const totalQuestions = document.getElementById("totalQuestions");
const examTime = document.getElementById("examTime");
const randomQuestion = document.getElementById("randomQuestion");
const examStatus = document.getElementById("examStatus");
const saveBtn = document.getElementById("saveSettings");

console.log("Admin Exam JS Loaded");
    // ==========================================
// LOAD SETTINGS
// ==========================================

async function loadSettings(){

try{

const ref = window.doc(
db,
"exam_settings",
course.value
);

const snap = await window.getDoc(ref);

if(!snap.exists()){

alert("No Settings Found For " + course.value);

return;

}

const data = snap.data();

examCode.value = data.examCode;
totalQuestions.value = data.totalQuestions;
examTime.value = data.examTime;
randomQuestion.checked = data.random;
examStatus.checked = data.active;

console.log("Settings Loaded");

}catch(err){

console.error(err);
alert(err.message);

}

}

loadSettings();

course.addEventListener("change",loadSettings);
    // ==========================================
// SAVE SETTINGS
// ==========================================

saveBtn.addEventListener("click", async () => {

try{

const ref = window.doc(
db,
"exam_settings",
course.value
);

await window.updateDoc(ref,{

course: course.value,

examCode: examCode.value,

totalQuestions: Number(totalQuestions.value),

examTime: Number(examTime.value),

random: randomQuestion.checked,

active: examStatus.checked

});

alert("Settings Saved Successfully");

await loadSettings();

}catch(err){

console.error(err);

alert(err.message);

}

});
    // ==========================================
// START
// ==========================================

}); // firebase-ready end
