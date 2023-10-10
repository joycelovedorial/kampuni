<template>
    <div>Logo Container</div>
        <p>Welcome</p>
        <div>
            <LoginForm/>
        </div>
        <div>
            <SignupForm/>
        </div>
        
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import SignupForm from '@/components/SignupForm.vue';
export default {
    components: { LoginForm, SignupForm}
}
</script>

<style>

</style>