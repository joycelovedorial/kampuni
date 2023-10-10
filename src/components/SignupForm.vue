<template>
    <h2>Signup</h2>
    <form>
        <input type="text" required placeholder="Display Name" v-model="displayName">
        <input type="email" required placeholder="Email" v-model="email">
        <input type="password" required placeholder="password" v-model="password">
        <button>Sign Up</button>
    </form>
</template>

<script>
export default {
    setup(){
        const displayName=''
        const email =''
        const password = ''


        return {displayName,email,password}
    }
}
</script>

<style>

</style>