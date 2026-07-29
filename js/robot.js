function speak(text){

    const msg = new SpeechSynthesisUtterance(text);

    msg.lang = "en-US";     // English Voice
    // अगर Hindi चाहिए तो:
    // msg.lang = "hi-IN";

    msg.rate = 1;
    msg.pitch = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(msg);

}
const robot = document.getElementById("robot");
const robotText = document.getElementById("robotText");
const speech = document.getElementById("speech");

const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

if(nameInput){

nameInput.addEventListener("input",()=>{

robot.style.transform="translateY(-15px) scale(1.08)";

robotText.innerHTML="👋 Hello "+nameInput.value;

speech.innerHTML="😊 Nice to meet you!";

});

}

if(mobileInput){

mobileInput.addEventListener("focus",()=>{

speech.innerHTML="📱 Enter your mobile number";

});

}

if(emailInput){

emailInput.addEventListener("focus",()=>{

speech.innerHTML="📧 Enter your email";

});

}

if(passInput){

passInput.addEventListener("focus",()=>{

robot.style.transform="rotate(-10deg)";

speech.innerHTML="🔒 Your password is secure";

});

passInput.addEventListener("blur",()=>{

robot.style.transform="";

});

}

window.robotDance=function(studentId){

robotText.innerHTML=`
🎉 Registration Successful<br>
Student ID : ${studentId}
`;

speech.innerHTML=`
🎊 Welcome to<br>
DISHA COMPUTER EDUCATION
`;
  speak(
`Congratulations!
Your registration is successful.
Your Student ID is ${studentId}.
Welcome to Disha Computer Education.`
);

let count=0;

const dance=setInterval(()=>{

if(count%2===0){

robot.style.transform="rotate(18deg) scale(1.15)";

}else{

robot.style.transform="rotate(-18deg) scale(1.15)";

}

count++;

if(count>12){

clearInterval(dance);

robot.style.transform="scale(1.2)";

const ok = confirm(
`🎉 Registration Successful!

Student ID: ${studentId}

⚠️ कृपया अपना Student ID नोट कर लें।

OK दबाने पर Login Page खुलेगा।`
);

if(ok){

    window.location.href = "student-login.html";

}

}

},180);

};
