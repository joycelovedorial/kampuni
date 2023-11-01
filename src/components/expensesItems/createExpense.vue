<template>
  <div class="create-expenses container-fluid">
    <form @submit.prevent="addExpense">
      <div class="row">
        <div>People involved</div>
        <div v-for="a_user in users" :key="a_user.id">
          <label :for="a_user.id">{{ a_user.name }}</label>
          <input
            class="form-control col-6"
            type="checkbox"
            :id="a_user.id"
            v-model="selectedUsers"
            :value="a_user.id"
          />
        </div>
      </div>

      <div class="row">
        <div>Person who paid</div>
        <div v-for="a_user in users" :key="a_user.id">
          <label :for="a_user.id">{{ a_user.name }}</label>
          <input
            type="radio"
            :id="a_user.id"
            v-model="whopaid"
            :value="a_user.id"
          />
        </div>
      </div>

      <!-- ... Other form inputs ... -->

      <div>
        <button @click="addExpense" type="submit">Add Expense</button>
      </div>
      <div>
        <button @click="calculate" type="submit">Calculate</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase/config';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';

export default {
  setup() {
    const expense_desc = ref('');
    const cost = ref('');
    const category = ref('');
    const comid = ref('');
    const userid = ref('');
    const users = ref([]);
    const selectedUsers = ref([]);
    const whopaid = ref('');

    const addExpense = async () => {
      try {
        const oppar = await addDoc(collection(db, 'expenses'), {
          amount: cost.value,
          desc: expense_desc.value,
          outing: category.value,
          usersInvolved: selectedUsers.value,
          whopaid: whopaid.value,
        });
        if (oppar) {
          console.log('doc added');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // ... Other methods ...

    return {
      addExpense,
      addToList, // You can include addToList and laoban methods if needed
      selectedUsers,
      expense_desc,
      cost,
      category,
      users,
      whopaid,
    };
  },
};
</script>

<style>
/* Add any necessary styles here */
</style>