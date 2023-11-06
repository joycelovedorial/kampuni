<template>
  <body>
    <div class="container ">
      <div class="row mb-3">
        <div class="col-12">
          <h1 class="pb-3 font-bold text-black text-lg font-fredoka">Upcoming Outings</h1>
          <OutingsCarousel :community="comid"/>
        </div>
      </div>
  
      <div class="row">
        <!-- <div class="col-1"></div> -->
  
        <div class="col-xl-6 col-12 ">
          <h1 class="mb-2 font-bold text-black text-lg font-fredoka ">Today's Task</h1>
          <div class="flex-nowrap overflow-y-scroll overflow-x-auto test border-black border-solid border-2 bg-white rounded-xl will-change-scroll" style="height:50vh">
            <TodayTask v-if="comid" :community="comid"/>
          </div>
        </div>
  
        <!-- <div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->
         <!--<div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->
  
        <div class="col-xl-6 col-12 " >
        <h1 class="mb-2 font-bold text-black text-lg font-fredoka">Expenses</h1>
         <div class="containerbg rounded-lg border-black border-solid test border-2 overflow-y-scroll overflow-x-auto mb-3" style="height:50vh">
            <ExpensesList/>
          </div>
        </div>
        <!-- <div class="col-lg-1 col-md-1 col-sm-1"></div> -->
      </div>
    </div>
  </body>
</template>

<script>
import TodayTask from "./dashboardItems/TodayTask.vue";
import OutingsCarousel from "./dashboardItems/OutingsCarousel.vue";
import ExpensesList from "./dashboardItems/ExpensesList.vue";
import { db, auth } from "@/firebase/config";
import { onMounted, ref } from "vue";
import { collection, onSnapshot, query, where,getDoc, doc, getDocs, deleteDoc, updateDoc, Timestamp, collectionGroup} from 'firebase/firestore';


export default {
  components: { TodayTask, ExpensesList, OutingsCarousel },
  props: {
  },
  setup(props) {
    const comid=ref("")
    //fetching of stuff
    const user = auth.currentUser
    const uid = user.uid
    getDoc(doc(db,"users",uid))
      .then((docSnap)=>{
        comid.value = docSnap.data().community
      })
    
    const now = new Date()
  
    
    const timestamp = Timestamp.fromDate(now);
    // console.log(timestamp);
    const cref =collection(db,"tasks")
    const taskquery = query(cref,where('taskstatus','==',true),where("dateline","<=",timestamp))
    const tsub = onSnapshot(taskquery,(tasksnap)=>{
      tasksnap.forEach(async(tdoc)=>{
        await deleteDoc(doc(db,"tasks",tdoc.id))
      })
    })
    
    const q = query(collection(db,"expenses"))
    getDocs(q)
    .then((expensesnap)=>{
      expensesnap.forEach(async(edoc)=>{
        const transacq = query(collection(db,"transactions"),where("expense","==",edoc.id))
        const querySnap = await getDocs(transacq)
        
        const fullypaid = ref(true)
        querySnap.forEach(async(snapDoc)=>{
          const data = snapDoc.data()
          if(data.paid==false){
            fullypaid.value=false
          }else if(querySnap.size==0){
            await deleteDoc(doc(db,"expenses",edoc.id))
          console.log("expense deleted");

          }
        })
        if (fullypaid.value==true){
          await deleteDoc(doc(db,"expenses",edoc.id))
          console.log("expense deleted");
          
        }
      
    })
    })
    


    
//overudue
    const overdue = query(collection(db,'tasks'),where('taskstatus','==',false),where('dateline',"<=",timestamp))
    const odsub = onSnapshot(overdue,(oversnap)=>{

      oversnap.forEach(async(odoc)=>{
        // console.log("in tasksnap overdue");

        const odata = odoc.data()
        // console.log(odata.taskname);
        const deadline = odata.dateline.toDate()
        // console.log(deadline,'deadline');
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const daysPassed = Math.floor((now - deadline) / millisecondsPerDay); // Calculate days passed
        // console.log(daysPassed,'daypassed');
        const newpoints = Math.max(0, odata.points - (daysPassed * 5)); // Use Math.max to ensure it doesn't go below zero
        
        await updateDoc(odoc.ref, {
        overdue: true,
        points: newpoints
      });
      console.log("taskoverdue updated");

      })
    })

  
  
  
  return { comid };
},
};
</script>

<style>
body {
  background-color: #FFC96B;
  /* color: #ffdc9f; */
  height: fit-content;
}

:root {
--primary: #2ec4b6;
--secondary: #d2cfcf;
}

.test::-webkit-scrollbar {
width: 12px;
border-radius:16px;
/* margin-left: 5px; */
/* height:5px; */
}

.test::-webkit-scrollbar-track {
background: transparent;
width:10px;
height:5px;
margin-top:5px;
margin-right:10px;
margin-bottom:5px;
}

.test::-webkit-scrollbar-thumb:hover {
background-color:rgb(47, 47, 47)
}

.test::-webkit-scrollbar-thumb {
background-color: var(--secondary);
border-radius: 10px;
width:5px;
height:5px;
}

.containerbg{
/* background-color: #d9b99b; */
background-color:white
}
</style>