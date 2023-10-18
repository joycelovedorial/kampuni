<template>
    <nav class="bg-transparent py-1">
        <div class="container justify-center flex h-1">
            <router-link to="../views/chatroom/Chatrooms.vue" class="button text-black bg-amber-300 rounded-l-2xl border">Chats</router-link>
            <router-link to="../views/Calendar.vue" class="button text-black bg-amber-300 border">Calendar</router-link>
            <router-link to="../views/Expenses.vue" class="button text-black bg-amber-300 rounded-r-2xl border">Expenses</router-link>

      </div>
    </nav>
  </template>
  
  <script>
  </script>
  
  <style>
    ul {
      list-style-type: none;
      display: flex;
    }
  
  </style>  