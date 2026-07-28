const messages = [
"Initializing Secure Connection...",
"Connecting to DCE Cloud Server...",
"Authenticating Student...",
"Verifying Secure Login...",
"Loading Student Profile...",
"Syncing Attendance Records...",
"Loading Fees Database...",
"Access Granted ✓"
];

const ids = [
"line1",
"line2",
"line3",
"line4",
"line5",
"line6",
"line7",
"line7"
];

const progressBar = document.getElementById("bar");
const percent = document.getElementById("percent");
const welcome = document.getElementById("welcome");
const server = document.getElementById("server");

let current = 0;
let progress = 0;

function typeText(element, text, callback){

    let i = 0;

    element.innerHTML = "";

    const typing = setInterval(()=>{

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

            if(callback) callback();

        }

    },35);

}

function nextStep(){

    if(current < messages.length){

        const line = document.getElementById(ids[current]);

        typeText(line,"▶ "+messages[current],()=>{

            current++;

            progress = Math.min(100,Math.round((current/messages.length)*100));

            progressBar.style.width = progress+"%";

            percent.innerHTML = progress+"%";

            setTimeout(nextStep,450);

        });

    }else{

        // Student Name
        let studentName =
        localStorage.getItem("studentName") ||
        sessionStorage.getItem("studentName") ||
        "Student";

        welcome.innerHTML =
        "👋 Welcome Back, <br><b>"+studentName+"</b>";

        server.innerHTML =
        "🛡 Secure Login Verified<br>☁ Connected to DCE Cloud Server ✓";

        setTimeout(()=>{

            window.location.href="student-dashboard.html";

        },2500);

    }

}

window.onload=()=>{

    nextStep();

};
