<template>
  <div class="flex flex-col space-y-2 mx-auto w-full h-4/5">
    <div class="header flex justify-center space-x-2">
      <button @click="previousMonth">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 bg-bpop border-2 rounded-full border-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <p class="w-36 bg-bnorm rounded-lg px-2 border-black border-2 align-middle inline-block font-fredoka font-bold text-center">{{ months[month] }} {{ year }}</p>
      <button @click="nextMonth">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 bg-bpop border-2 rounded-full border-black">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
    <div class="border-2 bg-bpop border-black rounded-lg w-full mx-auto">
      <div class="grid grid-cols-7 w-100">
        <div class="" v-for="(day, index) in daysOfWeek" :key="index">
          <p class="text-black font-bold font-fredoka text-center">
            {{ day }}
          </p>
        </div>
      </div>
      <div class="bg-bnorm grid grid-cols-7 w-100 rounded-b-lg" style="min-height: unset" v-for="(week, weekIndex) in Math.ceil((daysInMonth + firstDayOfWeek) / 7)" :key="weekIndex">
        <div class="" v-for="dayIndex in 7" :key="dayIndex">
          <div class="h-15" v-if="dayIndex + (weekIndex * 7) >= firstDayOfWeek + 1 && dayIndex + (weekIndex * 7) <= daysInMonth + firstDayOfWeek">
            <p class="text-sm text-left pl-4 pt-2">
              {{ dayIndex + (weekIndex * 7) - firstDayOfWeek }}
            </p>

          <div id="calender-box" class="h-24 overflow-y-scroll">
            <div v-if="filterTasksByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek).length > 0" >
              <div v-for="(task, i) in filterTasksByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek)" :key="i" class="">
                <div class="h-20 flex m-1 space-x-1 cursor-pointer text-sm" @click="showTask=!showTask">
                  <span class="border-r rounded-sm border-2 block h-6"></span>
                  <span class="hover:bg-r/20 bg-r/80 rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden text-left" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ task.taskname }} <!-- Display task title or relevant task property -->
                  </span>
                </div>
                <div class="centered-component-task" v-if="showTask">
                  <calendartask :tobj="task" @close="showTask=!showTask"/>
                </div>
              </div>
            </div>
        

            <div v-if="filterOutingsByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek).length > 0" >
              <div v-for="(outing,i) in filterOutingsByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek)" :key="i" class="">
                <div @click="showOuting=!showOuting" class="h-6 flex m-1 space-x-1 cursor-pointer text-sm">
                  <span class="border-b rounded-sm h-6 border-2 block"></span>
                  <span class="hover:bg-b/20 bg-b/80 text-left rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden" style="max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ outing.title }} <!-- Display Outing title or relevant Outing property -->
                  </span>
                </div>
                <!-- <span class="border-bpop rounded-sm h-6 border-2 block my-auto"></span> -->
                <div class="centered-component-outing" v-if="showOuting">
                  <calendarouting :oobj="outing" @close="showOuting=!showOuting"/>
                </div>
              </div>
            </div>

           
            <div v-if="filterEventsByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek).length > 0" >
              <div v-for="(event,i) in filterEventsByDate(year, month, dayIndex + (weekIndex * 7) - firstDayOfWeek)" :key="i">
                <!-- <span class="border-bpop rounded-sm h-6 border-2 block my-auto"></span> -->
                <div @click="showEvent=!showEvent" class="h-6 flex m-1 space-x-1 cursor-pointer text-sm ">
                  <span class="border-g rounded-sm h-6 border-2 block"></span>
                  <span class="hover:bg-g/20 bg-g/80 text-left rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden" style="max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ event.title }} <!-- Display Event title or relevant Event property -->
                </span>
                </div>
                <div class="centered-component-event" v-if="showEvent">
                <calendarevent :eobj="event" @close="showEvent=!showEvent"/>
                </div>
              </div>
            </div>
          </div>
                  <!-- <div class="h-4 flex m-1 space-x-1 cursor-pointer text-xs">
              <span class="border-r rounded-sm h-4 border-2 block"></span>
              <span class="bg-r/80 rounded-sm block h-4 w-full px-1"> 
                tasks  Display task title or relevant task property 
               </span>
            </div> -->
           <!-- <div class="h-4 flex m-1 space-x-1 cursor-pointer text-xs" >
              <span class="border-b rounded-sm h-4 border-2 block"></span>
              <span class="bg-b/80 rounded-sm block h-4 w-full px-1">
                outings  Display Outing title or relevant task property 
              </span>
            </div> -->
            <!-- <div class="h-4 flex m-1 space-x-1 cursor-pointer text-xs">
              <span class="border-bpop rounded-sm h-4 border-2 block"></span>
              <span class="bg-bpop/80 rounded-sm block h-4 w-full px-1">
                schedule Display task title or relevant task property 
              </span>
            </div> -->

          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-around bg-bnorm rounded-lg border-2 border-black ">
      <div class="h-6 flex m-1 space-x-1 cursor-pointer text-sm" >
        <span class="border-b rounded-sm h-6 border-2 block"></span>
        <span class="bg-b/80 text-left rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden">
          outings <!-- Display task title or relevant task property -->
        </span>
      </div>
      <div class="h-6 flex m-1 space-x-1 cursor-pointer text-sm">
        <span class="border-r rounded-sm h-6 border-2 block"></span>
        <span class="bg-r/80 text-left rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden">
          tasks <!-- Display task title or relevant task property -->
        </span>
      </div>
      <div class="h-6 flex m-1 space-x-1 cursor-pointer text-sm">
        <span class="border-g rounded-sm h-6 border-2 block"></span>
        <span class="bg-g/80 text-left rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden">
          schedule <!-- Display task title or relevant task property -->
        </span>
      </div>
    </div>
  </div>


