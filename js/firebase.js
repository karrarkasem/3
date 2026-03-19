import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, doc, getDocs, getDoc,
  addDoc, updateDoc, setDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ--xkTkicWh3ds6T86meCodAPmTXN2tQ",
  authDomain: "babil-32ec8.firebaseapp.com",
  projectId: "babil-32ec8",
  storageBucket: "babil-32ec8.firebasestorage.app",
  messagingSenderId: "624825212706",
  appId: "1:624825212706:web:a8402ed4304bfda541cf7b"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

window._db   = db;
window._auth = auth;

window._fb = {
  collection, doc, getDocs, getDoc,
  addDoc, updateDoc, setDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, Timestamp
};

window._fbAuth = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
};

window._fbReady = true;
document.dispatchEvent(new Event('fbReady'));
