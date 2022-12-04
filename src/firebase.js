// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsNHb1vEUR1jpxJMz9VdlbsL7R16bdSj0",
  authDomain: "react-firebases-4c63b.firebaseapp.com",
  projectId: "react-firebases-4c63b",
  storageBucket: "react-firebases-4c63b.appspot.com",
  messagingSenderId: "33965914810",
  appId: "1:33965914810:web:3bc3fb2669426f47006083"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export{db}