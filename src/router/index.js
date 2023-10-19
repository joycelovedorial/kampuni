import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Homepage from '../views/Homepage.vue'
import Calendar from '../views/Calendar.vue'
import Chatrooms from '../views/chatroom/Chatrooms.vue'
import joinCommunity from '../views/joinCommunity.vue'
import Outings from '../views/Outings.vue'
import Profile from '../views/Profile.vue'
import Chatroom from '../views/chatroom/Chatroom.vue'
import Tasklist from '../views/Tasklist.vue'

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
  {
    path: '/Calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/Chatrooms',
    name: 'Chatrooms',
    component: Chatrooms
  },
  {
    path:'/joinCommunity',
    name:'joinCommunity',
    component: joinCommunity
  },
  {
    path:'/Profile',
    name:'Profile',
    component: Profile
  },
  {
    path:'/Outings',
    name:'Outings',
    component: Outings
  },
  {
    path:'/Chatrooms/:id',
    name: 'Chatroom',
    component: Chatroom
  },
  {
    path:'/Tasklist',
    name: 'Tasklist',
    component: Tasklist
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
