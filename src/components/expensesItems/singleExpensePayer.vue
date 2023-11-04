<template>

        <div class="font-bold font-jakarta text-sm flex justify-between">
            <div class="flex space-x-2 align-middle">
                <img class="inline-block rounded-full h-8 w-8 border-2 border-black my-auto" :src="imgstr" alt="">
                <div class="inline-block my-auto">
                    you owe {{ tname }} $ {{ Number(amount).toFixed(2) }}
                    <div class="block">
                        <span class="bg-b rounded-md text-xs px-1">{{ category }}: {{ desc }}</span>
                    </div>
                </div>
            </div>
            <div class="block my-auto">
                <button class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="paid">pay</button>
            </div>
        </div>
        <div class="w-full my-2 rounded-lg">
                <div class="message-bar bg-y rounded-md px-1 shadow-inner">
                    <span>{{ message }}</span>
                </div>
        </div>
    
    
</template>

<script>
import { ref,onMounted } from 'vue';
import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
export default {
    props:{
        transacid: String,
    },
    setup(props){
        console.log("payer",props.transacid);
        const message=ref('')
        const tname =ref('')
        const amount = ref("")
        const category=ref("")
        const docRef = doc(db,"transactions",props.transacid)
        const desc = ref("")
        const imgstr = ref("")
        const bump = ref(null)

        getDoc(docRef)
            .then((docSnap)=>{
                const data = docSnap.data()
                const tnameid =  data.receiver
                amount.value = data.amount
                desc.value=data.desc
                message.value=data.message
                // bump.value = data.bump
                console.log("doc",data);
                if(data.outing!==null){
                    getDoc(doc(db,'outings',data.outing))
                    .then((snap)=>{
                        const data = snap.data()
                        category.value=data.title
                    })
                }else{
                    category.value="General"
                }
                

                getDoc(doc(db,"expenses",data.expense))
                    .then((snaps)=>{
                        const data = snaps.data()
                        desc.value = data.desc
                    })

                getDoc(doc(db,'users',tnameid))
                    .then((dSnap)=>{
                        const data = dSnap.data()
                        tname.value=data.firstname
                        imgstr.value=data.photoURL
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