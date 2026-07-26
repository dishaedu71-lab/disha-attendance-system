import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const totalFees = document.getElementById("totalFees");
const paidFees = document.getElementById("paidFees");
const dueFees = document.getElementById("dueFees");
const feeStatus = document.getElementById("feeStatus");

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

        totalFees.textContent = "₹ " + (data.totalFees || 0);
        paidFees.textContent = "₹ " + (data.paidFees || 0);
        dueFees.textContent = "₹ " + (data.dueFees || 0);
        feeStatus.textContent = data.feeStatus || "Pending";

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
