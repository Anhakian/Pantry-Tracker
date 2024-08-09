// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChxPabTouf-JGdUGbpkXr5jvrA-Z9k3sQ",
  authDomain: "inventory-management-ce768.firebaseapp.com",
  projectId: "inventory-management-ce768",
  storageBucket: "inventory-management-ce768.appspot.com",
  messagingSenderId: "827410106054",
  appId: "1:827410106054:web:9735fdf9f5ed226d11f9c7",
  measurementId: "G-N1JX6LJ760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { firestore, auth };