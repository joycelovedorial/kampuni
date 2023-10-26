<template>
  Calendar (Actual)
  <h1>Hullooo</h1>

  <div id="calendar">
    <!-- Please just display the calendar here -->
    
  </div>

</template>

<script>
import { auth, db } from '@/firebase/config'
import googles from '@/views/Welcome.vue'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';
import Vue from 'vue'
import VueGapi from 'vue-gapi'
import { createGapi } from 'vue-gapi'
import { useGapi } from 'vue-gapi'




export default {
  setup(){

    const gapi = useGapi();

    function login() {
      gapi.login().then(({ currentUser, gapi, hasGrantedScopes }) => {
        console.log({ currentUser, gapi, hasGrantedScopes })
      })
    }
    
    const myGoogleCalendar = async() => {

      
      // !gapi.auth2.getAuthInstance().isSignedIn.get()
      if (googles == "yars") {
        // You might want to prompt the user to sign in here.
        gapi.load('client:auth2', () => {
          gapi.client.init({
              apiKey: 'AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc',
              clientId: '983837246823-812neqdil8dm6u63esa1nalqub3iknpo.apps.googleusercontent.com',
              discoveryDocs: ['https://www.googleapis.com/auth/calendar'],
              scope: 'https://www.googleapis.com/auth/calendar',
            }).then(() => {
                $gapi.auth2.getAuthInstance().signIn();

                $gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then((response) => {
                    const events = response.result.items;
                    console.log(events);
                    const calendarDiv = document.getElementById('calendar');
                    for (const event of events) {
                        const eventDiv = document.createElement('div');
                        eventDiv.innerHTML = `${event.summary} - ${event.start.dateTime}`;
                        calendarDiv.appendChild(eventDiv);
                    }
                }).catch((error) => {
                  console.log(error);
                });
            });
        });

      }
      
    return {login, myGoogleCalendar}
    }
  }
}

</script>

<style>

</style>