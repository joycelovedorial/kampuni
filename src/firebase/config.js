import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc",
  authDomain: "kampuni-85a88.firebaseapp.com",
  projectId: "kampuni-85a88",
  storageBucket: "kampuni-85a88.appspot.com",
  messagingSenderId: "983837246823",
  appId: "1:983837246823:web:67afb33c5b6a5d80751bc2",
  measurementId: "G-JEKE4M40CN"
};

const app = initializeApp(firebaseConfig);

const projectAuth = getAuth(app);
const projectFirestore = Firestore(app);
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { projectFirestore, timestamp, projectAuth };