const feesCard = document.getElementById("feesCard");

const notes = [
    "https://banknotenews.com/wp-content/uploads/2020/02/India_RBI_500_rupees_2019.00.00_B303d_P114_7BB_879894_R_f.jpg",
    "https://banknotenews.com/wp-content/uploads/2017/08/India_RBI_200_rupees_2017.00.00_B302a_P113_3AA_118209_f.jpg",
    "https://cdn.zeebiz.com/sites/default/files/2018/07/19/46032-rs100noterbi.PNG"
];
const cashSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3"
);

feesCard.addEventListener("click", function(e){

    e.preventDefault();

    cashSound.currentTime = 0;
    cashSound.play().catch(()=>{});

    for(let i=0;i<70;i++){

        createMoney();

    }

    setTimeout(()=>{

        window.location.href="student-fees.html";

    },3500);

});

function createMoney(){

    const note = document.createElement("img");

    note.src = notes[Math.floor(Math.random() * notes.length)];

    note.className = "money";

    note.style.left = Math.random() * window.innerWidth + "px";

    note.style.top = "-180px";

    note.style.width = (120 + Math.random() * 80) + "px";

    note.style.animationDuration = (3 + Math.random() * 2) + "s";

    note.style.animationDelay = (Math.random() * 0.8) + "s";

    note.style.animationTimingFunction = "linear";

    note.style.transform = `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(note);

    setTimeout(() => {

        note.remove();

    }, 6000);

}
