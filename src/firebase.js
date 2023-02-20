// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from 'firebase'
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQHS8-qs6fooV9wHWvjki5q0Ttih07ttw",
  authDomain: "whatsapp-clone-b09d4.firebaseapp.com",
  projectId: "whatsapp-clone-b09d4",
  storageBucket: "whatsapp-clone-b09d4.appspot.com",
  messagingSenderId: "433825084038",
  appId: "1:433825084038:web:3da6288c762543a1bbd707"
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
