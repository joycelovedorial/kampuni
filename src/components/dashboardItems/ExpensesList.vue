<template>
  <div v-for="peep in youOwePeople" :key="peep.id">
    <ExpListItem :transacid="peep" />
  </div>
  <div v-for="peepo in peopleOweYou" :key="peepo.id">
    <ExpListItem :transacid="peepo" />
  </div>
  <div><p>Expense List</p></div>
</template>

<script>
import { ref } from 'vue'
import ExpListItem from './ExpListItem.vue'
import { auth, db } from '@/firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
export default {
  components:{
    ExpListItem
  },
  setup(props) {
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);
    console.log(props.transobject,"tobject");
 
    const peopleOweYou = ref([])
    const youOwePeople = ref([])

    //fetching of stuff
    const user = auth.currentUser
      const uid = user.uid
      const oweyouquery = query(collection(db,"transactions"),where("receiver","==",uid),where("paid","==",false))
      const unsubOweYou = onSnapshot(oweyouquery,(oweYouSnap)=>{
        const result = []
        oweYouSnap.forEach((doc)=>{
          result.push({...doc.data(),id:doc.id})
        })
        peopleOweYou.value=result
        console.log(peopleOweYou.value,"poy");
      })


    const youOwequery = query(collection(db,"transactions"),where("payer","==",uid),where("paid","==",false))
    const unsubyouOwe = onSnapshot(youOwequery,(youOweSnap)=>{
      const result = []
      youOweSnap.forEach((doc)=>{
        result.push({...doc.data(),id:doc.id})
        const data = doc.data()
       
      })
      youOwePeople.value=result
      console.log(youOwePeople.value,"yop");


    })
  
  return {youOwePeople,
      peopleOweYou,}
  }
}
</script>

<style>

</style>