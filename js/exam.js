// ===============================
// ONLINE EXAM HOME
// DISHA COMPUTER EDUCATION
// ===============================

const cards = document.querySelectorAll(".course-card");

cards.forEach(card => {

    card.addEventListener("click", function(e){

        e.preventDefault();

        const course = this.dataset.course;

        // Selected Course Save
        localStorage.setItem("selectedCourse", course);

        // Go to Exam Page
        window.location.href = "start-exam.html";

    });

});
