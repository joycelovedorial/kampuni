<template>
    <div>
        <img id="logo" src="src/assets/logo.jpg"/> 
    </div>
    <form>
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder='password' v-model="password">
        <div class="error">{{ error }}</div>
        <button>Login</button>
        <button @click="signupGoogle">Google</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "@/firebase/config"

export default {
   setup(){
        const email = ref("")
        const password = ref("")

        const {error, login} =useLogin()
        const handleSubmit = async () => {
            await login(email.value, password.value)
            if (!error.value){
              context.emit('login')
            }
        }
        const signupGoogle = async () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
            };

        return { email, password, handleSubmit,signupGoogle}
   }  
}
</script>

<style>

</style>
