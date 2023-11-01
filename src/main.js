import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "tailwindcss/tailwind.css"
import { createPinia } from 'pinia'
import { auth } from '@/firebase/config'

const pinia = createPinia();

let app
auth.onAuthStateChanged(()=> {
    if(!app){
        app = createApp(App)
        .use(router)
        .use(pinia)
        .mount('#app')
    }
})



