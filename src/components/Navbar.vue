<template>
  <div class="object-left w-auto">
    <nav class="bg-transparent py-1 flex justify-between items-center">
      <img class="logo inline" src="../assets/kampuni_logo.png" alt="">
      <ul class="flex space-x-1">
        <router-link to="../Homepage" class="button text-cyanp">
          <svg class="inline w-5 h-5 text-cyanp" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
          </svg>
          Home
        </router-link>
        <router-link to="../chatroom/Chatrooms" class="button text-cyanp">
          <svg class="inline w-5 h-5 text-cyanp" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
          </svg>
          Chats
        </router-link>
        <router-link to="../Calendar" class="button text-cyanp">
          <svg class="inline w-5 h-5 text-cyanp" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
          </svg>
          Calendar
        </router-link>
        <router-link to="../Expenses" class="button text-cyanp">
          <svg class="inline w-5 h-5 text-cyanp" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
          </svg>
          Expenses
        </router-link>
      </ul>
      <router-link to="../Profile" class="button text-black"><img class="w-12 inline profile" src="../assets/profiles/anyu.jpg" alt=""></router-link>
    </nav>
  </div>
</template>

<script>
  import '@/assets/main.css';

  export default {
    components: {
    },
  };
</script>


<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .logo {
    width: 120px;
  }

  img {
    width: 20px;
  }

  a {
    padding: 24px;
  }
</style>
