<template>
        <h2>Profile</h2>
        <form>
            <input type="email" required placeholder="Email" v-model="email">
            <input type="password" required placeholder="password" v-model="password">
            <button>Login</button>
        </form>
    </template>
    
    <script>
    export default {
        setup(){
            const displayName=''
            const email =''
            const password = ''
    
    
            return {displayName,email,password}
        }
    }
    </script>
    
    <style>
    
    </style>
    