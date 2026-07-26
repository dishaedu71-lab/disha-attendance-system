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

apiKey: "",

authDomain: "",

projectId: "",

storageBucket: "",

messagingSenderId: "",

appId: ""

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


// Export

export const auth = getAuth(app);

export const db = getFirestore(app);
