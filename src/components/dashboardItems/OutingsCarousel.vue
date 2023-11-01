<template>
  <div class="overflow-x-scroll overflow-y-hidden outer_container border-black rounded-xl bg-opacity-30 bg-white border-5">
  
    <div class="flex flex-nowrap content-center "  >
      <div class="col-xl-5 col-lg-6 col-md-6 col-12 px-3 pb-3 pt-3"  v-for="out in outingArray" :key="out.id">
        <singlecarousel :outid="out.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import singlecarousel from "./singlecarousel.vue";
import { ref, onMounted,onBeforeMount } from "vue";
import { auth, db } from "@/firebase/config";
import {doc,collection, query, where, getDocs,Timestamp,getDoc, onSnapshot } from "firebase/firestore";
import { startOfDay,addDays } from "date-fns"; // Import the startOfDay function

export default {
  components: { singlecarousel },
  props: {

  },
    
    setup() {
    const user = auth.currentUser;
    const outingArray = ref([])
    const uid = user.uid
    const comid = ref('');
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startOfToday = Timestamp.fromDate(now); // Use the startOfDay function
    const endOfWeek = addDays(startOfToday.toDate(), 7);

    onBeforeMount(async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, 'users', uid);

        try {
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          comid.value = userData.community;
          console.log('in fetch', comid.value);

          // Now that you have comid, you can perform the query here
          const q = query(
            collection(db, 'outings'),
            where('community', '==', comid.value),
            where('date', '>=', startOfToday),
            where('date', '<=', endOfWeek)
          );

          const unsub = onSnapshot(q, (snap) => {
            const results = [];
            snap.forEach((doc) => {
              results.push({ ...doc.data(), id: doc.id });
            });
            outingArray.value = results;
            console.log(outingArray.value);
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        router.push({ name: 'Welcome' });
      }
    });

    return { outingArray }
    // ...
  },
};
</script>

  
<style>


.testing {
  overflow: scroll;
}

.outer_container {
  width: auto;
  height: 345px;

}

:root {
  --primary: #2ec4b6;
  --secondary: #999999;
}

.outer_container::-webkit-scrollbar {
  width: 12px;
  border-radius:16px;
  /* padding:30px; */
  
} 
.outer_container::-webkit-scrollbar-thumb:hover {
  background-color:rgb(47, 47, 47)
}

.outer_container::-webkit-scrollbar-track {
  background: transparent;
  margin-left:5px;
}

.outer_container::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  width:1px !important;
  border-radius:10px;
} 

@media (min-height: 480px) {
  .outer_container {
    height: 345px;
  }
}

@media (min-height: 600px) {
  .outer_container {
    height: 345px;
  }
}


</style>

