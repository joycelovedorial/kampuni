<template>
  <div class="container bg-transparent">
    <div class="row mb-3">
      <div class="col-1"></div>
      <div class="col-10">
        <OutingsCarousel />
      </div>

      <!-- <div class="col-1 "></div> -->
    </div>

    <div class="row">
      <!-- <div class="col-1"></div> -->
      <div class="col-xl-5 col-lg-10 col-md-10 col-sm-10">
        <h1 class="mb-2 font-light text-cyanp text-2xl">Today Task</h1>
        <div class="flex-nowrap overflow-y-scroll overflow-x-hidden test h-96 bg-white bg-opacity-25 rounded-lg will-change-scroll">
          <TodayTask />
          <TodayTask />
          <TodayTask />
          <TodayTask />
          <TodayTask />
          <TodayTask />

        </div>
      </div>
      <div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div>
      <div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div>

      <div class="col-xl-5 col-lg-10 col-md-10 col-sm-10 h-96" >
      <h1 class="mb-2 font-light text-cyanp text-2xl">Expenses</h1>
      <div class="bg-white bg-opacity-25 rounded-lg flex justify-center"><ExpensesList/></div>

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
  --secondary: #ffffff;
}

.test::-webkit-scrollbar {
  width: 8px;
  margin-left: 5px;
}

.test::-webkit-scrollbar-track {
  background: transparent;
}

.test::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 10px;
}
</style>