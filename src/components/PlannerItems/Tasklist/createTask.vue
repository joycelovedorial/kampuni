<!-- <template>
    <div class="container create-task bg-white">
        <div class="fixed inset-0 bg-black opacity-50" v-if="showPopup" @click="closePopup">
            <transition name="popup">
    
                    <form @submit.prevent>
                        <div class="d-block">
                            <label for="taskname">Task Name</label>
                            <input type="text" id="taskname" v-model="taskname">
                        </div>
                
                        <div class="d-block">
                            <label for="description">Description</label>
                            <input type="text" id="description" v-model="description">
                        </div>
                
                        <div class="d-block">
                            <label for="dateline">Dateline</label>
                            <input type="datetime-local" id="dateline" v-model="dateline">
                        </div>
                
                        <div class="d-block">
                            <label for="countdown">Allocate By</label>
                            <input type="datetime-local" id="countdown" v-model="countdown">
                        </div>
                        <button @click="createTask">Create!</button>
                    </form>
            </transition>
        </div>
        
    </div>
  </template>
   -->
<template>
    <transition name="popup">
        <div class="popup create-task bg-white">
            <h1 class="font-bold leading-loose text-center">
                New Task
            </h1>
            <form @submit.prevent>
                <div class="d-block">
                    <label class="text-sm d-block" for="taskname">Task Name</label>
                    <input type="text" id="taskname" v-model="taskname">
                </div>

                <div class="d-block">
                    <label class="text-sm d-block" for="desc">Description</label>
                    <input type="text" id="desc" v-model="description">
                </div>

                <div class="d-block">
                    <label class="text-sm d-block" for="dateline">Dateline</label>
                    <input type="datetime-local" id="dateline" v-model="dateline">
                </div>

                <div class="d-block">
                    <label class="text-sm d-block" for="countdown">Allocate By</label>
                    <input type="datetime-local" id="countdown" v-model="countdown">
                </div>
                <button @click="createTask">Create!</button>
            </form>
        </div>
    </transition>
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
/* Style for pop-up container */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

/* Vue transition for the floating down effect */
.popup-enter-active {
  transition: transform 5s ease-in-out;
}
.popup-enter-from {
  transform: translate(-50%, -70%);
}
.popup-enter-to {
  transform: translate(-50%, -50%);
}
.popup-leave-active {
  transition: transform 5s ease-in-out;
}
.popup-leave-to {
  transform: translate(-50%, -70%);
}
</style>
