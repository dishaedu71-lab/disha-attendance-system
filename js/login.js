function login() {

    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value;

    let msg = document.getElementById("msg");
    let button = document.getElementById("loginButton");

    /* Empty fields */

    if (user === "" || pass === "") {

        showPopup(
            false,
            "LOGIN REQUIRED",
            "Please enter username and password.",
            "Please fill all fields."
        );

        return;
    }


    /* Correct Login */

    if (user === "admin" && pass === "@dishaedu") {

        /* Button loading effect */

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> VERIFYING...';

        button.disabled = true;


        setTimeout(function () {

            showPopup(
                true,
                "LOGIN SUCCESSFUL",
                "Welcome, Teacher!",
                "Redirecting to dashboard..."
            );


            /* Dashboard redirect */

            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 1800);


        }, 500);


    } else {

        showPopup(
            false,
            "ACCESS DENIED",
            "Invalid username or password.",
            "Please try again."
        );

        msg.innerHTML =
            "❌ Invalid Username or Password";
    }
}


/* =================================
   CUSTOM POPUP FUNCTION
================================= */

function showPopup(success, title, text, status) {

    const overlay =
        document.getElementById("popupOverlay");

    const icon =
        document.getElementById("popupIcon");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupText =
        document.getElementById("popupText");

    const popupStatus =
        document.getElementById("popupStatus");


    /* Reset */

    icon.classList.remove("error");


    if (success) {

        icon.innerHTML =
            '<i class="fa-solid fa-check"></i>';

    } else {

        icon.innerHTML =
            '<i class="fa-solid fa-xmark"></i>';

        icon.classList.add("error");
    }


    popupTitle.innerText = title;

    popupText.innerText = text;

    popupStatus.innerText = status;


    /* Show popup */

    overlay.classList.add("active");
}
