<template>


        <div class="h-45 bg-bpop rounded-md m-3 border-black border-2 p-3 drop-shadow-lg">
          You Owe...
          <div class="flex w-100 space-x-1">
            <div class="expenses w-full bg-bnorm rounded-md border-black border-2 flex space-x-2 justify-around text-sm">
              <div class="w-25 image text-center my-auto">
                <img class="rounded-full border-bpop border-3 h-8 w-8 inline-block" src="../../assets/profiles/amos.jpg" alt="amos">
                <p class="text-xs font-black">amos</p>
              </div>
              <div class="w-75 details p-2">
                <p class="font-bold">$20.00</p>
                <div class="flex space-x-2">
                  <span class="category">general</span>
                  <span class="title">toilet paper</span>
                </div>
                <button class="inline-block w-100 bg-bnorm rounded-md p-1 text-xs font-bold border-black border-2 whitespace-nowrap overflow-hidden">
                  <span :class="textAnimationClass">{{ buttonText }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    


</template>

<script>
import { ref, computed, onMounted } from 'vue';

import { auth, db} from '@/firebase/config';
import { addDoc, collection, getDoc, doc, query, where, getDocs, Timestamp, updateDoc,onSnapshot} from "firebase/firestore";

export default {
  setup() {
    const showInput = ref(false);
    const textInput = ref('');
    const buttonText = ref('pay');
    const isAnimationActive = ref(false);

 
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
   

    return {
      showInput,
      textInput,
      buttonText,
      isAnimationActive,
      textAnimationClass,
      peopleOweYou, 
      youOwePeople,
    };
  },
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