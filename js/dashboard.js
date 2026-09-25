document.addEventListener("DOMContentLoaded", () => {

    let today = new Date().toISOString().split("T")[0];

    const dateBox = document.getElementById("attendanceDate");

    if (dateBox) {
        dateBox.value = today;
    }

});


// ==================================================
// STUDENT DATA
// ==================================================

let students = [];

let studentMap = new Map();

let isRendering = false;


// ==================================================
// FIREBASE LIVE DATA
// ==================================================

window.addEventListener("firebase-ready", () => {

    const studentRef =
        window.collection(
            window.db,
            "students"
        );


    window.onSnapshot(
        studentRef,
        async (snapshot) => {

            snapshot.docChanges().forEach(
                (change) => {

                    const student = {

                        id: change.doc.id,

                        ...change.doc.data()

                    };


                    if (
                        change.type === "added"
                    ) {

                        studentMap.set(
                            student.id,
                            student
                        );

                    }


                    if (
                        change.type === "modified"
                    ) {

                        studentMap.set(
                            student.id,
                            student
                        );

                    }


                    if (
                        change.type === "removed"
                    ) {

                        studentMap.delete(
                            student.id
                        );

                    }

                }
            );


            students =
                [...studentMap.values()];


            /*
            ==========================================
            STUDENT SELF ATTENDANCE AUTO SYNC
            ==========================================
            */

            await syncStudentSelfAttendance();


            students =
                [...studentMap.values()];


            if (!isRendering) {

                renderTable();

            }

        }
    );

});


// ==================================================
// AUTO SYNC
// STUDENT SELF ATTENDANCE → TEACHER ATTENDANCE
// ==================================================

async function syncStudentSelfAttendance() {

    try {

        const dateElement =
            document.getElementById(
                "attendanceDate"
            );


        const today =
            dateElement?.value ||
            new Date()
                .toISOString()
                .split("T")[0];


        /*
        Student self-attendance records have
        studentId.

        Find today's Present records.
        */

        const selfAttendanceStudents =
            students.filter(
                student =>

                    student.studentId &&

                    student.attendance &&

                    student.attendance[today] ===
                    "Present"
            );


        if (
            selfAttendanceStudents.length === 0
        ) {

            return;

        }


        /*
        Process each student.
        */

        for (
            const selfStudent
            of selfAttendanceStudents
        ) {


            /*
            Find OLD teacher record.

            Old teacher records don't have
            studentId, so match Name + Course.
            */

            const teacherStudent =
                students.find(
                    student =>

                        !student.studentId &&

                        String(
                            student.name || ""
                        )
                        .trim()
                        .toLowerCase() ===
                        String(
                            selfStudent.name || ""
                        )
                        .trim()
                        .toLowerCase() &&

                        String(
                            student.course || ""
                        )
                        .trim()
                        .toLowerCase() ===
                        String(
                            selfStudent.course || ""
                        )
                        .trim()
                        .toLowerCase()
                );


            /*
            If teacher record doesn't exist,
            don't create a duplicate.
            */

            if (!teacherStudent) {

                console.log(
                    "Teacher attendance record not found:",
                    selfStudent.name,
                    selfStudent.course
                );

                continue;

            }


            /*
            Existing attendance
            */

            const attendance =
                teacherStudent.attendance ||
                {};


            /*
            Already Present?
            Nothing to do.
            */

            if (
                attendance[today] ===
                "Present"
            ) {

                continue;

            }


            /*
            Automatically mark Present.
            */

            attendance[today] =
                "Present";


            await window.updateDoc(

                window.doc(
                    window.db,
                    "students",
                    teacherStudent.id
                ),

                {
                    attendance:
                        attendance
                }

            );


            /*
            Instant local update.
            */

            teacherStudent.attendance =
                attendance;


            studentMap.set(
                teacherStudent.id,
                teacherStudent
            );


            console.log(
                "AUTO PRESENT:",
                selfStudent.studentId,
                "=>",
                teacherStudent.name
            );

        }


    } catch (error) {

        console.error(
            "Auto Attendance Sync Error:",
            error
        );

    }

}


