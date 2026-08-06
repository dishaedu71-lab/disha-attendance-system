// ======================================
// BACK PAPER ADMIN PANEL
// ======================================

window.addEventListener("firebase-ready", async () => {

    const db = window.db;

    const status = document.getElementById("backFormStatus");

    const saveBtn = document.getElementById("saveBackStatus");

    // Document Reference

    const ref = window.doc(db, "portal_settings", "backpaper");

    // Load Setting

    try {

        const snap = await window.getDoc(ref);

        if (snap.exists()) {

            status.checked = snap.data().active;

        }

    } catch (err) {

        console.log(err);

    }

    // Save Setting

    saveBtn.onclick = async () => {

        try {

            await window.updateDoc(ref, {

                active: status.checked

            });

            alert("Back Paper Setting Saved");

        } catch (err) {

            console.log(err);

            alert(err.message);

        }

    };

});
