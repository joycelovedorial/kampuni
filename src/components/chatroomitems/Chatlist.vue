<template>
  <div class="chat-list-left">
      <!-- Chat list content -->
      <ul class="chatlist-container">
        <li v-for="chatroom in chatlist.value" :key="chatroom.id">
          <span @click="selectChat(chatroom.id)">{{chatroom.name}}</span>
          <p>loop</p>
        </li>
      </ul>
    </div>
</template>

<script>


import { ref,onMounted } from 'vue'
import { collection, doc, getDocs,getDoc,query,where } from "firebase/firestore"; 
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';
import{ auth,db} from '@/firebase/config';

export default {

  setup() {
    const chatlist = ref([]);
    const router = useRouter();
    const selectedChat = ref(null);
    


    const fetchData = async () => {
      const user = auth.currentUser
      if(user){
        const uid = user.uid;

        const q = query(
          collection(db, 'chatrooms'),
          where('usersInvolved', 'array-contains', uid)
          );
        try{
          const querySnapshot = await getDocs(q);
          chatlist.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          }));
           // Separate chatrooms into two arrays: with communityID and without
          const withCommunityID = chatlist.value.filter(room => room.communityID);
          const withoutCommunityID = chatlist.value.filter(room => !room.communityID);

          for (const room of withoutCommunityID) {
              const otherUserId = room.usersInvolved.find(userId => userId !== uid);
              // Fetch the other user's first name from the users collection
              const userDoc = await getDoc(doc(db, 'users', otherUserId));

              if (userDoc.exists()) {
                room.name = userDoc.data().firstname;
                
              }
            }

          withoutCommunityID.forEach(room => {
              console.log(room);
            });
          // Sort chatrooms with communityID based on communityID
          withCommunityID.sort((a, b) => a.communityID.localeCompare(b.communityID));

          // Combine the two arrays with communityID chatrooms first
          chatlist.value = [...withCommunityID, ...withoutCommunityID];
          const tempArr = [];
          for (const room of chatlist.value){
            tempArr.push(room)
          }
     

          if (chatlist.value.length > 0) {
            selectedChat.value = chatlist.value[0].id;
          }
          console.log(chatlist.value[0].name);
          console.log(chatlist.value[1].name);
          console.log(chatlist.value[2].name);

          console.log("Query Successful");
        }catch(error){
          console.error("Could not fetch data",error);
        }
                
      }else{
        router.push({name:"Welcome"})
      }
    }

    const selectChat = (chatroomId) => {
      selectedChat.value = chatroomId;
    };

    onMounted(()=>{
      fetchData();
    })

    return { chatlist ,selectChat,selectedChat, }
  }
}
</script>

<style>


</style>