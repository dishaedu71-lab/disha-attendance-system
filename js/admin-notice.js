window.addEventListener("firebase-ready", async()=>{

const ref = window.doc(
window.db,
"website_notice",
"popup"
);

const snap = await window.getDoc(ref);

if(snap.exists()){

const data = snap.data();

document.getElementById("title").value =
data.title || "";

document.getElementById("message").value =
data.message || "";

document.getElementById("buttonText").value =
data.buttonText || "";

document.getElementById("buttonLink").value =
data.buttonLink || "";

document.getElementById("active").checked =
data.active || false;

}

document.getElementById("saveNotice").onclick =
async()=>{

await window.setDoc(

ref,

{

title:
document.getElementById("title").value,

message:
document.getElementById("message").value,

buttonText:
document.getElementById("buttonText").value,

buttonLink:
document.getElementById("buttonLink").value,

active:
document.getElementById("active").checked

}

);

alert("✅ Website Notice Saved");

};

});
