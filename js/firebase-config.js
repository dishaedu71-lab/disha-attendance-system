// Firebase SDK Import

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyCi0gz9XPJvAUUaMaGYXEC2jTQuOmkRRGM",
  authDomain: "disha-attendance-system.firebaseapp.com",
  projectId: "disha-attendance-system",
  storageBucket: "disha-attendance-system.firebasestorage.app",
  messagingSenderId: "492796083174",
  appId: "1:492796083174:web:3bdfa2b30071c3fae07427"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Export

export const auth = getAuth(app);

export const db = getFirestore(app);
