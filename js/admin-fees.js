import { db } from "./firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const studentId = document.getElementById("studentId");
const searchBtn = document.getElementById("searchBtn");

const totalFees = document.getElementById("totalFees");
const paidFees = document.getElementById("paidFees");

let currentDocId = "";

searchBtn.addEventListener("click", async () => {

    if (studentId.value.trim() == "") {

        alert("Enter Student ID");

        return;

    }

    try {

        const q = query(

            collection(db, "studentAccounts"),

            where("studentId", "==", studentId.value.trim())

        );

        const snap = await getDocs(q);

        if (snap.empty) {

            alert("Student Not Found");

            return;

        }

        snap.forEach(doc => {

            currentDocId = doc.id;

            const data = doc.data();

            totalFees.value = data.totalFees || 0;

            paidFees.value = data.paidFees || 0;

            alert(

                "Student Found\n\n" +

                "Name : " + data.name +

                "\nCourse : " + data.course +

                "\nBatch : " + data.batch

            );

        });

    }

    catch(error){

        console.log(error);

        alert(error.message);

    }

});
