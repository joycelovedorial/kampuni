<template>
  <div class="overflow-x-scroll overflow-y-scroll outer_container1 border-black rounded-xl bg-opacity-30 bg-white h-30 border-2 ">
  
    <div class="flex flex-nowrap content-center snap-proximity snap-x "  >
      <div class="col-xl-5 col-lg-6 col-md-6 col-12 px-4 pb-3 pt-3 snap-center"  v-for="out in outingArray" :key="out.id">
        <div v-if="outingArray.length === 0">
        no one has initiated an outing yet~ 🍃
        </div>
        <div v-else>
          <singlecarousel :outid="out.id"/>
        </div>
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
          // console.log('in fetch', comid.value);

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
            // console.log(outingArray.value);
          });
        } catch (error) {
          // console.error('Error fetching user data:', error);
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

  
<style scoped>


.testing {
  overflow: scroll;
}

.outer_container {
  width: auto;
  /* height: 460px; */

}

:root {
  --primary: #2ec4b6;
  --secondary: #999999;
}

.outer_container1::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  border-radius:16px;
  /* padding:30px; */
  
} 
.outer_container1::-webkit-scrollbar-thumb:hover {
  background-color:rgb(47, 47, 47);
   display:hidden;
}

.outer_container1::-webkit-scrollbar-track {
  background: transparent;
  margin-left:5px;
  display:hidden;
}

.outer_container1::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  width:1px !important;
  border-radius:10px;
  display:hidden;
} 

@media (min-height: 480px) {
  .outer_container1 {
    height: 345px;
  }
}

@media (min-height: 600px) {
  .outer_container1 {
    height: 345px;
  }
}


</style>

