<template>

  <div id="app" class="container px-3 py-3 p rounded-m bg-transparent border-black border-solid" v-for="task in tasksFormatted" :key="task.id"> 
    <div class ='row bg-oranges relative rounded p-3 w-105'>
      <div class='col'>
      <input type="checkbox" @click="taskDone(task.id)" class='larger'>
      <label :style="{'text-decoration-line' : task.taskstatus ? 'line-through' : 'none'}" class='pl-2 rounded text-xl'>{{task.taskname}}</label>
      </div>
  
      
      <div class="absolute h-21 w-20 right-2 bottom-1 mb-1 p-0">
        <p class="text-center font-bold">{{ task.points }}</p>
        <p class="text-center rounded bg-orangep px-2">POINTS</p>
      </div>
      
    </div>
  </div>
  
  </template>
  
  <script>
  import { ref, onMounted,computed } from 'vue';
  import { auth, db } from "@/firebase/config";
  import { collection, query, where, getDoc, onSnapshot, setDoc, doc, updateDoc} from "firebase/firestore";
  import { formatDistanceToNow } from 'date-fns';
  
  
  export default {
    setup() {
      const user = auth.currentUser;
      const uid = user.uid;
      const tasks = ref([]);
      const isChecked = ref(false);
  
      // Create a date object for today's date at midnight (00:00:00)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const q = query(collection(db, 'tasks'), where('userid', '==', uid))
      const unsub = onSnapshot(q,(snap)=>{
          const results= [];
          snap.forEach((doc)=>{
              results.push({ ...doc.data(), id: doc.id })
          })
          tasks.value=results
      })
  
      const tasksFormatted = computed(()=>{
            if (tasks.value){
                return tasks.value.map(doc => {
                    let time = formatDistanceToNow(doc.dateline.toDate())
                    return { ...doc, dateline: time}
                })
            }else{
              return []
            }
        })
  
      const taskDone = async(taskid) =>{
        const user = auth.currentUser;
        const uid = user.uid;
        const userSnap = await getDoc(doc(db,"users",uid))
        
        const docSnap = await getDoc(doc(db,"tasks",taskid))
        const docData = docSnap.data()
        const status = docData.taskstatus
        console.log(status)
        await updateDoc(doc(db,"tasks",taskid),{
          taskstatus:!status,
        })
        const userData = userSnap.data()
        if(userData.points){
          const val = userData.points
          const total = val + docData.points
        }
        //point update might do at the end of day instead
        // await updateDoc(doc(db,"users",uid),{
        //   points: total,
        // })
  
      }
  
      const is_checked = () => {
        isChecked.value = !isChecked.value;
        console.log(isChecked.value)
      };
  
      return { tasks, isChecked, is_checked, tasksFormatted,taskDone };
    }
  };
  
  
  
  
  </script>
  
  <style>

.hovering1{
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

input.larger{
  width: 20px;
  height: 20px;
  accent-color: #f0f9ff !important;
}

.checked_style{
  background-color:#fb5454;
  color:white;
}

.checked_style2{
  background-color:#fb5454;
  color:white;
}

  
  input.larger{
    width: 20px;
    height: 20px;
    accent-color: #f0f9ff !important;
  }
  
  .checked_style{
    background-color:#fb5454;
    color:white;
  }
  
  .checked_style2{
    background-color:#fb5454;
    color:white;
  }
  
  
  </style>
