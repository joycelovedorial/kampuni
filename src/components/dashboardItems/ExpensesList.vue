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
    const oweyouquery = query(collection(db,"transactions"),where("receiver","==",uid))
    const unsubOweYou = onSnapshot(oweyouquery,(oweYouSnap)=>{
      const result = []
      oweYouSnap.forEach((doc)=>{
        result.push({...doc.data(),id:doc.id})
      })
      peopleOweYou.value=result
    })


    const youOwequery = query(collection(db,"transactions"),where("payer","==",uid))
    const unsubyouOwe = onSnapshot(youOwequery,(youOweSnap)=>{
      const result = []
      youOweSnap.forEach((doc)=>{
        result.push({...doc.data(),id:doc.id})
      })
      youOwePeople.value=result
    })


    const textAnimationClass = computed(() => {
      return isAnimationActive.value ? 'text-animation' : '';
    });
    // Use onMounted to trigger the toggleText method every 3 seconds
   


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