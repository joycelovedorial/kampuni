<template>
    <div v-for="single in compiled" :key="single.id">
        <singleCompiledExpense :homieid="single.id" :amount="single.compiledamount"/>
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

  setup() {
    const compiled = ref([]);
    const user = auth.currentUser;
    const uid = user.uid;

    const query1 = query(collection(db, 'transactions'), where('payer', '==', uid));
    const unsub1 = onSnapshot(query1, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const index = compiled.value.findIndex(item => item.id === data.receiver);
        if (index !== -1) {
          compiled.value[index].compiledamount += data.amount;
        } else {
          compiled.value.push({ id: data.receiver, compiledamount: data.amount });
        }
      });
    });

    const query2 = query(collection(db, 'transactions'), where('receiver', '==', uid));
    const unsub2 = onSnapshot(query2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const index = compiled.value.findIndex(item => item.id === data.payer);
        if (index !== -1) {
          compiled.value[index].compiledamount -= data.amount;
        } else {
          compiled.value.push({ id: data.payer, compiledamount: -data.amount });
        }
      });
    });

    console.log(compiled.value,"compiled");

    return {
      compiled
    };
  }
};
</script>

<style>

</style>