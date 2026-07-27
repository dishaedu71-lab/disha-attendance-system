// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Firestore
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc,
    onSnapshot,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Authentication
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyCi0gz9XPJvAUUaMaGYXEC2jTQuOmkRRGM",

    authDomain: "disha-attendance-system.firebaseapp.com",

    projectId: "disha-attendance-system",

    storageBucket: "disha-attendance-system.firebasestorage.app",

    messagingSenderId: "492796083174",

    appId: "1:492796083174:web:3bdfa2b30071c3fae07427"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// Global

window.db = db;

window.auth = auth;

window.doc = doc;

window.setDoc = setDoc;

window.getDoc = getDoc;

window.getDocs = getDocs;

window.collection = collection;

window.updateDoc = updateDoc;

window.deleteDoc = deleteDoc;

window.onSnapshot = onSnapshot;

window.runTransaction = runTransaction;

window.serverTimestamp = serverTimestamp;

console.log("Student Firebase Ready");
