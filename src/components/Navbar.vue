<template>
  <nav class="bg-transparent py-1">
    <img class="inline" src="../assets/kampuni_logo.png" alt="">
    <router-link to="../Homepage" class="button text-black">Home</router-link>
    <router-link to="../chatroom/Chatrooms" class="button text-black">Chats</router-link>
    <router-link to="../Calendar" class="button text-black">Calendar</router-link>
    <router-link to="../Expenses" class="button text-black">Expenses</router-link>
    <router-link to="../Expenses" class="button text-black"><img class="w-12 inline profile" src="../assets/profiles/anyu.jpg" alt=""></router-link>
    <!-- <div class="container mx-auto flex justify-between items-center">
      <div class="container flex space-x-4 justify-between">
        <div class="ml-auto">
        </div>
      </div>
    </div> -->
  </nav>
</template>

<script>
</script>

<style>
  ul {
    list-style-type: none;
    margin: auto;
    padding: 0;
    display: flex;
  }

  img {
    width: 120px;
  }

  a {
    padding: 24px;
  }
</style>  