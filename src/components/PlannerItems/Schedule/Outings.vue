<template>
      <!-- Display the properties of the outing here -->
  <div class="flex flex-col space-y-2 bg-bnorm p-3 rounded-lg border-black border-2">
    <div class="bg-bnorm border-2 rounded-lg radius-2 border-black p-2" v-for="outing in outingArray" :key="outing.id">
      <div class="flex w-full">
        <div class="block my-auto mx-auto">
          <img v-if="outing.creatorname != 'it\'s a mystery'" :src="outing.imgstr" class="h-12 w-12 bg-white rounded-full border-2 border-black">
          <img v-else  class="h-12 w-12 bg-white rounded-full border-2 border-black">
        </div>
        <div class="w-10/12">
          <p class="font-bold text-b text-sm font-fredoka">
            {{ outing.creatorname }}
          </p>
          <div class="bg-b rounded-md drop-shadow-lg radius-2 radius-black px-2 w-full">
            <p>
              {{ outing.title }} 
            </p>
          </div>
        </div>
      </div>
      <div class="p-2">
        <div class="flex">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 block mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <div class="block">
            {{  outing.date }}
          </div>
        </div>
        <div>
          time
        </div>
        <div>
          location
        </div>
      </div>
    </div>
  </div>
  <table>
  <thead class="allhead">
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Description</th>
      <th>Location</th>
      <th>Going!</th>
    </tr>
    </thead>
    <tbody class="allbody">
    <tr  v-for="outing in outingArray" :key="outing.id">
      <td>{{ outing.title }} <br> by: 
        <img :src="outing.imgstr" >
        {{ outing.creatorname }}</td>
      <td>{{ outing.date }}</td>
      <td>{{ outing.description }}</td>
      <td>{{ outing.location }}</td>
      <td>
        <span v-for="(sname,i) in outing.involved" :key="i">{{sname}}</span>
      </td>
    </tr>
  </tbody>
  </table>
 
    

      <!-- Add more properties as needed -->
   
</template>

<script>
import { onMounted, onBeforeMount, ref, watch, computed } from "vue";
// import { capitalize } from './helpers'

import { db, auth } from "../../../firebase/config.js";
import {
  query,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  addDoc,
  where,
  onSnapshot,
  Timestamp,
  collectionGroup,
} from "firebase/firestore";
import { startOfDay,addDays } from "date-fns"; // Import the startOfDay function

export default {
  setup() {
    const taskArray = ref([]);
    const outingArray = ref([]);
    const comid = ref("");
    const userid = ref("");
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startOfToday = Timestamp.fromDate(now); // Use the startOfDay function
    const endOfWeek = addDays(startOfToday.toDate(), 7);
    const uphotoURL=ref('')
    // prev code
    // const today = new Date();
    
    // //for the calendar
    // const date = ref(new Date());
    // const currentMonth = computed(() => date.value.getMonth() + 1);
    // const currentYear = computed(() => date.value.getFullYear());
    // const today_calendar = new Date().getDate();

    // const days = computed(() => {
    //   const daysInMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();
    //   return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    // });

    const fetchData = async () => {
      console.log("fetching");
      const user = auth.currentUser;
      userid.value = user.uid;
      const docRef = doc(db, "users", userid.value);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      comid.value = docData.community;
      console.log(comid.value, "fetch");
      
    };

    onMounted(async () => {
      await fetchData(); // Fetch data

      // Watch for changes in userid

      const qtask = query(
        collection(db, "tasks"),
        where("userid", "==", userid.value)
      );
      const unsub = onSnapshot(qtask, (snap) => {
        const results = [];
        snap.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        taskArray.value = results;
        // console.log("tasks fetched", taskArray.value);
      });

      console.log(comid.value, "comid")

      const qouting = query(
        collection(db, "outings"),
        where("community", "==", comid.value),
        where('date', '>=', startOfToday),
        where('date', '<=', endOfWeek),
      );
      const qoutingSnap = await getDocs(qouting);

      qoutingSnap.forEach(async (adoc) => {
        const odata = adoc.data();
        let creatorname = null;
        let photoURL = null
        console.log(odata.photoURL,"in snap");
        if (odata.creator) {
          const usnap = await getDoc(doc(db, "users", odata.creator));
          const udata = usnap.data();
          creatorname = udata.firstname;
          photoURL= udata.photoURL
          console.log(photoURL,"post assignment");
        } else {
          creatorname = "it's a mystery";
        }

        const dateObj = adoc.data().date.toDate();
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        };
        const formattedDate = dateObj.toLocaleString(undefined, options);

        let involved = []
        
        const usersSnap = await getDocs(collection(db,"outings",adoc.id,"usersInvolved"))
        usersSnap.forEach(async(udoc)=>{
          const udata = udoc.data()
          if(udata.imIn){
            const dsnap = await getDoc(doc(db,"users",udata.user))
            const ddata= dsnap.data()
            involved.push(ddata.firstname)
          }
        })


        console.log(uphotoURL.value,"photo");
        outingArray.value.push({
          ...adoc.data(),
          date: formattedDate,
          creatorname: creatorname,
          id: adoc.id,
          involved:involved,
          imgstr:photoURL
        });
      });
        
        
      })
      console.log(outingArray.value,"outingarray");
    
   


      
    
  

    return { 
      taskArray,
      outingArray,
      comid,
      userid,
      // currentMonth,
      // currentYear,
      // days,
      // today,
      now,
      startOfToday,
      endOfWeek

    }; // Outings that users are in
  },
};
</script>

<style>

.allhead{
  background-color: pink;
}

.allbody{
  background-color: #fff;
}

</style>