</template>

<script>

import { onMounted, onBeforeMount, ref, watch, computed, onBeforeUnmount } from "vue";
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
} 
from "firebase/firestore";
import { startOfDay,addDays } from "date-fns"; // Import the startOfDay function
import calendarevent from './calendarevent.vue';
import calendarouting from './calendarouting.vue';
import calendartask from './calendartask.vue';

export default {
  components:{
    calendarevent,calendartask,calendarouting
  },
  setup() {
    const taskArray = ref([]);
    const outingArray = ref([]);
    const eventsArray=ref([])
    const comid = ref("");
    const userid = ref("");
    const toLoopOutings = ref([])
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startOfToday = Timestamp.fromDate(now); // Use the startOfDay function
    const endOfWeek = addDays(startOfToday.toDate(), 7);
    const showTask = ref(false)
    const showEvent=ref(false)
    const showOuting=ref(false)
    const expandedTaskId = ref(null);
    const expandedOutingId = ref(null);
    const expandedEventId = ref(null);
    const clickedTask = ref(null);
const clickedOuting = ref(null);
const clickedEvent = ref(null); // Add this line

    // new code
    const filterTasksByDate = (year, month, day) => {
        return taskArray.value.filter((task) => {
          const taskDate = new Date(task.dateline.toDate()); // Assuming task.date is a valid Date object
          return (
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === month &&
            taskDate.getDate() === day
          );
        });
      };

    const filterEventsByDate = (year, month, day) => {
      return eventsArray.value.filter((event) => {

        const eventDate = new Date(event.date.toDate()); // Assuming event.date is a valid Date object
        return (
          eventDate.getFullYear() === year &&
          eventDate.getMonth() === month &&
          eventDate.getDate() === day
        );
      });
    };

    const filterOutingsByDate = (year, month, day) => {
      return outingArray.value.filter((outing) => {

        const outingDate = new Date(outing.date.toDate()); // Assuming outing.date is a valid Date object
        return (
          outingDate.getFullYear() === year &&
          outingDate.getMonth() === month &&
          outingDate.getDate() === day
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
   
      const user = auth.currentUser;
      userid.value = user.uid;
      const docRef = doc(db, "users", userid.value);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      comid.value = docData.community;

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

    

      // For outings 
      const qouting = query(
        collection(db, "outings"),
        where("community", "==", comid.value),
        where('date', '>=', startOfToday),
      );
      
      const qoutingSnap = await getDocs(qouting)
      qoutingSnap.forEach( async(adoc)=>{
        const odata= adoc.data()
    
        let creatorname = null; 
      
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
          fdate: formattedDate,
          creatorname: creatorname,
          id: adoc.id,
        });
        }
      })

      const eventQuery = query(collection(db,"events"),where("userid","==",userid.value))
      const esub = onSnapshot(eventQuery,(esnap)=>{
        esnap.forEach((edoc)=>{
          const eventData = edoc.data()
          const dateObj = eventData.date.toDate()
          const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Add time options
          const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions); // Format time


          eventsArray.value.push({...edoc.data(),id:edoc.id,fdate:formattedTime})
        })
      })

    })

    const closeTask = () => {
      showTask.value = false;
    };
        const closeEvent = () => {
      showEvent.value = false;
    };

    const closeOuting = () => {
      showOuting.value = false;
    };

    const showTaskDetail = (task) => {
  clickedTask.value = task;
    };

    const showOutingDetail = (outing) => {
      clickedOuting.value = outing;
    };

    const showEventDetail = (event) => {
      clickedEvent.value = event;
};
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
      filterEventsByDate,
      filterOutingsByDate,
      eventsArray,
      showTask,
      showEvent,
      showOuting,
      closeTask,
      closeOuting,
      closeEvent,
      expandedTaskId,
      expandedOutingId,
      expandedEventId,

      
    }; // Outings that users are in
  },
};
</script>

<style scoped>
#calender-box::-webkit-scrollbar {
  width: 8px;
  height: 10px;
  border-radius:16px;
  /* display:hidden; */
  /* padding:30px; */
  
} 
#calender-box::-webkit-scrollbar-thumb:hover {
  /* background-color:rgb(47, 47, 47); */
   display:hidden;
}

#calender-box::-webkit-scrollbar-track {
  background: transparent;
  margin-left:5px;
  display:hidden;
}

#calender-box::-webkit-scrollbar-thumb {
  /* background-color: var(--secondary); */
  /* background-color:black; */
  width:1px !important;
  border-radius:10px;
  /* display:hidden; */
} 


.month{
  background-color:#86B8B1;
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

.outings_list {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.calendar {
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
}

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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekdays div, .days div {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.today {
  color: purple;
}

.date{
  background-color: '#86B8B1';
}

tbody{
  text-align: center;
  border-radius: 15px;
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

</style>


