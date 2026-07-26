import { db } from "./firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const studentId = document.getElementById("studentId");
const searchBtn = document.getElementById("searchBtn");

const totalFees = document.getElementById("totalFees");
const paidFees = document.getElementById("paidFees");
const saveBtn = document.getElementById("saveBtn");

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
saveBtn.addEventListener("click", async () => {

    if (currentDocId == "") {

        alert("Search Student First");

        return;

    }

    const total = Number(totalFees.value);
    const paid = Number(paidFees.value);

    const due = total - paid;

    const status = due <= 0 ? "Paid" : "Pending";

    try {

        await updateDoc(doc(db, "studentAccounts", currentDocId), {

            totalFees: total,
            paidFees: paid,
            dueFees: due,
            feeStatus: status

        });

        alert("Fees Updated Successfully");

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }

});
