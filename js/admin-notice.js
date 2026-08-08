
window.addEventListener("firebase-ready", () => {

    // ==========================
    // SAVE NOTICE
    // ==========================

    document.getElementById("saveNotice").onclick = async () => {

        const title =
            document.getElementById("title").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const buttonText =
            document.getElementById("buttonText").value.trim();

        const buttonLink =
            document.getElementById("buttonLink").value.trim();

        const active =
            document.getElementById("active").checked;


        // ==========================
        // VALIDATION
        // ==========================

        if (!title) {
            alert("⚠️ Please Enter Notice Title");
            return;
        }

        if (!message) {
            alert("⚠️ Please Enter Notice Message");
            return;
        }


        try {

            await window.addDoc(

                window.collection(
                    window.db,
                    "website_notice"
                ),

                {
                    title: title,
                    message: message,
                    buttonText: buttonText,
                    buttonLink: buttonLink,
                    active: active,

                    // Exact creation time
                    date: new Date().toISOString()
                }

            );


            alert(
                "✅ Notice Added Successfully"
            );


            // Clear form

            document.getElementById("title").value = "";

            document.getElementById("message").value = "";

            document.getElementById("buttonText").value = "";

            document.getElementById("buttonLink").value = "";

            document.getElementById("active").checked = false;

        }

        catch (error) {

            console.error(error);

            alert(
                "❌ " + error.message
            );

        }

    };

});

// ==========================
// LOAD SAVED NOTICES
// ==========================
// ==========================
// NEW BADGE STYLE
// ==========================

const newBadgeStyle = document.createElement("style");

newBadgeStyle.innerHTML = `

.new-badge{

    display:inline-block;

    margin-left:8px;

    padding:5px 10px;

    background:red;

    color:white;

    border-radius:20px;

    font-size:12px;

    font-weight:bold;

    animation:newNoticeBlink 1s infinite;

}

@keyframes newNoticeBlink{

    0%,100%{
        opacity:1;
        transform:scale(1);
    }

    50%{
        opacity:.25;
        transform:scale(.9);
    }

}

`;

document.head.appendChild(newBadgeStyle);

window.addEventListener("firebase-ready", () => {

    window.onSnapshot(

        window.collection(
            window.db,
            "website_notice"
        ),

        (snapshot) => {

            let html = "";

            snapshot.forEach((doc) => {

                const data = doc.data();

                if (!data.active) {
                    return;
                }


                // ==========================
                // NEW BADGE
                // ==========================

                const newBadge = `
                    <span class="notice-new-badge">
                        🔴 NEW
                    </span>
                `;


                // ==========================
                // BUTTON
                // ==========================

                let buttonHTML = "";

                if (
                    data.buttonText &&
                    data.buttonLink
                ) {

                    buttonHTML = `
                        <a
                            href="${data.buttonLink}"
                            class="notice-action-btn">

                            ${data.buttonText}

                        </a>
                    `;

                }


                // ==========================
                // NOTICE
                // ==========================

                html += `

                    <div class="single-notice">

                        <h3 class="notice-heading">

                            📢 ${data.title}

                            ${newBadge}

                        </h3>


                        <div class="notice-text">

                            ${data.message}

                        </div>


                        ${buttonHTML}

                    </div>

                `;

            });


            // ==========================
            // SHOW POPUP
            // ==========================

            if (html !== "") {

                const popup =
                    document.getElementById("noticePopup");

                const title =
                    document.getElementById("noticeTitle");

                const message =
                    document.getElementById("noticeMessage");


                if (popup) {
                    popup.style.display = "flex";
                }

                if (title) {
                    title.innerHTML =
                        "📢 IMPORTANT NOTICE";
                }

                if (message) {
                    message.innerHTML = html;
                }

            }

        }

    );


    // ==========================
    // CLOSE POPUP
    // ==========================

    const closeButton =
        document.getElementById("noticeClose");


    if (closeButton) {

        closeButton.onclick = () => {

            const popup =
                document.getElementById("noticePopup");

            if (popup) {
                popup.style.display = "none";
            }

        };

    }

});

// ==========================
// DELETE NOTICE
// ==========================

window.deleteNotice = async (id) => {

    if (!confirm("🗑 Are you sure you want to delete this Notice?")) {
        return;
    }

    try {

        await window.deleteDoc(
            window.doc(
                window.db,
                "website_notice",
                id
            )
        );

        alert("✅ Notice Deleted Successfully");

    }

    catch (error) {

        console.error(error);

        alert("❌ " + error.message);

    }

};
