<template>
  
  <div>
    <img :src="'/profiles/' + imgstr" alt="">
  </div>
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
    const desc = ref("")
    const imgstr = ref("")

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
      displayTooEarly,
      desc,
      imgstr
    };
  }
}
</script>

<style>

</style>