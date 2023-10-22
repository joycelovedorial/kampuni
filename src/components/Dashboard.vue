<template>


  <div class="container bg-transparent">
    <div class="row mb-3">
      <div class="col-1"></div>
      <div class="col-10 inline-block"> <OutingsCarousel/>  </div>

      <div class="col-1"></div>
    </div>

  
    <!-- <div class="row ">

        <div class="col-lg-1"></div>
        <div class='col-lg-5'>
        <h1 class="text-start text-orangep font-black text-3xl p-4 bg-white pl-0">Today Task</h1>
        </div>
        <div class="col-lg-4">
          hello
        </div>
        <div class='col-lg-5'>
        <h1 class="text-start text-orangep font-black text-3xl p-4 bg-white pl-0">Expenses</h1>
        </div>
        <div class="col-lg-1"></div> -->


    <div class="row">
      <div class="col-lg-1 col-md-1 col-sm-1 "></div>
      <div class="col-lg-5 col-md-10 col-sm-10 flex-nowrap overflow-y-scroll h-32"> 
         <TodayTask/> 
         <TodayTask/> 
         <TodayTask/> 
         <TodayTask/> 
      </div>
      <div class="col-lg-5 col-md-10 col-sm-10 "> <ExpensesList/> </div>
      <div class="col-lg-1 col-md-1 col-sm-1"></div>
    </div>
  </div>
    <!-- <div class="row">
      <div class="col-2"></div>
      <div class="col-2"><Tasklist/></div>
      <div class="col-6"><ChatDashboard/></div>
      <div class="col-2"></div>
    </div> -->
    
    
    
    <!-- <ExpensesList/> -->
  
</template>

<script>
import TodayTask from './dashboardItems/TodayTask.vue';
import OutingsCarousel from './dashboardItems/OutingsCarousel.vue';
import ChatDashboard from './dashboardItems/ChatDashboard.vue';
import ExpensesList from './dashboardItems/ExpensesList.vue';
import { db,auth } from '@/firebase/config';
import { ref } from 'vue';

export default {
  components: { TodayTask, ExpensesList, OutingsCarousel, ChatDashboard },
  props: {
    community: String, // Define the "community" prop as a string
  },
  setup(props) {
    const comId = props.community;

    // Use comId as needed

    // Rest of your component logic here
    const user = auth.currentUser
    
  }
}

</script>

<style>
.container{
  /* background-image:url("@/assets/background_img/background1.png"); */
}
</style>