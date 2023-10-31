<template>
  <div>My Google Calendar</div>
</template>

<script>
import { ref } from 'vue'
// import { capitalize } from './helpers'
import {db,auth} from "../../../firebase/config.js"
export default{
  setup(){
    const taskArray =ref([])
    const outingArray = ref([])
    const comid = ref("")
    const userid = ref("")
    

    const q = query(collection(db,"tasks"),where("userid","==",null))
        const unsub = onSnapshot(q,(snap)=>{
            const results= [];
            snap.forEach((doc)=>{
                results.push({ ...doc.data(), id: doc.id })
            })
            taskArray.value=results
        })

    
    const fetchData = async () =>{
      const user = auth.currentUser
      userid.value = user.uid
      const docRef = doc(db,"users",userid.value)
      const docSnap = await getDoc(docRef)
      const docData = docSnap.data()
      comid.value = docData.community
      

    }


    return {

    }
  }
}

</script>

<style>

</style>