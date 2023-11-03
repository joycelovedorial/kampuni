<template>
  <div v-if="neutral">
    <p>No moneys owed between you and {{ homiename }}!</p>
  </div>
  <div v-else>
    <div v-if="owe">
        <p>You owe {{ homiename }} {{ displayamount }}</p>
    </div>
    <div v-else>
        <p>{{ homiename }} owes you {{ displayamount }}</p>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'
export default {
    props:{
        homieid: String,
        amount: Number,
    },
    setup(props){
        
        const homieid = ref(props.homieid)
        const amount = ref(props.amount)
        const  homiename = ref("")
        const owe = ref(true)
        const displayamount = ref('')
        const neutral = ref(false)

        if(amount.value>0){
            owe.value = true
            displayamount.value = props.amount
        }else if(amount.value<0){
            owe.value= false
            displayamount.value = -1 * props.amount
        }else{
            neutral.value = true
        }
        const fetchData = async () =>{
            const docSnap  = await getDoc(doc(db,"users",homieid.value))
            const docData = docSnap.data()
            homiename.value = docData.firstname
            //photoURL can pull here as well
        }
        fetchData()

        const onPay = async()=>{

        }

        return {
            homiename,displayamount,owe,neutral,onPay
        }
    }
}
</script>

<style>

</style>