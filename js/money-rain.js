const feesCard = document.getElementById("feesCard");

feesCard.addEventListener("click", function (e) {

    e.preventDefault();

    for (let i = 0; i < 60; i++) {

        const note = document.createElement("div");

        note.innerHTML = "💵";

        note.className = "money";

        note.style.left = Math.random() * 100 + "vw";

        note.style.animationDuration = (2 + Math.random() * 2) + "s";

        document.body.appendChild(note);

        setTimeout(() => {

            note.remove();

        }, 4000);

    }

    setTimeout(() => {

        window.location.href = "student-fees.html";

    }, 2500);

});
