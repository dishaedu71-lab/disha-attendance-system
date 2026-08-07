window.addEventListener("firebase-ready",()=>{

document.getElementById("saveNotice").onclick = async()=>{

try{

await window.addDoc(

window.collection(window.db,"website_notice"),

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
document.getElementById("active").checked,

date:
new Date().toLocaleString()

}

);

alert("✅ Notice Added Successfully");

}catch(err){

alert(err.message);

}

};

});
