<template>
    <div class="h-45 bg-bpop rounded-md m-3 border-black border-2 p-3 drop-shadow-lg">
      {{ youowetext }}
      <div class="flex w-100 space-x-1">
        <div class="expenses w-full bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm">
          <div class="w-25 image text-center my-auto">
            <img class="rounded-full border-bpop border-3 h-8 w-8 inline-block" :src="imgurl">
            <p class="text-xs font-black">{{ name }}</p>
          </div>
          <div class="w-75 details p-2">
            <p class="font-bold">${{ Number(amount).toFixed(2) }}</p>
            <div class="flex space-x-2">
              <span class="category">{{outing}}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>



</template>

<script>
import { ref, computed, onMounted } from 'vue';

import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp, updateDoc,onSnapshot} from "firebase/firestore";
import { elements } from 'chart.js';


export default {
props:{
transacid: Object,

},


setup(props) {
  
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);

    const youowetext = ref('')
    const amount=ref(0)
    const name=ref('')
    const imgurl=ref('')
    const outing=ref('')
    const category=ref('')
    amount.value = props.transacid.amount

    
    const user = auth.currentUser
    const uid = user.uid

    if(props.transacid){
      console.log("transid",props.transacid);
      console.log("expid",props.transacid.expense);
      if(props.transacid.outing){
        getDoc(doc(db,"outings",props.transacid.outing))
        .then((snap)=>{
            const data=snap.data()
            outing.value=data.title
        })
          }else{    
              outing.value="General"
          }
        if(props.transacid.expense==undefined){
            category.value="General"
        }else{
            getDoc(doc(db,"expenses",props.transacid.expense))
            .then((snap)=>{
                const data=snap.data()
                // category.value=data.desc
            })
        }
      

      if(uid==props.transacid.payer){
          getDoc(doc(db,"users",props.transacid.receiver))
              .then((snap)=>{
                  const data=snap.data()
                  name.value=data.firstname
                  imgurl.value=data.photoURL
              })

        youowetext.value="You owe " + name.value
      }else if(uid==props.transacid.receiver){
          getDoc(doc(db,"users",props.transacid.payer))
              .then((snap)=>{
                      const data=snap.data()
                      name.value=data.firstname
                      imgurl.value=data.photoURL  
                  })

        youowetext.value = name.value + "Owes you"
      }
    }

    const textAnimationClass = computed(() => {
      return isAnimationActive.value ? 'text-animation' : '';
    });
// Use onMounted to trigger the toggleText method every 3 seconds



  return {
    showInput,
    textInput,
    buttonText,
    isAnimationActive,
    textAnimationClass,
    amount,
    youowetext,
    imgurl,
    name,
    category,
    outing,
    }
  }
  
};
</script>


<style scoped>



.text-animation {
animation: marquee 12s linear infinite;
white-space: nowrap;
overflow: hidden;
display: inline-block;
}

@keyframes marquee {
0% {
  transform: translateX(50%);
}
100% {
  transform: translateX(-300%);
}
}

.category {
font-size: 12px;
font-weight: bold;
background-color: #F4EDCA;
padding: 0 5px;
margin: 2px 0;
border-radius: 4px;
vertical-align: middle;
}
.title {
font-size: 12px;
font-weight: bold;
background-color: #F4EDCA;
padding: 0 5px;
margin: 2px 0;
border-radius: 4px;
vertical-align: middle;
}
</style>