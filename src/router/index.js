import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Homepage from '../views/Homepage.vue'
import Planner from '../views/Planner.vue';
import Chatrooms from '../views/chatroom/Chatrooms.vue'
import joinCommunity from '../views/joinCommunity.vue'
import Profile from '../views/Profile.vue'
import Expenses from '@/views/Expenses.vue'


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
    component: Homepage,
    props: true
  },
  {
    path: '/Planner',
    name: 'Planner',
    component: Planner
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
    path:'/Expenses',
    name: 'Expenses',
    component: Expenses
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
