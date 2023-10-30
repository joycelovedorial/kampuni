<template>
  <div class="container bg-transparent">
    <div class="row mb-3">
      <div class="col-1"></div>
      <div class="col-10">
        <h1 class="mb-2 font-black text-cyanp text-3xl">Upcoming Outings</h1>
        <OutingsCarousel />
      </div>

      <div class="col-1 "></div>
    </div>

    <div class="row">
      <div class="col-1"></div>

      <div class="col-xl-5 col-12">
        <h1 class="mb-2 font-black text-cyanp text-3xl">Today Task</h1>
        <div class="flex-nowrap overflow-y-scroll overflow-x-auto test justify-center h-96 bg-amber-900 bg-opacity-10 rounded-lg will-change-scroll" style="height:50vh">
          <TodayTask />
        </div>
      </div>

      <!-- <div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->
       <!--<div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->

      <div class="col-xl-5 col-12 h-96" >
      <h1 class="mb-2 font-black text-cyanp text-3xl">Expenses</h1>
       <div class="containerbg bg-opacity-25 rounded-lg flex justify-center overflow-y-scroll overflow-x-auto" style="height:40vh"><ExpensesList/></div>

      </div>
      <div class="col-lg-1 col-md-1 col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import TodayTask from "./dashboardItems/TodayTask.vue";
import OutingsCarousel from "./dashboardItems/OutingsCarousel.vue";
import ExpensesList from "./dashboardItems/ExpensesList.vue";
import { db, auth } from "@/firebase/config";
import { ref } from "vue";

export default {
  components: { TodayTask, ExpensesList, OutingsCarousel },
  props: {
  },
  setup(props) {

    // Use comId as needed

    // Rest of your component logic here
    return { };
  },
};
</script>

<style>
:root {
  --primary: #2ec4b6;
  --secondary: #ffe7cf;
}

.test::-webkit-scrollbar {
  width: 8px;
  margin-left: 5px;
  
}

.test::-webkit-scrollbar-track {
  background: transparent;
  width:10px;
  margin-top:20px;
}

.test::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 10px;
}

.containerbg{
  /* background-color: #d9b99b; */
  background-color:white
}
</style>