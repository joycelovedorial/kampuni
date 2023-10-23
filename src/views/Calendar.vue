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
    </div>
    <div v-if="displayCalendar">
    </div>
    <div v-if="displayTask">
      <TaskMarket />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import TaskMarket from '@/components/calendaritems/TaskMarket.vue';
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

