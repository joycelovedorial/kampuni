<template>
    <div class="centered-component rounded-lg p-5 rounded-2 border-2 border-black space-y-2 font-fredoka">
      <button @click="emitC">X</button>
        <div class="text-r">
            <h1 class="text-2xl font-bold text-center font-fredoka">
                {{ taskname }}
            </h1>
            <p class="text-center">
                {{ description }}
            </p>
        </div>
        <div class="bg-r rounded-lg shadow-inner p-3">
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                {{ deadline }}
            </p>
        </div>
       <div class="flex justify-center">
        <button class="rounded-lg border-r border-2 text-r px-2" @click="emitC">
            Close
        </button>
       </div>

    </div>
    <!-- <div class="centered-component rounded-lg p-5 rounded-2 border-2 border-black space-y-2 font-fredoka" v-else>
      <button @click="emitC">X</button>
        <div class="text-r">
            <input type="text" :placeholder="taskname" v-model="etn">
            <input type="text" :placeholder="desc" v-model="edesc">
        </div>
        <div class="bg-r rounded-lg shadow-inner p-3">
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                <input type="Date" :placeholder="deadline" v-model="eded">
            </p>
        </div>
       <div class="flex justify-center">
        <button class="rounded-lg border-r border-2 text-r px-2" @click="editTask">
            edit
        </button>
       </div>

    </div> -->


    
    
    
    
    
    

  


  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      tobj: Object,
    },
    setup(props, context) {
      const deadline = ref(null);
      const taskname = ref(props.tobj.taskname);
      const description = ref(props.tobj.description);
      
      // Access seconds property and multiply by 1000 for milliseconds
      const timestamp = props.tobj.dateline.seconds * 1000;
      const dateObj = new Date(timestamp);
      const date = dateObj.toLocaleDateString();
  
      deadline.value = date;
      const emitC=()=>{
        context.emit("close")
      }
      return {
        taskname,
        description,
        deadline,
        emitC
      };
    },
  };
  </script>
  
<style>
  .centered-component {
    position: fixed;
    background-color: #FFFBE6;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
</style>