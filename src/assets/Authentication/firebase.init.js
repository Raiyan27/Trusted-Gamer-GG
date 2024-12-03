// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTRIgsyfNs9SdFVQx0JPsrm475ooJIhmA",
  authDomain: "trusted-gamer-gg.firebaseapp.com",
  projectId: "trusted-gamer-gg",
  storageBucket: "trusted-gamer-gg.firebasestorage.app",
  messagingSenderId: "696659850349",
  appId: "1:696659850349:web:41d0d83685e2c7cce87b64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
};
