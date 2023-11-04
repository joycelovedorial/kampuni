<template>
  <div class="object-right w-auto font-fredoka font-bold">
    <nav class="bg-bnorm flex justify-between items-center h-18">
      <div class="relative inline-block text-right mx-3">
        <img class="logo inline ml-3" src="../assets/logo.png">
      </div>
      <div class="flex space-x-4 mr-10">
        <div class="button bg-bpop text-sm rounded-lg w-30 place-content-center flex items-center shadow-bpop"
          :class="{
            'drop-shadow-lg': $route.name !== 'Homepage',  // Apply 'bg-cyans' when not active
            'shadow-inner': $route.name === 'Homepage',   // Apply 'bg-white' when active
            'drop-shadow-none': $route.name === 'Homepage',   // Apply 'bg-white' when active
          }"
          :disabled="$route.name === 'Homepage'" 
        >
          <router-link to="../Homepage" class="p-2 place-content-center flex items-center">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
            </svg>
            <span class="ml-1">Home</span>
          </router-link>
        </div>
        <!--  -->
        
        <div class="button bg-bpop text-sm rounded-md w-30 place-content-center flex items-center shadow-bpop"
          :class="{
            'drop-shadow-lg': $route.name !== 'Chatrooms',  // Apply 'bg-cyans' when not active
            'shadow-inner': $route.name === 'Chatrooms',   // Apply 'bg-white' when active
            'drop-shadow-none': $route.name === 'Chatrooms', // Apply 'text-oranges' when active
            'bg-[#C295C7]': $route.name === 'Chatrooms',
          }" 
          :disabled="$route.name === 'Chatrooms'" 
        >
          <router-link to="../Chatrooms" class="p-2 place-content-center flex items-center">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
            </svg>
            <span class="ml-1"> <!-- Adjust the margin-left (ml) as needed -->
              Chats
            </span>
          </router-link>
        </div>
        <div class="button  text-sm rounded-md w-30 place-content-center flex items-center shadow-bpop"
          :class="{
            'drop-shadow-lg': $route.name !== 'Planner',  // Apply 'bg-cyans' when not active
            'shadow-inner': $route.name === 'Planner',   // Apply 'bg-white' when active
            'drop-shadow-none': $route.name === 'Planner', // Apply 'text-oranges' when active
            'bg-b': $route.name === 'Planner',
          }"
          :disabled="$route.name === 'Planner'" 
        >
          <router-link to="../Planner" class="p-2 place-content-center flex items-center">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/>
            </svg>
            <span class="ml-1"> <!-- Adjust the margin-left (ml) as needed -->
              Planner
            </span>
          </router-link>
        </div>
        <div class="button bg-bpop text-sm rounded-md w-30 place-content-center flex items-center shadow-bpop"
          :class="{
            'drop-shadow-lg': $route.name !== 'Expenses',  // Apply 'bg-cyans' when not active
            // 'text-cyanp': $route.name !== 'Expenses', // Apply 'text-white' when not active
            'shadow-inner': $route.name === 'Expenses',   // Apply 'bg-white' when active
            'drop-shadow-none': $route.name === 'Expenses', // Apply 'text-oranges' when active
            'bg-[#99B898]': $route.name === 'Expenses',
          }"
          :disabled="$route.name === 'Expenses'" 
        >
          <router-link to="../Expenses" class="p-2 place-content-center flex items-center">
            <svg class="inline w-5 h-5" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/>
            </svg>
            <span class="ml-1"> <!-- Adjust the margin-left (ml) as needed -->
              Expenses
            </span>
          </router-link>
        </div>
      </div>
      <div class="relative inline-block mr-3 w-36">
        <img class="inline cursor-pointer h-12 w-12 rounded-full border-3 border-black" :src="imageURL" alt="" @click="toggleDropdown">
        <div :class="{ 'hidden': !dropdownVisible }" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <router-link to="../Profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View Profile</router-link>
            <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="handleLogout" role="menuitem">Logout</button>
          </div>
        </div>
      </div>

    </nav>
  </div>
</template>

<script>
import '@/assets/main.css';
import { ref } from 'vue';
import { auth,storage,db } from '@/firebase/config';
import { useRouter } from 'vue-router'; // Import the useRouter function
import { doc, getDoc } from 'firebase/firestore';
import {  getDownloadURL } from "firebase/storage";


export default {
    setup() {
        const router = useRouter(); // Initialize the router
        const dropdownVisible = ref(false);
        const imageURL = ref("")

        const user = auth.currentUser
        const uid = user.uid
        getDoc(doc(db,'users',uid))
          .then((snap)=>{
            const data = snap.data()

            if (data.photoURL){
              imageURL.value=data.photoURL
            }


          })

        const handleLogout = async () => {
            try {
                await auth.signOut();
                // Redirect to the login page (Welcome page)
                router.push({ name: 'Welcome' });
            } catch (error) {
                // Handle the sign-out error if needed
                console.error('Error signing out:', error);
            }
        };
        

        const toggleDropdown = () => {
          dropdownVisible.value = !dropdownVisible.value
        }

        return { handleLogout, dropdownVisible, toggleDropdown,imageURL };
    }
};
</script>


<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .logo {
    width: 180px;
  }

  img {
    width: 20px;
  }

  a {
    padding: 0 24px;
  }
</style>
