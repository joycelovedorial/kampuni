<template>
  <div class="object-right w-auto">
    <nav class="bg-transparent py-1 flex justify-between items-center">
      <img class="logo inline" src="../assets/kampuni_logo.png" alt="">
      <ul class="flex space-x-4">
        <router-link to="../Homepage" class="button text-cyanprimary">
          <Icons name="home"/>
          Home
        </router-link>
        <router-link to="../chatroom/Chatrooms" class="button text-cyanprimary">
          <!-- <img class="inline" src="../assets/icons/chats.png" alt=""> -->
          Chats
        </router-link>
        <router-link to="../Calendar" class="button text-cyanprimary">
          <!-- <img class="inline" src="../assets/icons/calendar.png" alt=""> -->
          Calendar
        </router-link>
        <router-link to="../Expenses" class="button text-cyanprimary">
          <!-- <img class="inline" src="../assets/icons/expenses.png" alt=""> -->
          Expenses
        </router-link>
      </ul>
      <router-link to="../Expenses" class="button text-black"><img class="w-12 inline profile" src="../assets/profiles/anyu.jpg" alt=""></router-link>
    </nav>
  </div>
</template>

<script>
  import Icons from '@/components/Icons.vue'; // Import the SvgIcon component

  export default {
    components: {
      Icons, // Include the SvgIcon component
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
