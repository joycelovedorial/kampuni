<template>
  <div>My Calendar</div>
  
</template>

<script setup>
// import { capitalize } from './helpers'
import {auth} from "../../../firebase/config.js"
import { getAuth, signInWithRedirect,getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useTokenStore } from '../../../store/store.js'

const store = useTokenStore()
console.log(store.token, store.useremail)

/*
axios.get("https://www.googleapis.com/calendar/v3/calendars/calendarId/events", {
  params: {
    calendarId: store.token,
  }
})
.then(response => {
  var my_events = response.data();
  for (a_event in my_events){
    console.log(a_event);
  }
})
.catch(error => {
  console.log(error.message)
})
*/

</script>

<style scoped>

</style>


