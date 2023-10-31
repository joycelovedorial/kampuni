<template>
  <div class="chat-window" style="background-color: white;">
    <!-- <div v-if="error">{{ error }}</div> -->
    <div class="chatTitle">{{name}}</div>
    <div v-if="documents" class="messages" ref="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single" style="border: none;">
          <div v-if="thisName==doc.name">
            <span class="name">{{ doc.name }}</span>
            <div class="single-chat-container" >
              <span class="message">{{ doc.message }}</span>
              <span class="created-at">{{ doc.createdAt }}</span>
            </div>
          </div>
          <div v-else class="self">
            <span class="name-self">{{ doc.name }}</span>
            <div class="single-chat-container-self" >
              <span class="message-self">{{ doc.message }}</span>
              <span class="created-at-self">{{ doc.createdAt }}</span>
            </div>
          </div>
        </div>
    </div>
  </div>
  <div class="chatform">
        <Chatform v-if="selectedchat" :selectedchat="selectedchat" />   
  </div>
</template>

<script>
import Chatform from '@/components/Chatform.vue';
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, onUpdated,ref,watch} from 'vue'
import { collection, query,orderBy, onSnapshot,doc,getDoc} from "firebase/firestore";
import {db,auth} from '@/firebase/config'
export default {
    components:{Chatform},
    props: {
    selectedchat: String, 
    name: String,
    },
    setup(props,context){
        // Query a reference to a subcollection
      console.log("Chatwindow setup");
      const selectedchat= ref(props.selectedchat)
      // console.log("this should be comId ", typeof(props.selectedchat),props.selectedchat);
      const messages = ref(null)
      const documents= ref([])
      const error = ref(null)
      const name = ref(props.name)
      const thisName=ref("")
      const outid= ref("")
      
      const fetchName = async () => {
        const user = auth.currentUser
        const uid = user.uid
        const docRef =doc(db,"users",uid)
        const docSnap = await getDoc(docRef)
        const docData = docSnap.data()
        thisName.value = docData.firstname
      }
      fetchName();

      console.log("setup",props.name);
      
      const q = query(collection(db,"chatrooms",props.selectedchat,"messages"),orderBy("createdAt"))
      let unsubscribe = onSnapshot(q,(snapshot)=> {
        console.log("unsub", props.selectedchat);
        let results = []
        snapshot.docs.forEach(doc => {
              doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
          })
        documents.value = results
        error.value = null
      },(err)=>{
        console.log(err.message)
        documents.value=null
        error.value ='could not fetch the data'
      })
  

      const formattedDocuments = computed(()=>{
          if (documents.value){
              return documents.value.map(doc => {
                  let time = formatDistanceToNow(doc.createdAt.toDate())
                  return { ...doc, createdAt: time}
              })
          }else{
            return []
          }
      })
      console.log(formattedDocuments)
      console.log(typeof(formattedDocuments))

      watch(() => props.selectedchat, (newChatRoom, oldChatRoom) => {
        console.log("chatwindow watch");
        if (oldChatRoom) {
          // Unsubscribe from the previous listener (if it exists)
          unsubscribe();
        }

        if (newChatRoom) {
          // Create a new query for the new chat room and start a new listener
          const q = query(collection(db, "chatrooms", newChatRoom, "messages"), orderBy("createdAt"));
          unsubscribe = onSnapshot(q, (snapshot) => {
            // Handle updates for the new chat room
            let results = [];
            snapshot.docs.forEach((doc) => {
              doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
            });
            documents.value = results;
            error.value = null;
          }, (err) => {
            console.log(err.message);
            documents.value = null;
            error.value = "Could not fetch the data";
          });
        }
      selectedchat.value = props.selectedchat
      name.value = props.name
      console.log("check for name", name.value);
      console.log("watchcehck",selectedchat.value);
      });


      onUpdated(()=>{
        if(messages.value){
          messages.value.scrollTop = messages.value.scrollHeight
        }
      })

      return {documents,formattedDocuments,selectedchat,messages,name,thisName}
      
    }

}
</script>

<style>
  .created-at{
    color: #878787;
    margin-left: 90%;
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
    
  }
  .created-at-self{
    color: #878787;
    margin-left: 90%;
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
  }
  .single-chat-container{
    background-color: #9A899C;
    border-radius: 10px 10px 0 10px; 
    padding: 10px;
    width: 75%;
    margin-left: 25%;
  }
  .single-chat-container-self{
    background-color: #9A899C;
    border-radius: 10px 10px 10px 0; 
    padding: 10px;
    width: 75%;
    margin-right: 25%;
  }
  .name{
    margin-left: 25%;
    font-weight: bold;
    margin-right: 6px;
    color: #9A899C;
  }
  .name-self{
    color:#9A899C;
    font-weight: bold;
  }

  .chat-window {
    background: #a7e5f0;
    padding: 10px;
    border-radius: 20px;
    border: 2px #9A899C solid;
  }
  .single {
    margin: 10px 0;
    border-bottom: 1px grey solid;
  }

  .messages {
    max-height: 400px;
    overflow: auto;
    padding-right: 1%;
  }
  .chatTitle{
    font-size: 30px;
    font-weight: 900;
    color: #2F2F2F;
    padding: 0 10px 10px 0 ;
    border-bottom: #9A899C solid;
  }
  .messages::-webkit-scrollbar{
    background-color: transparent;
  }
  .messages::-webkit-scrollbar-thumb{
    background-color: #9A899C;
    border-radius: 10px;
  }
  @media (min-width: 635px) {
    .message{
      font-size: small;
    }
  }
</style>