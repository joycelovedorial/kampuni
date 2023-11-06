<template>

  <div>
    <table class="table-auto">
      <tr>
        <th>Title</th>
        <th>To do</th>
        <th>Deadline</th>
        <th>Points</th>
        <th>Done?</th>
      </tr>
    
      <tr v-for="task in tasks" :key="task.id">
        <td>{{task.taskname}}</td>
        <td>{{task.description}}</td>
        <td>{{ task.date }}</td>
        <td>{{ task.points}}</td>
        <td>
          <div v-if="task.taskstatus">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"/>
            </svg>
          </div>
          <div v-else>
            <span></span>
          </div>
        </td>
      </tr>
      <div>

      </div>
    
  </table>
  </div>

</template>

<script>
import { auth, db } from '@/firebase/config';
import { ref } from 'vue';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
export default {
  setup() {
  
    const tasks = ref([]);
    const user = auth.currentUser
    const uid=user.uid
    const q = query(collection(db, 'tasks'), where('userid', '==', uid))
      const unsub = onSnapshot(q,(snap)=>{
          const results= [];
          snap.forEach((doc)=>{
            const dateObj = doc.data().dateline.toDate();
            const options = {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            };
            const formattedDate = dateObj.toLocaleString(undefined, options);
            results.push({ ...doc.data(), id: doc.id,date:formattedDate })
          })
          tasks.value=results
      })
      return{tasks}
  }
}
</script>

<style>

</style>