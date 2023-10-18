<template>
    <div>
        <Navbar />
        <Dashboard />
    </div>
</template>

<script>
    import Dashboard from '@/components/Dashboard.vue';
    import Navbar from '@/components/Navbar.vue'; // Import the Navbar component

    export default {
        components: {
            Dashboard,
            Navbar, // Include the Navbar component
        }
    }
</script>

<style>
    body {
        background-image: url('../assets/background_img/background1.PNG');
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>
z