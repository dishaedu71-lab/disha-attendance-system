import { db } from "./firebase-config.js";

import {
    collection,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const studentId = document.getElementById("studentId");
const searchBtn = document.getElementById("searchBtn");

const totalFees = document.getElementById("totalFees");
const paidFees = document.getElementById("paidFees");
const dueFees = document.getElementById("dueFees");
const feeStatus = document.getElementById("feeStatus");
const saveBtn = document.getElementById("saveBtn");
const paymentAmount = document.getElementById("paymentAmount");
const paymentMode = document.getElementById("paymentMode");
const paymentDate = document.getElementById("paymentDate");
const remarks = document.getElementById("remarks");
const adminPaymentHistory = document.getElementById("adminPaymentHistory");

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
        const student = snap.docs[0];

        currentDocId = student.id;

const data = student.data();

totalFees.value = data.totalFees || 0;

paidFees.value = data.paidFees || 0;

dueFees.value = data.dueFees || (data.totalFees - data.paidFees);

feeStatus.value = data.feeStatus || "Pending";

alert(
"Student Found\n\n" +
"Name : " + data.name +
"\nCourse : " + data.course +
"\nBatch : " + data.batch
);

await loadPaymentHistory(data.studentId);

}
catch(error){

    console.log(error);

    alert(error.message);

}

});
async function loadPaymentHistory(studentID) {

    adminPaymentHistory.innerHTML = "";

    const paymentQuery = query(
        collection(db, "feesHistory"),
        where("studentId", "==", studentID)
    );

    const paymentSnap = await getDocs(paymentQuery);

    if (paymentSnap.empty) {
        adminPaymentHistory.innerHTML =
        "<tr><td colspan='5'>No Payment History</td></tr>";
        return;
    }

    paymentSnap.forEach((paymentDoc) => {

        const payment = paymentDoc.data();

        adminPaymentHistory.innerHTML += `
        <tr>
            <td>${payment.receiptNo}</td>
            <td>${payment.date}</td>
            <td>₹ ${payment.amount}</td>
            <td>${payment.mode}</td>
            <td>${payment.status}</td>
        </tr>
        `;

    });

}
saveBtn.addEventListener("click", async () => {

    if (currentDocId == "") {

        alert("Search Student First");

        return;

    }

    const total = Number(totalFees.value);

const oldPaid = Number(paidFees.value);

const newPayment = Number(paymentAmount.value);

const paid = oldPaid + newPayment;

    const due = total - paid;

    const status = due <= 0 ? "Paid" : "Pending";

    try {

        await updateDoc(doc(db, "studentAccounts", currentDocId), {

            totalFees: total,
            paidFees: paid,
            dueFees: due,
            feeStatus: status

        });
        await addDoc(collection(db, "feesHistory"), {

    studentId: studentId.value.trim(),

    receiptNo: "RC" + Date.now(),

    date: paymentDate.value,

    amount: newPayment,

    mode: paymentMode.value,

    status: "Paid",

    remarks: remarks.value

});
        paidFees.value = paid;

dueFees.value = due;

feeStatus.value = status;

await loadPaymentHistory(studentId.value.trim());

paymentAmount.value = "";

remarks.value = "";

        alert("Payment Saved Successfully");

    }

    catch (error) {

        console.log(error);

        alert(error.message);

    }
 

});
