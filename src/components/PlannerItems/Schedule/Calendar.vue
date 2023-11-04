<template>
  <div class="container">
    <div class="left">
      <div class="calendar">
        <div class="month">
          <i class="fas fa-angle-left prev"></i>
          <div class="date">November 2023</div>
          <i class="fas fa-angle-right next"></i>
        </div>
        <div class="weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        <div class="days">
    
        </div>

  

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


      </div>

    </div>

  </div>

</template>

<script>
import { onMounted,onBeforeMount, ref,watch,computed } from 'vue'
// import { capitalize } from './helpers'

import {db,auth} from "../../../firebase/config.js"
import { query,collection,doc,getDoc,getDocs,updateDoc,setDoc,addDoc,where,onSnapshot,Timestamp,collectionGroup} from 'firebase/firestore'
export default {
  setup() {
    const taskArray = ref([]);
    const outingArray = ref([]);
    const comid = ref("");
    const userid = ref("");
    const today = new Date();

    const fetchData = async () => {
      console.log("fetching");
      const user = auth.currentUser;
      userid.value = user.uid;
      const docRef = doc(db, "users", userid.value);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      comid.value = docData.community;
      console.log(comid.value,"fetch");
    };

    onMounted(async () => {
      await fetchData(); // Fetch data

      // Watch for changes in userid
          
        const qtask = query(collection(db, "tasks"), where("userid", "==",userid.value));
        const unsub = onSnapshot(qtask, (snap) => {
          const results = [];
          snap.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          taskArray.value = results;
          console.log("tasks fetched", taskArray.value);
        });

        
        console.log(comid.value,"comid");
        const qouting = query(collection(db, "outings"), where("community", "==", comid.value));
        const unsubout = onSnapshot(qouting, (snap) => {
          console.log(snap);
          const resultOut = [];
          snap.forEach((doc) => {
            resultOut.push({...doc.data(),id:doc.id})
          });
          outingArray.value = resultOut;
          console.log("outings fetched", outingArray.value);
        });
        
      });

      const filteredOutingArray = computed(async () => {
        const filteredOutings = [];

        for (const outing of outingArray.value) {
          // Check if there is a subcollection "usersInvolved"
          const usersInvolvedCollection = collection(db, "outings", outing.id, "usersInvolved");

          // Query the subcollection to get the documents
          const userInvolvedDocs = await getDocs(usersInvolvedCollection);

          // Check if any user document in usersInvolved has imIn set to true
          if (userInvolvedDocs) {
            for (const userDoc of userInvolvedDocs.docs) {
              const userInvolvedData = userDoc.data();
              if (userInvolvedData.user === userid.value && userInvolvedData.imIn === true) {
                filteredOutings.push(outing); // The user is involved in the outing
                break; // Break the loop once a matching user is found
              }
            }
          }
        }
          console.log("filtered outings",filteredOutings);
          return filteredOutings;
        });

      return {filteredOutingArray,taskArray};// Outings that users are in
    }
  }

</script>

<style scoped>

:root{
  --primary-clr: #b38add;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
template{
  min-height: 20vh;
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e1dc; 
}

.container{
  position: relative;
  width: auto;
  min-height: auto;
  margin: 0 auto;
  padding: 5px;
  color: #fff;
  display: flex;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);

}

.left{
  width: 60%;
  padding: 15px;
}

.calendar{
  position: relative;
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #86B8B1;
  border-radius: 5px;
  background-color: #fff;
}

.calendar⸬before,
.calendar⸬after{
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

.calendar⸬before{
  height: 94%;
  left: calc(100% + 12px);
  background-color: rgb(153,153,153)
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
  color: #86B8B1;
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

.calendar .days{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.calendar .days .day{
  width: 14.28%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color:#86B8B1;
  border: 1px solid #86B8B1;
}

.calendar .day:not(.prev-date, .next-date):hover {
  color: white;
  background-color: #86B8B1;
}


.calendar .days .prev-date
.calendar.days.prev-date{
  color: #86B8B1;
}


.calendar .days .active{
  position: relative;
  font-size: 1rem;
  color: #fff;
  background-color: #86B8B1;
}

.calendar .days .active⸬before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 2px var(#86B8B1)
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
  background-color: var(#86B8B1)
}


</style>