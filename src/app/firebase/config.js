import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWJHJ6n6eXu1jfKkUoWvyvetXxFv-UOGI",
  authDomain: "sheet-seeker.firebaseapp.com",
  projectId: "sheet-seeker",
  storageBucket: "sheet-seeker.appspot.com",
  messagingSenderId: "693651809852",
  appId: "1:693651809852:web:df259662ade18f6ea00539",
  measurementId: "G-YNY3VDDSF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export { app, auth, db, googleProvider, signInWithPopup };
