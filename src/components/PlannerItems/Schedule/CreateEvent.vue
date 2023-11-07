<template>
    <div class="create-outing container-fluid">
        
      <form class="form-control font-bold leading-loose text-center text-cyanp font-fredoka text-x" @submit.prevent="createEvent">

        <button @click="emitCe" class="float-left">
            <svg class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        </button>

          Create Event
          <div class="row">
            
              <div>
                  <label for="title">Title</label>
                  <input class="form-control col-6 " type="text" v-model="title" id="title">
              </div>
              
              <div>
                  <label for="desc">Description</label>
                  <input class="form-control col-6" type="text" v-model="desc" id="desc">
              </div>
          </div>
          <div>
              <label for="location">Location</label>
              <input class="form-control" type="text" v-model="location" id="location">
          </div>
  
  
          <div>
              <label for="date">Date</label>
              <input class="form-control" type="datetime-local" id="date" v-model="date">
          </div>
         
          <button class="h-10 px-3 text-white font-bold text-sm rounded-sm bg-cyanp hover: hover:drop-shadow-md hover:shadow-oranges">Create Event</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth, db } from "@/firebase/config";
  import { ref } from 'vue'
  import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore"; 
  
  export default {
      setup(props,context){
          const title = ref("")
          const desc = ref("")
          const location = ref("")
          const date = ref("")
  
          const createEvent = async() => {
              const user = auth.currentUser
              const uid = user.uid
              const docSnap = await getDoc(doc(db,"users",uid))
              const docData = docSnap.data()
         
              const cid = docData.community
  
              const dateOut = new Date(date.value)
  
              const eventRef = await addDoc(collection(db, "events"), {
                      userid: uid,
                      date: Timestamp.fromDate(dateOut),
                      location: location.value,
                      description: desc.value,
                      title: title.value,
                  });
  
              if (eventRef) {
              console.log("Event Created");
              }
              context.emit("emitCe")
          }
              
          const emitCe = () =>{
              context.emit("emitCe")
          }
  
  
          return{ createEvent,
              title,desc,location,date,emitCe
          }
      }
  }
  </script>
  
  <style>
  
  </style>