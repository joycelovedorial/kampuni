<template>
  <div id="expenses-page" class="bg-g">
    <Navbar/>
    <div class="flex">
      <div class="w-25 flex-col">
        who owe who money
        <div class="h-auto bg-bpop rounded-md m-3 border-black border-2 p-3 drop-shadow-lg">
          
            <div v-for="(payment, index) in toPay" :key="index" class="expenses w-full bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm my-2">
              <div class="image text-center my-auto ml-2">
                <img class="rounded-full border-bpop border-2 h-8 w-8 inline-block" :src="payment.img" :alt="payment.name">
                <p class="text-xs font-black">{{ payment.name }}</p>
              </div>
              <div class="w-75 details py-2 pr-2">
                <p>${{ payment.amt.toFixed(2) }}</p>
                <div class="flex space-x-2">
                  <span class="category">{{ payment.category }}</span>
                  <span class="title">{{ payment.title }}</span>
                </div>
                <button v-if="payment.needToPay" class="inline-block w-100 bg-r rounded-md p-1 text-xs font-black border-black border-2 whitespace-nowrap overflow-hidden">
                  <div class="w-36 h-4">
                    <span v-if="payment.bumped" :class="textAnimationClass">{{ payment.msg }}</span>
                    <span v-if="!payment.bumped">pay</span>
                  </div>
                </button>
                <button v-if="!payment.needToPay" class="inline-block w-100 bg-bnorm rounded-md p-1 text-xs font-black border-black border-2 whitespace-nowrap overflow-hidden">
                  <div class="w-36 h-4">
                    <span v-if="payment.bumped">{{ payment.msg }}</span>
                    <span v-if="!payment.bumped" @click="createBump">bump!</span>
                  </div>
                </button>
              </div>
            </div>
        </div>
        <div class="h-auto bg-bpop rounded-md m-3 border-black border-2 p-3 drop-shadow-lg">
          others owe you
            <div v-for="(payment, index) in toPay" :key="index" class="expenses w-full bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm my-2">
              <div class="w-25 image text-center my-auto">
                <img class="rounded-full border-bpop border-2 h-8 w-8 inline-block" :src="payment.img" :alt="payment.name">
                <p class="text-xs font-black">{{ payment.name }}</p>
              </div>
              <div class="w-75 details p-2">
                <p>${{ payment.amt.toFixed(2) }}</p>
                <div class="flex space-x-2">
                  <span class="category">{{ payment.category }}</span>
                  <span class="title">{{ payment.title }}</span>
                </div>
                <button class="inline-block w-100 bg-bnorm rounded-md p-1 text-xs font-black border-black border-2 whitespace-nowrap overflow-hidden">
                  <div class="w-36 h-4">
                    <span v-if="payment.bumped" :class="textAnimationClass" class="inline-block">{{ buttonText }}</span>
                    <span v-if="!payment.bumped" class="inline-block">pay</span>
                  </div>
                </button>
              </div>
            </div>
        </div>
        <!-- <div class="h-75 bg-white/50 rounded-md m-3 backdrop-blur-sm">
          others owe you
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
        </div> -->
      <div class="w-70">
        amount of spending for the month?
      </div>
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
      buttonText: 'pay',
      isAnimationActive: false, // Initially set to false
      images:{ 
        'snekha': '/img/snekha.e4e5897a.jpg',
        'joyce': '/img/joyce.1cd32ed3.jpg',
        'anyu': '/img/anyu.48a8657b.jpg',
        'eman': '/img/eman.6066cb5b.jpg',
        'amos': '/img/amos.f8c26b30.jpg',
        'sandra': '/img/sandra.0210e71e.jpg',
      },
      toPay: [
        {
          needToPay: true,
          name: 'amos', 
          img: '/img/amos.f8c26b30.jpg', 
          category: 'general', 
          title: 'toilet paper', 
          amt: 10,
          bumped: true,
          msg: 'you better pay me or i will steal your money !!!!!'
        },
        {
          needToPay: true,
          name: 'sandra',
          img: '/img/sandra.0210e71e.jpg',
          category: 'cycling @ ecp',
          title: 'bike rental',
          amt: 16,
          bumped: false,
          msg: ''
        },
        {
          needToPay: false,
          name: 'joyce',
          img: '/img/joyce.1cd32ed3.jpg',
          category: 'general',
          title: 'milk',
          amt: 2.55,
          bumped: false,
          msg: ''
        },
        {
          needToPay: false,
          name: 'eman',
          img: '/img/eman.6066cb5b.jpg',
          category: 'grab',
          title: 'bike rental',
          amt: 16,
          bumped: true,
          msg: 'bump again in 24 hours!',
        }
      ],
      toReceive: [
        {
          name: 'amos', 
          img: '/img/amos.f8c26b30.jpg', 
          category: 'general', 
          title: 'toilet paper', 
          amt: 10,
          bumped: true,
          msg: 'you better pay me or i will steal your money !!!!!'
        },
        {
          name: 'sandra',
          img: '/img/sandra.0210e71e.jpg',
          category: 'cycling @ ecp',
          title: 'bike rental',
          amt: 16,
          bumped: false,
          msg: ''
        }
      ],
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
  #expenses-page {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh; /* 100% of viewport height */
    margin: 0; /* Remove default margin to cover the entire viewport */
  }

  /* .expenses {
    width: full;
    background-color: #FFFDF0;
    border-radius: 6px;
    border: black solid 2px;
    margin: 10px 0; */

    /*  bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm */
  /* } */

  .text-animation {
    animation: marquee 14s linear infinite;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
  }

  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-1000%);
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