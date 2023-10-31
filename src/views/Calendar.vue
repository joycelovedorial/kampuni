<template>
  <Navbar />
  <CalendarViews />
</template>

<script>
import Navbar from '@/components/Navbar.vue'; // Import the Navbar component
import CalendarViews from '@/components/CalendarViews.vue'; // Import the Navbar component

export default {
    components: {
        Navbar, // Include the Navbar component
        CalendarViews,
    }
}
</script>

<style>

</style>