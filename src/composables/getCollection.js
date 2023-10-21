import { collection, getDocs } from "firebase/firestore"; 
import { db } from "@/firebase/config"

const querySnapshot = await getDocs(collection(db, nameOfCollection));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});



export default querySnapshot

