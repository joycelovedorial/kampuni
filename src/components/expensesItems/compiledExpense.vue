<template>
    <div v-for="single in compiled" :key="single.id">
        <singleCompiledExpense :homieid="single.id" :amount="single.compiledamount" @onPaid="payemit"/>
    </div>
</template>

<script>
import { auth, db } from '@/firebase/config';
import singleCompiledExpense from './singleCompiledExpense.vue';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ref } from 'vue';
export default {
  components: {
    singleCompiledExpense
  },

  setup(props,context) {
    const compiled = ref([]);
    const user = auth.currentUser;
    const uid = user.uid;

    const query1 = query(collection(db, 'transactions'), where('payer', '==', uid),where("paid","==",false));
    const unsub1 = onSnapshot(query1, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        console.log(data)
        const index = compiled.value.findIndex(item => item.id === data.receiver);
        if (index !== -1) {
          compiled.value[index].compiledamount += data.amount;
        } else {
          compiled.value.push({ id: data.receiver, compiledamount: data.amount });
        }
      });
    });

    const query2 = query(collection(db, 'transactions'), where('receiver', '==', uid),where("paid","==",false));
    const unsub2 = onSnapshot(query2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        console.log(data)
        const index = compiled.value.findIndex(item => item.id === data.payer);
        if (index !== -1) {
          compiled.value[index].compiledamount -= data.amount;
        } else {
          compiled.value.push({ id: data.payer, compiledamount: -data.amount });
        }
      });
    });

    console.log(compiled.value,"compiled");

    const payemit = () =>{
      context.emit("onPaid")
    }

    return {
      compiled,payemit
    };
  }
};
</script>

<style>

</style>