import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Homepage from '../views/Homepage.vue'
// import { projectAuth } from '../firebase/config'


// const requireAuth = (to,from,next) => {
//   let user = projectAuth.currentUser
//   if(!user){
//     next({name:'Welcome'})
//   }else{
//     next()
//   }
// }

// const requireNoAuth = (to,from,next) => {
//   let user = projectAuth.currentUser
//   if(user){
//     next({name:'Homepage'})
//   }else{
//     next()
//   }
// }

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path:'/homepage',
    name: 'Homepage',
    component: Homepage
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
