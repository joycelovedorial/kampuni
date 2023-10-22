<template>
  <Navbar/>
  <div class="tasklist">
    <SingleTask/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SingleTask from '@/components/SingleTask.vue';
export default {
    components: {
        Navbar,
        SingleTask,
    }
}

</script>

<style>

</style>