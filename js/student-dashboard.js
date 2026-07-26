import { auth, db } from "./firebase-config.js";

import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const studentIdEl = document.getElementById("studentId");
const studentNameEl = document.getElementById("studentName");
const fatherNameEl = document.getElementById("fatherName");
const mobileEl = document.getElementById("mobile");
const emailEl = document.getElementById("email");
const courseEl = document.getElementById("course");
const batchEl = document.getElementById("batch");

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "student-login.html";
        return;
    }

    try {

        const snap = await getDoc(doc(db, "studentAccounts", user.uid));

        if (!snap.exists()) {
            alert("Student Record Not Found");
            return;
        }

        const data = snap.data();

        studentIdEl.textContent = data.studentId || "-";
        studentNameEl.textContent = data.name || "-";
        fatherNameEl.textContent = data.father || "-";
        mobileEl.textContent = data.mobile || "-";
        emailEl.textContent = data.email || "-";
        courseEl.textContent = data.course || "-";
        batchEl.textContent = data.batch || "-";

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

});

logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "student-login.html";

});
