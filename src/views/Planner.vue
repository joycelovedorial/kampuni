<template>
  <Navbar />
  <div id="calendar-page">
    <nav class="flex items-center justify-center h-16">
      <a
        class="button font-fredoka text-sm text-black rounded-l-md border-1 border-black p-2"
        :class="{ 'bg-white': !displayCalendar, 'bg-y': displayCalendar }"
        @click="displayTask = false; displayCalendar = true; displayOutings = false"
      >
        Calendar
      </a>
      <a
        class="button font-fredoka text-sm text-black rounded-r-md border-1 border-black p-2"
        :class="{ 'bg-white': !displayTask, 'bg-y': displayTask }"
        @click="displayTask = true; displayCalendar = false; displayOutings = false"
      >
        Tasklist
      </a>
    </nav>


      <div v-if="displayCalendar">
        <button @click="displayCreateOuting = !displayCreateOuting">Create Outing</button>
        <Outings/>
        <Calendar/>
        <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateOuting">
          <CreateOuting @emitCo="handleCreateOuting"/>
        </div>
        <button @click="displayCreateEvent= !displayCreateEvent">Create Event</button>
        <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateEvent">
          <CreateEvent @emitCe="handleCreateEvent"/>
        </div>
      </div>

      <div v-if="displayTask" class="container " id="tasklist">
        <div class="row">
        <div class="col-12">
          <TaskMarket @eCreate="handleCreateTask"/>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
          <Leaderboard />
        </div>
      </div>
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
import CreateEvent from '@/components/PlannerItems/Schedule/CreateEvent.vue';
import { ref } from 'vue';

export default {
  components: {
    Navbar,
    Outings,
    Calendar,
    TaskMarket,
    Leaderboard,
    createTask,
    CreateOuting,
    CreateEvent
  },
  setup(props,context) {
    const displayCreateTask = ref(false)
    const displayCreateOuting = ref(false)
    const displayOutings = ref(false);
    const displayCalendar = ref(true);
    const displayTask = ref(false);
    const displayCreateEvent = ref(false);
    const handleCreateTask = () => {
      displayCreateTask.value = !displayCreateTask.value;
    };

    const handleCreateOuting = () =>{
      displayCreateOuting.value=!displayCreateOuting.value
      displayCreateEvent.value=false
    }
    const handleCreateEvent = () =>{
      displayCreateEvent.value=!displayCreateEvent.value
      displayCreateOuting.value=false
    }
      return {handleCreateEvent,  displayCreateEvent,displayOutings, displayCalendar, displayTask, displayCreateTask, handleCreateTask,displayCreateOuting,handleCreateOuting}
    }
}
</script>

<style scoped>
  #tasklist{
    position: relative
  }
  #calendar-page {
    background-color: #86B8B1;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 140vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }

  @media (max-width: 1024px) {
  #bg-container {
    height: 130vh;
  }
}
</style>

