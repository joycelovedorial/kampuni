<template>
   <!-- <div>
     <div class="bg-bnorm w-full p-2 rounded-lg">
       {{ tname }} owes you ${{ Number(amount).toFixed(2) }}
       <div>
         <div class="message-bar bg-y rounded-md px-1 shadow-inner">
           <span>{{ message }}</span>
        </div>
        <span class="bg-bpop rounded-md px-1 text-xs font-bold">{{ category }}: {{ desc }}</span>
        <br>
        <button class="bg-g text-white rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="bump">bump</button>
      </div>
    </div>
  </div> -->
  <div v-if="!paid" class="mt-2 bg-bpop rounded-lg p-2 border-2 border-black">
        <div class="font-bold font-jakarta text-sm flex justify-between">
            <div class="flex space-x-2 align-middle">
                <img class="inline-block rounded-full h-8 w-8 border-2 border-black my-auto" :src="imgstr" alt="">
                <div class="inline-block my-auto">
                    {{ tname }} owes you ${{ Number(amount).toFixed(2) }}
                    <div class="block">
                        <span class="bg-b rounded-md text-xs px-1">{{ category }}: {{ desc }}</span>
                    </div>
                </div>
            </div>
            <div class="block my-auto">
              <button v-if="displayBump" @click="displayBump=false" class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md">
                bump
              </button>
              <button v-else @click="displayBump=true" class="bg-r text-black rounded-full border-black border-2 my-auto mx-auto drop-shadow-md">
                <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="w-full my-2 rounded-lg">
            <div v-if="displayBump" class="message-bar bg-white rounded-md px-1 shadow-inner">
              {{message}}
            </div>
            <div v-else class="message-bar flex justify-between space-x-3">
              <div class="h-6 w-100 flex px-1 bg-y drop-shadow-md rounded-md my-auto">
                <input class="h-6 my-auto w-100 pl-1 bg-transparent border-0 focus:ring-0" type="text" v-model="message" @keyup.enter="handleBump">
              </div>
              <div>
                <button @click="handleBump" class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md font-bold">send</button>
              </div>
            </div>
          </div>
          <!-- <div class="w-full my-2 rounde-lg">
            
            <div class="message-bar bg-y rounded-md px-1 shadow-inner">
              <span v-if="displayInput">
                <input type="text" v-model="message">
              </span>
              <span v-else>
                <span>{{ message }}</span>
              </span>
            </div>
          </div> -->
            <!-- <div class="w-full my-2 rounded-lg">
                <button class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="displayInput">bump</button>
                <div v-if="!displayInput" class="message-bar bg-y rounded-md px-1 shadow-inner">
                    <span>{{ message }}</span>
                </div>
                <div v-else class="message-bar bg-y rounded-md px-1 shadow-inner">
                  <input type="text" v-model="message">
                </div>
            </div> -->
            <!-- <div class="block my-auto">
                <button v-if="!displayInput" class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="displayInput">bump</button>
                
            </div>
        </div>
        <div class="w-full my-2 rounded-lg">
                <div class="message-bar bg-y rounded-md px-1 shadow-inner">
                </div>
        </div> -->
    </div>
  <div>
    <!-- <img class="inline rounded-full h-6 w-6 border-black mx-2" :src="'/profiles/' + imgstr" alt=""> -->
    <!-- <img :src="'/profiles/' + imgstr" alt=""> -->
    <!-- <div class="bg-bnrom w-full bg-y rounded-md px-1 shadow-inner">
        <div v-if="displayBump">
            <button @click="displayBump=false">bump</button>
        </div>
        <div v-else>
            <input type="text" v-model="message" @keyup.enter="handleBump">
            <button @click="handleBump">Send</button>
            <button @click="displayBump=true">
              <svg fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 inline" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg>
            </button>
        </div> -->
      <!-- <span v-else>feel free to bump!</span> -->
    <!-- </div> -->
  </div>

  <!-- <div>the other guys pic</div> -->
</template>

<script>
import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { parseISO } from 'date-fns';
export default {
  props: {
    transacid: String,
    key: String,
  },
  setup(props) {
    const message = ref('');
    const tname = ref('');
    const amount = ref('');
    const bumptime = ref('');
    const displayTooEarly = ref(false);
    const desc = ref("");
    const category=ref("");
    const imgstr = ref("");
    // const displayInput = ref(false);
    const displayBump=ref(true)
    const docRef = doc(db, "transactions", props.transacid);
    const paid = ref();
    

    getDoc(docRef)
      .then((docSnap) => {
        const data = docSnap.data();
        const tnameid = data.payer;
        amount.value = data.amount;
        bumptime.value = data.bump; // Assuming "bump" field contains a timestamp
        desc.value=data.desc;
        paid.value = data.paid;

        getDoc(doc(db,"users",tnameid))
            .then((tnamesnap)=>{
                const data = tnamesnap.data()
                tname.value=data.firstname
                imgstr.value = data.photoURL
            })

        if(data.outing!==null){
                getDoc(doc(db,'outings',data.outing))
                .then((snap)=>{
                    const data = snap.data()
                    category.value=data.title
                })
            }else{
                category.value="General"
            }

        getDoc(doc(db,"expenses",data.expense))
            .then((snaps)=>{
                const data = snaps.data()
                desc.value = data.desc
            })
      });

    const bump = () => {
        displayBump.value = false
    };

    const handleBump = async () =>{
        await updateDoc(doc(db,"transactions",props.transacid),{
            message:message.value,
            bump:true
        }), 
        displayBump.value = true
        // message.value=""
    }

    return {
      message,
      tname,
      amount,
      displayBump,
      bump,
      displayTooEarly,
      desc,
      category,
      imgstr,
      handleBump,
      paid
    };
  }
}
</script>

<style>

</style>