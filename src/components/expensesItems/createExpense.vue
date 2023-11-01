<template>
  <div class="create-expenses container-fluid">

    <form @submit.prevent="addExpense">
      <div class="row">
        <div>People involved</div>
       
        <div v-for="user in users" :key="user.id">
          <label :for="user.id">{{ user.name }}</label>
          <input 
          class="form-control col-6" 
          type="checkbox" 
          :id="user.id" 
          v-model="selectedUsers" 
          :value="user.id"
          />
        </div>
      </div>


      <div class="row">
        <div>Person who paid</div>
        <div v-for="user in users" :key="user.id">
          <label :for="user.id">{{ user.name }}</label>
          <input type="radio" :id="user.id" v-model="whopaid" :value="user.id">
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
            <option :value=null>Non-Outing</option>
            <option v-for="out in outingslist" :key="out.id" :value="out.id">{{out.title}}</option>

          </select>
        </div>

        <div>
          <button>Add Expense</button>
        </div>

      </div>
      
    </form>
  </div>
</template>

<script>

import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp } from "firebase/firestore";

export default {
  props: {
    outingid: String,
  },

  setup(props) {

    const expense_desc = ref('')
    const cost = ref('')
    const category = ref("")
    const comid = ref("")
    const userid = ref("")
    const users = ref([])
    const selectedUsers = ref([])
    const whopaid = ref("")
    const outingslist = ref([])



    const addToList = async () => {
      try {
        selectedUsers.value += a_user.id
        console.log(selectedUsers.value,"payees");
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
      try {
        console.log("seleceduser",selectedUsers.value);
        const docRef = await addDoc(collection(db, 'expenses'), {
          amount: cost.value,
          desc: expense_desc.value,
          outing: category.value,
          usersInvolved: selectedUsers.value,
          whopaid: whopaid.value,
        });
        if (docRef) {
          console.log('expenses added');
        }
        for (const user of selectedUsers.value){
          console.log("user in for loop",user);
            const docRef2 = await addDoc(collection(db, 'transactions'), {
            amount: (parseInt(cost.value) / (selectedUsers.value.length+1)),
            expense: docRef.id,
            message: "",
            outing: category.value,
            paid: false,
            payer: user,
            receiver: whopaid.value,
            bump: Timestamp.now() 
          });
          if (docRef2) {
          console.log('doc2 added');
        }
        }
        
      } catch (error) {
        console.log(error.message);
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

      const q = query(collection(db,"outings"),where("community","==",comid.value))
      const outingsSnap = await getDocs(q)
      outingsSnap.forEach((doc)=>{
        outingslist.value.push({...doc.data(),id:doc.id})
      })
    }

    onMounted(()=>{
      fetchData()
    })

    
    return {
      addExpense, addToList, laoban, selectedUsers, expense_desc, cost, category, users, whopaid,outingslist

    };
  }
}


</script>

<style>
/* Add any necessary styles here */
</style>