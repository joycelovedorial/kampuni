<template>
    <!-- <div v-for="out in outings" :key="out.id" class="outing-list"> -->
        <!-- <span>{{ out.title }}</span>
        <span>{{ out.location }}</span>
        <span>{{ out.description }}</span>
        <span>{{ out.estiamtedCost }}</span>
        <span>{{ out.date }}</span> -->
    <!-- </div> -->
    <div class="w-3/12 flex flex-col items-center">
        <button class="bg-cyanp text-cwhite font-bold w-11/12 rounded-full py-2 hover:drop-shadow-md hover:opacity-90" @click="$emit('oCreate')">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
            Create a outing 
        </button>
        <div class="h-3/6 overflow-y-scroll my-2 overflow-x-hidden">
            <div v-for="task in tasksFormatted" :key="task.id" class="bg-white flex items-center m-2 rounded-md h-20"> <!-- Add a flex container for side-by-side elements -->
                <div class="inline-block w-9/12 p-2">
                    <p class="text-cyanp font-bold">
                    {{ task.taskname }}
                    </p>
                    <p class="text-black text-sm">
                    automatically assigned in &nbsp;{{ task.countdown }}.
                    </p>
                </div>
                <div class="items-center inline-block p-2">
                    <button class="bg-cyans text-cblack text-center items-center w-16 h-16 rounded-md shadow-md hover:bg-cyans hover:opacity-70" @click="claimTask(task.id)">
                        <svg class="h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002"/>
                        </svg>
                        <p class="text-xs">i'll do it!</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
export default {    
    setup(){

    }

}
</script>

<style>


</style>