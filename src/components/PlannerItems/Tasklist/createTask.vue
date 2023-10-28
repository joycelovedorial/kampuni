<template>
  <div class="container create-task">
    <form @submit.prevent>
        <label for="taskname">Task Name</label>
        <input type="text" id="taskname" v-model="taskname">
        <label for="descr">Description</label>
        <input type="text" id="desc" v-model="description">
        <label for="dateline">Dateline</label>
        <input type="datetime-local" id="dateline" v-model="dateline">
        <label for="countdown">Allocate By</label>
        <input type="datetime-local" id="countdown" v-model="countdown">
        <button @click="createTask">Create!</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore"; 
import { auth,db } from '@/firebase/config';
export default {
    setup(){    
        const taskname = ref("")
        const description = ref("")
        const countdown = ref("")
        const dateline = ref("")
        //task: autoid
        //uid:null
        //points:20
        //overdue:false
        const createTask = async () => {
            const currentDateTime = new Date();
            const cd = new Date(countdown.value) - currentDateTime;
            const datelineDate = new Date(dateline.value);

            const user = auth.currentUser
            const uid = user.uid
            const docSnap = await getDoc(doc(db,"users",uid))
            const docData = docSnap.data()
            const cid = docData.community
            if (!isNaN(cd)) {
                const countdownTimestamp = Timestamp.fromDate(new Date(currentDateTime.getTime() + cd)); // Create a Timestamp
                const datelineTimestamp = Timestamp.fromDate(datelineDate);
                const docRef = await addDoc(collection(db, "tasks"), {
                    userid: null,
                    commid: cid,
                    taskname: taskname.value,
                    taskstatus: false,
                    description: description.value,
                    points: 20,
                    overdue: false,
                    countdown: countdownTimestamp,
                    dateline: datelineTimestamp,
                });

                if (docRef) {
                console.log("Task created");
                }
                } else {
                    console.error("Invalid date format in Allocate By");
                }
            };


        return { createTask,
            taskname, description, countdown, dateline, 
        }
    }
}
</script>

<style>


</style>