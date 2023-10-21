<template>
    <div class="logo-container container-fluid">
        <img id="logo" src="../assets/logo.png"/> 
    </div>
    <!-- <div class="flex flex-col items-center">
        <label for="first-name" class="block text-sm font-medium text-gray-900 mb-1">First name</label>
        <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
    </div> -->
    <div class="container-fluid loginform">
        <div v-if="registered">
            <LoginForm @login="handleLogin"/>
            <button @click="registered=!registered">Click here to Sign Up</button>
        </div>
        <div v-else>
            <SignupForm @signup="handleSignup"/>
            <button @click="registered=!registered">Click here to Login</button>
        </div>
    </div>
</template>



<script>
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';
import { ref } from 'vue';
import {useRouter} from 'vue-router'


export default {

    components: { LoginForm, SignupForm },
    setup(){
        const registered = ref(true)
        const router = useRouter()

        const handleLogin = () =>{
            // need if statement to redirect to joinCommunity page
            router.push({name:"Homepage"})
        }

        const handleSignup = () => {
            router.push({name:"joinCommunity"})
        }
        return {registered,handleLogin,handleSignup}
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