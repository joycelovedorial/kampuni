<template>
  <div class="chat-window">
    <!-- <div v-if="error">{{ error }}</div> -->
    <div v-if="documents" class="messages" ref="messages">
        <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
            <span class="created-at">{{ doc.createdAt }}</span>
            <span class="name">{{ doc.name }}</span>
            <span class="message">{{ doc.message }}</span>
        </div>
    </div>
  </div>
  <div class="chatform" @chat-sent="fetchData">
        <Chatform v-if="selectedchat" :selectedchat="selectedchat" />   
  </div>
</template>

<script>
import Chatform from '@/components/Chatform.vue';
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated,ref,onMounted,watch} from 'vue'
import { doc, getDocs,collection } from "firebase/firestore";
import {db,auth} from '@/firebase/config'
export default {
    components:{Chatform},
    props: {
    selectedchat: String, // or the appropriate type
    },
    setup(props,context){
        // Query a reference to a subcollection
        const selectedchat= ref(props.selectedchat)
        // console.log("this should be comId ", typeof(props.selectedchat),props.selectedchat);
        const messages = ref(null)
        const documents= ref([])

        const fetchData = async() =>{
          console.log("ChatWindow fetchdata", props.selectedchat);

          const querySnapshot = await getDocs(collection(db, "chatrooms", props.selectedchat, "messages"));
              documents.value = querySnapshot.docs.map(doc => ({
              id:doc.id,
              ...doc.data()
            }))
            console.log("document updated: ",documents.value);
            documents.value = [...documents.value];
            // console.log("data-fetched");
            };

        const formattedDocuments = computed(()=>{
            if (documents.value){
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: time}
                })
            }
        })
        console.log(formattedDocuments)
        console.log(typeof(formattedDocuments))

        onMounted(()=>{
          fetchData()
        })
        watch(() => props.selectedchat, () => {
          fetchData();
          selectedchat.value= props.selectedchat
          console.log("swapped new cid->",props.selectedchat);
        });


        onUpdated(()=>{
          if(messages.value){
            messages.value.scrollTop = messages.value.scrollHeight
          }
        })

        return {documents,formattedDocuments,selectedchat,messages,fetchData}
      
    }

}
</script>

<style>
    .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
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