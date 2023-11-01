<template>
  <div class="create-expenses container-fluid">

    <!--START of input form for expenses-->
    <form @submit.prevent="addExpense">
      <div class="row">
        <div>People involved</div>
        <!-- Create a function takes in id with thne push object into selectedusers -->
        <div v-for="a_user in users" :key="a_user.id">
          <label :for="a_user.id">{{ a_user.name }}</label>
          <input class="form-control col-6" type="checkbox" :id="a_user.id" v-model="selectedUsers" :value="a_user.id" v-on:change="addToList">
        </div>
      </div>

      <br>

      <div class="row">
        <div>Person who paid</div>
        <div v-for="a_user in users" :key="a_user.id">
          <label :for="a_user.id">{{ a_user.name }}</label>
          <input type="radio" :id="a_user.id" v-model="whopaid" :value="a_user.id" v-on:change="laoban">
        </div>
      </div>

      <div class="row">
        <div>
          <label for="expense_name">Name of Expense</label>
          <input class="form-control col-6" type="text" v-model="expense_desc" id="expense_name">
        </div>

        <div>
          <label for="expense_cost">Cost of Expense</label>
          <input class="form-control col-6" type="number" v-model="cost" id="expense_cost">
        </div>

        <div>
          <label for="expense_category">Category of Expense</label>
          <select v-model="category">
            <option>Outing Expense</option>
            <option selected>Non Outing Expense </option>
          </select>
        </div>

        <!--END of input form for expenses-->

        <!--START of button to add more expenses-->
        <div>
          <button @click="addExpense" type="submit">Add Expense</button>
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

import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

export default {
  props: ['a_user',],

  setup() {
    //this is a Vue.js 3 composition API function 
    //where you define reactive data and functions 
    
    //reactive references with initial values as empty string 
    //which are used for form inputs in the template
    const expense_desc = ref('')
    const cost = ref('')
    const category = ref("")
    const comid = ref("")
    const userid = ref("")
    const users = ref([])
    const selectedUsers = ref([])
    const whopaid = ref("")

    /*creating an addExpenses asynchronous function 
    asynchronous function is a function that performs a specific task in a non-blocking manner
    it does not block or wait for the result from the previous line of code to execute
    */

    const addToList = async () => {
      try {
        selectedUsers.value += a_user.id
      } catch (error) {
        console.log(error.message)
      }
    };

    const laoban = async () => {
      try {
        whopaid.value += a_user.id
      } catch (error) {
        console.log(error.message)
      }
    };

    const addExpense = async () => {
      try{

        const oppar = await addDoc(collection(db, 'expenses'), {
          amount: cost.value,
          desc: expense_desc.value,
          outing: category.value, 
          usersInvolved: selectedUsers.value,
          whopaid: whopaid.value,
          
        });
        if (oppar){
          console.log("doc added")
        }
        /*code is resetting the values of the form inputs to empty strings
        it helps to clear the form inputs for the next entry providing a better user experience
        after the addExpense function is executed successfully and sent to the database 
        it will reset the name, amount, and category values to empty
        */
      } catch (error){
      console.log(error.message)
    } 
  };

    const fetchData = async () =>{

      const user = auth.currentUser
      userid.value = user.uid
      const docRef = doc(db,"users",userid.value)
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      comid.value = docData.community

      // To get all users
      const comSnap = await getDoc(doc(db,"communities", comid.value))
      const comData = comSnap.data()
      for (const hommie of comData.homies) {
        const curr_user = await getDoc(doc(db,"users", hommie))
        const my_user = curr_user.data()
        const name = my_user.firstname
        users.value.push({id:hommie, name:name})
      }
    }

    onMounted(()=>{
      fetchData()
    })

    
    return {
      addExpense, addToList, laoban, selectedUsers, expense_desc, cost, category, users, whopaid

    };
  }
}


</script>

<style>
/* Add any necessary styles here */
</style>