// =========================================
// DISHA COMPUTER EDUCATION
// ADMIN EXAM SETTINGS
// =========================================

function initAdminExam() {

const db = window.db;

const course = document.getElementById("course");
const examCode = document.getElementById("examCode");
const totalQuestions = document.getElementById("totalQuestions");
const examTime = document.getElementById("examTime");
const examDate = document.getElementById("examDate");
const startTime = document.getElementById("startTime");
const lastLoginTime = document.getElementById("lastLoginTime");
const passingMarks = document.getElementById("passingMarks");
const randomQuestion = document.getElementById("randomQuestion");
const examStatus = document.getElementById("examStatus");
const saveBtn = document.getElementById("saveSettings");

console.log("Admin Exam JS Started");
    // =========================================
// LOAD SETTINGS
// =========================================

async function loadSettings() {

try{

const ref = window.doc(
db,
"exam_settings",
course.value
);

const snap = await window.getDoc(ref);

if(!snap.exists()){

alert("No Settings Found");

return;

}

const data = snap.data();

examCode.value = data.examCode || "";

totalQuestions.value = data.totalQuestions || 100;

passingMarks.value = data.passingMarks || 50;

examTime.value = data.examTime || 90;

examDate.value = data.examDate || "";

startTime.value = data.startTime || "";

lastLoginTime.value = data.lastLoginTime || "";

randomQuestion.checked = data.random ?? true;

examStatus.checked = data.active ?? true;

console.log("Settings Loaded");

}catch(err){

console.error(err);

alert(err.message);

}

}

loadSettings();

course.addEventListener("change",loadSettings);
    // =========================================
// SAVE SETTINGS
// =========================================

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

passingMarks: Number(passingMarks.value),

examTime: Number(examTime.value),

examDate: examDate.value,

startTime: startTime.value,

lastLoginTime: lastLoginTime.value,

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
    // =========================================
// START SYSTEM
// =========================================

}

// Firebase Ready होने का इंतज़ार मत करो
// अगर Firebase पहले से Load है तो तुरंत Start करो

if (window.db) {

    initAdminExam();

} else {

    window.addEventListener("firebase-ready", initAdminExam);

}
