// ==========================
// Generate Student ID
// ==========================

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
// =============================
// Student Management
// =============================

const studentModal = document.getElementById("studentModal");
const addStudentBtn = document.getElementById("addStudentBtn");
const closeModal = document.getElementById("closeModal");

// Open Modal
addStudentBtn.addEventListener("click", () => {
    studentModal.style.display = "flex";
});

// Close Modal
closeModal.addEventListener("click", () => {
    studentModal.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === studentModal) {
        studentModal.style.display = "none";
    }
});
const saveStudentBtn = document.getElementById("saveStudentBtn");

const studentName = document.getElementById("studentName");
const fatherName = document.getElementById("fatherName");
const motherName = document.getElementById("motherName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const course = document.getElementById("course");
const batch = document.getElementById("batch");
const admissionDate = document.getElementById("admissionDate");
const totalFees = document.getElementById("totalFees");
const status = document.getElementById("status");
const address = document.getElementById("address");
