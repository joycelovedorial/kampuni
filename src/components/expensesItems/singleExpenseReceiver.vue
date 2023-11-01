<template>
  
  <div>yourpic</div>
    <span> {{ tname }} owes you ${{ amount }}</span>
    <div v-if="displayTooEarly">
        <p>"Its too early for a bump"</p>
    </div>
    <button @click="bump">bump</button>
    <input type="text" v-model="message">

  <div>the other guys pic</div>
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

    const docRef = doc(db, "transactions", props.transacid);

    getDoc(docRef)
      .then((docSnap) => {
        const data = docSnap.data();
        tname.value = data.payer;
        amount.value = data.amount;
        bumptime.value = data.bump; // Assuming "bump" field contains a timestamp
      });

    const bump = async () => {
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
      bump,
      displayTooEarly
    };
  }
}
</script>

<style>

</style>