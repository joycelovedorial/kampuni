<template>
  <div id="expenses-page">
    <Navbar/>
    <div class="flex">
      <div class="w-30 flex-col">
        who owe who money
        <div class="h-75 bg-orangep/50 rounded-md m-3 backdrop-blur-sm">
          i need to pay other ppl
          <div class="test-1 flex justify-start">
            <img class="rounded-full border-oranges mx-3 border-2 inline-block h-fit w-12" src="../assets/profiles/amos.jpg" alt="amos">
            <div class="expenses bg-white p-3 rounded-md h-12 flex justify-around align-middle">
              <p class="inline-block align-middle self-center">amos owes you 200 dollars</p>
            </div>
            <button v-if="!showInput" class="block justify-self-center mx-auto bg-orangep w-fit p-1 rounded-md text-white shadow-md hover:shadow-none hover:bg-oranges hover:animate-spin" @click="createBump">{{ textInput ? textInput : 'bump!' }}</button>
          </div>
          <div class="test-2">
            <div class="expenses bg-white drop-shadow-md m-3 rounded-full flex justify-between align-middle w-max">
              <img class="align-middle self-center rounded-full m-3 border-oranges border-2 inline-block h-fit w-12" src="../assets/profiles/amos.jpg" alt="amos">
              <div class="flex flex-col m-2">
                <p class="block align-middle self-center">amos owes you $200.00</p>
                <button v-if="!showInput" class="block justify-self-center mx-auto bg-orangep w-fit p-1 rounded-md text-white shadow-md hover:shadow-none hover:bg-oranges hover:animate-spin" @click="createBump">{{ textInput ? textInput : 'bump!' }}</button>
                
                <div v-if="showInput" class="space-x-2">
                  <input class="rounded-md border-0 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300" type="text" v-model="textInput" placeholder="Enter your message">
                  <button class="bg-orangep w-fit p-1 rounded-md text-white shadow-md hover:shadow-none hover:bg-oranges" @click="sendMessage">send</button>
                </div>
              </div>
              <img class="align-middle self-center rounded-full m-3 border-oranges border-2 inline-block h-fit w-12" src="../assets/profiles/anyu.jpg" alt="anyu">
            </div>
          </div>
        </div>
        <div class="h-75 bg-white/50 rounded-md m-3 backdrop-blur-sm">
          other ppl need to pay me
          <div class="test-2">
            <div class="expenses bg-white drop-shadow-md m-3 rounded-full flex justify-between align-middle w-max">
              <img class="align-middle self-center rounded-full m-3 border-oranges border-2 inline-block h-fit w-12" src="../assets/profiles/anyu.jpg" alt="amos">
              <div class="flex flex-col m-2">
                <p class="block align-middle self-center">you owes sandra $10.00</p>
                <button v-if="!showInput" class="block justify-self-center mx-auto bg-orangep w-fit p-1 rounded-md text-white shadow-md hover:shadow-none hover:bg-oranges hover:animate-spin" @click="createBump">{{ textInput ? textInput : 'bump!' }}</button>
                
                <div v-if="showInput" class="space-x-2">
                  <input class="rounded-md border-0 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300" type="text" v-model="textInput" placeholder="Enter your message">
                  <button class="bg-orangep w-fit p-1 rounded-md text-white shadow-md hover:shadow-none hover:bg-oranges" @click="sendMessage">send</button>
                </div>
              </div>
              <img class="align-middle self-center rounded-full m-3 border-oranges border-2 inline-block h-fit w-12" src="../assets/profiles/sandra.jpg" alt="anyu">
            </div>
          </div>
        </div>
      </div>
      <div class="w-70">
        amount of spending for the month?
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components:{Navbar},
  data() {
    return {
      showInput: false, // Initially, the input field is hidden
      textInput: '',   // Store the user's text input
    };
  },
  methods: {
    createBump() {
      // Toggle the value of showInput to show the input field and "send" button
      this.showInput = true;
    },
    sendMessage() {
      // Handle sending the message, you can implement this function as needed

      // After sending the message, reset showInput to false to show "bump" button again
      this.showInput = false;
    },
  },

}
</script>

<style scoped>
#expenses-page {
    background-color: #f2f2f2;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }
</style>