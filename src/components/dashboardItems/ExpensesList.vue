<template>


        <div class="h-45 bg-bpop rounded-md m-3 border-black border-3 p-3 drop-shadow-lg">
          You Owe...
          <div class="flex w-100 space-x-1">
            <div class="expenses w-full bg-bnorm rounded-md border-black border-3 flex space-x-2 justify-around text-sm">
              <div class="w-25 image text-center my-auto">
                <img class="rounded-full border-bpop border-3 h-8 w-8 inline-block" src="../../assets/profiles/amos.jpg" alt="amos">
                <p class="text-xs font-black">amos</p>
              </div>
              <div class="w-75 details p-2">
                <p class="font-bold">$20.00</p>
                <div class="flex space-x-2">
                  <span class="category">general</span>
                  <span class="title">toilet paper</span>
                </div>
                <button class="inline-block w-100 bg-bnorm rounded-md p-1 text-xs font-bold border-black border-2 whitespace-nowrap overflow-hidden">
                  <span :class="textAnimationClass">{{ buttonText }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    


</template>

<script>
import Navbar from '@/components/Navbar.vue';
import createExpenses from '@/components/expensesItems/createExpense.vue';
export default {
  components:{Navbar},
  data() {
    return {
      showInput: false, // Initially, the input field is hidden
      textInput: '',   // Store the user's text input
      buttonText: 'pay',
      isAnimationActive: false, // Initially set to false
    };
  },
  computed: {
    textAnimationClass() {
      return this.isAnimationActive ? 'text-animation' : '';
    },
  },
  mounted() {
    setInterval(this.toggleText, 3000); // Toggle text every 3 seconds
  },
  methods: {
    // for the bump
    createBump() {
      // Toggle the value of showInput to show the input field and "send" button
      this.showInput = true;
    },
    sendMessage() {
      // Handle sending the message, you can implement this function as needed

      // After sending the message, reset showInput to false to show "bump" button again
      this.showInput = false;
    },
    // for the i owe others
    toggleText() {
      if (this.buttonText === 'you better pay me! or I will steal your money!!!') {
        this.buttonText = 'pay';
        this.isAnimationActive = false; // Remove animation class
      } else {
        this.buttonText = 'you better pay me! or I will steal your money!!!';
        this.isAnimationActive = true; // Add animation class
      }
    },
  },

}
</script>


<style scoped>



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