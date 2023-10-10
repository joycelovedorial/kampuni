<template>
    <div>Logo Container</div>
        <p>Profile</p>
        <div>
            <ProfileEdit/>
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