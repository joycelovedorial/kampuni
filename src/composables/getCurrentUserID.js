import { getAuth, onAuthStateChanged } from "firebase/auth";
import useLogout from "useLogout"
import querySnapshot from "./getCollection";


const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;

  } else {
    signOut(auth).then(() => {
      
      }).catch((error) => {

      });
  }
});

