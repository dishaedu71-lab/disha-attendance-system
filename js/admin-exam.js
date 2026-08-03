// =======================================
// DISHA COMPUTER EDUCATION
// ADMIN EXAM SETTINGS
// PART-1
// =======================================

window.addEventListener("firebase-ready", () => {

const db = window.db;

const course = document.getElementById("course");

const examCode = document.getElementById("examCode");

const totalQuestions = document.getElementById("totalQuestions");

const examTime = document.getElementById("examTime");

const randomQuestion = document.getElementById("randomQuestion");

const examStatus = document.getElementById("examStatus");

const saveBtn = document.getElementById("saveSettings");

let currentDocId = "";

// ================= LOAD =================

async function loadSettings(){

const snap = await window.getDocs(

window.collection(db,"exam_settings")

);

currentDocId="";

snap.forEach(doc=>{

const data = doc.data();

if(data.course===course.value){

currentDocId=doc.id;

examCode.value=data.examCode;

totalQuestions.value=data.totalQuestions;

examTime.value=data.examTime;

randomQuestion.checked=data.random;

examStatus.checked=data.active;

}

});

}

loadSettings();

course.onchange=loadSettings;
    // ================= SAVE SETTINGS =================

saveBtn.onclick = async () => {

    if(currentDocId==""){

        alert("Course Settings Not Found");

        return;

    }

    try{

        await window.updateDoc(

            window.doc(db,"exam_settings",currentDocId),

            {

                course:course.value,

                examCode:examCode.value,

                totalQuestions:Number(totalQuestions.value),

                examTime:Number(examTime.value),

                random:randomQuestion.checked,

                active:examStatus.checked

            }

        );

        alert("Settings Saved Successfully");

        loadSettings();

    }catch(err){

        console.error(err);

        alert(err.message);

    }

};
    // ================= END =================

}); // firebase-ready समाप्त
