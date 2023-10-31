<template>
  <div class="create-expenses container-fluid">

    <!--START of input form for expenses-->
    <form @submit.prevent="addExpense">
      <div class="row">
        <div>
          <label for="name">Name of Person who paid</label>
          <input class="form-control col-6" type="text" v-model="name" id="name">
        </div>

        <div>
          <label for="expense_name">Name of Expense</label>
          <input class="form-control col-6" type="text" v-model="exepense_name" id="expense_name">
        </div>

        <div>
          <label for="expense_cost">Cost of Expense</label>
          <input class="form-control col-6" type="number" v-model="expense_cost" id="expense_cost">
        </div>

        <div>
          <label for="expense_category">Category of Expense</label>
          <select>
            <option>Outing Expense</option>
            <option selected>Non Outing Expense </option>
          </select>
        </div>

        <!--END of input form for expenses-->

        <!--START of button to add more expenses-->
        <div>
          <button @click="add_expense" type="submit">Add Expense</button>
        </div>
        <!--END of button to add more expenses-->


        <!--START of button to calculate who owes who money-->
        <div>
          <button @click="calculate" type="submit">Calculate</button>
        </div>
        <!--END of button to calculate who owes who money-->
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
    //this is a Vue.js 3 composition API function 
    //where you define reactive data and functions 
    
    //reactive references with initial values as empty string 
    //which are used for form inputs in the template
    const name = ref(''); 
    const amount = ref('');
    const category = ref('');

    /*creating an addExpenses asynchronous function 
    asynchronous function is a function that performs a specific task in a non-blocking manner
    it does not block or wait for the result from the previous line of code to execute
    */
    const addExpense = async () => {
      const user = auth.currentUser; 
      const uid = user.uid; //retrieves the current authenticated user and their unique ID
      //fetches the user's document from a 'users' collection in a database
      const docSnap = await getDoc(doc(db, 'users', uid)); 
      const docData = docSnap.data();
      const cid = docData.community; //retrieve the community ID from the user's document

      /*creates an expense object with the values from the form inputs*/
        const expense = {
        name: expense_name.value,
        amount: parseFloat(expense_cost.value),
        category: expense_category.value,
      };

      await addDoc(collection(db, 'expenses'), {
        /*collection(db, `expenses`) is calling the expense collection function from firebase firestore
        adding a new document to the specified expenses collection
        */

        /*
        The object passed as the second argument to the addDoc 
        function is the data to be added to the document
        */

  
        name: expense.expense_name, //adding a field named 'name' with the value of expense.name
        amount: expense.expense_cost, //adding a field named 'amount' with the value of expense.amount
        category: expense.expense_category, //adding a field named 'category' with the value of expense.category
      });

      /*code is resetting the values of the form inputs to empty strings
      it helps to clear the form inputs for the next entry providing a better user experience
      after the addExpense function is executed successfully and sent to the database 
      it will reset the name, amount, and category values to empty
      */
      name.value = '';
      amount.value = 0;
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