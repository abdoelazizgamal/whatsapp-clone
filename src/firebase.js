// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase'
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArCm-YBKbrDJ2Ib1XjlJAQYLzmZH2ne7s",
  authDomain: "whatsapp-clone-d41ac.firebaseapp.com",
  projectId: "whatsapp-clone-d41ac",
  storageBucket: "whatsapp-clone-d41ac.appspot.com",
  messagingSenderId: "443692628858",
  appId: "1:443692628858:web:ad5ded761d43995e1a34c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// const auth = firebase.auth()
// const Provider = new firebase.auth.GoogleAuthProvider()
const Auth = getAuth();
const Provider = new GoogleAuthProvider();
export { Auth, Provider };
export default db;