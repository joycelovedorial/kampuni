<template>
    <div class="container">
        <div v-if="communityArray.length > 0">
            <div v-for="com in communityArray" :key="com.id">
                <span> {{ com.communityName }} </span>
                <button @click="joinCom(com.id)">Join</button>
            </div>
        </div>
        <div v-else>
            <p>No communities available.</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { db,auth } from "@/firebase/config"
import { collection, doc, getDocs,getDoc, updateDoc,arrayUnion } from "firebase/firestore"; 
import { useRouter } from 'vue-router';
export default {
    setup(){
     const communityArray = ref([])
        const router = useRouter()

     const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "communities"));
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                communityArray.value.push({...doc.data(),id:doc.id}); 
                console.log(communityArray)// Access the ref using .value
            
            });
        };
     
    const joinCom = async (comId) => {

        const user = auth.currentUser;
        console.log(user)
        const uid = user.uid
        const communityRef = doc(db, "communities", comId);
        const communityDoc = await getDoc(communityRef);
        
        if (communityDoc.exists()) {
            await updateDoc(communityRef, {
                homies: arrayUnion(uid)
            });
        } else {
            console.error("Community document does not exist.");
        }

        const userRef = doc(db,"users",uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()){
            await updateDoc(userRef, {
                community:comId
            });
        
        }else{
            console.error("userDoc doesnt exist");
        }
        router.push({name:"Homepage", params: {community:comId}})  
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