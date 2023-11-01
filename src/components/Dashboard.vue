<template>
  <div class="container ">
    <div class="row mb-3">
      <div class="col-12">
        <h1 class="mb-2 font-black text-cyanp text-3xl" >Upcoming Outings</h1>
        <OutingsCarousel :community="comid"/>
      </div>
    </div>

    <div class="row">
      <div class="col-1"></div>

      <div class="col-xl-5 col-12">
        <h1 class="mb-2 font-black text-cyanp text-3xl">Today Task</h1>
        <div class="flex-nowrap overflow-y-scroll overflow-x-auto test justify-center h-96 bg-neutral-900 bg-opacity-10 rounded-lg will-change-scroll" style="height:50vh">
          <TodayTask v-if="comid" :community="comid"/>
        </div>
      </div>

      <!-- <div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->
       <!--<div class="col-xl-0 col-lg-1 col-md-1 col-sm-1"></div> -->

      <div class="col-xl-5 col-12 h-96" >
      <h1 class="mb-2 font-black text-cyanp text-3xl">Expenses</h1>
       <div class="containerbg bg-opacity-25 rounded-lg flex justify-center overflow-y-scroll overflow-x-auto" style="height:40vh"><ExpensesList :community="comid"/></div>

      </div>
      <div class="col-lg-1 col-md-1 col-sm-1"></div>
    </div>
  </div>
</template>

<script>
import TodayTask from "./dashboardItems/TodayTask.vue";
import OutingsCarousel from "./dashboardItems/OutingsCarousel.vue";
import ExpensesList from "./dashboardItems/ExpensesList.vue";
import { db, auth } from "@/firebase/config";
import { onMounted, ref } from "vue";
import { getDoc,doc } from "firebase/firestore";

export default {
  components: { TodayTask, ExpensesList, OutingsCarousel },
  props: {
  },
  setup(props) {
    const comid=ref("")

    const fetchData = async() =>{
     
      const user = auth.currentUser
      const uid = user.uid
      const docSnap = await getDoc(doc(db,"users",uid))
      comid.value = docSnap.data().community
 
    }
    onMounted(() => {
      fetchData();
    });
      
    
    return { comid };
  },
};
</script>

<style>
:root {
  --primary: #2ec4b6;
  --secondary: #ffe7cf;
}

.test::-webkit-scrollbar {
  width: 8px;
  margin-left: 5px;
  
}

.test::-webkit-scrollbar-track {
  background: transparent;
  width:10px;
  margin-top:20px;
}

.test::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 10px;
}

.containerbg{
  /* background-color: #d9b99b; */
  background-color:white
}
</style>