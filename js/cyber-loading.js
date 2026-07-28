const steps = [
"Initializing Secure Connection...",
"Connecting to DCE Server...",
"Authenticating Student...",
"Loading Student Profile...",
"Syncing Attendance...",
"Loading Fee Records...",
"ACCESS GRANTED ✓"
];

const ids = [
"line1",
"line2",
"line3",
"line4",
"line5",
"line6",
"line7"
];

let i = 0;
let progress = 0;

const progressBar = document.getElementById("bar");
const percent = document.getElementById("percent");

const timer = setInterval(() => {

    if(i < steps.length){

        document.getElementById(ids[i]).innerHTML =
        "▶ " + steps[i];

        i++;
    }

    progress += 15;

    if(progress > 100){
        progress = 100;
    }

    progressBar.style.width = progress + "%";
    percent.innerHTML = progress + "%";

    if(progress >= 100){

        clearInterval(timer);

        setTimeout(()=>{

            window.location.href="student-dashboard.html";

        },1200);

    }

},700);
