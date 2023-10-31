<template>
  <div>My Google Calendar</div>
</template>

<script>
import { onMounted,onBeforeMount, ref,watch,computed } from 'vue'
// import { capitalize } from './helpers'

import {db,auth} from "../../../firebase/config.js"
import { query,collection,doc,getDoc,getDocs,updateDoc,setDoc,addDoc,where,onSnapshot,Timestamp,collectionGroup} from 'firebase/firestore'
export default {
  setup() {
    const taskArray = ref([]);
    const outingArray = ref([]);
    const comid = ref("");
    const userid = ref("");
    const today = new Date();

    const fetchData = async () => {
      console.log("fetching");
      const user = auth.currentUser;
      userid.value = user.uid;
      const docRef = doc(db, "users", userid.value);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      comid.value = docData.community;
      console.log(comid.value,"fetch");
    };

    onMounted(async () => {
      await fetchData(); // Fetch data

      // Watch for changes in userid
          
        const qtask = query(collection(db, "tasks"), where("userid", "==",userid.value));
        const unsub = onSnapshot(qtask, (snap) => {
          const results = [];
          snap.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          taskArray.value = results;
          console.log("tasks fetched", taskArray.value);
        });

        
        console.log(comid.value,"comid");
        const qouting = query(collection(db, "outings"), where("community", "==", comid.value));
        const unsubout = onSnapshot(qouting, (snap) => {
          console.log(snap);
          const resultOut = [];
          snap.forEach((doc) => {
            resultOut.push({...doc.data(),id:doc.id})
          });
          outingArray.value = resultOut;
          console.log("outings fetched", outingArray.value);
        });
        
      });

      const filteredOutingArray = computed(async () => {
        const filteredOutings = [];

        for (const outing of outingArray.value) {
          // Check if there is a subcollection "usersInvolved"
          const usersInvolvedCollection = collection(db, "outings", outing.id, "usersInvolved");

          // Query the subcollection to get the documents
          const userInvolvedDocs = await getDocs(usersInvolvedCollection);

          // Check if any user document in usersInvolved has imIn set to true
          if (userInvolvedDocs) {
            for (const userDoc of userInvolvedDocs.docs) {
              const userInvolvedData = userDoc.data();
              if (userInvolvedData.user === userid.value && userInvolvedData.imIn === true) {
                filteredOutings.push(outing); // The user is involved in the outing
                break; // Break the loop once a matching user is found
              }
            }
          }
        }
          console.log(filteredOutings);
          return filteredOutings;
        });

      return {filteredOutingArray,taskArray};// Outings that users are in
    }
  }

</script>

<style>

</style>