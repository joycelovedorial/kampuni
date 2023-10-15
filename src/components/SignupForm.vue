<template>
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="display name" v-model ="displayName">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder='password' v-model="password">
        <div class="error">{{ error }}</div>
        <button>Sign Up</button>
        <button @click="signupGoogle">Google</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignUp';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/config'


export default {
    setup(props,context){
        
        const displayName = ref("")
        const email = ref("")
        const password = ref("")

        const {error, signup} = useSignup()

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
            if (!error.value){
              context.emit('signup')
            }
        }

        const signupGoogle = async () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
            };

        return { displayName, email, password, handleSubmit, error, signupGoogle}
    }    
}

    

</script>

<style>

</style>