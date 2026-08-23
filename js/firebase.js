// ===============================
// Firebase App
// ===============================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


// ===============================
// Firestore
// ===============================

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// ===============================
// Firebase Authentication
// ===============================

import {
    getAuth,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ===============================
// Firebase Config
// ===============================

const firebaseConfig = {

    apiKey: "AIzaSyCi0gz9XPJvAUUaMaGYXEC2jTQuOmkRRGM",

    authDomain:
        "disha-attendance-system.firebaseapp.com",

    projectId:
        "disha-attendance-system",

    storageBucket:
        "disha-attendance-system.firebasestorage.app",

    messagingSenderId:
        "492796083174",

    appId:
        "1:492796083174:web:3bdfa2b30071c3fae07427",

    measurementId:
        "G-YP9RLS7XJE"
};


// ===============================
// Initialize Firebase
// ===============================

const app =
    initializeApp(firebaseConfig);


// ===============================
// Firestore
// ===============================

const db =
    getFirestore(app);


// ===============================
// Authentication
// ===============================

const auth =
    getAuth(app);


// ===============================
// GLOBAL FIRESTORE
// ===============================

window.db = db;

window.collection = collection;

window.addDoc = addDoc;

window.getDocs = getDocs;

window.getDoc = getDoc;

window.setDoc = setDoc;

window.updateDoc = updateDoc;

window.deleteDoc = deleteDoc;

window.doc = doc;

window.onSnapshot = onSnapshot;

window.serverTimestamp = serverTimestamp;

window.query = query;

window.where = where;


// ===============================
// GLOBAL AUTH
// ===============================

window.auth = auth;

window.sendPasswordResetEmail =
    sendPasswordResetEmail;


// ===============================
// CONNECTED
// ===============================

console.log(
    "Firebase + Authentication Connected Successfully"
);


// IMPORTANT
window.dispatchEvent(
    new Event("firebase-ready")
);
