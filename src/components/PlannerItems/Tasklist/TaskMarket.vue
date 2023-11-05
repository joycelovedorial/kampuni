<template>
  <!-- <div class="place-content-around items-center"> -->
    <button
      class="bg-bpop text-black grow font-bold w-full rounded-full py-2 hover:drop-shadow-md hover:opacity-90 border-black border-solid border-3"
      @click="$emit('eCreate')"
    >
      <svg
        class="inline w-5 h-5"
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
      Create a task
    </button>
    <div class="my-2">
      <div class="overflow-y-auto flex overflow-x-auto w-full flex-row bg-white border-black border-2 border-solid rounded-lg carousel_container">
        <div
          v-for="task in tasksFormatted"
          :key="task.id"
          class="bg-b flex items-center m-2 rounded-md h-24 p-3 border-black border-3 border-solid"
        >
          <!-- Add a flex container for side-by-side elements -->
          <div class="inline-block w-9/12 p-2 custom_class">
            <p class="text-black font-extrabold truncate">
              {{ task.taskname }}
            </p>
            <p class="text-black text-sm truncate">
              automatically assigned in &nbsp;{{ task.countdown }}.
            </p>
          </div>
          <div class="items-center inline-block p-2">
            <button
              class="bg-white hover:bg-r hover:opacity-70 border-2 border-black border-solid text-cblack text-center items-center w-16 h-16 rounded-md shadow-md "
              @click="claimTask(task.id)"
            >
              <svg
                class="h-5 w-5 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"
                />
              </svg>
              <p class="text-xs">i'll do it!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import "@/assets/main.css";
import { db, auth } from "@/firebase/config";
import { onMounted, ref, computed } from "vue";
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

export default {
    components: {
    },
    setup() {
        const tasks = ref([])
        
        const today = new Date();
        const todayTimestamp = Timestamp.fromDate(today);
        const minpoints = ref(0)
        const minid=ref("")

        const assign = query(collection(db,"tasks"),where("userid","==",null),where("countdown",">",todayTimestamp))
        const assub = onSnapshot(assign,async(snap)=>{
          snap.forEach(async(docu)=>{
            const user = auth.currentUser
              const uid = user.uid
              const usnap = await getDoc(doc(db,'users',uid))
              const comid= usnap.data().community
              minpoints.value = usnap.data().minpoints
              minid.value = uid
              const comsnap = await getDoc(doc(db,'communities',comid))
              const comdata = comsnap.data()
              comdata.homies.forEach(async(homi)=>{
                console.log(homi,"should be homi id");
                const hsnap = await getDoc(doc(db,'users',homi))
                if (hsnap.data().points<minpoints.value){
                  minpoints.value = hsnap.data()
                  minid.value=homi
                }
              })
            
              await updateDoc(docu.ref,{
                userid:minid.value,
              })
          })
      })

      
        const q = query(collection(db,"tasks"),where("userid","==",null),where("countdown","<",todayTimestamp))
        const unsub = onSnapshot(q,(snap)=>{
            const results= [];
            snap.forEach((doc)=>{
                results.push({ ...doc.data(), id: doc.id })
            })
            tasks.value=results
        })
    
        const claimTask = async (taskId) => {
            const user = auth.currentUser
            const uid = user.uid
            const taskRef = doc(db,"tasks",taskId)
            await updateDoc(taskRef,{
                userid:uid
            });
        }
        const tasksFormatted = computed(()=>{
          if (tasks.value){
              return tasks.value.map(doc => {
                  let time = formatDistanceToNow(doc.countdown.toDate())
                  return { ...doc, countdown: time}
              })
          }else{
            return []
          }
      })
        
        

    return {
      tasks,
      claimTask,
      tasksFormatted,
    };
  },
};
</script>

<style>
table {
  border: solid #2ec4b6 2px;
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed; /* Use fixed table layout */

  /* Adjust column widths evenly */
}

th {
  border: solid #2ec4b6 2px;
  padding: 2px; /* Adjust cell padding as needed */
}

th {
  text-align: center;
  font-family: "Fredoka One", sans-serif;
  font-size: 18px;
  background-color: rgba(
    203,
    243,
    240,
    0.5
  ); /* Add background color for header */
  color: black; /* Add text color for header */
}

td {
  border: solid #2ec4b6 2px;
  text-align: right;
  vertical-align: top;
  height: 70px;
}

.task-detail {
  background-color: white;
  border-radius: 8px;
  display: flex;
}

.points {
  height: 65%;
}
.custom_class_2 {
  height: 440px;
}

.custom_2{
        height:70vh;
}
/* @media (max-width:992px){
    .custom_2{
        height:70vh;
    }
} */
.carousel_container::-webkit-scrollbar{
    width:6px;
    height:10px;
  }

.carousel_container::-webkit-scrollbar{
    background-color: transparent;
  }
  .carousel_container::-webkit-scrollbar-thumb{
    background-color:#F2D694;
    border-radius: 10px;
    width:10px;
    height:3px;
  }

</style>
        
<!-- // data () {
    //     const currentDate = new Date(2023, 8); // October 2023 (0-indexed month)
    //     const year = currentDate.getFullYear();
    //     const month = currentDate.getMonth();
    //     const firstDay = new Date(year, month, 1);
    //     const lastDay = new Date(year, month + 1, 0);
    //     const daysInMonth = lastDay.getDate();
    //     const firstDayOfWeek = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

    //     return {
    //         year,
    //         month,
    //         daysInMonth,
    //         firstDayOfWeek: firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1, // Adjust for Monday as the start of the week (0 => 6, 1 => 0, ..., 6 => 5)
    //     };
    // },
    // computed: {
    // formattedDate() {
    //     const options = { year: 'numeric', month: 'long' };
    //     return new Date(this.year, this.month).toLocaleString(undefined, options);
    // },
// }, -->