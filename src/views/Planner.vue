<template>
  <Navbar />
  <div id="calendar-page">
    <nav class="flex items-center justify-center h-16">
      <a
        class="button font-fredoka text-sm text-black rounded-l-md border-1 border-orangep p-2"
        :class="{ 'bg-oranges': !displayOutings, 'bg-white': displayOutings }"
        @click="displayTask = false; displayCalendar = false; displayOutings = true"
      >
        Outings
      </a>
      <a
        class="button font-fredoka text-sm text-black border-1 border-orangep p-2"
        :class="{ 'bg-oranges': !displayCalendar, 'bg-white': displayCalendar }"
        @click="displayTask = false; displayCalendar = true; displayOutings = false"
      >
        Calendar
      </a>
      <a
        class="button font-fredoka text-sm text-black rounded-r-md border-1 border-orangep p-2"
        :class="{ 'bg-oranges': !displayTask, 'bg-white': displayTask }"
        @click="displayTask = true; displayCalendar = false; displayOutings = false"
      >
        Tasklist
      </a>
    </nav>
  
    <div v-if="displayOutings">
      OutingsComponent
    </div>
    <div v-if="displayCalendar">
      CalendarComponent
    </div>
    <div v-if="displayTask">
      TasklistComponent
      <TaskMarket />
    </div>

    <iframe src="https://calendar.google.com/calendar/embed?src=80648a128124b84f8e91f2a5dd563e9b8d7f03f8ea9db0d699a269fa1cf37ecf%40group.calendar.google.com&ctz=Asia%2FSingapore" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
  </div> 
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import TaskMarket from '@/components/PlannerItems/Tasklist/TaskMarket.vue';
import schedule from '@/components/PlannerItems/Tasklist/schedule.vue';
import { ref } from 'vue';

export default {
  components: {
    Navbar,
    TaskMarket,
  },
  setup() {
    const displayOutings = ref(false);
    const displayCalendar = ref(true);
    const displayTask = ref(false);

      return { displayOutings, displayCalendar, displayTask }
    }
}
</script>

<style scoped>
  #calendar-page {
    background-image: url('../assets/background_img/background3.png');
    background-color: #f2f2f2;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }
</style>

