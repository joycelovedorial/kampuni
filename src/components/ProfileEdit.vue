<template>
        <h2>Profile</h2>
        <form>
            <button>Edit Profile</button>
            <!-- retrieve these details from firebase -->
            Profile Pic
            First Name:  
            Last Name:
            Email:
            Birthday:
            Country: 
            Bio:
            Community: Can choose to leave community but will be prompted to joinCommunity.vue
            <input type="email" required placeholder="Email" v-model="email">
            <input type="password" required placeholder="password" v-model="password">
            <button>Login</button>
        </form>
    </template>
    
    <script>
import { ref } from 'vue'
    export default {
        setup(){
            const firstName = ref("")
            
        }
           
    }
    </script>
    
    <style>
    
    </style>
    