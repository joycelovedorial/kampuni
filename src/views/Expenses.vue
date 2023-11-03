<template>
  <div id="expenses-page" class="bg-g">
    <Navbar/>
    <div class="body-div w-10/12 mx-auto">
      <button @click="compiled=!compiled">Compile</button>
      <div v-if="compiled">
        <compiledExpense/>
      </div>


      <div class="content-container bg-bnorm m-3 p-3 rounded-lg border-black border-4 space-y-3">
        <div class="create-task-bar w-8/12 mx-auto">
          <button v-if="!displayCreate" @click="displayCreate=!displayCreate" class="w-full bg-y border-black border-2 rounded-full py-3 font-extrabold drop-shadow-xl text-white">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Expense
          </button>
          <button v-else @click="displayCreate=!displayCreate" class="w-full bg-r border-black border-2 rounded-full py-3 font-extrabold drop-shadow-xl text-white">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Discard Expense
          </button>
        </div>
        <div class="create-task-bar" v-if="displayCreate">
          <createExpenses/>
        </div>
        <div class="flex mx-auto justify-content-around space-x-3" v-else>
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
              <div class="bg-bpop w-full rounded-lg p-3">
                <div v-if="youOwePeople.length == 0">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-g text-white w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <h1>
                    cleared!
                  </h1>
                  <p>
                    you do not owe anyone anyting~
                  </p>
                </div>
                <div v-else>
                  <p class="text-xl font-fredoka font-extrabold text-center">
                    to pay
                  </p>
                  <singleExpensePayer id="whoyouowe" v-for="peep in youOwePeople" :key="peep.id" :transacid="peep.id"/>
                </div>
              </div>
              <div class="bg-bpop w-full rounded-lg p-3">
                <div v-if="peopleOweYou.length == 0">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-g text-white w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                  <h1>
                    cleared!
                  </h1>
                  <p>
                    you wont be receiving extra money anywhere~
                  </p>
                </div>
                <div v-else>
                  <p class="text-xl font-fredoka font-extrabold text-center">
                    to receive
                  </p>
                  <singleExpenseReceiver id="whooweyou" v-for="peepo in peopleOweYou" :key="peepo.id" :transacid="peepo.id"/>
                </div>
              </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import singleExpensePayer from '@/components/expensesItems/singleExpensePayer.vue';
import singleExpenseReceiver from '@/components/expensesItems/singleExpenseReceiver.vue';
import Navbar from '@/components/Navbar.vue';
import compiledExpense from '@/components/expensesItems/compiledExpense.vue';
import createExpenses from '@/components/expensesItems/createExpense.vue';
import { ref, computed } from 'vue';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import {auth,db} from '@/firebase/config'


export default {
  components: { Navbar, createExpenses,singleExpensePayer,singleExpenseReceiver,compiledExpense},
  setup() {
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);
    const compiled=ref(false)

    const displayCreate=ref(false)
    const peopleOweYou = ref([])
    const youOwePeople = ref([])

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
      youOwePeople.value=result
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
      compiled,
      displayCreate,
      youOwePeople,
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