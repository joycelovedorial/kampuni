<template>
  <div class="overflow-x-scroll overflow-y-hidden outer_container1 border-black rounded-xl bg-opacity-30 bg-white flex flex-col align-middle border-2 ">
    <div class="flex flex-nowrap content-center " v-if="outingArray.length>0">
      <div class="col-xl-5 col-lg-6 col-md-6 col-12 px-4 pb-3 pt-3 snap-center"  v-for="out in outingArray" :key="out.id">
        <singlecarousel :outid="out.id"/>
      </div>
    </div>
    <div v-else class="block mx-auto my-auto p-2">
      <div class="border-2 rounded-lg border-black p-2 bg-bpop text-center shadow-md">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-black w-12 h-12 mx-auto">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M10.5 8.25h3l-3 4.5h3" />
        </svg>
        <div class="m-2 p-2 rounded-lg bg-bnorm shadow-inner">
          <p class="font-bold">no one has initiated an outing yet</p>
          <p class="text-xs">
            create one by clicking on the 
            <svg
              class="inline w-5 h-5 border-2 rounded-full border-black"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            button in planner!
          </p>
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

    console.log(outingArray.value.length)
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

