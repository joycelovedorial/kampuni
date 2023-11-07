<template>
  <Navbar/>
  <div id="chatrooms">
    <div class="row" id="chat-container">
      <div class="chat-list-left col-3 justify-center">
        <input type="text" placeholder="Search for Chats" class="search font-jakarta overflow-hidden  border-black rounded-lg border-2 flex space-x-1 mx-auto bg-bnorm px-2 font-fredoka font-bold focus:border-p"
       v-model="searchtag">
        <div class="chatlist-container overflow-x-hidden">
          <li v-for="chatroom in chatlist" :key="chatroom.id" @click="selectChat(chatroom.id,chatroom.name)" 
          class="singlelist bg-bnorm hover:bg-bpop hover:border-bpop hover:shadow-inner"
          :class="{'bg-bpop': chatroom.id === selectedchat}">
            <div class="font-fredoka overflow-hidden overflow-ellipsis col-12 mx-auto px-2 rounded-lg flex space-x-1" style="margin-left: 10px;">
              {{ chatroom.name }} <!-- Display Event title or relevant Event property -->
            </div>
          </li>
        </div>
      </div>

      <div class="chatroom-right col-9">
        <ChatWindow v-if="selectedchat" :selectedchat="selectedchat" :name="name"/>
      </div>
    </div>
  </div>


</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue';
import { ref,onMounted,computed } from 'vue'
import { collection, doc, getDocs,getDoc,query,where } from "firebase/firestore"; 
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';
import{ auth,db} from '@/firebase/config';

export default {
  components: { Navbar, ChatWindow },
  setup() {
    const searchtag =ref("")
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
          where('usersInvolved', 'array-contains', uid));
        try{
          const querySnapshot = await getDocs(q);
          chatlist.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
          }));
           // Separate chatrooms into two arrays: with communityID and without
          const withouting = chatlist.value.filter(room => room.outing);
          const withoutouting = chatlist.value.filter(room => !room.outing);

          withouting.sort((a, b) => a.outing.localeCompare(b.outing));

          chatlist.value = [...withoutouting, ...withouting];
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

    const filteredChatlist = computed(() => {
      return chatlist.value.filter(chatroom => {
        if (searchtag.value === "") {
          // If searchtag is empty, return all chatrooms
          return true;
        } else if (chatroom.name) {
          // Check if chatroom.name is defined
          return chatroom.name.toLowerCase().includes(searchtag.value.toLowerCase());
        } else {
          return false; // Handle undefined chatroom.name by excluding it
        }
      });
    });


    const selectChat = (chatroomId,chatName) => {
      selectedchat.value = chatroomId;
      name.value = chatName
      console.log("selectChat has been clicked in Chatrooms, this is new ",  selectedchat.value);
    };

    onMounted(()=>{
      fetchData();
    })

    return { chatlist: filteredChatlist ,selectChat,selectedchat,name,searchtag }
  }
}
</script>

<style scoped>
/* #chatrooms {
  background-color:#B492B8;
  background-size: 100%;
  background-position: cover;
} */
.chatlist-container{
  justify-content:flex;
  flex-direction: column;
  overflow: scroll;
  height: 80vh;
  padding-right: 2%;
}
.chatlist-container::-webkit-scrollbar{
  background-color: transparent;
}
.chatlist-container::-webkit-scrollbar-thumb{
  background-color: #FFFDF0;
  border-radius: 10px;
}

#chat-container{
  margin: 20px 0;
  height: fit-content;
}
.singlelist{
  border: 2px solid ;
  padding: 10px;
  border-radius: 10px; 
  margin-bottom: 10px; 
  font-weight: bold;
  display: flex;
}

/* @media (max-width: 425px) {
  #chatrooms {
    height: 200vh;
  }
} */
.chatroom-right col-9{
  max-height: 100%;
}
.chat-list-left col-3{
  overflow: scroll ;
  margin-top: 20px;
  border: 2px #FFFDF0 solid;
}
input[type="text"]{
  border-radius: 75px;
  margin-bottom: 20px;
  color:black;
  size: 3;
  width: 100%
}
#chatrooms {
  background-color: #B492B8;
  padding: 10px;
  height: content;
}
@media (max-width: 575px) {
  .search {
    max-width: 100%; /* Allow the input field to expand to full width */
    width: 100%; /* Allow the input field to expand to full width */
  }
}

/* For screens larger than 575px */
@media (min-width: 576px) {
  .search {
    max-width: 200px; /* Set a maximum width for the input field */
    width: 100%; /* Make the input field take the full width of the parent */
  }
}
</style>