<template>
    <body>
    <div>Logo Container</div>
        <p>Welcome</p>
        <div v-if="registered">
            <LoginForm @login="handleLogin"/>
        <button @click="registered=!registered">Click here to Sign Up</button>
        </div>
        <div v-else>
            <SignupForm @signup="handleLogin"/>
        <button @click="registered=!registered">Click here to Login</button>

        </div>
    </body>
</template>

<!-- // In your component's template -->


<script>
import LoginForm from '@/components/LoginForm.vue';
// import backgroundImage from '@/assets/background_img/background1.PNG';
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
body {
    background-image: url('../assets/background_img/background1.PNG') ;
    }

</style>