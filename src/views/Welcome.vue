<template>
    <body>
    <div class="logo-container container-fluid">
        <img id="logo" src="../assets/logo.png"/> 
    </div>
       
        <div class="container-fluid loginform">
            <div v-if="registered">
                <LoginForm @login="handleLogin"/>
                <button @click="registered=!registered">Click here to Sign Up</button>
            </div>
            <div v-else>
                <SignupForm @signup="handleLogin"/>
                <button @click="registered=!registered">Click here to Login</button>
            </div>
        </div>
    </body>
</template>



<script>
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';
import { ref } from 'vue';
export default {

    components: { LoginForm, SignupForm },
    setup(){
        const registered = ref(true)

        return {registered}
    }

}
</script>

<style>
#logo{
    margin: 0 auto;
    border-radius: 20px;
}
#logo{
    width: 100%;
    height: 100%;
}
.logo-container {
    width:400px;

}

.loginform{
    display: flex;
    justify-content: center;
    align-items: center;
}

.loginform input{
    border-radius: 10px;
}



</style>