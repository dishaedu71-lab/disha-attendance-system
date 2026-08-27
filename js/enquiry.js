document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) return;

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("enquiryName").value.trim();
        const mobile = document.getElementById("enquiryMobile").value.trim();
        const course = document.getElementById("enquiryCourse").value;
        const city = document.getElementById("enquiryCity").value.trim();
        const message = document.getElementById("enquiryMessage").value.trim();

        const status = document.getElementById("enquiryStatus");
        const button = enquiryForm.querySelector(".enquiry-submit-btn");

        /* Basic validation */

        if (!name || !mobile || !course) {

            status.innerHTML =
                "⚠️ Please fill all required fields.";

            status.style.color = "#ffcc00";

            return;
        }

        /* Mobile validation */

        if (!/^[0-9]{10}$/.test(mobile)) {

            status.innerHTML =
                "⚠️ Please enter a valid 10-digit mobile number.";

            status.style.color = "#ff5c5c";

            return;
        }


        /* WhatsApp Number */

        const whatsappNumber = "919250332217";


        /* WhatsApp Message */

        const whatsappMessage =
`🎓 *Disha Computer Education - New Enquiry*

👤 *Name:* ${name}

📱 *Mobile:* ${mobile}

🎓 *Course:* ${course}

📍 *City / Area:* ${city || "Not Provided"}

💬 *Message:*
${message || "No message provided"}

━━━━━━━━━━━━━━━━
📩 Enquiry received from website
🌐 Disha Computer Education`;


        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        /* Button Animation */

        const originalButtonHTML = button.innerHTML;

        button.innerHTML =
            `<span>⏳ SENDING...</span>`;

        button.disabled = true;

        button.style.opacity = "0.8";


        /* Status */

        status.innerHTML =
            "🔄 Preparing your enquiry...";

        status.style.color = "#00eaff";


        /* Open WhatsApp */

        setTimeout(function () {

            window.open(
                whatsappURL,
                "_blank"
            );


            /* Success */

            status.innerHTML =
                "✅ Enquiry prepared successfully!";

            status.style.color =
                "#00ff9d";


            /* Clear Form */

            enquiryForm.reset();


            /* Restore Button */

            setTimeout(function () {

                button.innerHTML =
                    originalButtonHTML;

                button.disabled = false;

                button.style.opacity = "1";

            }, 800);


            /* Remove Success Message */

            setTimeout(function () {

                status.innerHTML = "";

            }, 5000);


        }, 700);

    });

});
