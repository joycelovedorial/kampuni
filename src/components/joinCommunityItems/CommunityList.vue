<template>
    <div class="container">
        <div v-if="communityArray.length > 0">
            <div v-for="com in communityArray" :key="com.id">
                <span> {{ com.communityName }} </span>
                <button @click="joinCom(com.id)">Join</button>
            </div>
            <div v-if="error">
                <p class="text-red-500">{{ error }}</p>
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
import { collection, doc, getDocs,getDoc, updateDoc,arrayUnion,query,addDoc,where } from "firebase/firestore"; 
import { useRouter } from 'vue-router';
export default {
    setup(){
     const communityArray = ref([])
     const router = useRouter()
     const error = ref(null);

     const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "communities"));
            querySnapshot.forEach((doc) => {
                communityArray.value.push({...doc.data(),id:doc.id}); 
                // console.log(communityArray)// Access the ref using .value
            });
        };
     
    const joinCom = async (comId) => {
        
        const user = auth.currentUser;
        // console.log(user)
        const uid = user.uid
        const communityRef = doc(db, "communities", comId);
        const communityDoc = await getDoc(communityRef);
        const comData = communityDoc.data()
        const pw = comData.password
        const inputPass = prompt("Password: ")

        if (inputPass==pw){
            if (communityDoc.exists()) {
                    await updateDoc(communityRef, {
                        homies: arrayUnion(uid)
                    });
                    console.log("user joined community");
            } else {
                console.error("Community document does not exist.");
            }

            //Updating the User document to have a community it is included in
            const userRef = doc(db,"users",uid)
            const userDoc = await getDoc(userRef)

            if (userDoc.exists()){
                await updateDoc(userRef, {
                    community:comId
                });
            
            }else{
                console.error("userDoc doesnt exist");
            }

            const communityData = communityDoc.data();
            const homies = communityData.homies.filter((memberUid) => memberUid !== uid);
            const chatQuery = query(collection(db,'chatrooms'),where('community',"==",comId))
            const chatSnapshot = await getDocs(chatQuery);

            if (!chatSnapshot.empty){
            chatSnapshot.forEach(async (chatroomDoc) => {
                // Add the current user to the chatroom's usersInvolved array
                const chatroomId = chatroomDoc.id;
                const chatroomRef = doc(db, "chatrooms", chatroomId);
                await updateDoc(chatroomRef, {
                    usersInvolved: arrayUnion(uid),
                });
                console.log("user added to communityChatroom");
            });
            }else{
                console.error("Chatroom does not exist")
            }
        
            router.push({name:"Homepage", params: {community:comId}})  
        }else {
        // Password is incorrect
            error.value = "Incorrect password. Please try again.";
        }

    }
        //updating community doc where the user is added into the array
        

        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
            return { communityArray, joinCom, error }
    } 
}
</script>

<style>

</style>