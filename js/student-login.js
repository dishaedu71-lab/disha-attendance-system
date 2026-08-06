import { auth, db } from "./firebase-config.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const studentId = document
        .getElementById("studentId")
        .value
        .trim()
        .toUpperCase();

    const password = document
        .getElementById("password")
        .value;

    try {

        const q = query(
            collection(db, "studentAccounts"),
            where("studentId", "==", studentId)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            alert("Student ID Not Found");
            return;
        }

        const student = snapshot.docs[0].data();

        await signInWithEmailAndPassword(
            auth,
            student.email,
            password
        );

        localStorage.setItem("studentId", student.studentId);
        localStorage.setItem("studentName", student.name);
        localStorage.setItem("studentEmail", student.email);
        localStorage.setItem("studentMobile", student.mobile || "");
        localStorage.setItem("selectedCourse", student.course || "");

        alert("Login Successful");

       window.location.href="cyber-loading.html";

    } catch (error) {
        alert(error.message);
    }

});
