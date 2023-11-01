<template>
  
  <div>
    tnamepic
    <span>{{ tname }}</span>
    <div>${{amount}}</div>
    <div>{{ category }}</div>
    <div>{{ message }}</div>
  </div>


  <div>
    <button @click="paid">paid</button>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
export default {
    props:{
        transacid:String,
    },
    setup(props){
        const message=ref('')
        const tname =ref('')
        const amount = ref("")
        const category=ref("")
        const docRef = doc(db,"transactions",props.transacid)

        getDoc(docRef)
            .then((docSnap)=>{
                const data = docSnap.data()
                tname.value =  data.receiver
                amount.value = data.amount
                if(data.category!==null){
                    category.value=data.category
                }else{
                    category.value="General"
                }
                message.value=data.message
            })
        const paid = async () => {
            await updateDoc(doc(db,"transactions",props.transacid),{
                paid:true
            })
        }
        return{
            message,tname,amount,category,paid
        }
    }
}
</script>

<style>

</style>