<template>
  <Navbar/>
    <div class="row" id="chat-container">
      <div class="chat-list-left  col-3" style="margin-top: 20px;">
        <input type="text" placeholder="Search for Chats" style="">
        <ul class="chatlist-container">
          <li v-for="chatroom in chatlist" :key="chatroom.id" @click="selectChat(chatroom.id,chatroom.name)" 
          class="singlelist">
            <div style="margin-left: 10px;">{{chatroom.name}}</div>
          </li>
        </ul>
      </div>

      <div class="chatroom-right col-9">
        <ChatWindow v-if="selectedchat" :selectedchat="selectedchat" :name="name"/>
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
    const name=ref(null)

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

          // withoutCommunityID.forEach(room => {
          //     console.log(room);
          //   });
          // Sort chatrooms with communityID based on communityID
          withCommunityID.sort((a, b) => a.communityID.localeCompare(b.communityID));

          // Combine the two arrays with communityID chatrooms first
          chatlist.value = [...withCommunityID, ...withoutCommunityID];
          const tempArr = [];
          for (const room of chatlist.value){
            tempArr.push(room)
            console.log(room);
          }
     
          if (chatlist.value.length > 0) {
            selectedchat.value = chatlist.value[0].id;
            name.value = chatlist.value[0].name
          }

          console.log("Query Successful");
        }catch(error){
          console.error("Could not fetch data",error);
        }
                
      }else{
        router.push({name:"Welcome"})
      }
    }

    const selectChat = (chatroomId,chatName) => {
      selectedchat.value = chatroomId;
      name.value = chatName
      console.log("selectChat has been clicked in Chatrooms, this is new ",  selectedchat.value);
    };

    onMounted(()=>{
      fetchData();
    })

    return { chatlist ,selectChat,selectedchat,name }
  }
}
</script>

<style>
.chatlist-container{
  justify-content:flex;
  flex-direction: column;
  overflow: scroll;
  height: 60vh;
  padding-right: 2%;
}
.chatlist-container::-webkit-scrollbar{
  background-color: transparent;
}
.chatlist-container::-webkit-scrollbar-thumb{
  background-color: #2EC4B6;
  border-radius: 10px;
}
#chat-container{
  margin: 20px 0;
  height: fit-content;
}
.singlelist{
  border: 2px solid #2EC4B6;
  padding: 5px; 
  border-radius: 10px; 
  margin-bottom: 10px; 
  font-weight: bold;
  background-color: rgba(46, 196, 182, 0.5);
  display: flex;
}
.singlelist:hover{
  border: 2px solid #2EC4B6;
  background-color: rgba(37, 149, 138, 0.5);
  
}
.chatroom-right col-9{
  max-height: 100%;
}
.chat-list-left  col-3{
  overflow: scroll ;
}
input[type="text"]{
  border-radius: 75px;
  margin-bottom: 20px;
  background-color: #2EC4B6;
  color:white;
  size: 3;
  width: 100%
}
</style>