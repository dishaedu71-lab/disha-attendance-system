
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
                // CHECK NOTICE AGE
                // ==========================

                let newBadge = "";

                if (data.date) {

                    const noticeDate =
                        new Date(data.date);

                    const now =
                        new Date();

                    const hoursPassed =
                        (now - noticeDate)
                        / (1000 * 60 * 60);


                    // NEW = 48 HOURS
                    if (
                        hoursPassed >= 0 &&
                        hoursPassed < 48
                    ) {

                        newBadge = `
                        
                        <span class="notice-new-badge">
                            🔴 NEW
                        </span>

                        `;

                    }

                }


                // ==========================
                // BUTTON
                // ==========================

                let button = "";

                if (
                    data.buttonText &&
                    data.buttonLink
                ) {

                    button = `

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

                    <h3>

                        📢 ${data.title}

                        ${newBadge}

                    </h3>


                    <p>

                        ${data.message}

                    </p>


                    ${button}

                </div>

                `;

            });


            if (html !== "") {

                document.getElementById(
                    "noticePopup"
                ).style.display = "flex";


                document.getElementById(
                    "noticeTitle"
                ).innerHTML =
                    "📢 IMPORTANT NOTICE";


                document.getElementById(
                    "noticeMessage"
                ).innerHTML =
                    html;

            }

        }

    );


    // ==========================
    // CLOSE
    // ==========================

    const closeButton =
        document.getElementById("noticeClose");

    if (closeButton) {

        closeButton.onclick = () => {

            document.getElementById(
                "noticePopup"
            ).style.display = "none";

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
