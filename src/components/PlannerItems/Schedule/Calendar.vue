<template>
  <div>My Google Calendar</div>
</template>

<script setup>
// import { capitalize } from './helpers'
import {auth} from "../../../firebase/config.js"
import { getAuth, signInWithRedirect,getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { useTokenStore } from '../../../store/store.js'

const store = useTokenStore()
console.log(store.token,store.useremail)

</script>

<style></style>




