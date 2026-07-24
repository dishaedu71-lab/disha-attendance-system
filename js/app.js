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

statusText.innerHTML=msgs[5];

clearInterval(loading);

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

aiButton.onclick=()=>{

chatBox.style.display="block";

}

closeChat.onclick=()=>{

chatBox.style.display="none";

}
