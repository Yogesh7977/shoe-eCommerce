// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArpiqoi38_Ed8dx7vQtGF6Xj1T17gH5I8",
  authDomain: "login-auth-b6158.firebaseapp.com",
  projectId: "login-auth-b6158",
  storageBucket: "login-auth-b6158.firebasestorage.app",
  messagingSenderId: "636637813319",
  appId: "1:636637813319:web:5af95cb467225ea2346f62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db  = getFirestore(app);
export default app;