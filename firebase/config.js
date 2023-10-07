import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: "AIzaSyAnBIzOvULFxnOURpUmGEinqxobzHiCOJw",
  authDomain: "udemyfirebase-sites.firebaseapp.com",
  projectId: "udemyfirebase-sites",
  storageBucket: "udemyfirebase-sites.appspot.com",
  messagingSenderId: "875738407457",
  appId: "1:875738407457:web:88799eeda66c927c54f960"// Analytics
});
// const firebaseConfig = {
//     apiKey: "AIzaSyAnBIzOvULFxnOURpUmGEinqxobzHiCOJw",
//     authDomain: "udemyfirebase-sites.firebaseapp.com",
//     projectId: "udemyfirebase-sites",
//     storageBucket: "udemyfirebase-sites.appspot.com",
//     messagingSenderId: "875738407457",
//     appId: "1:875738407457:web:88799eeda66c927c54f960"
//   };

//init firebase
// firebase.initialize(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export{ projectAuth, projectFirestore, timestamp }
