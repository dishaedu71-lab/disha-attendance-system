import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const studentName = document.getElementById("studentName");
const studentId = document.getElementById("studentId");
const fatherName = document.getElementById("fatherName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const course = document.getElementById("course");
const batch = document.getElementById("batch");

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "student-login.html";
        return;
    }

    const snap = await getDoc(doc(db, "studentAccounts", user.uid));

    if (!snap.exists()) {
        alert("Student Record Not Found");
        return;
    }

    const data = snap.data();

    studentName.textContent = data.name;
    studentId.textContent = data.studentId;
    fatherName.textContent = data.father;
    mobile.textContent = data.mobile;
    email.textContent = data.email;
    course.textContent = data.course;
    batch.textContent = data.batch;

});

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "student-login.html";

});
