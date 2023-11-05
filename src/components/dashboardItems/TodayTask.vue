<template>

<div class="container py-3 mx-auto w-11/12 rounded-xl hovering1" v-for="task in tasksFormatted" :key="task.id"> 
  <div class ='row relative rounded p-3 w-105 border-black border-solid border-2' :class="{'bg-gray-500' : task.taskstatus , 'bg-b' :!task.taskstatus,'bg-r':task.overdue}">
    <div :class="['col', { 'checked_style': task.taskstatus }]">
      <input :id="task.id" type="checkbox" @click="taskDone(task.id)" :checked="task.taskstatus" class='larger'>
        <label :for="task.id" :style="{'text-decoration-line' : task.taskstatus ? 'line-through' : 'none'}" class='pl-2 rounded text-xl'>
          <h5>{{task.taskname}}</h5>
        </label>
    </div>
      <div class="absolute h-21 w-20 right-2 bottom-1 mb-1 p-0">
        <p class="text-center font-bold" :class=" {'text-white' : task.taskstatus , 'text-black' :!task.taskstatus}" >{{ task.points }}</p>
      <p class="text-center rounded px-2" :class="{'bg-gray-500 text-white' : task.taskstatus , 'bg-b' :!task.taskstatus}" >POINTS</p>
      </div>
    </div>
  </div>

  <!-- outings -->
<div class="container py-3 mx-auto w-11/12 rounded-xl hovering1" v-for="outing in outingsFormatted" :key="outing.id">
  <div class ='row relative rounded p-3 w-105 border-black border-solid border-2'>
    <h5>{{outing.title}}</h5>
    <p>Location:{{ outing.location }}</p>
    <p>Time:{{ outing.date }}</p>
  </div>
</div>
  
  </template>
  
  <script>
  import { ref, onMounted,computed } from 'vue';
  import { auth, db } from "@/firebase/config";
  import { collection, query, where, getDoc,getDocs, onSnapshot, setDoc, doc, updateDoc} from "firebase/firestore";
  import { formatDistanceToNow } from 'date-fns';
  
  
  export default {
    props:{
      community: String,
    },
    setup(props) {
      const user = auth.currentUser;
      const comid = props.community

      const uid = user.uid;
      const tasks = ref([]);
      const isChecked = ref(false);
      const outingsArray = ref([])
  
      // Create a date object for today's date at midnight (00:00:00)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfDay = new Date(today); 
      endOfDay.setHours(23, 59, 59, 999);
      //task querying
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

      //outings querying
      const outingsQuery = query(collection(db, "outings"),where("community","==",comid),where("date", ">=", today), where("date", "<=", endOfDay));
      const usub = onSnapshot(q,(snap)=>{
        snap.forEach((doc)=>{
          outingsArray.value.push({...doc.data(),id:doc.id})
        })
      })
      const outingsFormatted = computed(() => {
        const userOutings = [];
        
        for (const outing of outingsArray.value) {
          const userQuery = query(
            collection(db, "outings", outing.id, "usersInvolved"),
            where("user", "==", uid),
            where("imIm", "==", true)
          );

          getDocs(userQuery)
            .then((userSnap) => {
              if (!userSnap.empty) {
                // If the user is involved in the outing, add it to userOutings

                const outingTime = outing.date instanceof Date ? outing.date.toLocaleTimeString() : "";
                userOutings.push({ ...outing, date: outingTime });
              }
            })
            .catch((error) => {
              // Handle any errors
            });
        }

        return userOutings;
      });
            
      const taskDone = async(taskid) =>{
        const user = auth.currentUser;
        const uid = user.uid;
        const userSnap = await getDoc(doc(db,"users",uid))
        
        const docSnap = await getDoc(doc(db,"tasks",taskid))
        const docData = docSnap.data()
        const status = docData.taskstatus
    
        await updateDoc(doc(db,"tasks",taskid),{
          taskstatus:!status,
        })
        
        const userData = userSnap.data()
        const val = userData.points
        console.log(status,"status");
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
        console.log(isChecked.value)
      };

      return { tasks, isChecked, is_checked, tasksFormatted,taskDone,outingsFormatted };
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
  background-color:rgb(107 114 128);
  color:white;
}

.checked_style2{
  background-color:rgb(107 114 128);
  color:white;
}

  
  /* input.larger{
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
  } */
  
  </style>