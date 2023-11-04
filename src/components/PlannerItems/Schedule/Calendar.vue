<template>
  <div class="container">
    <div class="left">
      <div class="calendar">
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

        
      </div>

  
<!--
        <div class="days">
          <div class="day prev-date">30</div>
          <div class="day prev-date">31</div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>
          <div class="day today active">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="day">8</div>
          <div class="day">9</div>
          <div class="day">10</div>
          <div class="day">11</div>
          <div class="day">12</div>
          <div class="day">13</div>
          <div class="day">14</div>
          <div class="day">15</div>
          <div class="day">16</div>
          <div class="day">17</div>
          <div class="day">18</div>
          <div class="day">19</div>
          <div class="day">20</div>
          <div class="day">21</div>
          <div class="day">22</div>
          <div class="day">23</div>
          <div class="day">24</div>
          <div class="day">25</div>
          <div class="day">26</div>
          <div class="day">27</div>
          <div class="day">28</div>
          <div class="day">29</div>
          <div class="day">30</div>
          <div class="day next-date">1</div>
          <div class="day next-date">2</div>
          <div class="day next-date">3</div>
           </div>
-->


</div>
    <div class="right">
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
      <td>{{ outing.title }}</td>
      <td>{{ outing.date }}</td>
      <td>{{ outing.description }}</td>
      <td>{{ outing.location }}</td>
    </tr>
  </tbody>
  </table>
 
    

      <!-- Add more properties as needed -->
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
    const comid = ref("");
    const userid = ref("");
    const today = new Date();
    
    //for the calendar
    const date = ref(new Date());
    const currentMonth = computed(() => date.value.getMonth() + 1);
    const currentYear = computed(() => date.value.getFullYear());
    const today_calendar = new Date().getDate();

    const days = computed(() => {
      const daysInMonth = new Date(currentYear.value, currentMonth.value, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    });

    const nextMonth = () => {
      date.value.setMonth(date.value.getMonth() + 1);
    };

    const prevMonth = () => {
      date.value.setMonth(date.value.getMonth() - 1);
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
        console.log("tasks fetched", taskArray.value);
      });

      console.log(comid.value, "comid")

      const qouting = query(
        collection(db, "outings"),
        where("community", "==", comid.value)
      );
      const qoutingSnap = await getDocs(qouting)
      qoutingSnap.forEach( async(doc)=>{
        const uiq = query(collection(db,"outings",doc.id,"usersInvolved"),where("user",'==',userid.value),where("imIn","==",true))
        const uisnap = await getDocs(uiq)
        if(uisnap.size>0){
          const convertedData = {
          ...doc.data(),
          date: doc.data().date.toDate()}

          outingArray.value.push({...convertedData,id:doc.id})
        }
      })
      console.log(outingArray.value,"outingarray");
    })
   


      
    
  

    return { 
      taskArray,
      currentMonth,
      currentYear,
      days,
      today,
      nextMonth,
      prevMonth,
      userid,
      comid,
      outingArray,

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

.container {
  position: relative;
  width: auto;
  min-height: auto;
  margin: 0 auto;
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
</style>