// ==================================================
// TABLE ELEMENT
// ==================================================

const tbody =
    document.getElementById(
        "studentTableBody"
    );


const search =
    document.getElementById(
        "searchStudent"
    );


// ==================================================
// COUNTERS
// ==================================================

function updateCounter() {

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    const total =
        students.length;


    let present = 0;

    let absent = 0;


    students.forEach(
        student => {

            if (

                student.attendance &&

                student.attendance[date] ===
                "Present"

            ) {

                present++;

            }


            if (

                student.attendance &&

                student.attendance[date] ===
                "Absent"

            ) {

                absent++;

            }

        }
    );


    let percentage = 0;


    if (total > 0) {

        percentage =
            (
                (present / total) *
                100
            ).toFixed(1);

    }


    document.getElementById(
        "total"
    ).innerText =
        total;


    document.getElementById(
        "present"
    ).innerText =
        present;


    document.getElementById(
        "absent"
    ).innerText =
        absent;


    document.getElementById(
        "cardTotal"
    ).innerText =
        total;


    document.getElementById(
        "cardPresent"
    ).innerText =
        present;


    document.getElementById(
        "cardAbsent"
    ).innerText =
        absent;


    document.getElementById(
        "cardPercentage"
    ).innerText =
        percentage + "%";

}


// ==================================================
// RENDER TABLE
// ==================================================

function renderTable(
    list = students
) {

    if (!tbody) return;


    tbody.innerHTML = "";


    list.forEach(
        (s, index) => {

            const date =
                document.getElementById(
                    "attendanceDate"
                ).value;


            let status =
                "Not Marked";


            if (
                s.attendance &&
                s.attendance[date]
            ) {

                status =
                    s.attendance[date];

            }


            let whatsappButton = "";


            if (
                s.attendance &&
                s.attendance[date] ===
                "Absent"
            ) {

                whatsappButton = `

                <button
                    class="wa-btn"
                    onclick="sendWhatsApp(
                        '${String(
                            s.mobile || ""
                        ).replace(/'/g, "\\'")}',

                        '${String(
                            s.name || ""
                        ).replace(/'/g, "\\'")}',

                        '${String(
                            s.roll ||
                            s.studentId ||
                            ""
                        ).replace(/'/g, "\\'")}'
                    )"
                >

                    <i
                        class="fa-brands fa-whatsapp"
                    ></i>

                </button>

                `;

            }


            tbody.innerHTML += `

            <tr>

                <td>
                    ${
                        s.roll ||
                        s.studentId ||
                        "-"
                    }
                </td>


                <td>
                    ${
                        s.name ||
                        "-"
                    }
                </td>


                <td>

                    <button
                        onclick="setStatus(
                            ${index},
                            'Present'
                        )"
                        class="presentBtn"
                    >
                        Present
                    </button>


                    <button
                        onclick="setStatus(
                            ${index},
                            'Absent'
                        )"
                        class="absentBtn"
                    >
                        Absent
                    </button>


                    <br><br>


                    <b>
                        ${status}
                    </b>

                </td>


                <td>

                    <button
                        class="edit"
                        onclick="editStudent(
                            ${index}
                        )"
                    >
                        ✏ Edit
                    </button>


                    <button
                        class="delete"
                        onclick="deleteStudent(
                            ${index}
                        )"
                    >
                        🗑 Delete
                    </button>


                    <button
                        onclick="showHistory(
                            ${index}
                        )"
                    >
                        📜 History
                    </button>


                    ${whatsappButton}

                </td>

            </tr>

            `;

        }
    );


    updateCounter();

}


// ==================================================
// ADD STUDENT
// ==================================================

