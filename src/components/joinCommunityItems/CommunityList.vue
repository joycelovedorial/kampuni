<template>
    <div class="container">
        <div v-if="communityArray.length>0">
            <div v-for="com in communityArray" :key="com.id">
                <span>{{ com.communityName }}</span>
                <button @click="joinCom(com.id)">Join</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db,auth } from "@/firebase/config"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"; 
export default {
    setup(){
     const communityArray = ref([])


     const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "communities"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                communityArray.value.push(doc.data()); 
                console.log(communityArray)// Access the ref using .value
            });
        };

    const joinCom = async (comId) => {

        const user = auth.currentUser;
        const uid = user.uid
        const communityRef = doc(db, "communities", comId);
        const userRef = doc(db,"users",uid)
        await updateDoc(communityRef, {
                homies: arrayUnion(userUID)
            });
        await updateDoc(userRef, {
            community:comId
        });
        
    }



        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });




            return { communityArray, joinCom }
    } 
}
</script>

<style>

</style>