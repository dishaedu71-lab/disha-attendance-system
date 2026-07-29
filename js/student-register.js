import { auth, db } from "./firebase-config.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  setDoc,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function generateStudentId() {

    const counterRef = doc(db, "counters", "studentCounter");

    const studentId = await runTransaction(db, async (transaction) => {

        const counterDoc = await transaction.get(counterRef);

        let lastNumber = 0;

        if (counterDoc.exists()) {
            lastNumber = counterDoc.data().lastNumber;
        }

        lastNumber++;

        transaction.set(counterRef, {
            lastNumber: lastNumber
        });

        return "DCE25" + String(lastNumber).padStart(4, "0");

    });

    return studentId;
}

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const father = document.getElementById("father").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const batch = document.getElementById("batch").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Password aur Confirm Password match nahi kar rahe.");
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const studentId = await generateStudentId();

       await setDoc(doc(db, "studentAccounts", userCredential.user.uid), {
    uid: userCredential.user.uid,
    studentId: studentId,
    name,
    father,
    mobile,
    email,
    course,
    batch,
    createdAt: new Date().toISOString()
});
      await setDoc(doc(db, "studentsERP", studentId), {

    uid: userCredential.user.uid,

    studentId: studentId,

    name: name,

    fatherName: father,

    motherName: "",

    mobile: mobile,

    email: email,

    dob: "",

    gender: "",

    course: course,

    batch: batch,

    admissionDate: "",

    totalFees: 0,

    paidFees: 0,

    dueFees: 0,

    status: "Active",

    address: "",

    createdAt: new Date().toISOString(),

    createdBy: "Student Registration"

});

       window.robotDance(studentId);

    } catch (error) {
        alert(error.message);
    }

});
