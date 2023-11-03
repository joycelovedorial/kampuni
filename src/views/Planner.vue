<template>
  <Navbar />
  <div id="calendar-page">
    <nav class="flex items-center justify-center h-16">
      <a
        class="button font-fredoka text-sm text-black rounded-l-md border-1 border-orangep p-2"
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

    <div v-if="displayCalendar">
      <Outings @oCreate="displayCreateOuting = !displayCreateOuting"></Outings>
      <Calendar></Calendar>
      <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateOuting">
        <CreateOuting @emitCo="handleCreateOuting"/>
      </div>
    </div>
    <div v-if="displayTask" class="flex space-x-2" id="tasklist">
      <TaskMarket @eCreate="handleCreateTask"/>
      <Leaderboard />
      <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateTask">
        <createTask @closeCreateTask="displayCreateTask=false"/>
      </div>
    </div>
  </div> 
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import createTask from '@/components/PlannerItems/Tasklist/createTask.vue';
import Calendar from '@/components/PlannerItems/Schedule/Calendar.vue';
import Outings from '@/components/PlannerItems/Schedule/Outings.vue';
import TaskMarket from '@/components/PlannerItems/Tasklist/TaskMarket.vue';
import Leaderboard from '@/components/PlannerItems/Tasklist/Leaderboard.vue';
import CreateOuting from '@/components/PlannerItems/Schedule/CreateOuting.vue';
import { ref } from 'vue';

export default {
  components: {
    Navbar,
    Outings,
    Calendar,
    TaskMarket,
    Leaderboard,
    createTask,
    CreateOuting
  },
  setup(props,context) {
    const displayCreateTask = ref(false)
    const displayCreateOuting = ref(false)
    const displayOutings = ref(false);
    const displayCalendar = ref(true);
    const displayTask = ref(false);

    const handleCreateTask = () => {
      displayCreateTask.value = !displayCreateTask.value;
    };

    const handleCreateOuting = () =>{
      displayCreateOuting.value=!displayCreateOuting.value
    }
      return { displayOutings, displayCalendar, displayTask, displayCreateTask, handleCreateTask,displayCreateOuting }
    }
}
</script>

<style scoped>
  #tasklist{
    position: relative
  }
  #calendar-page {
    background-image: url('../assets/background_img/background4.png');
    background-color: #f2f2f2;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 88vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }
</style>

