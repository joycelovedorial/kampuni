<template>
    <form>
        <input type="text" value="Display Name" v-model="displayName">
        <input type="email" value="Email" v-model="email">
        <input type="password" value="password" v-model="password">
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