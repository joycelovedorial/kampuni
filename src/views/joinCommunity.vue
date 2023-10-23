<template>
  <p>Check/Join a community</p>
  <CommunityList/>
  <div>
      <h2>Create Your Community! </h2>
      <button @click="createCom=true;">Create</button>
  </div>
  <div v-if="createCom">
    <CommunityCreate/>
  </div>
</template>


<script>

import CommunityList from '@/components/joinCommunityItems/CommunityList.vue';
import { auth, db } from "@/firebase/config"
import { ref, onMounted } from 'vue'
import CommunityCreate from '@/components/joinCommunityItems/CommunityCreate.vue';
import { useRouter } from 'vue-router';
import { doc,getDoc } from 'firebase/firestore';


export default {
  components: {CommunityList,CommunityCreate},
  setup(){
    const createCom = ref(false)
    const router = useRouter()
    const user = auth.currentUser
    console.log("this is supposed to be user " +  user);
    
    const fetchData = async () => {
      if (user) {
      console.log(user);
      const uid = user.uid;
      const docRef = doc(db,"users",uid)

      const docSnap = await getDoc(docRef)
      const userData = docSnap.data()
      console.log("this is supposed to be user Data" +  userData);
      if (userData.community) {
            router.push({ name: 'Homepage' });
      }
      }else{
        router.push({name:"Welcome"})
      }
    }
    onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
return { createCom }
  }
}





</script>

<style>

</style>