<template>
  <div>
    <h1>Leaderboard</h1>
    <div v-for="homie in userPoints" :key="homie.id">
      {{ homie.name }} - Points: {{ homie.points }}
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { db,auth } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
export default {
  setup(){

    const userPoints=ref([])
    const comid = ref("")
    
    const fetchData= async() => {
      console.log("leaderboard fetch");
      const user = auth.currentUser
      const uid = user.uid
      const docRef = doc(db,"users",uid)
      const docSnap = await getDoc(docRef)
      comid.value = docSnap.data().community
      console.log(comid.value,"leaderboard");
      const comRef = doc(db,"communities",comid.value)
      const comSnap = await getDoc(comRef)
      const comData = comSnap.data()
      for (const user of comData.homies) {
        console.log(user,"user")
        const userRef = doc(db,"users",user)
        const userSnap = await getDoc(userRef)
        const userData = userSnap.data()

        userPoints.value.push({id:userRef.id,name:userData.firstname,points:userData.points})
      }

    }
    fetchData()

    // onMounted=(()=>{
    //   fetchData()
    // })

    return{
      userPoints
    }
  }
}
</script>

<style>

</style>