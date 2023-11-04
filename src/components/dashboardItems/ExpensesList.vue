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
import ExpListItem from './ExpListItem.vue'
export default {
  components:{
    ExpListItem
  },
  setup(){
    const peopleOweYou = ref([])
    const youOwePeople = ref([])
    console.log("expenses list loaded");
    const user = auth.currentUser
      const uid = user.uid
      const oweyouquery = query(collection(db,"transactions"),where("receiver","==",uid),where("paid","==",false))
      const unsubOweYou = onSnapshot(oweyouquery,(oweYouSnap)=>{
        const result = []
        const count = 0
        oweYouSnap.forEach((doc)=>{
          result.push({...doc.data(),id:doc.id})
          const data = doc.data()
        
          receivercount.value += 1
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
        
        payeecount.value += 1
       
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