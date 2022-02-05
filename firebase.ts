// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA48DcSJuzZpDaB6PGpMS21BJqeZI-8ESk",
  authDomain: "chatty-f23dc.firebaseapp.com",
  projectId: "chatty-f23dc",
  storageBucket: "chatty-f23dc.appspot.com",
  messagingSenderId: "333282471317",
  appId: "1:333282471317:web:7500072896ac9b701e9a9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const signUp = createUserWithEmailAndPassword
const signIn = signInWithEmailAndPassword
const fs = getFirestore()

export { auth, signIn, signUp, fs}