<template>
  Calendar (Actual)
  <h1>Hullooo</h1>

  <div id="calendar">
    <!-- Please just display the calendar here -->
    <iframe src="https://calendar.google.com/calendar/embed?src=80648a128124b84f8e91f2a5dd563e9b8d7f03f8ea9db0d699a269fa1cf37ecf%40group.calendar.google.com&ctz=Asia%2FSingapore" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
  </div>

</template>

<script>
import { auth, db } from '@/firebase/config'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';
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

      gapi.load('client:auth2', () => {
            gapi.client.init({
              apiKey: 'AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc',
              clientId: '983837246823-812neqdil8dm6u63esa1nalqub3iknpo.apps.googleusercontent.com',
              discoveryDocs: ['https://www.googleapis.com/auth/calendar'],
              scope: 'https://www.googleapis.com/auth/spreadsheets',
            }).then(() => {
                gapi.auth2.getAuthInstance().signIn();

                gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': (new Date()).toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime'
                }).then((response) => {
                    const events = response.result.items;
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

    return {login, myGoogleCalendar}
    }
  }
}

</script>

<style>

</style>