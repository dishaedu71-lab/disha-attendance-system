/* =========================================
   WEBSITE NOTICE ADMIN
========================================= */

window.addEventListener("firebase-ready", () => {

    const saveNotice =
        document.getElementById("saveNotice");

    const title =
        document.getElementById("title");

    const message =
        document.getElementById("message");

    const buttonText =
        document.getElementById("buttonText");

    const buttonLink =
        document.getElementById("buttonLink");

    const active =
        document.getElementById("active");

    const noticeList =
        document.getElementById("noticeList");


    /* =========================================
       SAVE NOTICE
    ========================================= */

    saveNotice.onclick = async () => {

        const titleValue =
            title.value.trim();

        const messageValue =
            message.value.trim();

        const buttonTextValue =
            buttonText.value.trim();

        const buttonLinkValue =
            buttonLink.value.trim();

        const activeValue =
            active.checked;


        if (!titleValue) {

            alert("⚠️ Please Enter Notice Title");

            return;

        }


        if (!messageValue) {

            alert("⚠️ Please Enter Notice Message");

            return;

        }


        try {

            saveNotice.disabled = true;

            saveNotice.innerText =
                "⏳ SAVING...";


            await window.addDoc(

                window.collection(
                    window.db,
                    "website_notice"
                ),

                {

                    title:
                        titleValue,

                    message:
                        messageValue,

                    buttonText:
                        buttonTextValue,

                    buttonLink:
                        buttonLinkValue,

                    active:
                        activeValue,

                    date:
                        new Date().toISOString()

                }

            );


            alert(
                "✅ Notice Added Successfully!"
            );


            /* CLEAR FORM */

            title.value = "";

            message.value = "";

            buttonText.value = "";

            buttonLink.value = "";

            active.checked = false;


            loadSavedNotices();

        }

        catch(error) {

            console.error(error);

            alert(
                "❌ Notice Save Error:\n"
                + error.message
            );

        }

        finally {

            saveNotice.disabled = false;

            saveNotice.innerText =
                "SAVE NOTICE";

        }

    };


    /* =========================================
       LOAD SAVED NOTICES
    ========================================= */

    async function loadSavedNotices() {

        try {

            const snapshot =
                await window.getDocs(

                    window.collection(
                        window.db,
                        "website_notice"
                    )

                );


            let html = "";


            if (snapshot.empty) {

                noticeList.innerHTML = `
                    <p style="
                        text-align:center;
                        padding:20px;
                        color:#777;
                    ">
                        📭 No Saved Notices
                    </p>
                `;

                return;

            }


            snapshot.forEach((docSnap) => {

                const data =
                    docSnap.data();


                const status =
                    data.active
                        ? "🟢 ACTIVE"
                        : "🔴 INACTIVE";


                html += `

                    <div
                        style="
                            background:#f5f5f5;
                            padding:18px;
                            margin:15px 0;
                            border-radius:12px;
                            border-left:5px solid #007bff;
                        "
                    >

                        <h3 style="
                            margin:0 0 8px;
                            color:#123;
                        ">

                            📢 ${data.title}

                        </h3>


                        <p style="
                            margin:8px 0;
                            line-height:1.6;
                        ">

                            ${data.message}

                        </p>


                        <p style="
                            font-size:13px;
                            font-weight:bold;
                        ">

                            ${status}

                        </p>


                        ${
                            data.buttonText
                            ?
                            `
                            <p style="
                                font-size:13px;
                                color:#555;
                            ">
                                🔗 Button:
                                ${data.buttonText}
                            </p>
                            `
                            :
                            ""
                        }


                        <button
                            onclick="
                                window.deleteNotice(
                                    '${docSnap.id}'
                                )
                            "
                            style="
                                background:#dc3545;
                                color:white;
                                border:none;
                                padding:9px 15px;
                                border-radius:7px;
                                cursor:pointer;
                                font-weight:bold;
                            "
                        >

                            🗑 DELETE

                        </button>

                    </div>

                `;

            });


            noticeList.innerHTML =
                html;

        }

        catch(error) {

            console.error(error);

            noticeList.innerHTML = `

                <p style="
                    color:red;
                    text-align:center;
                ">

                    ❌ Notices Load Error:
                    ${error.message}

                </p>

            `;

        }

    }


    /* =========================================
       DELETE SINGLE NOTICE
    ========================================= */

    window.deleteNotice = async (id) => {

        const confirmDelete =
            confirm(
                "🗑 क्या आप इस Notice को Delete करना चाहते हैं?"
            );


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


            alert(
                "✅ Notice Deleted Successfully!"
            );


            loadSavedNotices();

        }

        catch(error) {

            console.error(error);

            alert(
                "❌ Delete Error:\n"
                + error.message
            );

        }

    };


    /* =========================================
       DELETE ALL NOTICES BUTTON
    ========================================= */

    const deleteAllButton =
        document.getElementById(
            "deleteNotice"
        );


    if (deleteAllButton) {

        deleteAllButton.onclick =
            async () => {

                const confirmDelete =
                    confirm(
                        "⚠️ सभी Saved Notices Delete करना चाहते हैं?"
                    );


                if (!confirmDelete) {

                    return;

                }


                try {

                    const snapshot =
                        await window.getDocs(

                            window.collection(
                                window.db,
                                "website_notice"
                            )

                        );


                    for (
                        const docSnap
                        of snapshot.docs
                    ) {

                        await window.deleteDoc(

                            window.doc(
                                window.db,
                                "website_notice",
                                docSnap.id
                            )

                        );

                    }


                    alert(
                        "✅ All Notices Deleted Successfully!"
                    );


                    loadSavedNotices();

                }

                catch(error) {

                    console.error(error);

                    alert(
                        "❌ Delete Error:\n"
                        + error.message
                    );

                }

            };

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadSavedNotices();

});
