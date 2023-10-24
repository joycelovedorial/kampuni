import { createApp } from 'vue'
import VueGapi from 'vue-gapi'


const app = createApp({})

app.use(VueGapi, {
  apiKey: 'AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc',
  clientId: '983837246823-rq4jrg2mjh9bdcm89aqni27d8l0q95ci.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets',
})