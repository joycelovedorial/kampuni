<template>

  <div>

    <div>

<div class="relative overflow-x-auto ">
    <table class="w-full text-sm text-left text-black rounded-xl border-black border-2 border-solid">
        <thead class="text-xs uppercase text-black rounded-xl border-black border-2 border-solid bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3 truncate border-black border-solid border-2">
                  Title
                </th>
                <th scope="col" class="px-6 py-3 truncate border-black border-solid border-2">
                  To-Do
                </th>
                <th scope="col" class="px-6 py-3 truncate border-black border-solid border-2">
                    Deadline
                </th>
                <th scope="col" class="px-6 py-3 truncate border-black border-solid border-2">
                    Points
                </th>
                <th scope="col" class="px-6 py-3 truncate border-black border-solid border-2">
                    Done?
                </th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="task in tasks" :key="task.id" class="bg-white  ">
        <td class="px-6 py-4 border-black border-solid border-2 truncate ">{{task.taskname}}</td>
        <td class="px-6 py-4 border-black border-solid border-2 truncate ">{{task.description}}</td>
        <td class="px-6 py-4 border-black border-solid border-2 truncate ">{{ task.date }}</td>
        <td class="px-6 py-4 border-black border-solid border-2 truncate ">{{ task.points}}</td>
        <td class="border-black border-solid border-1 flex justify-center items-end  ">
          <div v-if="task.taskstatus" >
            <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#99B898" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
</svg>
          </div>
          <div v-else>
            <span></span>
          </div>
        </td>
      </tr>
        </tbody>
    </table>
</div>

    </div>


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