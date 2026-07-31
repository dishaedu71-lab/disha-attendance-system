//================ LOADER =================

let progress = 0;

const bar = document.getElementById("progressBar");

const percent = document.getElementById("percent");

const statusText = document.getElementById("status");

const msgs = [

"Initializing System...",

"Loading Students...",

"Connecting Firebase...",

"Loading Dashboard...",

"Preparing Interface...",

"Welcome..."

];


const loading = setInterval(() => {

progress++;

bar.style.width = progress + "%";

percent.innerHTML = progress + "%";

if(progress==15)
statusText.innerHTML=msgs[1];

if(progress==35)
statusText.innerHTML=msgs[2];

if(progress==60)
statusText.innerHTML=msgs[3];

if(progress==80)
statusText.innerHTML=msgs[4];

if(progress==100){

statusText.innerHTML = msgs[5];

clearInterval(loading);

const audio = new Audio("audio/welcome.mp3");

audio.volume = 1;

// Voice शुरू करो
audio.play().catch(() => {
    console.log("Autoplay blocked by browser.");
});

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

document.getElementById("loader").style.visibility="hidden";

},700);

}

},30);
//================ AI CHAT =================

const aiButton=document.getElementById("aiButton");
const chatBox=document.getElementById("chatBox");
const closeChat=document.getElementById("closeChat");

if (aiButton && chatBox && closeChat) {

    aiButton.addEventListener("click", () => {
        chatBox.style.display = "block";
    });

    closeChat.addEventListener("click", () => {
        chatBox.style.display = "none";
    });

}
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

function addMessage(message, sender) {

    const div = document.createElement("div");

    div.className = sender === "user" ? "user-message" : "bot-message";

    div.innerHTML = message;

    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;
}

function typingAnimation(callback){

    const typing=document.createElement("div");

    typing.className="bot-message";

    typing.id="typing";

    typing.innerHTML="🤖 Typing...";

    chatBody.appendChild(typing);

    chatBody.scrollTop=chatBody.scrollHeight;

    setTimeout(()=>{

        typing.remove();

        callback();

    },1000);

}

function getReply(msg){

    msg=msg.toLowerCase();

    if(msg.includes("o level")){

        return "📘 <b>O Level</b><br>Duration : 1 Year<br>Mode : Offline / Online<br>Admission Open ✅";

    }

    if(msg.includes("ccc")){

        return "💻 <b>CCC Course</b><br>Duration : 3 Months<br>Practical + Notes Available.";

    }

    if(msg.includes("adca")){

        return "🎓 <b>ADCA</b><br>Duration : 1 Year<br>Complete Computer Diploma.";

    }

    if(msg.includes("fee") || msg.includes("fees")){

        return "💰 Course Fees जानने के लिए कृपया Contact करें या Admission Desk पर आएँ।";

    }

    if(msg.includes("admission")){

        return "📝 Admission Open.<br>Documents Required:<br>• Aadhaar Card<br>• Photo<br>• Qualification";

    }

    if(msg.includes("contact")){

        return "📞 Contact : 9026355479";

    }

    if(msg.includes("address")){

        return "📍 Disha Computer Education<br>Ayodhya, Uttar Pradesh";

    }

    if(msg.includes("timing")){

        return "🕘 Institute Timing<br>09:00 AM - 06:00 PM";

    }

    return "🤖 Sorry! मुझे इसका उत्तर नहीं मिला। कृपया अलग प्रश्न पूछें या Contact करें।";

}

function sendMessage(){

    const msg=userInput.value.trim();

    if(msg==="") return;

    addMessage(msg,"user");

    userInput.value="";

    typingAnimation(()=>{

        addMessage(getReply(msg),"bot");

    });

}

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});
