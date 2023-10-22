<template>
    <div>
        <Navbar/>
    </div>
    
        <div>
            <ProfileEdit/>
        </div>

        
</template>

<script>
import ProfileEdit from '@/components/ProfileEdit.vue';
import Navbar from '@/components/Navbar.vue';

export default {
    components: { ProfileEdit, Navbar, Navbar }
}
</script>

<style>

</style>