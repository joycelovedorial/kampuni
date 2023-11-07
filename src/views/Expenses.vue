<template>
  <Navbar/>
  <body id="expenses-page" class="bg-g bg-full">
    <!-- <div class=""> -->
      <div class="bg-bnorm m-3 p-3 rounded-lg border-black border-2 space-y-3 w-10/12 mx-auto">
        <div class="create-expenses-bar w-8/12 mx-auto">
          <button v-if="!displayCreate" @click="displayCreate=!displayCreate" class="w-full bg-y border-black border-2 rounded-full py-3 font-fredoka font-bold drop-shadow-xl text-black">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create Expense
          </button>
          <button v-else @click="displayCreate=!displayCreate" class="w-full bg-r border-black border-2 rounded-full py-3 font-fredoka font-bold drop-shadow-xl text-white">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
            Discard Expense
          </button>
        </div>
        <div class="create-expense-bar" v-if="displayCreate">
          <createExpenses @closeExpense="displayCreate=!displayCreate" @onPaid="fetchData"/>
        </div>
        <div class=" tablet:flex tablet:space-x-0 tablet:space-y-3 tablet:m-0 flex-col mx-auto justify-content-around space-x-3 w-10/12" v-else>
          <div v-if="!payeecount" class="tablet:my-3 w-full rounded-lg p-3 h-84 scrollbar1 bg-bpop shadow-inner flex">
            <div class="text-center my-auto block w-full space-y-4">
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-12 h-12 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <h1 class="text-xs text-black font-fredoka">
                  cleared!
                </h1>
              </div>
              <div class="bg-y text-black rounded-lg px-2">
                <p>
                  congrats! you have payed off your debts 😊
                </p>
              </div>
            </div>
          </div>
          <div v-else class="w-full rounded-lg p-3 h-84 scrollbar1 bg-bpop shadow-inner flex">
            <div class="w-full rounded-lg p-3 h-84 scrollbar overflow-y-hidden">
              <div>
                <p class="text-xl font-fredoka font-extrabold text-center pb-2">
                  to pay
                </p>
              </div>
              <div class="w-full rounded-lg h-64 scrollbar overflow-y-scroll overflow-x-auto">
                <div v-for="peep in youOwePeople" :key="peep.id">
                  <singleExpensePayer :transacid="peep.id" @onPaid="fetchData"/>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!receivercount" class="w-full rounded-lg p-3 h-84 scrollbar2 bg-bnorm shadow-inner flex">
            <div class="text-center my-auto block w-full space-y-4">
              <div>
                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-black w-12 h-12 mx-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <h1 class="text-xs text-black font-fredoka">
                  cleared!
                </h1>
              </div>
              <div class="bg-y text-black rounded-lg px-2">
                <p>
                  you wont be receiving extra money anywhere today~
                </p>
              </div>
            </div>
          </div>
          <div v-else class="w-full rounded-lg p-3 h-84 scrollbar2 shadow-inner flex">
            <div class="w-full rounded-lg p-3 h-84 scrollbar overflow-y-hidden">
              <div>
                <p class="text-xl font-fredoka font-extrabold text-center pb-2">
                  to receive
                </p>
              </div>
              <div class="w-full rounded-lg h-64 scrollbar overflow-y-scroll overflow-x-auto">
                <div v-for="peepo in peopleOweYou" :key="peepo.id">
                  <singleExpenseReceiver :transacid="peepo.id" />
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="bg-bnorm m-3 p-3 rounded-lg border-black border-2 space-y-3 w-10/12 mx-auto">
      <div class="font-fredoka text-center text-lg font-bold">
        Overview
      </div>
      <compiledExpense @onPaid="fetchData"/>
    </div>
  </body>
</template>

