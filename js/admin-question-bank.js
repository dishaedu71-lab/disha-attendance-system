alert("admin-question-bank.js Loaded");
// ===============================
// QUESTION BANK
// DISHA COMPUTER EDUCATION
// ===============================

window.addEventListener("firebase-ready", () => {    
console.log("Question Bank Loaded");
const db = window.db;
const collection = window.collection;
const addDoc = window.addDoc;
const getDocs = window.getDocs;
const deleteDoc = window.deleteDoc;
const docRef = window.doc;

const saveBtn = document.getElementById("saveQuestion");

const questionList = document.getElementById("questionList");


//================ SAVE QUESTION =================

saveBtn.onclick = async () => {

    try {

        console.log("Save Button Clicked");

        const data = {

            course: document.getElementById("course").value,
            subject: document.getElementById("subject").value,
            chapter: document.getElementById("chapter").value,
            question: document.getElementById("question").value,
            A: document.getElementById("optionA").value,
            B: document.getElementById("optionB").value,
            C: document.getElementById("optionC").value,
            D: document.getElementById("optionD").value,
            answer: document.getElementById("answer").value,
            createdAt: Date.now()

        };

        console.log(data);

        await addDoc(
            collection(db, "questions"),
            data
        );

        alert("Question Saved Successfully");

        loadQuestions();

    } catch (err) {

        console.error("SAVE ERROR:", err);
        alert(err.message);

    }

};


//================ LOAD QUESTION =================

async function loadQuestions(){

questionList.innerHTML="Loading...";

const snap=await getDocs(

collection(db,"questions")

);

questionList.innerHTML="";

snap.forEach(item=>{

const q = item.data();

const id = item.id;

questionList.innerHTML+=`

<div class="question-item">

<h3>${q.question}</h3>

<p><b>Course :</b> ${q.course}</p>

<p>A : ${q.A}</p>

<p>B : ${q.B}</p>

<p>C : ${q.C}</p>

<p>D : ${q.D}</p>

<p style="color:lime">

Answer : ${q.answer}

</p>

<br>

<button
onclick="deleteQuestion('${id}')"
style="
background:red;
color:white;
padding:8px 15px;
border:none;
border-radius:8px;
cursor:pointer;
margin-top:10px;">

🗑 Delete

</button>


</div>

`;

});

}
loadQuestions();

window.deleteQuestion = async function(id){

    if(!confirm("Delete this Question?")) return;

    await deleteDoc(
        docRef(db,"questions",id)
    );

    alert("Question Deleted Successfully");

    loadQuestions();

}

});
