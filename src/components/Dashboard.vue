<template>


  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 inline-block"> <!----<OutingsCarousel/>--> </div>

      <div class="col-1"></div>
    </div>

  
    <div class="row">
      <div class="col-lg-1 col-md-1 col-sm-1 "></div>
      <div class="col-lg-5 col-md-10 col-sm-10 "> 
         <TodayTask/> 
      </div>
      <div class="col-lg-5 col-md-10 col-sm-10 "> <ExpensesList/> </div>
      <div class="col-lg-1 col-md-1 col-sm-1"></div>
    </div>
    <!-- <div class="row">
      <div class="col-2"></div>
      <div class="col-2"><Tasklist/></div>
      <div class="col-6"><ChatDashboard/></div>
      <div class="col-2"></div>
    </div> -->
    
    
    
    <!-- <ExpensesList/> -->
  </div>


  <p>Components Here: Leaderboard, Calendar</p>
  

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
  }
}

</script>

<style>

</style>