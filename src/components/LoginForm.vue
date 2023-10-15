<template>
    <img src="kampuni_logo.jpg"/> 
    <form>
        <input type="email" required placeholder="Email" v-model="email">
        <br><br>
        <input type="password" required placeholder="password" v-model="password">
        <br><br>
        <button v-on:click="checkValidity()">Login</button>
        <p>or</p>
        <button>Sign Up</button>
        <br><br><br><br>
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
