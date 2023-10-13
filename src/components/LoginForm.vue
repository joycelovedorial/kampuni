<template>
    <img src="kampuni_logo.jpg"/> 
    <form>
        <input type="email" required placeholder="Email" v-model="email">
        <br><br>
        <input type="password" required placeholder="password" v-model="password">
        <br><br>
        <button>Login</button>
        <p>or</p>
        <button>Sign Up</button>
    </form>
</template>

<script>
export default {
    setup(){
        const displayName=''
        const email =''
        const password = ''
        const image = ''


        return {displayName,email,password, image}
    }
}
</script>

<style>

</style>
