<template>
    <div>
       

    <div class="centered-component rounded-lg p-5 rounded-2 border-2 border-black space-y-2 font-fredoka">
        <button @click="emitC">X</button>
        <div class="text-b">
            <h1 class="text-2xl font-bold text-center font-fredoka">
                {{ title }}
            </h1>
            <p class="text-center">
                {{ description }}
            </p>
        </div>
        <div class="bg-b rounded-lg shadow-inner p-3">
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>


                {{  location }}
            </p>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

                {{ date }}
            </p>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                {{ time }}
            </p>
        </div>
       <div class="flex justify-center">
        <button class="rounded-lg border-b border-2 text-b px-2" @click="emitC">
            Close
        </button>
       </div>

    </div>
    <!-- <div v-else class="centered-component rounded-lg p-5 rounded-2 border-2 border-black space-y-2 font-fredoka">
        <button @click="emitC">X</button>
        <div class="text-b">
            <input type="text" :placeholder="title" v-model="etitle">
            <input type="text" :placeholder="description" v-model="edesc">
        </div>
        <div class="bg-b rounded-lg shadow-inner p-3">
            <div class="block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
            <input type="text" :placeholder="location" v-model="elocation">
            </div>
            <div class="block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

             <input type="date" :placeholder="date" v-model="edate">
            </div>
            <div class="block">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

                <input type="time" :placeholder="time" v-model="etime">
            </div>
        </div>
       <div class="flex justify-center">
        <button @click="editOuting"  class="rounded-lg border-b border-2 text-b px-2">
            edit outing
        </button>
       </div>

    </div> -->
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
        const toEdit=ref(true)
        const etitle=ref('')
        const elocation =ref('')
        const edesc = ref('')
        const etime =ref('')
        const edate=ref('')
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

        const editOuting = async()=>{
            const combinedDateTime = new Date(`${edate.value}T${etime.value}`);

                // Check if combinedDateTime is a valid Date
                if (isNaN(combinedDateTime)) {
                // Handle the case where the date and time input are invalid
                console.error('Invalid date or time input');
                return;
                }

            const uref = updateDoc(doc(db,"outings",props.oobj.id),{
                description:edesc.value,
                title:etitle.value,
                location:elocation.value,
                date:combinedDateTime,
            })
        context.emit("close")

        }

        const emitC=()=>{
        context.emit("close")
      }
       return{
           title,location,description,date,time,toEdit,editOuting,etitle,elocation,edesc,edate,etime,editOuting,emitC
       }
   }
}
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