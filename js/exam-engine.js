// =======================================
// DISHA COMPUTER EDUCATION
// EXAM ENGINE
// =======================================

const course = localStorage.getItem("selectedCourse") || "O Level";

document.getElementById("courseName").innerHTML =
"Course : " + course;

let questions = [];

window.addEventListener("firebase-ready", async () => {

    const snap = await window.getDocs(
        window.collection(window.db, "questions")
    );

    questions = [];

    snap.forEach((doc) => {

        const q = doc.data();

        if (q.course === course) {

            questions.push(q);

        }

    });

    // Random Question Order
    questions.sort(() => Math.random() - 0.5);

    loadQuestion();

});

let current = 0;

let answers = [];

function loadQuestion() {

    if (questions.length === 0) {

        document.getElementById("question").innerHTML =
        "No Question Available";

        return;

    }

    const q = questions[current];

    document.getElementById("currentQuestion").innerHTML = current + 1;

    document.getElementById("totalQuestion").innerHTML = questions.length;

    document.getElementById("question").innerHTML = q.question;

    document.getElementById("optionA").innerHTML = q.A;

    document.getElementById("optionB").innerHTML = q.B;

    document.getElementById("optionC").innerHTML = q.C;

    document.getElementById("optionD").innerHTML = q.D;

    document.querySelectorAll("input[name='answer']")
    .forEach(r => r.checked = false);

    if (answers[current]) {

        document.querySelector(
        `input[value="${answers[current]}"]`
        ).checked = true;

    }

}

document.querySelectorAll("input[name='answer']")
.forEach(r => {

    r.addEventListener("change", function(){

        answers[current] = this.value;

    });

});

document.getElementById("nextBtn").onclick = () => {

    if(current < questions.length-1){

        current++;

        loadQuestion();

    }

};

document.getElementById("prevBtn").onclick = () => {

    if(current > 0){

        current--;

        loadQuestion();

    }

};

document.getElementById("submitBtn").onclick = async () => {

    let correct = 0;

    questions.forEach((q, i) => {

        if (answers[i] === q.answer) {
            correct++;
        }

    });

    let wrong = questions.length - correct;

    let percentage = Math.round((correct / questions.length) * 100);

    try {

        await window.addDoc(

            window.collection(window.db, "results"),

            {

                studentId: localStorage.getItem("studentId") || "Unknown",

                studentName: localStorage.getItem("studentName") || "Student",

                course: course,

                correct: correct,

                wrong: wrong,

                score: correct,

                percentage: percentage,

                date: new Date().toLocaleString()

            }

        );

        alert(
`Exam Submitted Successfully

Correct : ${correct}

Wrong : ${wrong}

Percentage : ${percentage}%`
        );

        window.location.href = "student-dashboard.html";

    } catch (e) {

        console.error(e);

        alert("Result Save Failed");

    }

};
// ================= TIMER =================

let time = 90 * 60;

const timer = document.getElementById("timer");

setInterval(()=>{

let min = Math.floor(time/60);

let sec = time%60;

timer.innerHTML =
`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

if(time>0){

time--;

}else{

alert("Time Over");

document.getElementById("submitBtn").click();

}

},1000);
