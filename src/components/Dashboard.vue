<template>
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