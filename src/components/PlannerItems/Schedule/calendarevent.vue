<template>
    <div class="centered-component">
       <div class="bg-r text-r">
           Title:{{ title }}
           Description: {{ description }}
           Location: {{  location }}
           Date: {{ date }}
           Time: {{ time }}
       </div>

    </div>
</template>

<script>
import { ref } from 'vue'
export default {
   props:{
       eobj:Object,
   },
   setup(props,context){
        const date = ref(null); // To store the date part
        const time = ref(null); // To store the time part
        const title= ref(props.eobj.title)
        const location = ref(props.eobj.location)
        const description = ref(props.eobj.description)



        const updateDateAndTime = () => {
            if (props.oobj && props.oobj.date) {
                const timestamp = props.oobj.date.seconds;
                const dateObj = new Date(timestamp);
                
        
                date.value = dateObj.toISOString().split('T')[0];
                time.value = dateObj.toTimeString().split(' ')[0];
            } else {
                date.value = null;
                time.value = null;
            }
        };


        updateDateAndTime();

       return{
           title,location,description,date,time
       }
   }
}
</script>

<style>
.centered-component {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color:red;
  height:50%;
}

</style>