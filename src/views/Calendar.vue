<template>
  <Navbar />
  <CalendarViews/>
  <nav class="flex items-center justify-center h-16">
    <a class="button text-orangep rounded-l-2xl border-1 border-orangep bg-oranges" @click="displayTask=false;displayCalendar=false;displayOutings=true">Outings</a>
    <a class="button text-orangep rounded-l-2xl border-1 border-orangep bg-oranges" @click="displayTask=false;displayCalendar=true;displayOutings=false">Calendar</a>
    <a class="button text-orangep rounded-l-2xl border-1 border-orangep bg-oranges" @click="displayTask=true;displayCalendar=false;displayOutings=false">Tasklist</a>
  </nav>
  <div v-if="displayOutings">
    OutingsComponent
  </div>
  <div v-if="displayCalendar">
    CalendarComponent
  </div>
  <div v-if="displayTask">
    TasklistComponent
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Import the Navbar component
import CalendarViews from '@/components/CalendarViews.vue'; // Import the Navbar component
import { ref } from 'vue';

export default {
    components: {
        Navbar, // Include the Navbar component
        CalendarViews
    },
    setup(){
      const displayOutings = ref(false)
      const displayCalendar = ref(true)
      const displayTask = ref(false)

      return { displayOutings, displayCalendar, displayTask }
    }
}
</script>

<style>
    body {
      background-image: url('../assets/background_img/background3.png');
      background-size: cover;
  }
</style>