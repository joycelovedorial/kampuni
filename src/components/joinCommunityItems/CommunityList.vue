<template>
    <!-- <div class="container">
        <div class="row">
                <div class="custom-container col-12 text-center border-5 border-solid border-black bg-y"> -->
                
                    <div v-if="communityArray.length > 0">
                        <div v-for="com in communityArray" :key="com.id">
                            <div class="flex flex-wrap justify-start p-3 mt-4 component-container">
                                <div class="col-md-9 col-12 flex">
                                    <span class="text-3xl font-semibold comm_name"> {{ com.communityName }} </span>
                                    <ul v-if="com.names">
                                        <li v-for="(namae,idx) in com.names" :key="idx">
                                            {{ namae }}test
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                <div class="col-md-3 col-12 flex">
                                    <button class="grow text-2xl button_styling" @click="joinCom(com.id)">Join</button>
                                </div>
                            </div>
    
                    <div v-if="error">
                        <p class="text-red-500">{{ error }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>No communities available.</p>
                </div>
                
                <!-- </div>
        </div>
    </div> -->
</template>

<script>
import { ref, onMounted } from 'vue'
import { db,auth } from "@/firebase/config"
import { collection, doc, getDocs, getDoc, updateDoc,arrayUnion,query,addDoc,where } from "firebase/firestore"; 
import { useRouter } from 'vue-router';
import { coolGray } from 'tailwindcss/colors';
export default {
    setup(){
     const communityArray = ref([])
     const router = useRouter()
     const error = ref(null);
     const nameArray =ref([])

     const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "communities"));
            nameArray.value = [];
            querySnapshot.forEach((sdoc) => {
                // console.log(communityArray)// Access the ref using .value
                const data = sdoc.data()
                const homie_list= data.homies
                nameArray.value= []

                for (const homie_id of homie_list){
                    getDoc(doc(db, "users", homie_id))
                        .then((snap)=>{
                            const sdata = snap.data()
                            const name = sdata.firstname
                            nameArray.value.push(name)
                        })
                    }
                    communityArray.value.push({...sdoc.data(),id:sdoc.id,names:nameArray.value}); 
                    console.log(communityArray.value,"com")

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

<style scoped>
.component-container{
    background-color:white;
    border-radius:25px;
    margin:10px;
    padding:5px;
    border:black 3px solid;
}

.button_styling{
    border:3px solid;
    border-color:#FFC96B;
    border-radius:10px;
    transition: color 0.3s, background-color 0.3s , transform 0.3s;
}

.button_styling:hover{
    border:3px solid;
    border-color:#FFC96B;
    border-radius:10px;
    background-color:#FFC96B;
    color:white;
    transform: scale(1.05);
}

.comm_name{
    padding:10px;

}
</style>