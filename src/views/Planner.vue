<template>
  <Navbar />
  <div id="calendar-page">
    <div class="flex items-center justify-center space-x-2 p-3">
      <button
        class="button-left font-fredoka text-sm text-black rounded-lg border-2 font-bold border-black px-2 shadow-md"
        :class="{ 'bg-bnorm': !displayCalendar, 'bg-bpop': displayCalendar }"
        @click="displayTask = false; displayCalendar = true; displayOutings = false"
      >
        Calendar
    </button>
      <button
        class="button-right font-fredoka text-sm text-black rounded-lg border-2 font-bold border-black px-2 shadow-md"
        :class="{ 'bg-bnorm': !displayTask, 'bg-bpop': displayTask }"
        @click="displayTask = true; displayCalendar = false; displayOutings = false"
      >
        Tasklist
    </button>
    </div>


      <div v-if="displayCalendar">
        <div class="row">
          <div class="col-6">
            <button  class="bg-bpop text-black grow font-bold w-full rounded-full py-2 hover:drop-shadow-md hover:opacity-90 border-black border-solid border-3"
            @click="displayCreateOuting = !displayCreateOuting">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Outing</button>
          </div>
          <div class="col-6">
            <button class="bg-bpop text-black grow font-bold w-full rounded-full py-2 hover:drop-shadow-md hover:opacity-90 border-black border-solid border-3"
            @click="displayCreateEvent= !displayCreateEvent">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Event</button>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <Outings/>
          </div>
          <div class="col-6">
            <Calendar/>
          </div>
        </div>
        <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateOuting">
          <CreateOuting @emitCo="handleCreateOuting"/>
        </div>
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

.button-left {
  margin-right: -1px;
  transition: background-color 0.3s ease;
}

  .button-right {
    margin-left: -1px;
  }
}
</style>

