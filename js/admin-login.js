import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const email=document.getElementById("email");
const password=document.getElementById("password");
const loginBtn=document.getElementById("loginBtn");

loginBtn.addEventListener("click",async()=>{

try{

await signInWithEmailAndPassword(
auth,
email.value,
password.value
);

window.location.href="admin-dashboard.html";

}catch(error){

alert(error.message);

}

});
