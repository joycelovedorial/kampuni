<template>
  <div class="create-expenses mx-auto bg-bpop w-8/12 rounded-lg p-3">

    <form @submit.prevent="addExpense">
      <!-- <div class="row">
        <div>People involved</div>
      
        <div v-for="user in users" :key="user.id">
          <label :for="user.id">{{ user.name }}</label>
          <input 
          class="col-6" 
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
      </div> -->
   
      <div class="font-fredoka font-bold">Spending detail</div>
      <div class="space-x-3 flex justify-stretch">
        <input class="bg-bnorm focus:bg-y w-6/12 rounded-lg border-0 pl-2 placeholder-black ring-2 ring-inset ring-black placeholder:black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" type="text" v-model="expense_desc" id="expense_name" placeholder="name of expense" required>
        <input class="bg-bnorm focus:bg-y w-6/12 rounded-lg border-0 pl-2 placeholder-black ring-2 ring-inset ring-black placeholder:black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" type="number" step="0.01" v-model="cost" id="expense_name" placeholder="cost of expense" required>
        <select v-model="category" class="bg-bnorm focus:bg-y rounded-lg border-0 pl-2 ring-2 ring-inset ring-black placeholder:black focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6" required>
          <option class="bg-bnorm hover:bg-bpop" selected disabled value="">select category</option>
          <option class="bg-bnorm hover:bg-bpop" :value=null>Non-Outing</option>
          <option class="bg-bnorm hover:bg-bpop" v-for="out in outingslist" :key="out.id" :value="out.id" :selected="out.id === outid">{{out.title}}</option>
        </select>
      </div>
      <div>
        <!-- <label for="expense_category">Category of Expense</label> -->
      </div>
      <div class="flex justify-around space-x-3 mt-3">
        <div class="w-6/12 inline-block">
          <div class="">
            <div class="flex space-x-3">
              <p class="font-fredoka font-bold">People involved</p>
              <svg @mouseover="displayHelp=true" @mouseleave="displayHelp=false" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:cursor-pointer">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <p v-if="displayHelp">tick for yourself if you're involved too!</p>
          </div>
          <div class="bg-bnorm rounded-lg border-black border-solid test border-2 overflow-y-scroll overflow-x-auto" style="height:18vh;">
            <div v-for="user in users" :key="user.id">
              <input 
              class="m-2 ring-0 placeholder:black checked:text-p focus:text-p  focus:ring-black " 
              type="checkbox" 
              :id="user.id" 
              v-model="selectedUsers" 
              :value="user.id" 
              
              />
              <label :for="user.id" class="text-sm">{{ user.name }}</label>
            </div>
          </div>
        </div>
        
        <div class="w-6/12 inline-block">
          <div class="font-fredoka font-bold">Person who paid</div>
          <div class="bg-bnorm rounded-lg border-black border-solid test border-2 overflow-y-scroll overflow-x-auto" style="height:18vh;">
            <div v-for="user in users" :key="user.id">
              <input class="m-2  checked:text-p focus:text-p  focus:ring-black " type="radio" :id="user.id" v-model="whopaid" :value="user.id" required>
              <label :for="user.id" class="text-sm">{{ user.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <button class="w-100 mt-3 bg-g text-center text-black font-bold p-3 font-fredoka rounded-full border-3 border-black">
        Add Expense
      </button>
      
    </form>
  </div>
</template>

<script>

import { ref,onMounted,watch } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp } from "firebase/firestore";

export default {
  props: {
    outingid: String,
  },

  setup(props,context) {
    console.log(props.outingid,"prop is passed in createExpense");
    const expense_desc = ref('')
    const cost = ref('')
    const category = ref("")
    const comid = ref("")
    const userid = ref("")
    const users = ref([])
    const selectedUsers = ref([])
    const whopaid = ref("")
    const outingslist = ref([])
    const outid=ref(props.outingid)
    const displayHelp = ref(false)



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
          if (user !== whopaid.value) {
          console.log("user in for loop",user);
            const docRef2 = await addDoc(collection(db, 'transactions'), {
            amount: (parseFloat(cost.value) / (selectedUsers.value.length)),
            expense: docRef.id,
            message: "",
            outing: category.value,
            paid: false,
            payer: user,
            receiver: whopaid.value,
            bump: false
          });
          if (docRef2) {
          console.log('doc2 added');
        }}
        }
        context.emit("closeExpense")
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
    watch(() => props.outingid, (newOutingId) => {
      outid.value = newOutingId;

      // Find the matching out.title for the newOutingId
      const matchingOuting = outingslist.value.find((out) => out.id === newOutingId);
      if (matchingOuting) {
        category.value = matchingOuting.title;
      } else {
        category.value = ''; // Set to empty if no matching outing found
      }
    });

    onMounted(() => {
      fetchData();
      // Set the initial category based on the outingid prop
      const matchingOuting = outingslist.value.find((out) => out.id === props.outingid);
      if (matchingOuting) {
        category.value = matchingOuting.title;
      }
    });

    
    return {
      addExpense, addToList, laoban, selectedUsers, expense_desc, cost, category, users, whopaid,outingslist,outid, displayHelp

    };
  }
}


</script>

<style>
/* Add any necessary styles here */

.test::-webkit-scrollbar {
  width: 12px;
  border-radius:16px;
  /* margin-left: 5px; */
  /* height:5px; */
}

.test::-webkit-scrollbar-track {
  background: transparent;
  width:10px;
  height:5px;
  margin-top:5px;
  margin-right:10px;
  margin-bottom:5px;
}

.test::-webkit-scrollbar-thumb:hover {
  background-color:rgb(47, 47, 47)
}

.test::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 10px;
  width:5px;
  height:5px;
}

</style>