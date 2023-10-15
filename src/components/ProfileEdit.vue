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
            <input type="email" required placeholder="Email" v-model="email">
            <input type="password" required placeholder="password" v-model="password">
            <button>Login</button>
        </form>
    </template>
    
    <script>
    export default {
        data(){
        return {
            email: "",
            password: "",
            error_msg: "",
        }
        },
        methods:{
            checkValidity(){
                // 1. Check if email exists
                // 2. Check if password matches email
                // Not sure how to retrieve these info from firebase :")
            }
        }    
    }
    </script>
    
    <style>
    
    </style>
    