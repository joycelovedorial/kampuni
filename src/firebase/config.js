// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc",
  authDomain: "kampuni-85a88.firebaseapp.com",
  projectId: "kampuni-85a88",
  storageBucket: "kampuni-85a88.appspot.com",
  messagingSenderId: "983837246823",
  appId: "1:983837246823:web:67afb33c5b6a5d80751bc2",
  measurementId: "G-JEKE4M40CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const auth = getAuth(app)


export { projectFirestore,timestamp,projectAuth,auth }
export default app
