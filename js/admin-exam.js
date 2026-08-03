// =======================================
// DISHA COMPUTER EDUCATION
// ADMIN EXAM SETTINGS
// PART-1
// =======================================

window.addEventListener("firebase-ready", async () => {

    const db = window.db;

    const courseSelect = document.getElementById("course");

    const examCode = document.getElementById("examCode");

    const totalQuestions = document.getElementById("totalQuestions");

    const examTime = document.getElementById("examTime");

    const randomQuestion = document.getElementById("randomQuestion");

    const examStatus = document.getElementById("examStatus");

    const saveBtn = document.getElementById("saveSettings");

    let docId = "";

    // ================= LOAD SETTINGS =================

    async function loadSettings() {

        const snap = await window.getDocs(

            window.collection(db, "exam_settings")

        );

        docId = "";

        snap.forEach(doc => {

            const data = doc.data();

            if (data.course === courseSelect.value) {

                docId = doc.id;

                examCode.value = data.examCode;

                totalQuestions.value = data.totalQuestions;

                examTime.value = data.examTime;

                randomQuestion.checked = data.random;

                examStatus.checked = data.active;

            }

        });

    }

    await loadSettings();

    courseSelect.onchange = loadSettings;
        // ================= SAVE SETTINGS =================

    saveBtn.onclick = async () => {

        if (docId == "") {

            alert("Course Settings Not Found");

            return;

        }

        try {

            await window.updateDoc(

                window.doc(db, "exam_settings", docId),

                {

                    course: courseSelect.value,

                    examCode: examCode.value,

                    totalQuestions: Number(totalQuestions.value),

                    examTime: Number(examTime.value),

                    random: randomQuestion.checked,

                    active: examStatus.checked

                }

            );

            alert("Exam Settings Saved Successfully");

            await loadSettings();

        } catch (err) {

            console.error(err);

            alert(err.message);

        }

    };
    });

                        
