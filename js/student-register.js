import { auth, db } from "./firebase-config.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

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

        await setDoc(doc(db, "studentAccounts", userCredential.user.uid), {
            uid: userCredential.user.uid,
            name,
            father,
            mobile,
            email,
            course,
            batch,
            createdAt: new Date().toISOString()
        });

        alert("Registration Successful");

        window.location.href = "student-login.html";

    } catch (error) {
        alert(error.message);
    }

});
