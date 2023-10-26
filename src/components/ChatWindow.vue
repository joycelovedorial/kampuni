<template>
  <div class="chat-window" style="background-color: white;">
    <!-- <div v-if="error">{{ error }}</div> -->
    <div>{{name}}</div>
    <div v-if="documents" class="messages" ref="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single" style="border: none;">
            <span class="name" style="margin-left: 25%;">{{ doc.name }}</span>
            <div style="background-color: #FFBF69; border-radius: 10px 10px 0 10px; padding: 1%; width: 75%; margin-left: 25%;">
              <span class="message">{{ doc.message }}</span>
              <span class="created-at" style="color: #878787; margin-left: 90%;">{{ doc.createdAt }}</span>
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
import { computed, onUpdated,ref,watch} from 'vue'
import { collection, query,orderBy, onSnapshot } from "firebase/firestore";
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

      return {documents,formattedDocuments,selectedchat,messages,name}
      
    }

}
</script>

<style>
    .chat-window {
    background: #a7e5f0;
    padding: 30px 20px;
    border-radius: 20px;
    border: 2px orange solid;
  }
  .single {
    margin: 10px 0;
    border-bottom: 1px grey solid;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
    color: orange;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>