// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Global
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.getDoc = getDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.doc = doc;
window.onSnapshot = onSnapshot;
window.serverTimestamp = serverTimestamp;
window.query = query;
window.where = where;

console.log("Firebase Connected Successfully");

window.dispatchEvent(new Event("firebase-ready"));
