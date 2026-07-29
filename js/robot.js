window.robotDance = function(studentId){

    const robot = document.getElementById("robot");
    const text = document.getElementById("robotText");

    text.innerHTML = `
    🎉 Registration Successful<br>
    Student ID : ${studentId}<br>
    Welcome to DISHA COMPUTER EDUCATION
    `;

    robot.style.transition = ".3s";

    let count = 0;

    const dance = setInterval(()=>{

        if(count%2==0){

            robot.style.transform="rotate(18deg) scale(1.15)";

        }else{

            robot.style.transform="rotate(-18deg) scale(1.15)";

        }

        count++;

        if(count>12){

            clearInterval(dance);

            robot.style.transform="scale(1.2)";

            setTimeout(()=>{

                window.location.href="student-login.html";

            },1500);

        }

    },180);

}
