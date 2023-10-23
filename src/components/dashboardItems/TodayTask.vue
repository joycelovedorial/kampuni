<template>
  <!-- <div class="container">
      <div class="row gap-x-2 gap-y-2 mb-2">
        <div class="bg-orange-200 col-lg-5 col-md-9 rounded">
          <p class="text-gray-800 font-semibold py-2 px-1 text-base text-center">IS216 Consultation</p>
        </div>
        <div class="bg-orange-200 col-lg-2 col-md-2 rounded">
          <p class="text-bold text-center "><span class="font-black">10 </span> <span class="italic ">Points</span></p>
          
        </div>

        <div class="col-lg-4 col-md-12 flex px-0 gap-x-2">
        
          <button class="flex-1  bg-oranges hover:bg-orangep text-gray-800 font-semibold py-2 px-4 border-oranges rounded shadow">
          Edit
          </button>
        

      
          <button class="flex-1 bg-oranges hover:bg-orangep text-gray-800 font-semibold py-2 px-4 border-oranges rounded shadow">
          Done
          </button>
        
      </div>
      </div>
      
  </div> -->

  <!-- <form>
    <fieldset>
      <legend class="flex justify-between">
        <p>Today's Task</p>
        <button
          class="bg-cyanp hover:bg-cyans text-white font-semibold text-xs px-3 border-oranges rounded shadow"
        >
          Edit
        </button>
      </legend>
      <div id='app' class="mt-6 space-y-6">
        <div class="flex items-center gap-x-3">
          <input
            id="push-everything"
            v-model="is_stricked"
            name="push-notifications"
            type="checkbox"
            class="h-4 w-4 border-gray-300 text-oranges focus:ring-orangep "
          />
          <label
            for="push-everything"
            class="block text-sm font-medium leading-6 text-gray-900"
            :class="{ 'checked-text': isChecked }"
            >Everything</label
          >
        </div>
        <div class="flex items-center gap-x-3">
          <input
            id="push-email"
            name="push-notifications"
            type="checkbox"
            class="h-4 w-4 border-gray-300 text-oranges focus:ring-orangep"
          />
          <label
            for="push-email"
            class="block text-sm font-medium leading-6 text-gray-900 "
            >Same as email</label
          >
        </div>
        <div class="flex items-center gap-x-3">
          <input
            id="push-nothing"
            name="push-notifications"
            type="checkbox"
            class="h-4 w-4 border-gray-300 text-oranges focus:ring-orangep"
          />
          <label
            for="push-nothing"
            class="block text-sm font-medium leading-6 text-gray-900"
            >No push notifications</label
          >
        </div>
      </div>
    </fieldset>
  </form> -->

<div id="app" class="container pt-2 bg-transparent"> 
  <div class ='row bg-oranges relative rounded p-3'>
    <div class='col'>
    <input type="checkbox" v-on:click="is_checked" class='larger'>
    <label :style="{'text-decoration-line' : isChecked ? 'line-through' : 'none'}" class='pl-2 rounded text-xl'>IS 216 Consultation</label>
    </div>

    
    <div class="absolute h-21 w-20 right-2 bottom-1 mb-1 p-0">
      <p class="text-center font-bold">10</p>
      <p class="text-center rounded bg-orangep px-2">POINTS</p>
    </div>
    
  </div>
</div>

</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

export default {
  setup() {
    const user = auth.currentUser;
    const uid = user.uid;
    const tasks = ref([]);
    const isChecked = ref(false);

    // Create a date object for today's date at midnight (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Use the "today" variable to query based on today's date
    const q = query(collection(db, 'users', uid, 'tasksUnique'), where('whenToDo', '>=', today), where('whenToDo', '<', new Date(today.getTime() + 24 * 60 * 60 * 1000)));

    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tasks.value.push({ ...doc.data(), id: doc.id });
      });
    };

    onMounted(() => {
      fetchData();
    });

    // Define the `is_checked` method using Composition API
    const is_checked = () => {
      isChecked.value = !isChecked.value;
    };

    return { tasks, isChecked, is_checked };
  }
};




</script>

<style>

input.larger{
  width: 20px;
  height: 20px;
}

</style>