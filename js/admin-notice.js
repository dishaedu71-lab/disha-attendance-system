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


    // ==========================
    // LOAD NOTICE LIST
    // ==========================

    window.onSnapshot(

        window.collection(
            window.db,
            "website_notice"
        ),

        (snapshot) => {

            const list =
            document.getElementById("noticeList");

            list.innerHTML = "";


            snapshot.forEach((doc) => {

                const data = doc.data();


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
                // NOTICE CARD
                // ==========================

                list.innerHTML += `

                <div style="
                background:#ffffff;
                color:#222;
                border-left:6px solid #007bff;
                border-radius:15px;
                padding:15px;
                margin:15px 0;
                box-shadow:0 5px 15px rgba(0,0,0,.15);
                ">

                    <h3 style="
                    color:#007bff;
                    margin-bottom:10px;
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
                    ">

                        <button
                        onclick="editNotice('${doc.id}')"
                        style="
                        flex:1;
                        padding:10px;
                        background:#0d6efd;
                        color:white;
                        border:none;
                        border-radius:8px;
                        cursor:pointer;
                        ">

                        ✏ Edit

                        </button>


                        <button
                        onclick="deleteNotice('${doc.id}')"
                        style="
                        flex:1;
                        padding:10px;
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
