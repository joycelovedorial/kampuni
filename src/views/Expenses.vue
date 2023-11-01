<template>
  <div id="expenses-page" class="bg-g">
    <Navbar/>
    <div class="flex">
      <div class="w-25 flex-col">
        who owe who money
        <div class="h-75 bg-bpop rounded-md m-3 border-black border-2 p-3 drop-shadow-lg">
          you need to pay
          <div class="flex w-100 space-x-1">
            <div class="expenses w-full bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm">
              <div class="w-25 image text-center my-auto">
                <img class="rounded-full border-bpop border-2 h-8 w-8 inline-block" src="../assets/profiles/amos.jpg" alt="amos">
                <p class="text-xs font-black">amos</p>
              </div>
              <div class="w-75 details p-2">
                <p>$20.00</p>
                <div class="flex space-x-2">
                  <span class="category">general</span>
                  <span class="title">toilet paper</span>
                </div>
                <button class="inline-block w-100 bg-bnorm rounded-md p-1 text-xs font-black border-black border-2 whitespace-nowrap overflow-hidden">
                  <span :class="textAnimationClass">{{ buttonText }}</span>
                </button>
              </div>
              <!-- <img class="rounded-full border-bpop border-2 inline-block h-fit w-8" src="../assets/profiles/anyu.jpg" alt="anyu"> -->
            </div>
            <!-- <button class="w-25 bg-bnorm rounded-md p-1 text-xs font-black border-black border-2">
              pay 💰
            </button> -->
          </div>
        </div>
        <div class="h-75 bg-white/50 rounded-md m-3 backdrop-blur-sm">
          they need to pay
          <div class="test-2">
            <div class="expenses bg-white drop-shadow-md m-3 rounded-full flex justify-between align-middle w-max">
              <img class="align-middle self-center rounded-full m-3 border-oranges border-2 inline-block h-fit w-12" src="../assets/profiles/anyu.jpg" alt="amos">
              <div class="flex flex-col m-2">
                <p class="block align-middle self-center">you owes sandra $10.00</p>
                <button v-if="!showInput" class="block justify-self-center mx-auto bg-bpop w-fit p-1 rounded-md shadow-md hover:shadow-none hover:bg-oranges hover:animate-spin" @click="createBump">{{ textInput ? textInput : 'bump!' }}</button>
                
                <div v-if="showInput" class="space-x-2">
                  <input class="rounded-md border-0 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300" type="text" v-model="textInput" placeholder="Enter your message">
                  <button class="bg-bpop w-fit p-1 rounded-md shadow-md hover:shadow-none hover:bg-oranges" @click="sendMessage">send</button>
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
import createExpenses from '@/components/expensesItems/createExpense.vue';
import { ref, computed } from 'vue';

export default {
  components: { Navbar, createExpenses },
  setup() {
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);

    const textAnimationClass = computed(() => {
      return isAnimationActive.value ? 'text-animation' : '';
    });

    const toggleText = () => {
      if (buttonText.value === 'you better pay me! or I will steal your money!!!') {
        buttonText.value = 'pay';
        isAnimationActive.value = false; // Remove animation class
      } else {
        buttonText.value = 'you better pay me! or I will steal your money!!!';
        isAnimationActive.value = true; // Add animation class
      }
    };

    const createBump = () => {
      // Toggle the value of showInput to show the input field and "send" button
      showInput.value = true;
    };

    const sendMessage = () => {
      // Handle sending the message, you can implement this function as needed

      // After sending the message, reset showInput to false to show "bump" button again
      showInput.value = false;
    };

    // Call toggleText every 3 seconds
    setInterval(toggleText, 3000);

    return {
      showInput,
      textInput,
      buttonText,
      isAnimationActive,
      textAnimationClass,
      createBump,
      sendMessage,
    };
  },
};
</script>

<style scoped>
  #expenses-page {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }


  .text-animation {
    animation: marquee 12s linear infinite;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  @keyframes marquee {
    0% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(-300%);
    }
  }

  .category {
    font-size: 12px;
    font-weight: bold;
    background-color: #F4EDCA;
    padding: 0 5px;
    margin: 2px 0;
    border-radius: 4px;
    vertical-align: middle;
  }
  .title {
    font-size: 12px;
    font-weight: bold;
    background-color: #F4EDCA;
    padding: 0 5px;
    margin: 2px 0;
    border-radius: 4px;
    vertical-align: middle;
  }
</style>