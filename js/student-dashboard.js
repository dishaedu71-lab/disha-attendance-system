import {
getFirestore,
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth } from "./firebase-config.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async(user) => {

    if (!user) {

        window.location.href = "student-login.html";

        return;

    }

    const studentId =
    localStorage.getItem("studentId");

    const q = query(

        collection(db,"back_forms"),

        where("studentId","==",studentId)

    );

    const snap = await getDocs(q);

    snap.forEach((doc)=>{

        const data = doc.data();

        console.log(data.status);

    });

});
logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "student-login.html";

});
