import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "tailwindcss/tailwind.css"
import { auth } from '@/firebase/config'
import { createPinia } from 'pinia'; // Import createPinia
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
