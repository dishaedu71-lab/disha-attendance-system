window.addEventListener("firebase-ready",()=>{

// ======================
// SAVE NOTICE
// ======================

document.getElementById("saveNotice").onclick = async()=>{

try{

await window.addDoc(

window.collection(window.db,"website_notice"),

{

title:document.getElementById("title").value,

message:document.getElementById("message").value,

buttonText:document.getElementById("buttonText").value,

buttonLink:document.getElementById("buttonLink").value,

active:document.getElementById("active").checked,

date:new Date().toLocaleString()

}

);

alert("✅ Notice Added Successfully");

}catch(err){

alert(err.message);

}

};

// ======================
// LOAD NOTICE LIST
// ======================

window.onSnapshot(

window.collection(window.db,"website_notice"),

(snapshot)=>{

const list=document.getElementById("noticeList");

list.innerHTML="";

snapshot.forEach((doc)=>{

const data=doc.data();

list.innerHTML+=`

<div style="
margin:15px 0;
padding:15px;
background:#f8f9fa;
border-radius:10px;
border-left:6px solid #007bff;">

<h3>${data.title}</h3>

<p>${data.message}</p>

<button
onclick="deleteNotice('${doc.id}')"
style="
background:red;
color:white;
border:none;
padding:10px 18px;
border-radius:8px;
cursor:pointer;">

🗑 Delete

</button>

</div>

`;

});

}

);

});

// ======================
// DELETE NOTICE
// ======================

window.deleteNotice = async(id)=>{

if(!confirm("Delete this Notice?")){

return;

}

await window.deleteDoc(

window.doc(window.db,"website_notice",id)

);

alert("🗑 Notice Deleted");

};
