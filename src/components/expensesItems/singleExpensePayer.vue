<template>
    <div>
        <img class="inline rounded-full h-6 w-6 border-black mx-2" :src="'/profiles/' + imgstr" alt="">
        you owe {{ tname }} $ {{ Number(amount).toFixed(2) }}
        <div class="bg-bnorm w-full p-2 rounded-lg">
            <div>
                <div class="message-bar bg-y rounded-md px-1 shadow-inner">
                    <span>{{ message }}</span>
                </div>
                <span class="bg-bpop rounded-md px-1 text-xs font-bold">{{ category }}: {{ desc }}</span>
                <br>
                <button class="bg-g text-white rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="paid">pay</button>
            </div>
        </div>
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
        const imgstr = ref("")

        getDoc(docRef)
            .then((docSnap)=>{
                const data = docSnap.data()
                const tnameid =  data.receiver
                amount.value = data.amount
                desc.value=data.desc

                if(data.category){
                    category.value=data.category
                }else{
                    category.value="General"
                }
                if(data.desc){
                    desc.value=data.desc
                }else{
                    desc.value="NA"
                }
                if(data.message){
                    message.value=data.message
                }else{
                    message.value="lucky they havent chase you yet 👀"
                }

                getDoc(doc(db,'users',tnameid))
                    .then((dSnap)=>{
                        const data = dSnap.data()
                        tname.value=data.firstname
                        imgstr.value = data.firstname + ".jpg"
                    })
            })
        const paid = async () => {
            await updateDoc(doc(db,"transactions",props.transacid),{
                paid:true
            })
        }
        return{
            message,
            tname,
            amount,
            category,
            paid,
            desc,
            imgstr
        }
    }
}
</script>

<style>

</style>