function addStudent() {

    const roll =
        prompt(
            "Enter Roll Number"
        );


    if (!roll) return;


    const name =
        prompt(
            "Enter Student Name"
        );


    if (!name) return;


    let photo =
        prompt(
            "Photo URL (Leave Blank for Default)"
        );


    if (photo === "") {

        photo =
            "https://i.pravatar.cc/50?u=" +
            roll;

    }


    students.push({

        roll:

            roll,

        name:

            name,

        photo:

            photo,

        attendance:

            {}

    });


    renderTable();

}


// ==================================================
// DELETE STUDENT
// ==================================================

async function deleteStudent(index) {

    if (
        confirm(
            "Delete Student?"
        )
    ) {

        await window.deleteDoc(

            window.doc(
                window.db,
                "students",
                students[index].id
            )

        );

    }

}


// ==================================================
// EDIT STUDENT
// ==================================================

async function editStudent(index) {

    const name =
        prompt(
            "Edit Name",
            students[index].name
        );


    if (name) {

        await window.updateDoc(

            window.doc(
                window.db,
                "students",
                students[index].id
            ),

            {

                name:
                    name

            }

        );

    }

}


// ==================================================
// MANUAL PRESENT / ABSENT
// ==================================================

async function setStatus(
    index,
    status
) {

    const buttons =
        document.querySelectorAll(
            ".presentBtn,.absentBtn"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    if (!date) {

        alert(
            "Please Select Date"
        );


        buttons.forEach(
            button => {

                button.disabled =
                    false;

            }
        );


        return;

    }


    if (
        !students[index].attendance
    ) {

        students[index].attendance =
            {};

    }


    students[index]
        .attendance[date] =
        status;


    renderTable();


    try {

        await window.updateDoc(

            window.doc(
                window.db,
                "students",
                students[index].id
            ),

            {

                attendance:
                    students[index]
                        .attendance

            }

        );


    } catch (error) {

        alert(
            "Update Failed: " +
            error.message
        );


        console.error(
            error
        );

    }


    buttons.forEach(
        button => {

            button.disabled =
                false;

        }
    );

}


// ==================================================
// OPEN MODAL
// ==================================================

function openModal() {

    document.getElementById(
        "studentModal"
    ).style.display =
        "flex";

}


// ==================================================
// CLOSE MODAL
// ==================================================

function closeModal() {

    document.getElementById(
        "studentModal"
    ).style.display =
        "none";

}


// ==================================================
// SAVE NEW STUDENT
// ==================================================

async function saveStudent() {

    const roll =
        document.getElementById(
            "roll"
        ).value.trim();


    const name =
        document.getElementById(
            "name"
        ).value.trim();


    const course =
        document.getElementById(
            "course"
        ).value.trim();


    const mobile =
        document.getElementById(
            "mobile"
        ).value.trim();


    if (
        !roll ||
        !name
    ) {

        alert(
            "Roll Number aur Name zaruri hai"
        );

        return;

    }


    await window.addDoc(

        window.collection(
            window.db,
            "students"
        ),

        {

            roll:
                roll,

            name:
                name,

            course:
                course,

            mobile:
                mobile,

            attendance:
                {}

        }

    );


    closeModal();


    document.getElementById(
        "roll"
    ).value = "";


    document.getElementById(
        "name"
    ).value = "";


    document.getElementById(
        "course"
    ).value = "";


    document.getElementById(
        "mobile"
    ).value = "";

}


// ==================================================
// SAVE / SYNC ATTENDANCE REPORT
// ==================================================

async function saveAttendance() {

    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    if (!date) {

        alert(
            "Please Select Date"
        );

        return;

    }


    try {

        const snapshot =
            await window.getDocs(

                window.collection(
                    window.db,
                    "students"
                )

            );


        let present = 0;

        let absent = 0;


        snapshot.forEach(
            docSnap => {

                const data =
                    docSnap.data();


                if (

                    data.attendance &&

                    data.attendance[date] ===
                    "Present"

                ) {

                    present++;

                }


                if (

                    data.attendance &&

                    data.attendance[date] ===
                    "Absent"

                ) {

                    absent++;

                }

            }
        );


        alert(

            "Attendance Synced Successfully!\n\n" +

            "Date: " +
            date +
            "\n" +

            "Present: " +
            present +
            "\n" +

            "Absent: " +
            absent

        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Attendance Sync Failed: " +
            error.message
        );

    }

}


// ==================================================
// DATE CHANGE
// ==================================================

const attendanceDate =
    document.getElementById(
        "attendanceDate"
    );


if (attendanceDate) {

    attendanceDate.addEventListener(
        "change",
        function () {

            renderTable();

        }
    );

}


// ==================================================
// STUDENT HISTORY
// ==================================================

function showHistory(index) {

    const student =
        students[index];


    let html = `

        <h3>
            ${
                student.name ||
                "-"
            }
        </h3>


        <table
            border="1"
            width="100%"
            cellspacing="0"
            cellpadding="8"
        >

            <tr>

                <th>
                    Date
                </th>

                <th>
                    Status
                </th>

            </tr>

    `;


    if (
        student.attendance
    ) {

        const dates =
            Object.keys(
                student.attendance
            );


        if (
            dates.length === 0
        ) {

            html += `

                <tr>

                    <td
                        colspan="2"
                    >
                        No Attendance Found
                    </td>

                </tr>

            `;

        } else {

            dates.sort();


            dates.forEach(
                date => {

                    const status =
                        student
                            .attendance
                            [date];


                    html += `

                        <tr>

                            <td>
                                ${date}
                            </td>

                            <td>
                                ${status}
                            </td>

                        </tr>

                    `;

                }
            );

        }

    }


    html +=
        "</table>";


    document.getElementById(
        "historyContent"
    ).innerHTML =
        html;


    document.getElementById(
        "historyModal"
    ).style.display =
        "flex";

}


// ==================================================
// CLOSE HISTORY
// ==================================================

function closeHistory() {

    document.getElementById(
        "historyModal"
    ).style.display =
        "none";

}


// ==================================================
// WHATSAPP
// ==================================================

function sendWhatsApp(
    phone,
    name,
    roll
) {

    phone =
        String(
            phone || ""
        )
        .replace(
            /\s+/g,
            ""
        )
        .replace(
            "+",
            ""
        );


    if (
        phone &&
        !phone.startsWith("91")
    ) {

        phone =
            "91" +
            phone;

    }


    if (!phone) {

        alert(
            "Student mobile number not available."
        );

        return;

    }


    const message =
`🏫 Disha Computer Education

Dear Parent,

Your Child ${name}

Roll No : ${roll}

was ABSENT today.

Please send your child regularly.

Thank You`;


    window.open(

        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}


// ==================================================
// GLOBAL FUNCTIONS
// ==================================================

window.sendWhatsApp =
    sendWhatsApp;

window.saveAttendance =
    saveAttendance;

window.setStatus =
    setStatus;

window.editStudent =
    editStudent;

window.deleteStudent =
    deleteStudent;

window.showHistory =
    showHistory;

window.closeHistory =
    closeHistory;

window.openModal =
    openModal;

window.closeModal =
    closeModal;

window.saveStudent =
    saveStudent;


// ==================================================
// WELCOME POPUP
// ==================================================

const popup =
    document.getElementById(
        "welcomePopup"
    );


const start =
    document.getElementById(
        "startBtn"
    );


if (
    start &&
    popup
) {

    start.onclick =
        () => {

            popup.style.opacity =
                "0";


            setTimeout(
                () => {

                    popup.style.display =
                        "none";

                },
                500
            );

        };


    setTimeout(
        () => {

            popup.style.opacity =
                "0";


            setTimeout(
                () => {

                    popup.style.display =
                        "none";

                },
                500
            );

        },
        4000
    );

}


// ==================================================
// INITIAL RENDER
// ==================================================

renderTable();
