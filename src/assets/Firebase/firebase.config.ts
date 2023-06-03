// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdG7Pf9ReXxJ2rvXyZZaoIAkkxgji3gO8",
  authDomain: "vitetest-c585a.firebaseapp.com",
  projectId: "vitetest-c585a",
  storageBucket: "vitetest-c585a.appspot.com",
  messagingSenderId: "273748873728",
  appId: "1:273748873728:web:97511876fca3add3a5fee5",
  measurementId: "G-JSH705Y3VX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const fireDB = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
