window.addEventListener("firebase-ready", async () => {

    const db = window.db;

    const snap = await window.getDocs(
        window.collection(db, "exam_settings")
    );

    let docId = "";
    let setting = null;

    snap.forEach(doc => {

        const data = doc.data();

        if (data.course === "O Level") {

            docId = doc.id;
            setting = data;

        }

    });

    if (setting) {

        document.getElementById("course").value = setting.course;
        document.getElementById("examCode").value = setting.examCode;
        document.getElementById("totalQuestions").value = setting.totalQuestions;
        document.getElementById("examTime").value = setting.examTime;
        document.getElementById("randomQuestion").checked = setting.random;
        document.getElementById("examStatus").checked = setting.active;

    }

    document.getElementById("saveSettings").onclick = async () => {

        await window.updateDoc(

            window.doc(db, "exam_settings", docId),

            {

                course: document.getElementById("course").value,

                examCode: document.getElementById("examCode").value,

                totalQuestions: Number(document.getElementById("totalQuestions").value),

                examTime: Number(document.getElementById("examTime").value),

                random: document.getElementById("randomQuestion").checked,

                active: document.getElementById("examStatus").checked

            }

        );

        alert("Exam Settings Updated Successfully");

    };

});
