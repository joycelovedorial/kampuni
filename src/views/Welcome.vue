<template>
    <div class="bg-fixed" style="background-image: url('img/background1.PNG')"></div>
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
</style>