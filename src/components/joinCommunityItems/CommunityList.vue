<template>
    <div v-if="communityArray.length > 0">
      <div v-for="com in communityArray" :key="com.id" class="bg-white m-3 rounded-lg p-2 border-black border-2">
        <div class="flex justify-between">
            <div class="flex-grow text-left">
                <div class="font-bold text-left text-lg font-semibold ml-0" style="display: inline;">
              {{ com.communityName }}&nbsp;
            </div>
            <div class="text-left" style="display: inline;">
              <span v-for="(name, idx) in com.names" :key="idx">
                <span v-if="idx < 3" >
                  {{ name }}&nbsp;
                </span>
             
              </span>
            </div>
          </div>
          <button class="text-sm bg-y px-2 rounded-lg button_styling border-black font-medium hover:text-black" @click="joinCom(com.id)">
            Join
          </button>
        </div>
      </div>
  
      <div v-if="error">
        <p class="text-red-500">{{ error }}</p>
      </div>
    </div>
    <div v-else>
      <p>No communities available.</p>
    </div>
  </template>
  
  


<script>
import { ref, onMounted } from 'vue'
import { db,auth } from "@/firebase/config"
import { collection, doc, getDocs, getDoc, updateDoc,arrayUnion,query,addDoc,where } from "firebase/firestore"; 
import { useRouter } from 'vue-router';
export default {
    setup(){
     const communityArray = ref([])
     const router = useRouter()
     const error = ref(null);

     const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "communities"));
            const result = []

            await Promise.all(querySnapshot.docs.map(async (sdoc) => {
                const data = sdoc.data()
                const homie_list = data.homies
                const nameArray = []

                await Promise.all(homie_list.map(async (id) => {
                    const snap = await getDoc(doc(db, "users", id))
                    console.log(id,"userid");
                        const sdata = snap.data()
                    console.log(sdata,snap.id);

                        const name = sdata.firstname
                        nameArray.push(name)
                    
                    
                    
                }))

                result.push({ ...sdoc.data(), id: sdoc.id, names: nameArray })
            }))

            communityArray.value = result
            console.log(communityArray.value);
        };

        
    fetchData()
     
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
            const chatQuery = query(collection(db,'chatrooms'),where('community',"==",comId),where('outing',"==",null))
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
        

        // onMounted(() => {
        //     fetchData(); // Fetch data after the component is mounted
        // });
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
    display: flex;

}

.button_styling{
    border:3px solid;
    /* border-color:#FFC96B; */
    border-radius:10px;
    transition: color 0.3s, background-color 0.3s , transform 0.3s;
}

.button_styling:hover{
    border:3px solid;
    /* border-color:#FFC96B; */
    border-radius:10px;
    /* background-color:#FFC96B; */
    /* color:white; */
    transform: scale(1.05);
}

.comm_name{
    padding:10px;

}

.hoomans{
    list-style-type: circle;
    display:block;
}


</style>