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

window.addEventListener("firebase-ready", () => {

    window.onSnapshot(

        window.collection(
            window.db,
            "website_notice"
        ),

        (snapshot) => {

            const list =
                document.getElementById("noticeList");

            if (!list) {
                return;
            }

            list.innerHTML = "";


            snapshot.forEach((doc) => {

                const data = doc.data();


                // ==========================
                // NEW BADGE - 48 HOURS
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


                    if (
                        hoursPassed >= 0 &&
                        hoursPassed < 48
                    ) {

                        newBadge = `
                            <span class="new-badge">
                                NEW
                            </span>
                        `;

                    }

                }


                // ==========================
                // NOTICE CARD
                // ==========================

                list.innerHTML += `

                    <div style="
                    background:#ffffff;
                    color:#222;
                    border-left:6px solid #007bff;
                    border-radius:15px;
                    padding:18px;
                    margin:15px 0;
                    box-shadow:0 5px 15px rgba(0,0,0,.15);
                    ">

                        <h3 style="
                        color:#007bff;
                        margin:0 0 10px 0;
                        font-size:20px;
                        ">

                            📢 ${data.title}

                            ${newBadge}

                        </h3>


                        <p style="
                        color:#333;
                        font-size:15px;
                        line-height:24px;
                        margin-bottom:15px;
                        ">

                            ${data.message}

                        </p>


                        <div style="
                        display:flex;
                        gap:10px;
                        flex-wrap:wrap;
                        ">

                            <button
                            onclick="deleteNotice('${doc.id}')"
                            style="
                            padding:10px 18px;
                            background:#dc3545;
                            color:white;
                            border:none;
                            border-radius:8px;
                            cursor:pointer;
                            ">

                                🗑 Delete

                            </button>

                        </div>

                    </div>

                `;

            });

        }

    );

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
