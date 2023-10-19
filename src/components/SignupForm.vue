<template>
    <h2>Signup</h2>
    <form @submit.prevent="handleSubmit">
        <input type="text" required placeholder="First Name" v-model ="firstName">
        <input type="text" required placeholder="Last Name" v-model ="lastName">
        <input type="email" required placeholder="email" v-model="email">
        <input type="password" required placeholder='password' v-model="password">
        <input type="date" id="birthday" v-model="birthday">
        <input type="text" placeholder="country" id="country" v-model="country">
        <textarea id="bio" cols="30" rows="10" placeholder="bio" v-model="bio"></textarea>
        <div class="error">{{ error }}</div>
        <button>Sign Up</button>
        <button @click="signupGoogle">Google</button>
    </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/composables/useSignUp';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '@/firebase/config'
import { doc, addDoc, setDoc, collection } from "firebase/firestore"; 



export default {
    setup(props,context){
        
        const firstName = ref("")
        const lastName = ref("")
        const email = ref("")
        const password = ref("")
        const birthday = ref("")
        const country = ref("")
        const bio = ref("")

        const {error, signup} = useSignup()
        const userref = collection(db, 'users')
        const handleSubmit = async () => {
            await signup(email.value, password.value, firstName.value)
            if (!error.value){
                context.emit('signup')
                await addDoc(userref, {
                    firstname: firstName.value,
                    lastname: lastName.value,
                    email: email.value,
                    password: password.value,
                    birthday: birthday.value,
                    country: country.value,
                    bio: bio.value, 
                    });

            }
            
        }

        const signupGoogle = async () => {
            const provider = new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
            };

        // Add a new document in collection "cities"
        
        return { firstName,lastName,country,birthday,bio, email, password, handleSubmit, error, signupGoogle}
    }    
}

    

</script>

<style>

</style>