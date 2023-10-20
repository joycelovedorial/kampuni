<template>

  <div class="container">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8"> <OutingsCarousel/> </div>
      <div class="col-2"></div>

    </div>
    <!-- <div class="row">
      <div class="col-2"></div>
      <div class="col-2"><Tasklist/></div>
      <div class="col-6"><ChatDashboard/></div>
      <div class="col-2"></div>
    </div> -->
    
    
    
    <!-- <ExpensesList/> -->
  </div>

</template>

<script>
import Tasklist from './dashboardItems/Tasklist.vue';
import OutingsCarousel from './dashboardItems/OutingsCarousel.vue';
import ChatDashboard from './dashboardItems/ChatDashboard.vue';
import ExpensesList from './dashboardItems/ExpensesList.vue';
export default {
  components: { Tasklist, ExpensesList, OutingsCarousel, ChatDashboard}
}
</script>

<style>

</style>