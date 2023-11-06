<template>
      <!-- Display the properties of the outing here -->
  <div class="flex flex-col space-y-2 bg-bnorm p-3 rounded-lg border-black border-2 overflow-y-scroll overflow-x-hidden overflow-scroll h-2/5 scrollbar">
    <div class="bg-bnorm border-2 rounded-lg radius-2 border-black p-2" v-for="outing in outingArray" :key="outing.id">
      <div class="flex w-full space-x-2 mb-2">
        <div class="block my-auto mx-auto">
          <img v-if="outing.creatorname != 'it\'s a mystery'" :src="outing.imgstr" class="h-8 w-8 bg-white rounded-full border-2 border-black">
          <img v-else  class="h-8 w-8 bg-white rounded-full border-2 border-black">
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
      <div class="p-2 bg-bpop rounded-lg flex flex-col space-y-2">
        <div class="block">
          <div class="block">
            <span class="block w-10/12">
              <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 inline-block" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              {{ outing.date }}
            </span>
          </div>
          <div class="block">
            <span class="block w-10/12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 inline-block" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ outing.time }}
            </span>
          </div>
          <div class="block">
            <span class="block w-10/12">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 inline-block" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {{ outing.location }}
            </span>
          </div>
        </div>
        <!-- <div class="block">
          <div class="flex justify-evenly">
            <button class="w-5/12 border-2 border-black rounded-lg bg-bpop px-2 hover:bg-g" @click="clickYes">
              count me in!
            </button>
            <button class="w-5/12 border-2 border-black rounded-lg bg-bpop px-2 hover:bg-r" @click="clickNo">
              count me out!
            </button>
          </div>
        </div> -->
        <div>
          <p class="text-p font-bold text-xs">friends attending:</p>
          
          <p class="px-2 text-xs" v-for="(frens, i) in outing.involved" :key="i">
            <svg fill="fill" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2 h-2 inline-block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            {{ frens }}
          </p>
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
        const dateFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          };
        const formattedDate = dateObj.toLocaleString(undefined, dateFormatOptions);

          // Format the time
        const timeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
          };
        const formattedTime = dateObj.toLocaleString(undefined, timeFormatOptions);

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


        
        outingArray.value.push({
          ...adoc.data(),
          date: formattedDate,
          time: formattedTime, // Separate time
          creatorname: creatorname,
          id: adoc.id,
          involved: involved,
          imgstr: photoURL,
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
      endOfWeek,
    }; // Outings that users are in
  },
};
</script>

<style>

.scrollbar::-webkit-scrollbar {
  width: 8px;
  border-radius:16px;
  /* margin-left: 5px; */
  /* height:5px; */
}

.scrollbar::-webkit-scrollbar-track {
  background: transparent;
  width:10px;
  height:5px;
  /* margin-top:5px;
  margin-right:10px;
  margin-bottom:5px; */
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background-color:rgb(47, 47, 47)
}

.scrollbar::-webkit-scrollbar-thumb {
  background-color: #F2D694;
  border-radius: 10px;
  width:5px;
  height:5px;
}

</style>