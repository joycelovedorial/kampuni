<template>
    <h2>Signup</h2>
    <form>
        Email <input type="email" required placeholder="Email" v-model="email">
        <br><br>
        Password <input type="password" required placeholder="password" v-model="password1">
        <br><br>
        Re-Enter Password <input type="password" required placeholder="password" v-model="password2">
        <br><br>
        <button v-on:click="checkValidity()">Next</button>
        <div id="errors">{{ error_msg }}</div>

        <br><br><br><br>

        Firstname <input type="text">
        <br><br>
        Lastname <input type="text">
        <br><br>
        Birthday <input type="date"/>
        <br><br>
        Country <input type="text">
        <br><br>
        <button>Back</button>
        <br><br>
        <button>Next</button>

        <br><br><br><br>

        <p>Add a bio: </p>
        <input type="text-area"/>
        <br><br>
        <p>Profile pic: </p>
        <input type="file"/>
        <br><br>
        <button>Back</button>
        <br><br>
        <button>Next</button>

        <br><br><br><br>

        <h2>You've successfully created your account! Please login to your new account below</h2>

    </form>
</template>

<script>

export default {
    data(){
        return {
            email: "",
            password1: "",
            password2: "",
            error_msg: "",
        }
    },
    methods:{
        checkValidity(){
            // Check if the passwords match
            if (this.password1 != this.password2){
                this.error_msg = "passwords do not match";
            }
            
        }
    }    
}

    

</script>

<style>

</style>