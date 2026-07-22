document.addEventListener("DOMContentLoaded", () => {

    let today = new Date().toISOString().split("T")[0];

    document.getElementById("attendanceDate").value = today;

});
let students = JSON.parse(localStorage.getItem("students")) || [
    {roll:101,name:"Rahul Kumar",photo:"https://i.pravatar.cc/50?img=1",attendance:{}},
    {roll:102,name:"Aman Singh",photo:"https://i.pravatar.cc/50?img=2",attendance:{}},
    {roll:103,name:"Priya Verma",photo:"https://i.pravatar.cc/50?img=3",attendance:{}}
];

const tbody = document.getElementById("studentTableBody");
const search = document.getElementById("searchStudent");

function saveData(){
    localStorage.setItem("students", JSON.stringify(students));
}

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
    saveData();

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

function deleteStudent(index){

    if(confirm("Delete Student?")){

        students.splice(index,1);

        renderTable();

    }

}

function editStudent(index){

    let name=prompt("Edit Name",students[index].name);

    if(name){

        students[index].name=name;

    }

    renderTable();

}

function setStatus(index,status){

    let date=document.getElementById("attendanceDate").value;

    if(date==""){
        alert("Please Select Date");
        return;
    }

    if(!students[index].attendance){
        students[index].attendance={};
    }

    students[index].attendance[date]=status;

    saveData();

    renderTable();

}

renderTable();
function openModal(){

document.getElementById("studentModal").style.display="flex";

}

function closeModal(){

document.getElementById("studentModal").style.display="none";

}

function saveStudent(){

let roll=document.getElementById("roll").value;

let name=document.getElementById("name").value;

let course=document.getElementById("course").value;

let mobile=document.getElementById("mobile").value;

let file=document.getElementById("photo").files[0];

let photo="";

if(file){

    let reader=new FileReader();

    reader.onload=function(e){

        students.push({

            roll,

            name,

            course,

            mobile,

            photo:e.target.result,

            attendance:{}

        });

        saveData();

        renderTable();

        closeModal();
        // Form Clear
document.getElementById("roll").value="";
document.getElementById("name").value="";
document.getElementById("course").value="";
document.getElementById("mobile").value="";
document.getElementById("photo").value="";

    }

    reader.readAsDataURL(file);

    return;

}
students.push({

    roll,

    name,

    course,

    mobile,

    photo:"https://i.pravatar.cc/50?u="+roll,

    attendance:{}

});

saveData();

renderTable();

closeModal();
// Form Clear
document.getElementById("roll").value="";
document.getElementById("name").value="";
document.getElementById("course").value="";
document.getElementById("mobile").value="";
document.getElementById("photo").value="";

}   // <-- यही सबसे जरूरी लाइन है

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