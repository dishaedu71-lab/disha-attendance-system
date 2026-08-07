import {
getFirestore,
collection,
query,
where,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { auth } from "./firebase-config.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async(user) => {

    if (!user) {

        window.location.href = "student-login.html";

        return;

    }

    const studentId =
    localStorage.getItem("studentId");

    const q = query(

        collection(db,"back_forms"),

        where("studentId","==",studentId)

    );

    const snap = await getDocs(q);

    snap.forEach((doc)=>{

const data = doc.data();

const popup =
document.getElementById("backStatusPopup");

const icon =
document.getElementById("backIcon");

const title =
document.getElementById("backTitle");

const message =
document.getElementById("backMessage");

const btn =
document.getElementById("backOkBtn");

if(data.status=="Pending"){

icon.innerHTML="⏳";

title.innerHTML="BACK PAPER UNDER REVIEW";

message.innerHTML=`
Your Back Paper Application
is under review.

<br><br>

Status :
<b style="color:orange;">
Pending
</b>
`;

popup.style.display="flex";

}

else if(data.status=="Rejected"){

icon.innerHTML="❌";

title.innerHTML="APPLICATION REJECTED";

message.innerHTML=`
Your Back Paper Application
has been rejected.

<br><br>

Please Contact

<b>DISHA COMPUTER EDUCATION</b>
`;

popup.style.display="flex";

}

else if(data.status=="Approved"){

icon.innerHTML="🎉";

title.innerHTML="CONGRATULATIONS";

message.innerHTML=`
Your Back Paper Application
has been Approved.

<br><br>

Press OK to Continue.
`;

popup.style.display="flex";

}

btn.onclick=()=>{

popup.style.display="none";

};

});

});
logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    await signOut(auth);

    window.location.href = "student-login.html";

});
