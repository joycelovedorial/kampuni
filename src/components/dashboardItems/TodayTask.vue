<template>
  <div
    class="container py-3 mx-auto w-11/12 rounded-xl hovering1"
    v-for="task in tasksFormatted"
    :key="task.id"
  >
    <div
      class="row relative rounded p-3 w-105 border-black border-solid border-2"
      :class="{
        'bg-bnorm': task.taskstatus,
        'bg-r': task.overdue,
        'bg-bpop': !task.taskstatus,
      }"
    >
      <div>
        <input
          :id="task.id"
          type="checkbox"
          @click="taskDone(task.id)"
          :checked="task.taskstatus"
          class="larger"
        />
        <label
          :for="task.id"
          :style="{
            'text-decoration-line': task.taskstatus ? 'line-through' : 'none',
          }"
          class="pl-2 rounded text-xl"
        >
          <h5>{{ task.taskname }}</h5>
        </label>
      </div>
      <div class="absolute h-21 w-20 right-2 bottom-1 mb-1 p-0">
        <p
          class="text-center font-bold"
          :class="{
            'text-black': task.taskstatus && !task.overdue,
            'text-black': !task.taskstatus || !task.overdue,
          }"
        >
          {{ task.points }}
        </p>
        <p class="text-center rounded px-2">POINTS</p>
      </div>
    </div>
  </div>

  <!-- outings -->
  <div
    class="container py-3 mx-auto w-11/12 rounded-xl hovering1"
    v-for="outing in outingsArray"
    :key="outing.id"
  >
    <div
      class="row relative rounded bg-bpop p-3 w-105 border-black border-solid border-2"
    >
    <div>
      <h5 class="font-bold text-lg">{{ outing.title }}</h5>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {{ outing.location }}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ outing.date }}
      </p>
    </div>
    <div class="h-6 flex m-1 space-x-1">
      <span class="border-b rounded-sm border-2 block h-6"></span>
      <span class="bg-b/80 text-center rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden">
        outing
      </span>
    </div>
      <h5>{{ outing.title }}</h5>
      <p>Location:{{ outing.location }}</p>
      <p>Time:{{ outing.date }}</p>
    </div>
  </div>

  <!-- events -->
  <div
    class="container py-3 mx-auto w-11/12 rounded-xl hovering1"
    v-for="event in eventsArray"
    :key="event.id"
  >
    <div
      class="row relative rounded bg-bpop p-3 w-105 border-black border-solid border-2"
    >
    <div>
      <h5 class="font-bold text-lg">{{ event.title }}</h5>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {{ event.location }}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 inline">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ event.date }}
      </p>
    </div>
    <div class="h-6 flex m-1 space-x-1">
      <span class="border-g rounded-sm border-2 block h-6"></span>
      <span class="bg-g/80 text-center rounded-sm block h-6 w-24 px-1 overflow-ellipsis overflow-hidden">
        schedule
      </span>
    </div>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted, computed } from "vue";
import { auth, db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

export default {
  props: {
    community: String,
  },
  setup(props) {
    const user = auth.currentUser;
    const comid = props.community;

    const uid = user.uid;
    const tasks = ref([]);
    const isChecked = ref(false);
    const outingsArray = ref([]);
    const eventsArray = ref([]);

    // Create a date object for today's date at midnight (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    //task querying
    const q = query(collection(db, "tasks"), where("userid", "==", uid));
    const unsub = onSnapshot(q, (snap) => {
      const results = [];
      snap.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      tasks.value = results;
    });

    const tasksFormatted = computed(() => {
      if (tasks.value) {
        return tasks.value.map((doc) => {
          let time = formatDistanceToNow(doc.dateline.toDate());
          return { ...doc, dateline: time };
        });
      } else {
        return [];
      }
    });
    const eventQuery = query(
      collection(db, "events"),
      where("userid", "==", uid),
      where("date", ">=", today),
      where("date", "<=", endOfDay)
    );
    const esub = onSnapshot(eventQuery, (esnap) => {
      esnap.forEach((edoc) => {
        const eventData = edoc.data();
        const dateObj = eventData.date.toDate();
        const timeOptions = { hour: "2-digit", minute: "2-digit" }; // Add time options
        const formattedTime = dateObj.toLocaleTimeString(
          undefined,
          timeOptions
        ); // Format time
          eventsArray.value.push({...edoc.data(),id:edoc.id,date:formattedTime})
        })
      })
      // console.log(eventsArray.value);
      //outings querying
      const outingsQuery = query(
        collection(db, "outings"),
        where("community", "==", comid),
        where("date", ">=", today),
        where("date", "<=", endOfDay)
      );

      const usub = onSnapshot(outingsQuery, (snap) => {
      const outusers=[]
      snap.forEach(async(doc) => {
      const userQuery = query(collection(db, "outings", doc.id, "usersInvolved"),where("user",'==',uid),where("imIn","==",true))
      const userSnap = await getDocs(userQuery);
      if(userSnap.size>0){
        const dateObj = doc.data().date.toDate();
          const options = {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          };
        const formattedDate = dateObj.toLocaleString(undefined, options);

        outingsArray.value.push({
          ...doc.data(),
          fdate: formattedDate,
          id: doc.id,
          });
        }
      });
    });

  console.log(outingsArray.value,'outings task');

      // console.log(outingsFormatted); 
            
      const taskDone = async(taskid) =>{
        const user = auth.currentUser;
        const uid = user.uid;
        const userSnap = await getDoc(doc(db,"users",uid))
        
        const docSnap = await getDoc(doc(db,"tasks",taskid))
        const docData = docSnap.data()
        const status = docData.taskstatus
    
        await updateDoc(doc(db,"tasks",taskid),{
          taskstatus:!status,
          dateline:Timestamp.now()
        })
        
        const userData = userSnap.data()
        const val = userData.points
        
        if(!status){
          const total = val + docData.points
        await updateDoc(doc(db,"users",uid),{
          points:total,
        })
        }else{
          const total = val - docData.points
        await updateDoc(doc(db,"users",uid),{
          points:total,
        })
     
        }
        
      }
  
      const is_checked = () => {
        isChecked.value = !isChecked.value;
        // console.log(isChecked.value)
      };

      return { tasks, isChecked, is_checked, tasksFormatted,taskDone,eventsArray,outingsArray};
    }
    
  };
  
  
  
  
  </script>
  
  <style>
.hovering1 {
  transition: transform 2s ease-in-out;
}
.hovering1:hover {
  animation: strinkSize 1.2s infinite alternate; /* Add a smooth transition effect */
}

@keyframes strinkSize {
  0% {
    transform: scale(1); /* Initial size */
  }
  100% {
    transform: scale(1.02); /* Initial size */
  }
}

input.larger {
  width: 20px;
  height: 20px;
  accent-color: #f0f9ff !important;
}

.checked_style {
  background-color: rgb(107 114 128);
  color: white;
}

.checked_style2 {
  background-color: rgb(107 114 128);
  color: white;
}

</style>