<script>
import singleExpensePayer from '@/components/expensesItems/singleExpensePayer.vue';
import singleExpenseReceiver from '@/components/expensesItems/singleExpenseReceiver.vue';
import Navbar from '@/components/Navbar.vue';
import compiledExpense from '@/components/expensesItems/compiledExpense.vue';
import createExpenses from '@/components/expensesItems/createExpense.vue';
import { ref, computed ,onUnmounted} from 'vue';
import { collection, onSnapshot, query, where,getDoc,getDocs,doc} from 'firebase/firestore';
import {auth,db} from '@/firebase/config'


export default {
  components: { Navbar, createExpenses,singleExpensePayer,singleExpenseReceiver,compiledExpense},
  setup() {
    const compiled=ref(false);
    const payeecount = ref(0);
    const receivercount = ref(0);

    const displayCreate=ref(false)
    const peopleOweYou = ref([])
    const youOwePeople = ref([])


    const fetchData = async () => {
      console.log("emitted");
      const user = auth.currentUser
      const uid = user.uid
      peopleOweYou.value = []
      youOwePeople.value =[]
      payeecount.value=0
      receivercount.value = 0
      const oyqresult = []
      const yoqresult = []
      const oweyouquery = query(collection(db,"transactions"),where("receiver","==",uid),where("paid","==",false))
      const youOwequery = query(collection(db,"transactions"),where("payer","==",uid),where("paid","==",false))
      const oyq = await getDocs(oweyouquery)
      oyq.forEach((adoc)=>{
          oyqresult.push({...adoc.data(),id:adoc.id})
          receivercount.value += 1
        })
      peopleOweYou.value=oyqresult
      console.log(peopleOweYou.value,"poy");

      const yoq = await getDocs(youOwequery)
      yoq.forEach((adoc)=>{
        yoqresult.push({...adoc.data(),id:adoc.id})
        payeecount.value += 1
      })
      youOwePeople.value=yoqresult
      console.log(youOwePeople.value,"yop");
    };

    fetchData()
    const compiledFetch = () =>{
      console.log("compiled fetch, emit")
      fetchData();
    }

    return {
      compiled,
      displayCreate,
      youOwePeople,
      peopleOweYou,
      payeecount,
      receivercount,
      fetchData,
      compiledFetch
    };
  },
};
</script>

<style scoped>
  #expenses-page {
    position: relative;   
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: max-content;
    margin: 0;
    overflow: scroll;
    overflow: hidden;
    background-attachment: fixed;
  }

  /* .expenses {
    width: full;
    background-color: #FFFDF0;
    border-radius: 6px;
    border: black solid 2px;
    margin: 10px 0; */

    /*  bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm */
  /* } */

  .scrollbar2::-webkit-scrollbar2 {
  width: 8px;
  border-radius:16px;
  /* margin-left: 5px; */
  /* height:5px; */
}

.scrollbar2::-webkit-scrollbar2-track {
  background: transparent;
  width:10px;
  height:5px;
  /* margin-top:5px;
  margin-right:10px;
  margin-bottom:5px; */
}

.scrollbar2::-webkit-scrollbar2-thumb:hover {
  background-color:rgb(47, 47, 47)
}

.scrollbar2::-webkit-scrollbar2-thumb {
  background-color: #F4EDCA;
  border-radius: 10px;
  width:5px;
  height:5px;
}
  .scrollbar1::-webkit-scrollbar1 {
  width: 8px;
  border-radius:16px;
  /* margin-left: 5px; */
  /* height:5px; */
}

.scrollbar1::-webkit-scrollbar1-track {
  background: transparent;
  width:10px;
  height:5px;
  /* margin-top:5px;
  margin-right:10px;
  margin-bottom:5px; */
}

.scrollbar1::-webkit-scrollbar1-thumb:hover {
  background-color:rgb(47, 47, 47)
}

.scrollbar1::-webkit-scrollbar1-thumb {
  background-color: #FFFBE6;
  border-radius: 10px;
  width:5px;
  height:5px;
}


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

  .content-container {
    height: 80vh;
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