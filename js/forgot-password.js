window.addEventListener("firebase-ready", () => {

    const studentIdInput = document.getElementById("studentId");
    const sendBtn = document.getElementById("sendResetBtn");
    const message = document.getElementById("message");


    sendBtn.onclick = async () => {

        const studentId =
            studentIdInput.value.trim().toUpperCase();


        // =========================
        // VALIDATION
        // =========================

        if (!studentId) {

            message.style.color = "red";

            message.innerText =
                "⚠️ Please enter your Student ID.";

            return;
        }


        sendBtn.disabled = true;

        sendBtn.innerText = "PLEASE WAIT...";


        try {

            // =========================
            // FIND STUDENT
            // =========================

            const q = window.query(
                window.collection(
                    window.db,
                    "studentAccounts"
                ),
                window.where(
                    "studentId",
                    "==",
                    studentId
                )
            );


            const snapshot =
                await window.getDocs(q);


            if (snapshot.empty) {

                message.style.color = "red";

                message.innerText =
                    "❌ Student ID not found.";

                sendBtn.disabled = false;

                sendBtn.innerText =
                    "📧 SEND RESET LINK";

                return;
            }


            // =========================
            // GET STUDENT DATA
            // =========================

            let studentData = null;

            snapshot.forEach((doc) => {

                studentData = doc.data();

            });


            const email = studentData.email;


            // =========================
            // EMAIL CHECK
            // =========================

            if (!email) {

                message.style.color = "red";

                message.innerText =
                    "❌ No registered email found for this Student ID.";

                sendBtn.disabled = false;

                sendBtn.innerText =
                    "📧 SEND RESET LINK";

                return;
            }


            // =========================
            // SEND FIREBASE RESET EMAIL
            // =========================

            await window.sendPasswordResetEmail(
                window.auth,
                email
            );


            // =========================
            // SUCCESS
            // =========================

            message.style.color = "#00b894";

            message.innerHTML = `
                ✅ Password reset link has been sent.<br><br>

                📧 Please check your registered email.<br>

                <small>
                Also check Spam/Junk folder.
                </small>
            `;


            sendBtn.innerText =
                "✅ EMAIL SENT";


        } catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );


            message.style.color = "red";

            message.innerText =
                "❌ " + error.message;


            sendBtn.disabled = false;

            sendBtn.innerText =
                "📧 SEND RESET LINK";

        }

    };

});
