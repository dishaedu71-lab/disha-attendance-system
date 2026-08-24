document.addEventListener("DOMContentLoaded", function () {

    const enquiryForm = document.getElementById("enquiryForm");

    if (!enquiryForm) return;

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("enquiryName").value.trim();
        const mobile = document.getElementById("enquiryMobile").value.trim();
        const course = document.getElementById("enquiryCourse").value;
        const city = document.getElementById("enquiryCity").value.trim();
        const message = document.getElementById("enquiryMessage").value.trim();

        // WhatsApp Number
        const whatsappNumber = "919451455479";

        // WhatsApp Message
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

        // Encode message
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Show status
        const status = document.getElementById("enquiryStatus");

        if (status) {
            status.innerHTML =
                "✅ Opening WhatsApp...";
            status.style.color = "#00ff9d";
        }

        // Small delay for professional feel
        setTimeout(function () {

            window.open(
                whatsappURL,
                "_blank"
            );

        }, 500);

    });

});
