<template>


  <div class="container">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-10 inline-block"> <OutingsCarousel/> </div>
      <div class="col-1"></div>

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
export default {
  components: { TodayTask, ExpensesList, OutingsCarousel, ChatDashboard}
}
</script>

<style>

</style>