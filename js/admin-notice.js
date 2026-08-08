window.addEventListener("firebase-ready", () => {

    // ==========================
    // SAVE NOTICE
    // ==========================

    document.getElementById("saveNotice").onclick = async () => {

        try {

            await window.addDoc(

                window.collection(
                    window.db,
                    "website_notice"
                ),

                {

                    title:
                    document.getElementById("title").value.trim(),

                    message:
                    document.getElementById("message").value.trim(),

                    buttonText:
                    document.getElementById("buttonText").value.trim(),

                    buttonLink:
                    document.getElementById("buttonLink").value.trim(),

                    active:
                    document.getElementById("active").checked,

                    date:
                    new Date().toISOString()

                }

            );

            alert("✅ Notice Added Successfully");

        }

        catch (err) {

            console.error(err);

            alert(err.message);

        }

    };

    window.onSnapshot(

        window.collection(
            window.db,
            "website_notice"
        ),

        (snapshot) => {

            let html = "";

            snapshot.forEach((doc) => {

                const data = doc.data();

                // ==========================
                // ACTIVE NOTICE ONLY
                // ==========================

                if (!data.active) {
                    return;
                }


                // ==========================
                // NEW BADGE - 48 HOURS
                // ==========================

                const noticeDate =
                    new Date(data.date);

                const now =
                    new Date();

                const hoursPassed =
                    (now - noticeDate)
                    / (1000 * 60 * 60);

                let newBadge = "";


                if (
                    hoursPassed >= 0 &&
                    hoursPassed < 48
                ) {

                    newBadge = `

                    <span style="
                    display:inline-block;
                    margin-left:8px;
                    padding:4px 9px;
                    background:red;
                    color:white;
                    border-radius:6px;
                    font-size:12px;
                    font-weight:bold;
                    animation:newBlink 1s infinite;
                    ">

                    NEW

                    </span>

                    `;

                }


                // ==========================
                // NOTICE BUTTON
                // ==========================

                let noticeButton = "";

                if (
                    data.buttonText &&
                    data.buttonLink
                ) {

                    noticeButton = `

                    <a
                    href="${data.buttonLink}"
                    style="
                    display:inline-block;
                    margin-top:12px;
                    padding:11px 20px;
                    background:#007bff;
                    color:white;
                    text-decoration:none;
                    border-radius:9px;
                    font-weight:bold;
                    font-size:15px;
                    ">

                    ${data.buttonText}

                    </a>

                    `;

                }


                // ==========================
                // NOTICE CARD
                // ==========================

                html += `

                <div style="
                background:white;
                color:#222;
                padding:18px;
                margin-bottom:18px;
                border-radius:14px;
                border-left:5px solid #007bff;
                box-shadow:0 5px 15px rgba(0,0,0,.15);
                ">

                    <h3 style="
                    margin:0 0 10px 0;
                    color:#007bff;
                    font-size:20px;
                    ">

                    📢 ${data.title}

                    ${newBadge}

                    </h3>


                    <p style="
                    line-height:26px;
                    margin:0;
                    color:#333;
                    ">

                    ${data.message}

                    </p>


                    ${noticeButton}

                </div>

                `;

            });


            // ==========================
            // SHOW POPUP
            // ==========================

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
    // CLOSE POPUP
    // ==========================

    document.getElementById(
        "noticeClose"
    ).onclick = () => {

        document.getElementById(
            "noticePopup"
        ).style.display = "none";

    };

});
// ==========================
// DELETE NOTICE
// ==========================

window.deleteNotice = async (id) => {

    const confirmDelete =
    confirm("Are you sure you want to delete this Notice?");

    if (!confirmDelete) {
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

        alert("🗑 Notice Deleted Successfully");

    }

    catch (err) {

        console.error(err);

        alert("❌ " + err.message);

    }

};
