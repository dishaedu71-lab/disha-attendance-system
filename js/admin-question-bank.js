// =========================================
// DISHA COMPUTER EDUCATION
// QUESTION BANK (PART-1)
// =========================================

function initQuestionBank() {

    console.log("Question Bank Started");

    const db = window.db;
    const collection = window.collection;
    const addDoc = window.addDoc;
    const getDocs = window.getDocs;
    const deleteDoc = window.deleteDoc;
    const docRef = window.doc;

    const saveBtn = document.getElementById("saveQuestion");
    const questionList = document.getElementById("questionList");

    if (!saveBtn) {
        alert("Save Button Not Found");
        return;
    }

    // ================= SAVE QUESTION =================

    saveBtn.addEventListener("click", async () => {

        try {

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

            await addDoc(
                collection(db, "questions"),
                data
            );

            alert("Question Saved Successfully");

            loadQuestions();

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    });

    // ================= LOAD QUESTIONS =================

    async function loadQuestions() {

        questionList.innerHTML = "Loading...";

        const snap = await getDocs(
            collection(db, "questions")
        );

        questionList.innerHTML = "";

            snap.forEach((item) => {

            const q = item.data();
            const id = item.id;

            questionList.innerHTML += `

            <div class="question-item">

                <h3>${q.question}</h3>

                <p><b>Course :</b> ${q.course}</p>
                <p><b>Subject :</b> ${q.subject}</p>
                <p><b>Chapter :</b> ${q.chapter}</p>

                <p>A : ${q.A}</p>
                <p>B : ${q.B}</p>
                <p>C : ${q.C}</p>
                <p>D : ${q.D}</p>

                <p style="color:lime;">
                    <b>Answer :</b> ${q.answer}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteQuestion('${id}')">
                    🗑 Delete
                </button>

            </div>

            `;

        });

    }

    loadQuestions();

    // ================= DELETE QUESTION =================

    window.deleteQuestion = async function(id){

        if(!confirm("Delete this Question?")) return;

        try{

            await deleteDoc(
                docRef(db,"questions",id)
            );

            alert("Question Deleted Successfully");

            loadQuestions();

        }catch(err){

            console.error(err);

            alert(err.message);

        }

    };

} // initQuestionBank() समाप्त

// ================= START =================

if (window.db) {

    initQuestionBank();

} else {

    window.addEventListener("firebase-ready", initQuestionBank);

}
