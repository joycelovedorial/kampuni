<template>
    <form>
        
        <input class="form-control" type="email" required placeholder="email" v-model="email">
        <input class="form-control" type="password" required placeholder='password' v-model="password">
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
            signInWithPopup(auth, provider)
            signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
            };

        return { email, password, handleSubmit,signupGoogle}
   }  
}
</script>

<style>

</style>
