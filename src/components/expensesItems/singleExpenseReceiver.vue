<template>
  <div class="mt-2 bg-bpop rounded-lg p-2 border-2 border-black">
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
    </div>
  <div>
  </div>

</template>

<script>
import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { parseISO } from 'date-fns';
export default {
  props: {
    transacid: String,
  },
  setup(props) {
    console.log(props.transacid,"poy");
    const message = ref('');
    const tname = ref('');
    const amount = ref('');
    const displayTooEarly = ref(false);
    const desc = ref("");
    const category=ref("");
    const imgstr = ref("");
    const displayBump=ref(true)
    const docRef = doc(db, "transactions", props.transacid);
    const paid = ref();
    

    getDoc(docRef)
      .then((docSnap) => {
        const data = docSnap.data();
        const tnameid = data.payer;
        amount.value = data.amount;
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