<template>
  <p>Components Here: Leaderboard, Calendar</p>
</template>

<script>
import Tasklist from './dashboardItems/Tasklist.vue';
import OutingsCarousel from './dashboardItems/OutingsCarousel.vue';
import ChatDashboard from './dashboardItems/ChatDashboard.vue';
import ExpensesList from './dashboardItems/ExpensesList.vue';
export default {
  components: {Calendar, Leaderboard, Tasklist, ExpensesList, OutingsCarousel, ChatDashboard}
}
</script>

<style>

</style>