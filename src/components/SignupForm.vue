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
import { GoogleAuthProvider, signInWithPopup,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase/config'
import { doc, addDoc, setDoc, collection } from "firebase/firestore"; 



export default {
    setup(props,context){
        const error = ref(null)
        const firstName = ref("")
        const lastName = ref("")
        const email = ref("")
        const password = ref("")
        const birthday = ref("")
        const country = ref("")
        const bio = ref("")
        const errorMessage = ref("")

        const userref = collection(db, 'users')
        const handleSubmit = async () => {
            await createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((cred) => {
                setDoc(doc(db,"users",cred.user.uid),{
                    firstname: firstName.value,
                    lastname: lastName.value,
                    email: email.value,
                    password: password.value,
                    birthday: birthday.value,
                    country: country.value,
                    bio: bio.value, 
                    community: null,
                })
                context.emit('signup')
            }).catch((error)=>{
                console.log(error)
            })
            }
        

        const signupGoogle = async () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider)
            .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // Getting user id 
            const uid = user.uid;
            const googleEmail = user.email;

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


        
        return {
                firstName,lastName,
                country,birthday,
                bio, 
                email, password, 
                handleSubmit, 
                error,
                signupGoogle,
                
        }
    }    
}

    

</script>

<style>

</style>