import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


export {
    db,auth,storage
}
