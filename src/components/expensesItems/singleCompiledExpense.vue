<template>
    <div class="flex space-x-2 w-10/12 mx-auto">
        <div class="image block w-1/12 m-auto">
            <img class="inline-block rounded-full h-12 w-12 border-2 border-black my-auto" :src="imgstr" alt="">
        </div>
        <div class="block w-11/12">
            <div v-if="neutral" class="same-three block p-2 rounded-lg bg-bpop border-2 border-black">
                <p>No moneys owed between you and {{ homiename }}!</p>
            </div>
            <div v-else>
                <div v-if="owe" class="same-three block p-2 rounded-lg bg-bpop border-2 border-black">
                    <div class="flex justify-between">
                        <p>You owe {{ homiename }} ${{ Number(displayamount).toFixed(2) }}</p>
                        <button class="bg-g text-black rounded-full border-black border-2 my-auto px-3 drop-shadow-md" @click="onPay">
                            pay
                        </button>
                    </div>
                    <span v-for="(count,i) in Math.floor(`${displayamount}`/10)" :key="i" >
                        <span>
                            <img class="logo inline ml-3 h-6 w-6 rounded-full" :src="money" alt="">
                        </span>
                    </span>
                </div>
                <div v-else class="same-three block p-2 rounded-lg bg-bpop border-2 border-black">
                    
                    <p>{{ homiename }} owes you ${{ Number(displayamount).toFixed(2) }}</p>
                    <div>
                        <span v-for="(count,i) in Math.floor(`${displayamount}`/10)" :key="i" >
                            <span>
                                <img class="logo inline ml-3 h-6 w-6 rounded-full" :src="coin" alt="">
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { ref,watch } from 'vue'
import { doc, getDoc, query,collection,getDocs,deleteDoc,where } from 'firebase/firestore'
import { auth, storage, db } from '@/firebase/config'
import {  ref as fref, getDownloadURL } from "firebase/storage";

export default {
    props:{
        homieid: String,
        amount: Number,
    },
    emits: ['onPaid'],
    setup(props,context){
        console.log(props.amount,"if change");
        const homieid = ref(props.homieid)
        const amount = ref(props.amount)
        const homiename = ref("")
        const owe = ref(true)
        const displayamount = ref('')
        const neutral = ref(false)
        const imgstr = ref("")
        const money = ref("")
        const coin = ref("")

        getDownloadURL(fref(storage,'money.gif'))
            .then((url)=> {
                money.value = url
            })
        getDownloadURL(fref(storage,'coin.gif'))
            .then((url)=> {
                coin.value = url
            })

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
            imgstr.value=docData.photoURL
            //photoURL can pull here as well
        }
        fetchData()

        const onPay = async () => {

            const deletePromises = [];

      
            const user = auth.currentUser;
            const uid = user.uid;
            const delquery = query(collection(db, 'transactions'), where("payer", "==", uid), where("receiver", "==", props.homieid));
            const eldquery = query(collection(db, 'transactions'), where("receiver", "==", uid), where("payer", "==", props.homieid));

       
            const delsnap = await getDocs(delquery);
            const eldsnap = await getDocs(eldquery);

        
            delsnap.docs.forEach((ddoc) => {
                deletePromises.push(deleteDoc(doc(db, "transactions", ddoc.id)));
                context.emit("onPaid");

            });

            eldsnap.docs.forEach((edoc) => {
                deletePromises.push(deleteDoc(doc(db, "transactions", edoc.id)));
                context.emit("onPaid");
            });

            // Wait for all delete operations to complete
            await Promise.all(deletePromises);

            // Emit the event after all deletes have completed
        };

           
    
        watch([() => props.amount, () => props.homieid], ([newAmount, newHomieid], [oldAmount, oldHomieid]) => {
      // Update your component's state based on prop changes
            neutral.value = false
            owe.value=true
            if (newAmount > 0) {
                owe.value = true;
                displayamount.value = newAmount;
            } else if (newAmount < 0) {
                owe.value = false;
                displayamount.value = -1 * newAmount;
            } else {
                neutral.value = true;
            }

      // Fetch data based on the new 'homieid'
            fetchData();
        });

        return {
            homiename,displayamount,owe,neutral,onPay, imgstr, money, coin, 
        }
    }
}
</script>

<style>

</style>