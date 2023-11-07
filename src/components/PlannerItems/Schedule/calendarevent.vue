<template>
    <div class="centered-component bg-r">
        <div class="container" v-if="toEdit">
        <div class= "row" >
            {{ title }}
            </div>
            <div class= "row">
                Description: {{ description }}
            </div>
            <div class= "row">
                Location: {{  location }}
            </div>
            <div class= "row">
                Date: {{ date }}
            </div>
            <div class= "row">
            Time: {{ time }}
        </div>
        <button @click="toEdit=!toEdit">Edit</button>
    </div>
    <div class="container" v-else>
        <div class= "row" >
            <input type="text" :placeholder="title" v-model="etitle">
            </div>
            <div class= "row">
                <input type="text" :placeholder="description" v-model="edesc">
            </div>
            <div class= "row">
                <input type="text" :placeholder="location" v-model="elocation">
            </div>
            <div class= "row">
                <input type="date" :placeholder="date" v-model="edate">
            </div>
            <div class= "row">
            <input type="time" :placeholder="time" v-model="etime">
        </div>
        <button @click="editEvent">Confirm Edit Event</button>

    </div>

    </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
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
        const toEdit=ref(true)
        const etitle=ref('')
        const elocation =ref('')
        const edesc = ref('')
        const etime =ref('')
        const edate=ref('')


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

        const editEvent = async()=>{
            const combinedDateTime = new Date(`${edate.value}T${etime.value}`);

                // Check if combinedDateTime is a valid Date
                if (isNaN(combinedDateTime)) {
                // Handle the case where the date and time input are invalid
                console.error('Invalid date or time input');
                return;
                }

            const uref = updateDoc(doc(db,"events",props.eobj.id),{
                description:edesc.value,
                title:etitle.value,
                location:elocation.value,
                date:combinedDateTime,
            })
        }

       return{
           title,location,description,date,time,toEdit,editEvent,etitle,elocation,edesc,edate,etime
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