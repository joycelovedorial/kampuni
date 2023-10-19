<template>
  <div class="w-auto">
    <nav class="flex items-center justify-center h-16"> <!-- Adjusted height and centered vertically -->
      <router-link to="../views/chatroom/Chatrooms.vue" class="button text-orangep rounded-l-2xl border-1 border-orangep bg-oranges">Outings</router-link>
      <router-link to="../views/Calendar.vue" class="button text-orangep border-1 border-orangep bg-oranges">Calendar</router-link>
      <router-link to="../views/Expenses.vue" class="button text-orangep rounded-r-2xl border-1 border-orangep bg-oranges">Tasks</router-link>
    </nav>
  </div>
</template>

<script>
</script>

<style scoped>
  ul {
    list-style-type: none;
    display: flex;
  }
</style>
