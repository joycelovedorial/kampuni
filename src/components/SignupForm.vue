<template>
    <h2>Signup</h2>
    <form>
        Email <input type="email" required placeholder="Email" v-model="email">
        <br><br>
        Password <input type="password" required placeholder="password" v-model="password">
        <br><br>
        Re-Enter Password <input type="password" required placeholder="password" v-model="password">
        <br><br>
        <div id="errors"></div>
        <button onclick="checkPassword()">Next</button>

        <br><br><br><br>

        Firstname <input type="text">
        <br><br>
        Lastname <input type="text">
        <br><br>
        Birthday <Calendar v-model="date" showIcon />
        <br><br>
        Country <input type="text">
        <br><br>
        <button>Back</button>
        <br><br>
        <button>Next</button>

        <br><br><br><br>

        <p>Add a bio: </p>
        <br><br>
        <p>Profile pic: </p>
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
        var email=''
        var password1 =''
        var password2 = ''

        return {email, password1, password2}

    },

    checkPassword(){
        error_msg = "";
        if (password1 != password2){
            error_msg += "passwords do not match";
        }
        document.getElementById("errors").innerHTML = error_msg;
    }
    
}

    

</script>

<style>

</style>