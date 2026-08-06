window.addEventListener("firebase-ready", async () => {

const ref = window.doc(
window.db,
"portal_settings",
"backpaper"
);

const snap = await window.getDoc(ref);

if(!snap.exists()){

alert("Setting Not Found");

return;

}

if(!snap.data().active){

document.querySelector(".card").innerHTML = `

<h2 style="color:red;">
🚫 Back Paper Form Closed
</h2>

<p>

Back Paper Form is currently closed.

</p>

`;

return;

}

document.querySelector(".card").innerHTML = `

<h2 style="color:green;">

✅ Back Paper Form Open

</h2>

<p>

Back Paper Application Started.

</p>

<button id="openForm">

Fill Form

</button>

`;

};
});
