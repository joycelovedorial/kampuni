<template>
  <div class="create-expenses container-fluid">
    <form @submit.prevent="addExpense">
      <h2>Expenses</h2>
      <div class="row">
        <div>
          <label for="name">Name</label>
          <input class="form-control col-6" type="text" v-model="name" id="name">
        </div>

        <div>
          <label for="amount">Amount</label>
          <input class="form-control col-6" type="number" v-model="amount" id="amount">
        </div>

        <div>
          <label for="category">Category</label>
          <input class="form-control col-6" type="text" v-model="category" id="category">
        </div>

        <div>
          <button type="submit">Add Expense</button>
        </div>

        <div>
          <button type="submit">Calculate</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth, db, addDoc, collection, getDoc, doc } from '@/firebase/config';

export default {
  data(){
    const sum = 0;
    
  
  },


  setup() {
    const name = ref('');
    const amount = ref('');
    const category = ref('');

    const addExpense = async () => {
      const user = auth.currentUser;
      const uid = user.uid;
      const docSnap = await getDoc(doc(db, 'users', uid));
      const docData = docSnap.data();
      const cid = docData.community;

      const expense = {
        name: name.value,
        amount: parseFloat(amount.value),
        category: category.value,
      };

      await addDoc(collection(db, 'expenses'), {
        community: cid,
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
      });

      name.value = '';
      amount.value = '';
      category.value = '';
    };

    return {
      name,
      amount,
      category,
      addExpense,
    };
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>