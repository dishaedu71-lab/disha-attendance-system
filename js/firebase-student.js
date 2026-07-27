// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Authentication
import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firestore
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    runTransaction,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCi0gz9XPJvAUUaMaGYXEC2jTQuOmkRRGM",
    authDomain: "disha-attendance-system.firebaseapp.com",
    projectId: "disha-attendance-system",
    storageBucket: "disha-attendance-system.firebasestorage.app",
    messagingSenderId: "492796083174",
    appId: "1:492796083174:web:3bdfa2b30071c3fae07427",
    measurementId: "G-YP9RLS7XJE"
};

// Initialize
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Export
window.db = db;
window.auth = auth;

window.collection = collection;
window.doc = doc;

window.getDoc = getDoc;
window.getDocs = getDocs;

window.setDoc = setDoc;
window.addDoc = addDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;

window.onSnapshot = onSnapshot;
window.runTransaction = runTransaction;
window.serverTimestamp = serverTimestamp;

console.log("✅ Student Firebase Ready");

export {
    db,
    auth,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    runTransaction,
    serverTimestamp
};
