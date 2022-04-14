// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp3pvUwAble03XywPcMWNv1mGHkkY5Gt4",
  authDomain: "flashcards-22550.firebaseapp.com",
  projectId: "flashcards-22550",
  storageBucket: "flashcards-22550.appspot.com",
  messagingSenderId: "619643608848",
  appId: "1:619643608848:web:8751fc0ea1dbcef65b0f95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

