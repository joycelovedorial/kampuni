<template>
    <h2>Signup</h2>
    <form>
        Email <input type="email" required placeholder="Email" v-model="email">
        <br><br>
        Password <input type="password" required placeholder="password" v-model="password1">
        <br><br>
        Re-Enter Password <input type="password" required placeholder="password" v-model="password2">
        <br><br>
        <button v-on:click="checkValidity()">Next</button>
        <div id="errors">{{ error_msg }}</div>

        <br><br><br><br>

        Firstname <input type="text">
        <br><br>
        Lastname <input type="text">
        <br><br>
        Birthday <input type="date"/>
        <br><br>
        Country <input type="text">
        <br><br>
        <button>Back</button>
        <br><br>
        <button>Next</button>

        <br><br><br><br>

        <p>Add a bio: </p>
        <input type="text-area"/>
        <br><br>
        <p>Profile pic: </p>
        <input type="file"/>
        <br><br>
        <button>Back</button>
        <br><br>
        <button>Next</button>

        <br><br><br><br>

        <h2>You've successfully created your account! Please login to your new account below</h2>

    </form>
</template>

<script>

export default {
    data(){
        return {
            email: "",
            password1: "",
            password2: "",
            error_msg: "",
        }
    },
    methods:{
        checkValidity(){
            // Check if the passwords match
            if (this.password1 != this.password2){
                this.error_msg = "passwords do not match";
            }
            else{
                addDoc(collection(db, "users"), {
                    email: this.email,
                    password: this.password, 
                })
            }
            
        }
    }    
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB31YYfSk-z2dIVU-_8fYXuWf4MlviXtdc",
    authDomain: "kampuni-85a88.firebaseapp.com",
    projectId: "kampuni-85a88",
    storageBucket: "kampuni-85a88.appspot.com",
    messagingSenderId: "983837246823",
    appId: "1:983837246823:web:67afb33c5b6a5d80751bc2",
    measurementId: "G-JEKE4M40CN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebase(app);
    

</script>

<style>

</style>