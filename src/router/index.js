import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Homepage from '../views/Homepage.vue'
import Planner from '../views/Planner.vue';
import Chatrooms from '../views/chatroom/Chatrooms.vue'
import joinCommunity from '../views/joinCommunity.vue'
import Profile from '../views/Profile.vue'
import Expenses from '@/views/Expenses.vue'
import amos from '@/assets/profiles/amos.jpg'
import eman from '@/assets/profiles/eman.jpg'
import anyu from '@/assets/profiles/anyu.jpg'
import joyce from '@/assets/profiles/joyce.jpg'
import snekha from '@/assets/profiles/snekha.jpg'
import sandra from '@/assets/profiles/sandra.jpg'

import ProfilePage from '../views/ProfilePage.vue'
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
    path:'/Profiles/:id',
    name:'Profiles',
    component: ProfilePage,
    props:true
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
  },
  {
    path:'/profiles/amos.jpg',
    name:"amospic",
    component: amos
  }
  ,
  {
    path:'/profiles/eman.jpg',
    name:"emanpic",
    component: eman
  }
  ,
  {
    path:'/profiles/sandra.jpg',
    name:"sandrapic",
    component: sandra
  }
  ,
  {
    path:'/profiles/anyu.jpg',
    name:"anyupic",
    component: anyu
  }
  ,
  {
    path:'/profiles/jocye.jpg',
    name:"jocyepic",
    component: joyce
  }
  ,
  {
    path:'/profiles/snekha.jpg',
    name:"snekhapic",
    component: snekha
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
