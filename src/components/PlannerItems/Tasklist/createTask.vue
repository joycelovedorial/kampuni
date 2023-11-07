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
        <div class="popup create-task bg-white rounded-md w-9/12">
            <h1 class="font-bold leading-loose text-center text-cyanp font-fredoka text-xl">
                New Task
            </h1>
            <span><button @click="emitCt">X</button></span>
            <form @submit.prevent="createTask">
                <div class="d-block py-2">
                    <label class="font-bold leading-loose text-center text-cyanp font-fredoka text-xl" for="taskname">Task Name</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <!-- <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00"> -->
                        <input class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyanp sm:text-sm" type="text" id="taskname" required v-model="taskname">
                    </div>
                </div>

                <div class="d-block py-2">
                    <label class="font-bold leading-loose text-center text-cyanp font-fredoka text-xl" for="desc">Description</label>
                    <div class="relative mt-2 rounded-md shadow-sm">
                        <input class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyanp sm:text-sm" type="text" id="desc" required v-model="description">
                    </div>
                </div>

                <div class="flex gap-4">
                    <div class="d-block py-2 w-5/12">
                        <label class="font-bold leading-loose text-center text-cyanp font-fredoka text-xl" for="dateline">Deadline</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                            <input class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyanp sm:text-sm" type="datetime-local" id="dateline" required v-model="dateline">
                        </div>
                    </div>

                    <div class="d-block py-2 w-5/12">
                        <label class="font-bold leading-loose text-center text-cyanp font-fredoka text-xl" for="countdown">Assigned in</label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                            <input class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-cyanp sm:text-sm" type="datetime-local" id="countdown" required v-model="countdown">
                        </div>
                    </div>
                </div>
                <div class="flex justify-center pt-4">
                    <button class="h-10 px-3 text-white font-bold text-sm rounded-sm bg-cyanp hover: hover:drop-shadow-md hover:shadow-oranges" >Create!</button>
                </div>
            </form>
        </div>
    </transition>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore"; 
import { auth,db } from '@/firebase/config';
export default {
    setup(props,context){    
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
                console.log("Task created",docRef.id);
                }
                } else {
                    console.error("Invalid date format in Allocate By");
                }
            taskname.value=""
            description.value=""
            countdown.value=""
            dateline.value=""    
            context.emit("closeCreateTask")
            };
        const emitCt = () =>{
            context.emit("closeCreateTask")
        }


        return { createTask,
            taskname, description, countdown, dateline, emitCt
        }
    }
}
</script>

<style>
/* Style for the pop-up container */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: white; */
  padding: 20px;
  /* border-radius: 5px; */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

/* Vue transition for the floating down effect */
.popup-enter-active {
  transition: transform 0.5s ease-in-out;
}
.popup-enter-from {
  transform: translate(-50%, -70%);
}
.popup-enter-to {
  transform: translate(-50%, -50%);
}
.popup-leave-active {
  transition: transform 0.5s ease-in-out;
}
.popup-leave-to {
  transform: translate(-50%, -70%);
}
</style>
