window.addEventListener("firebase-ready",()=>{

const db=window.db;

const collection=window.collection;

const addDoc=window.addDoc;

document.getElementById("saveSettings").onclick=async()=>{

const data={

course:document.getElementById("course").value,

examCode:document.getElementById("examCode").value,

totalQuestions:Number(document.getElementById("totalQuestions").value),

examTime:Number(document.getElementById("examTime").value),

random:document.getElementById("randomQuestion").checked,

active:document.getElementById("examStatus").checked,

createdAt:Date.now()

};

await addDoc(

collection(db,"exam_settings"),

data

);

alert("Exam Settings Saved");

};

});
