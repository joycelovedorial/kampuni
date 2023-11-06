<template>
  <div class="flex flex-col space-y-2">
    <div class="header flex justify-center space-x-2">
      <button @click="previousMonth">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 bg-bpop border-2 rounded-full border-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <p class="bg-bnorm rounded-lg px-2 border-black border-2 align-middle inline-block font-fredoka font-bold">{{ months[month] }} {{ year }}</p>
      <button @click="nextMonth">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 bg-bpop border-2 rounded-full border-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
    <div class="border-2 bg-bpop border-black rounded-lg w-10/12 mx-auto">
      <div class="grid grid-cols-7">
        <div class="" v-for="(day, index) in daysOfWeek" :key="index">
          <p class="text-black font-bold font-fredoka text-center">
            {{ day }}
          </p>
        </div>
      </div>
      <div class="bg-bnorm grid grid-cols-7 rounded-b-lg" v-for="(week, weekIndex) in Math.ceil((daysInMonth + firstDayOfWeek) / 7)" :key="weekIndex">
        <div class="" v-for="dayIndex in 7" :key="dayIndex">
          <div v-if="dayIndex + (weekIndex * 7) >= firstDayOfWeek + 1 && dayIndex + (weekIndex * 7) <= daysInMonth + firstDayOfWeek">
            <p class="text-sm text-left pr-2 pt-2">
              {{ dayIndex + (weekIndex * 7) - firstDayOfWeek }}
            </p>
            <div v-if="filterTasksByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek)">
              <div v-for="(task,taskIndex) in filterTasksByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek)" :key="taskIndex" class="font-jakarta overflow-hidden overflow-ellipsis mx-2 px-2 rounded-lg flex space-x-1" >
                <span class="border-bpop rounded-sm h-6 border-2 block my-auto"></span>
                <span class="bg-bpop/20 rounded-sm block">
                  {{ task.title }} <!-- Display task title or relevant task property -->
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<!-- prev -->
  <div class="container">
    <div class="left">
      
      <div>
      <!-- Display the properties of the outing here -->
  <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Description</th>
      <th>Location</th>
    </tr>
    </thead>
    <tbody>
    <tr  v-for="outing in outingArray" :key="outing.id">
      <td>{{ outing.title }} <br> by: {{ outing.creatorname }}</td>
      <td>{{ outing.date }}</td>
      <td>{{ outing.description }}</td>
      <td>{{ outing.location }}</td>
    </tr>
  </tbody>
  </table>
 
    

      <!-- Add more properties as needed -->
    </div>
  </div>

  
    <div class="right">
      <div class="calendar">
    
    <!-- <div class="days grid grid-cols-7">
      <div class="day " v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      <div v-for="blank in firstDayOfWeek" class=" empty"></div>
      <div v-for="day in daysInMonth" :key="day" class=" day">{{ day }}</div>
    </div>
  </div> -->
      <!-- <div class="calendar">
        <div class="month">
          <button @click="prevMonth">Prev</button>
          <div class="date">{{ currentMonth }} {{ currentYear }}</div>
          <button @click="nextMonth">Next</button>
        </div>

        <div class="weekdays">
          <div v-for="(day,idx) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="idx">{{ day }}</div>
        </div>



        <div class="days">
          <div v-for="(day,idx) in days" :key="idx" :class="{ 'today': day === today }">{{ day }}</div>
        </div>

        
      </div> -->
      

  </div>
  </div>

  </div>



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
export default {
  setup() {
    const taskArray = ref([]);
    const outingArray = ref([]);
    const eventsArray=ref([])
    const comid = ref("");
    const userid = ref("");
    const toLoopOutings = ref([])
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

    // new code
    const filterTasksByDate = (year, month, day) => {
        return taskArray.value.filter((task) => {
          const taskDate = new Date(task.date); // Assuming task.date is a valid Date object
          return (
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === month &&
            taskDate.getDate() === day
          );
        });
      };

    const currentDate = new Date();

    const year = ref(currentDate.getFullYear());
    const month = ref(currentDate.getMonth());
    const firstDay = ref(new Date(year.value, month.value, 1));
    const lastDay = computed(() => new Date(year.value, month.value + 1, 0));
    const daysInMonth = computed(() => lastDay.value.getDate());
    const firstDayOfWeek = computed(() => new Date(year.value, month.value, 1).getDay());

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    const previousMonth = () => {
      if (month.value > 0) {
        month.value--;
      } else {
        year.value--;
        month.value = 11;
      }
    };

    const nextMonth = () => {
      if (month.value < 11) {
        month.value++;
      } else {
        year.value++;
        month.value = 0;
      }
    };

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

      // For tasks
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

      // For outings 
      const qouting = query(
        collection(db, "outings"),
        where("community", "==", comid.value)
      );
      const qoutingSnap = await getDocs(qouting)
      qoutingSnap.forEach( async(adoc)=>{
        const odata= adoc.data()
        console.log(adoc.data());
        let creatorname = null; 
        console.log(odata.creator,'ocrawete');
        if(odata.creator){
          const usnap = await getDoc(doc(db,"users",odata.creator))
          const udata=usnap.data()
          creatorname = udata.firstname
        }
        else{
          creatorname = "It's a Mystery"
        }
        const uiq = query(collection(db,"outings",adoc.id,"usersInvolved"),where("user",'==',userid.value),where("imIn","==",true))
        const uisnap = await getDocs(uiq)
        if(uisnap.size>0){
          const dateObj = adoc.data().date.toDate();
          const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          };
        const formattedDate = dateObj.toLocaleString(undefined, options);


        outingArray.value.push({
          ...adoc.data(),
          date: formattedDate,
          creatorname: creatorname,
          id: adoc.id,
        });
        }
      })
      console.log(outingArray.value,"outingarray");



      const eventQuery = query(collection(db,"events"),where("userid","==",userid.value))
      const esub = onSnapshot(eventQuery,(esnap)=>{
        esnap.forEach((edoc)=>{
          const eventData = edoc.data()
          const dateObj = eventData.date.toDate()
          const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Add time options
          const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions); // Format time


          eventsArray.value.push({...edoc.data(),id:edoc.id,date:formattedTime})
        })
      })

    })
   


      
    
  

    return { 
      taskArray,
      outingArray,
      comid,
      userid,
      currentDate,
      year,
      month,
      daysOfWeek,
      daysInMonth,
      firstDayOfWeek,
      previousMonth,
      nextMonth,
      months,
      filterTasksByDate,
      eventsArray
      // currentMonth,
      // currentYear,
      // days,
      // today,

    }; // Outings that users are in
  },
};
</script>

