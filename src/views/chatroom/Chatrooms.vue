<template>
  <Navbar/>
  <div class="container">
    <div class="row">
      <div class="chat-list-left  col-4">
        <ul class="chatlist-container">
          <li v-for="chatroom in chatlist" :key="chatroom.id" @click="selectChat(chatroom.id)" class="font-fredoka">
            <div>{{ chatroom.name }}</div>
          </li>
        </ul>
      </div>

      <div class="chatroom-right col-8">
        <ChatWindow v-if="selectedchat" :selectedchat="selectedchat"/>
      </div>

    <div class="col-1"></div>
  </div>
</div>

</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue';
import { ref,onMounted } from 'vue'
import { collection, doc, getDocs,getDoc,query,where } from "firebase/firestore"; 
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';
import{ auth,db} from '@/firebase/config';

export default {
  components: { Navbar, ChatWindow },
  setup() {
    const chatlist = ref([]);
    const router = useRouter();
    const selectedchat = ref(null);
    

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
            
            selectedchat.value = chatlist.value[0].id;
          }

          console.log("Query Successful");
        }catch(error){
          console.error("Could not fetch data",error);
        }
                
      }else{
        router.push({name:"Welcome"})
      }
    }

    const selectChat = (chatroomId) => {
      selectedchat.value = chatroomId;
      console.log(selectedchat);
    };

    onMounted(()=>{
      fetchData();
    })

    return { chatlist ,selectChat,selectedchat, }
  }
}
</script>

<style>
.chatlist-container{
  justify-content:flex;
  flex-direction: column;
}

</style>