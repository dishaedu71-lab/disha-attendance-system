// ==========================
// Generate Student ID
// ==========================

async function generateStudentId() {

    const counterRef = doc(db, "counters", "studentCounter");

    const studentId = await runTransaction(db, async (transaction) => {

        const counterDoc = await transaction.get(counterRef);

        let lastNumber = 0;

        if (counterDoc.exists()) {
            lastNumber = counterDoc.data().lastNumber;
        }

        lastNumber++;

        transaction.set(counterRef, {
            lastNumber: lastNumber
        });

        return "DCE25" + String(lastNumber).padStart(4, "0");

    });

    return studentId;

}
// =============================
// Student Management
// =============================

const studentModal = document.getElementById("studentModal");
const addStudentBtn = document.getElementById("addStudentBtn");
const closeModal = document.getElementById("closeModal");

// Open Modal
addStudentBtn.addEventListener("click", () => {
    studentModal.style.display = "flex";
});

// Close Modal
closeModal.addEventListener("click", () => {
    studentModal.style.display = "none";
});

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === studentModal) {
        studentModal.style.display = "none";
    }
});
const saveStudentBtn = document.getElementById("saveStudentBtn");

const studentName = document.getElementById("studentName");
const fatherName = document.getElementById("fatherName");
const motherName = document.getElementById("motherName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender");
const course = document.getElementById("course");
const batch = document.getElementById("batch");
const admissionDate = document.getElementById("admissionDate");
const totalFees = document.getElementById("totalFees");
const status = document.getElementById("status");
const address = document.getElementById("address");

// =============================
// Save Student
// =============================

saveStudentBtn.addEventListener("click", async () => {
  
    console.log("Save Button Clicked");

    try {

        if (studentName.value.trim() === "") {
            alert("Student Name Required");
            return;
        }

        if (mobile.value.trim() === "") {
            alert("Mobile Number Required");
            return;
        }

        const studentId = await generateStudentId();
        console.log("Generated Student ID:", studentId);

        await setDoc(doc(db, "studentsERP", studentId), {

            studentId: studentId,

            name: studentName.value.trim(),

            fatherName: fatherName.value.trim(),

            motherName: motherName.value.trim(),

            mobile: mobile.value.trim(),

            email: email.value.trim(),

            dob: dob.value,

            gender: gender.value,

            course: course.value.trim(),

            batch: batch.value.trim(),

            admissionDate: admissionDate.value,

            totalFees: Number(totalFees.value || 0),

            paidFees: 0,

            dueFees: Number(totalFees.value || 0),

            status: status.value,

            address: address.value.trim(),

            createdAt: serverTimestamp(),

            createdBy: "Admin"
          

        });

          console.log("Student Saved Successfully");

        alert("Student Added Successfully\n\nID : " + studentId);

        studentModal.style.display = "none";

       document.getElementById("studentForm").reset();
        
    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});
// =============================
// Load Students
// =============================

const studentTable = document.getElementById("studentTable");

function loadStudents() {

  onSnapshot(collection(db, "studentsERP"), (snapshot) => {

        studentTable.innerHTML = "";

        let total = 0;
        let active = 0;
        let completed = 0;
        let left = 0;

        snapshot.forEach((docSnap) => {

            const s = docSnap.data();

            total++;

            if (s.status === "Active") active++;
            if (s.status === "Completed") completed++;
            if (s.status === "Left") left++;

            studentTable.innerHTML += `
<tr>

<td>${s.studentId}</td>

<td>${s.name}</td>

<td>${s.course}</td>

<td>${s.batch}</td>

<td>${s.mobile}</td>

<td>${s.status}</td>

<td>

<button class="actionBtn viewBtn">View</button>

<button class="actionBtn editBtn">Edit</button>

<button class="actionBtn feeBtn">Fees</button>

<button class="actionBtn deleteBtn">Delete</button>

</td>

</tr>
`;

        });

        document.getElementById("totalStudents").innerText = total;
        document.getElementById("activeStudents").innerText = active;
        document.getElementById("completedStudents").innerText = completed;
        document.getElementById("leftStudents").innerText = left;

    });

}

loadStudents();
