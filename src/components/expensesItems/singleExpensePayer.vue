<template>
  
  <div>
    tnamepic
    <span>You owe {{ tname }}</span>
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
        const desc = ref("")

        getDoc(docRef)
            .then((docSnap)=>{
                const data = docSnap.data()
                const tnameid =  data.receiver
                amount.value = data.amount
                desc.value=data.desc

                if(data.category!==null){
                    category.value=data.category
                }else{
                    category.value="General"
                }
                message.value=data.message

                getDoc(doc(db,'users',tnameid))
                    .then((dSnap)=>{
                        const data = dSnap.data()
                        tname.value=data.firstname
                    })
            })
        const paid = async () => {
            await updateDoc(doc(db,"transactions",props.transacid),{
                paid:true
            })
        }
        return{
            message,tname,amount,category,paid,desc
        }
    }
}
</script>

<style>

</style>