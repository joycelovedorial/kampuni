<template>
    <div class="artboard artboard-horizontal phone-2 centered-component">
      <div>
        Title: {{ taskname }}
        Description: {{ description }}
        Deadline: {{ deadline }}
      </div>
    </div>
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
  
      return {
        taskname,
        description,
        deadline,
      };
    },
  };
  </script>
  
<style>
  .centered-component {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
</style>