<style scoped>
:root {
  --primary-clr: #b38add;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
template {
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e1dc;
}

table{
  width: 80vh;
}

.container {
  position: relative;
  width: auto;
  min-height: auto;
  margin: 10px;
  padding: 5px;
  color: black;
  display: flex;
  border-radius: 30px;
  background-color: rgb(255, 255, 255);
}

.left {
  width: 60%;
  padding: 15px;
}

/* .calendar {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #86b8b1;
  border-radius: 5px;
  background-color: #fff;
} */

.calendar⸬before,
.calendar⸬after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  width: 12px;
  height: 97%;
  border-radius: 0 5px 5px 0;
  background-color: #d3d5d6d7;
  transform: translateY(-50%);
}

.calendar⸬before {
  height: 94%;
  left: calc(100% + 12px);
  background-color: rgb(153, 153, 153);
}

.calendar .month {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 px;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
}

.calendar .month .prev,
.calendar .month .next {
  cursor: pointer;
}

.calendar .month .prev:hover,
.calendar .month .next:hover {
  color: #86b8b1;
}

.calendar .weekdays {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 1rem;
  font-weight: 500;
  text-transform: capitalize;
}

.calendar .weekdays div {
  width: 14.28%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar .days {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.calendar .days .day {
  width: 14.28%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #86b8b1;
  border: 1px solid #86b8b1;
}

.calendar .day:not(.prev-date, .next-date):hover {
  color: black;
  background-color: #86b8b1;
}

.calendar .days .prev-date .calendar.days.prev-date {
  color: #86b8b1;
}

.calendar .days .active {
  position: relative;
  font-size: 1rem;
  color: red;
  background-color: #86b8b1;
}

.calendar .days .active⸬before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 2px var(#86b8b1);
}

.calendar .days .active⸬after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 75%;
  height: 6px;
  border-radius: 30px;
  transform: translateX(-50%);
  background-color: var(#86b8b1);
}

.calendar {
  text-align: center;
  margin: 0 auto;
  width: 300px;
  font-family: Arial, sans-serif;
}

/* .header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
} */

button {
  background: none;
  border: none;
  cursor: pointer;
}

/* .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
} */

.day {
  border: 1px solid #ddd;
  padding: 5px;
}

.empty {
  visibility: hidden;
}
</style>