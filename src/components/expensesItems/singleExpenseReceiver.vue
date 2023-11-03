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
  <div>
    <img class="inline rounded-full h-6 w-6 border-black mx-2" :src="'/profiles/' + imgstr" alt="">
    {{ tname }} owes you ${{ Number(amount).toFixed(2) }}
    <!-- <img :src="'/profiles/' + imgstr" alt=""> -->
    <div class="bg-bnrom w-full bg-y rounded-md px-1 shadow-inner">
      <span v-if="bumped">{{  message }}</span>
      <span v-else>feel free to bump!</span>
    </div>
    <div v-if="displayTooEarly">
        <p>"Its too early for a bump"</p>
    </div>
    <button @click="bump">bump</button>
    <input type="text" v-model="message">
  </div>

  <!-- <div>the other guys pic</div> -->
</template>

<script>
import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp, updateDoc } from "firebase/firestore";
export default {
  props: {
    transacid: String,
  },
  setup(props) {
    const message = ref('');
    const tname = ref('');
    const amount = ref('');
    const timenow = new Date();
    const bumptime = ref('');
    const displayTooEarly = ref(false);
    const desc = ref("");
    const imgstr = ref("");
    const bumped = ref(false);

    const docRef = doc(db, "transactions", props.transacid);

    getDoc(docRef)
      .then((docSnap) => {
        const data = docSnap.data();
        const tnameid = data.payer;
        amount.value = data.amount;
        bumptime.value = data.bump; // Assuming "bump" field contains a timestamp
        desc.value=data.desc
        
        getDoc(doc(db,"users",tnameid))
            .then((tnamesnap)=>{
                const data = tnamesnap.data()
                tname.value=data.firstname
                console.log(tname.value);
                imgstr.value = data.firstname + ".jpg"
            })
      });

    const bump = async () => {
      bumped.value = true;
      const timeDifference = timenow - bumptime.value.toDate(); // Calculate time difference in milliseconds

      if (timeDifference >= 24 * 60 * 60 * 1000) { // 24 hours in milliseconds
        await updateDoc(doc(db, 'transactions', props.transacid), {
          message: message.value,
          bump: Timestamp.now(),
        });
      } else {
        displayTooEarly.value = true;
      }
    };

    return {
      message,
      tname,
      amount,
      // createBump,
      // sendMessage,
      bump,
      displayTooEarly,
      desc,
      imgstr
    };
  }
}
</script>

<style>

</style>