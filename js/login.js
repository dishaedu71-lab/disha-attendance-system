function login(){

    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if(user=="admin" && pass=="123456"){

        alert("Login Successful");

        window.location.href="dashboard.html";

    }else{

        document.getElementById("msg").innerHTML="❌ Invalid Username or Password";

    }

}
