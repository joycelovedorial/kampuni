<template>
  <div class="container">


    
  <div class="outings_list">
      <!-- Display the properties of the outing here -->
      <table class="outings_table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Date</th>
      <th>Description</th>
      <th>Location</th>
    </tr>
  </thead>

    <tbody>
    <tr v-for="outing in outingArray" :key="outing.id" clas="outing_tr">
      <td class="outings_td" >{{ outing.title }}</td>
      <td class="outings_td">{{ outing.date }}</td>
      <td class="outings_td">{{ outing.description }}</td>
      <td class="outings_td">{{ outing.location }}</td>
    </tr>
  </tbody>
  </table>


    </div>
      <div class="calendar">
        <div class="month">
          <button class="calendar_heading" @click="prevMonth">Prev</button>
          <div class="calendar_heading">{{ currentMonth }} {{ currentYear }}</div>
          <button class="calendar_heading" @click="nextMonth">Next</button>
        </div>

        <div class="weekdays">
          <div v-for="(day,idx) in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="idx">{{ day }}</div>
        </div>

        <div class="days">
          <div v-for="(day,idx) in days" :key="idx" :class="{ 'today': day === today }">{{ day }}</div>
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
} 
from "firebase/firestore";
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

.month{
  background-color:#86B8B1;
}
.container {
  background-color: white;
  border-radius: 15px;
  border: black 3px solid;
}

.outings_list {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.calendar {
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  
}



.month {
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

.outings_td{
  border: 1px solid #ccc;
  padding: 2px;
  text-align: center;
}

th{
  border-radius: 15px;
}

</style>


