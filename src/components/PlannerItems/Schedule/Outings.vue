<template>
      <!-- Display the properties of the outing here -->

  <div class="bg-bnorm" v-for="outing in outingArray" :key="outing.id">
    <p class="text-b">
      {{ creatorname }}
    </p>
    <div class="">
    </div>
  </div>
  <div v-for="outing in outingArray" :key="outing.id">
    <div class="cardbg-orange-100 rounded-md border-2 hovering bg-white p-2 pt-3" :class="{'border-g bg-g' : involved, 'border-r bg-g' : !involved , 'border-orange' : null}" id="custom-container" > 
         <!--v-for{{outing}}-->
                <div class="container bg-white rounded-lg ">
                
                    <div class="row"> 
                        <div class="col-12 " id="detail-container">
                            <div class="w-auto self-center justify-content-center align-middle card-title border-2 d-flex justify-content-between truncate" 
                            :class="{'border-black bg-g' : involved, 'border-black bg-r' : !involved , 'border-orange' : null}" 
                            id="name_container" 
                            style="height:fit-content; width:fit-content;display: flex; flex-direction: column; align-items: flex-start;">
                                
                                    <h5 class="fw-bold pt-2 pb-1 px-3 truncate ">{{title}}</h5> <!--{{name}}--> 
                                    <p class=" pb-2 pt-1 px-3 text-ellipsis" >{{ desc }}</p> <!--{{message}}--> 
                                    <!-- <h5 class="mt-1 mr-3">{{creatorname}}</h5> -->
                            </div>
                    </div>
                        
                                
                    </div> 
                    <div class="row ">
                        <ul class="list-group list-group-flush p-0"  style="list-style-image:url('../../assets/icons/clock.svg')" > 
                            <li id="date" class="list-group-item bg-white" style="list-style-image:url('../../assets/icons/clock.svg')"> 

                            <svg class="inline w-5 h-5 text-orangep" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                            </svg> {{ date }}</li> <!--{{date}}--> 

                            <li id="time" class="list-group-item bg-white" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg> {{time}}</li> <!--{{time}}--> 
        
                            <li id="location" class="list-group-item bg-white" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/>
                            </svg>{{location}} </li> <!--{{location}}--> 

                            <li id="joined" class="list-group-item bg-white" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/>
                            </svg><span v-for="(name,i) in joined" :key="i">{{ name + " "}}</span> </li> <!--{{location}}--> 


                        </ul> 
                    </div>
                    <div class="row grid-col-2">
                        <div class="col-6">
                            <button class="w-100 bg-white option_box text-green-700" @mouseover="isHovered_green = true" @mouseout="isHovered_green = false" :class="{ 'hovered_green': isHovered_green , 'clicked_style_green' : involved}" @click="has_clicked_green" > 
                                <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                </svg>
                            I'm in</button>
                        </div> 
        
                        <!-- <div class="col-xl-0 col-lg-0 col-sm-0 col-md-0 pl-0 pr-0"></div> -->
        
                        <div class="col-6">
                            <button class="w-100 bg-white option_box text-red-700" @mouseover="isHovered_red = true" @mouseout="isHovered_red = false" :class="{ 'hovered_red': isHovered_red, 'clicked_style_red shadow-inner': !involved }" @click="has_clicked_red"  >
                            <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
                            I'm out</button>
                        </div> 
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
          creatorname = "It's a Mystery";
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