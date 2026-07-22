document.addEventListener("DOMContentLoaded", () => {

    let today = new Date().toISOString().split("T")[0];

    document.getElementById("attendanceDate").value = today;

});
let students = [];
const studentRef = window.collection(window.db, "students");

window.onSnapshot(studentRef, (snapshot) => {

    students = [];

    snapshot.forEach((docSnap) => {

        students.push({
            id: docSnap.id,
            ...docSnap.data()
        });

    });

    renderTable();

});
const tbody = document.getElementById("studentTableBody");
const search = document.getElementById("searchStudent");

function updateCounter(){

    let date = document.getElementById("attendanceDate").value;

    let total = students.length;
    let present = 0;
    let absent = 0;

    students.forEach(student=>{

        if(student.attendance && student.attendance[date]=="Present"){
            present++;
        }

        if(student.attendance && student.attendance[date]=="Absent"){
            absent++;
        }

    });

    let percentage = 0;

    if(total>0){
        percentage=((present/total)*100).toFixed(1);
    }

    // Summary Box
    document.getElementById("total").innerText=total;
    document.getElementById("present").innerText=present;
    document.getElementById("absent").innerText=absent;

    // Dashboard Cards
    document.getElementById("cardTotal").innerText=total;
    document.getElementById("cardPresent").innerText=present;
    document.getElementById("cardAbsent").innerText=absent;
    document.getElementById("cardPercentage").innerText=percentage+"%";

}

function renderTable(list = students){

    tbody.innerHTML="";

    list.forEach((s,index)=>{

        tbody.innerHTML += `
        <tr>

        <td><img src="${s.photo}" width="50"></td>

        <td>${s.roll}</td>

        <td>${s.name}</td>

        <td>
            <button onclick="setStatus(${index},'Present')" class="presentBtn">Present</button>

            <button onclick="setStatus(${index},'Absent')" class="absentBtn">Absent</button>

            <br><br>

            ${
(()=>{
let date=document.getElementById("attendanceDate").value;

let st="Not Marked";

if(s.attendance && s.attendance[date]){
st=s.attendance[date];
}

return "<b>"+st+"</b>";

})()
}

        </td>

        <td>

            <button class="edit" onclick="editStudent(${index})">Edit</button>

            <button class="delete" onclick="deleteStudent(${index})">Delete</button>
            <button onclick="showHistory(${index})">
📜 History
</button>

        </td>

        </tr>
        `;
    });

    updateCounter();
   

}

function addStudent(){

    let roll=prompt("Enter Roll Number");

    if(!roll) return;

    let name=prompt("Enter Student Name");

    if(!name) return;

    let photo=prompt("Photo URL (Leave Blank for Default)");

    if(photo==""){

        photo="https://i.pravatar.cc/50?u="+roll;

    }

    students.push({

        roll:roll,

        name:name,

        photo:photo,

        attendance:{}

    });

    renderTable();

}

async function deleteStudent(index){

    if(confirm("Delete Student?")){

        await window.deleteDoc(
            window.doc(window.db, "students", students[index].id)
        );

    }

}

async function editStudent(index){

    let name = prompt("Edit Name", students[index].name);

    if(name){

        await window.updateDoc(

            window.doc(window.db, "students", students[index].id),

            {
                name: name
            }

        );

    }

}

async function setStatus(index, status) {

    let date = document.getElementById("attendanceDate").value;

    if (date == "") {
        alert("Please Select Date");
        return;
    }

    let attendance = students[index].attendance || {};

    attendance[date] = status;

    await window.updateDoc(
        window.doc(window.db, "students", students[index].id),
        {
            attendance: attendance
        }
    );

}

renderTable();
function openModal(){

document.getElementById("studentModal").style.display="flex";

}

function closeModal(){

document.getElementById("studentModal").style.display="none";

}

async function saveStudent() {

    let roll = document.getElementById("roll").value;
    let name = document.getElementById("name").value;
    let course = document.getElementById("course").value;
    let mobile = document.getElementById("mobile").value;

    let file = document.getElementById("photo").files[0];

    let photo = "https://i.pravatar.cc/50?u=" + roll;

    if (file) {

        let reader = new FileReader();

        reader.onload = async function (e) {

            await window.addDoc(
                window.collection(window.db, "students"),
                {
                    roll,
                    name,
                    course,
                    mobile,
                    photo: e.target.result,
                    attendance: {}
                }
            );

            closeModal();

            document.getElementById("roll").value = "";
            document.getElementById("name").value = "";
            document.getElementById("course").value = "";
            document.getElementById("mobile").value = "";
            document.getElementById("photo").value = "";

        };

        reader.readAsDataURL(file);
        return;
    }

    await window.addDoc(
        window.collection(window.db, "students"),
        {
            roll,
            name,
            course,
            mobile,
            photo,
            attendance: {}
        }
    );

    closeModal();

    document.getElementById("roll").value = "";
    document.getElementById("name").value = "";
    document.getElementById("course").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("photo").value = "";

}

   // <-- यही सबसे जरूरी लाइन है

function saveAttendance(){

    alert("Attendance Saved Successfully");

}
document.getElementById("attendanceDate").addEventListener("change",function(){

    renderTable();

});
function showHistory(index){

    let student = students[index];

    let html = `
        <h3>${student.name}</h3>
        <table border="1" width="100%" cellspacing="0" cellpadding="8">
            <tr>
                <th>Date</th>
                <th>Status</th>
            </tr>
    `;

    if(student.attendance){

        let dates = Object.keys(student.attendance);

        if(dates.length==0){

            html += `
            <tr>
                <td colspan="2">
                    No Attendance Found
                </td>
            </tr>
            `;

        }else{

            dates.sort();

            dates.forEach(date=>{

                let status = student.attendance[date];

                html += `
                <tr>
                    <td>${date}</td>
                    <td>${status}</td>
                </tr>
                `;

            });

        }

    }

    html += "</table>";

    document.getElementById("historyContent").innerHTML = html;

    document.getElementById("historyModal").style.display = "flex";

}

function closeHistory(){

    document.getElementById("historyModal").style.display="none";

}
