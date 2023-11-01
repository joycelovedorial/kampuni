<template>
  <div id="expenses-page" class="bg-g">
    <Navbar/>
    <div class="flex">
      <!-- <div class="w-25 flex-col">
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
        <div class="h-75 bg-white/50 rounded-md m-3 backdrop-blur-sm">
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
        </div> 
           </div> -->
           <div id="whoyouowe" v-for="peep in youOwePeoeple" :key="peep.id">
              <singleExpensePayer :transacid="peep.id"/>
           </div>
           <div id="whooweyou" v-for="peepo in peopleOweYou" :key="peepo.id">
              <singleExpenseReceiver :transacid="peepo.id"/>
           </div>
          <div class="w-70">
            amount of spending for the month?
          </div>
          <div><button @click="displayCreate=!displayCreate">Create Expense</button></div>
          <div v-if="displayCreate">
            <createExpenses/>
          </div>
      
    </div>
  </div>
</template>

<script>
import singleExpensePayer from '@/components/expensesItems/singleExpensePayer.vue';
import singleExpenseReceiver from '@/components/expensesItems/singleExpenseReceiver.vue';
import Navbar from '@/components/Navbar.vue';
import createExpenses from '@/components/expensesItems/createExpense.vue';
import { ref, computed } from 'vue';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {auth,db} from '@/firebase/config'

export default {
  components: { Navbar, createExpenses,singleExpensePayer,singleExpenseReceiver },
  setup() {
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);


    const displayCreate=ref(false)
    const peopleOweYou = ref([])
    const youOwePeoeple = ref([])

    //fetching of stuff
    const user = auth.currentUser
    const uid = user.uid
    const oweyouquery = query(collection(db,"transactions"),where("receiver","==",uid))
    const unsubOweYou = onSnapshot(oweyouquery,(oweYouSnap)=>{
      const result = []
      oweYouSnap.forEach((doc)=>{
        result.push({...doc.data(),id:doc.id})
      })
      peopleOweYou.value=result
    })


    const youOwequery = query(collection(db,"transactions"),where("payer","==",uid))
    const unsubyouOwe = onSnapshot(youOwequery,(youOweSnap)=>{
      const result = []
      youOweSnap.forEach((doc)=>{
        result.push({...doc.data(),id:doc.id})
      })
      youOwePeoeple.value=result
    })

    //anyu functions
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
      showInput.value = true;
    };

    const sendMessage = () => {
      showInput.value = false;
    };

    setInterval(toggleText, 3000);

    return {
      showInput,
      textInput,
      buttonText,
      isAnimationActive,
      textAnimationClass,
      createBump,
      sendMessage,

      displayCreate,
      youOwePeoeple,
      peopleOweYou,
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