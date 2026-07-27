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
