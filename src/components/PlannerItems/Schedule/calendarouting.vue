<template>
    <div class="centered-component artboard artboard-horizontal phone-2 ">
       <div>
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
       oobj:Object,
   },
   setup(props,context){
        const date = ref(null); // To store the date part
        const time = ref(null); // To store the time part
        const title= ref(props.oobj.title)
        const location = ref(props.oobj.location)
        const description = ref(props.oobj.description)

        const updateDateAndTime = () => {
            if (props.oobj && props.oobj.date) {
                const timestamp = props.oobj.date.seconds * 1000
                const dateObj = new Date(timestamp);
             
                const dateOptions = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                };

                const timeOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                };

                date.value = dateObj.toLocaleString(undefined, dateOptions);
                time.value = dateObj.toLocaleString(undefined, timeOptions);
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
}

</style>