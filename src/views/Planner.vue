<template>
  <Navbar />
  <div id="calendar-page" class="overflow-x-hidden">
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

    
      <div class="h-40" v-if="displayCalendar">
        
        <div class="row laptop:space-y-0 space-y-2 flex justify-around" style='height:108px'>
          <div class="mobile:mx-auto laptop:ml-6 laptop:mr-2 mobile:w-10/12 laptop:w-2/3 flex flex-col space-y-2">
            <div class="flex flex-col space-y-1">
              <div class="bg-y border-black border-2 rounded-lg flex justify-between px-2">
                <h1 class="font-fredoka font-black text-lg">your calendar</h1>
                <button @click="displayCreateEvent= !displayCreateEvent">
                  <svg class="inline w-5 h-5 bg-bpop text-black font-bold rounded-full drop-shadow-lg hover:shadow-none hover:opacity-90 hover:bg-y border-black border-solid border-3" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button> 
              </div>
              <Calendar/>
            </div>
          </div>
          <!-- <div class="col-9">
            <button class="block bg-bpop text-black font-bold rounded-full py-2 hover:drop-shadow-md hover:opacity-90 border-black border-solid border-3 mx-auto"
            @click="displayCreateEvent= !displayCreateEvent">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add a personal event</button>
            <Calendar/>
          </div> -->
          <div class="mobile:mx-auto laptop:ml-2 laptop:mr-6 mobile:w-10/12 laptop:w-3/12 flex flex-col space-y-2">
            <div class="flex flex-col tablet:space-y-0 space-y-2">
              <div class="bg-y border-black border-2 rounded-lg flex justify-between px-2">
                <h1 class="font-fredoka font-black text-lg">upcoming outings</h1>
                <button 
                  @click="displayCreateOuting = !displayCreateOuting">
                  <svg class="inline w-5 h-5 bg-bpop text-black font-bold rounded-full drop-shadow-lg hover:shadow-none hover:opacity-90 hover:bg-b border-black border-solid border-3" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <Outings/>
            </div>
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
            <Leaderboard />
          </div>
        </div>
        <div class="row flex justify-center">
        <div class="block col-sm-12 col-md-3">
          <TaskMarket @eCreate="handleCreateTask"/>
        </div>
        <div class="block col-sm-12 col-md-7">
          <Tasklist/>
        </div>
        </div>
        <!-- <div class="row">
        <div class="col-12">
          <Leaderboard />
        </div>
      </div> -->
        <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex items-center justify-center" v-if="displayCreateTask">
          <createTask @closeCreateTask="displayCreateTask=false"/>
        </div>
      </div>
    </div> 

</template>

<script>
import Tasklist from '@/components/PlannerItems/Tasklist/Tasklist.vue';
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
    Tasklist,
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
  /* #tasklist{
    position: relative
  } */
  #calendar-page {
    background-color: #86B8B1;
    /* background-size: content; */
    /* background-repeat: no-repeat; */
    /* background-attachment: fixed; */
    min-height:100vh;
    height: fit-content; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }

  /* @media (min-width: 1024px) {
  #calendar-page {
    height: 150vh;
  }
} */

.button-left {
  margin-right: -1px;
  transition: background-color 0.3s ease;
}

  .button-right {
    margin-left: -1px;
  }

</style>

