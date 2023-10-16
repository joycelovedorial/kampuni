<template>
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="First Name" v-model ="firstName">
        <input type="text" required placeholder="Last Name" v-model ="lastName">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder='password' v-model="password">
        <input type="date" id="birthday" v-model="birthday">
        <input type="text" v-model="country" placeholder="country" id="country">
        <textarea id="bio" v-model="bio" cols="30" rows="10" placeholder="bio"></textarea>
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
        
        const firstName = ref("")
        const lastName = ref("")
        const birthday = ref("")
        const country = ref("")
        const bio = ref("")
        const email = ref("")
        const password = ref("")

        const {error, signup} = useSignup()

        const handleSubmit = async () => {
            await signup(email.value, password.value, firstName.value)
            if (!error.value){
              context.emit('signup')
            }
        }

        const signupGoogle = async () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
            };

        return { firstName,lastName,country,birthday,bio, email, password, handleSubmit, error, signupGoogle}
    }    
}

    

</script>

<style>

</style>