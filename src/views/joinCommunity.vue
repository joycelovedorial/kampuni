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
import { db } from "@/firebase/config"
import { ref, onMounted } from 'vue'
import CommunityCreate from '@/components/joinCommunityItems/CommunityCreate.vue';


export default {
  components: {CommunityList,CommunityCreate},
  setup(){
    const createCom = ref(false)


    return { createCom }
}

}





</script>

<style>

</style>