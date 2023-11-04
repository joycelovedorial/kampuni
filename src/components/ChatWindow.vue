<template>
  <div class="row" style=" display: flex;">
    <div class="col-9">
    <div class="chat-window">
      <!-- <div v-if="error">{{ error }}</div> -->
      <div class="chatTitle">
        {{name}}
        <div class="click-expenses" @click="toggleContent">
          {{ isContentAVisible ? 'Expenses ▼' : 'Expenses ▲' }}
        </div>
      </div>
      <div id="leftside">
        <div v-if="documents" class="messages" ref="messages">
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single" style="border: none;">
              <div v-if="thisName==doc.name">
                <img :src="doc.photoURL">
                <span class="name">{{ doc.name }}</span>
                <div class="single-chat-container" >
                  <span class="message">{{ doc.message }}</span>
                  <div class="datetime-thing">
                    <span class="created-at">{{ doc.createdAt }} ago</span>
                  </div>
                </div>
              </div>
              <div v-else class="self">
                <img :src="doc.photoURL">
                <span class="name-self">{{ doc.name }}</span>
                <div class="single-chat-container-self" >
                  <span class="message-self">{{ doc.message }}</span>
                  <div class="datetime-thing">
                    <span class="created-at-self">{{ doc.createdAt }} ago</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="chatform">
          <Chatform v-if="selectedchat" :selectedchat="selectedchat" />   
    </div>
    </div>
    <div v-if="displayExpenses">
      <div id="rightside" v-if="outid" class="col-3">
        <button @click="displayCreateExpense=!displayCreateExpense">Create Expense</button>
        <div v-if="displayCreateExpense">
          <createExpense :outingid="outid"/>
        </div>
        <div class="container" v-for="exp in expensesArray" :key="exp.id">
          {{ exp.desc }}
          {{ exp.amount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chatform from '@/components/Chatform.vue';
import createExpense from './expensesItems/createExpense.vue';
import { formatDistanceToNow } from 'date-fns'
import { computed, onMounted, onUpdated,ref,watch} from 'vue'
import { collection, query,orderBy, onSnapshot,doc,getDoc,where,getDocs, deleteDoc} from "firebase/firestore";
import {db,auth} from '@/firebase/config'
export default {
    components:{Chatform,createExpense},
    props: {
    selectedchat: String, 
    name: String,
    },
    setup(props,context){
        // Query a reference to a subcollection
      console.log("Chatwindow setup");
      const selectedchat= ref(props.selectedchat)
      const messages = ref(null)
      const documents= ref([])
      const error = ref(null)
      const name = ref(props.name)
      const thisName=ref("")
      const outid= ref("")
      const expensesArray = ref([])
      const displayCreateExpense = ref(false)
      const isContentAVisible = ref(true)
      const toggleContent = () => {
        isContentAVisible.value = !isContentAVisible.value;
      };
      const errorMessage = ref('')
      
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
      getDoc(doc(db,"chatrooms",props.selectedchat))
        .then((docSnap)=>{
          const data = docSnap.data()
          if (data.outing){
            outid.value=data.outing
            const qExpenses = query(collection(db,"expenses"),where("outing","==",outid.value))
            expensesArray.value = []
            const qExSnap = getDocs(qExpenses).then((querySnap)=>{
              querySnap.forEach((doc)=>{
                expensesArray.value.push({...doc.data(),id:doc.id})
                console.log("expenses arrya",expensesArray.value);

              })
            })
          }else{
            outid.value=null
            expensesArray.value=[]
            console.log("no outing");
          }
        })
      

        const deleteChatroom = async () => {
          const chatRef = doc(db, 'chatrooms', selectedchat.value);
          const chatSnap = await getDoc(chatRef);
          const chatData = chatSnap.data();

          if (chatData.outing !== null) {
            const outid = chatData.outing;
            const outRef = doc(db, 'outings', outid);
            const outSnap = await getDoc(outRef);
            const outingData = outSnap.data();

            if (outingData) {
              const outingDate = new Date(outingData.date.toMillis());
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

              if (outingDate <= oneWeekAgo) {
                await deleteDoc(outRef)
                await deleteDoc(chatRef)
              } else {
                // If the outing date is less than 1 week old, show an error message
                errorMessage.value = 'Too early to delete';
              }
            } else {
              errorMessage.value = 'Outing data not found';
            }
          }
        };
      
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
          getDoc(doc(db,"chatrooms",newChatRoom))
            .then((docSnap)=>{
              const data = docSnap.data()
              if(data.outing){
                outid.value=data.outing
                const qExpenses = query(collection(db,"expenses"),where("outing","==",outid.value))
                expensesArray.value = []
                const qExSnap = getDocs(qExpenses).then((querySnap)=>{
                  querySnap.forEach((doc)=>{
                    expensesArray.value.push({...doc.data(),id:doc.id})
                    console.log("expenses arrya",expensesArray.value);
                  })
                })
              }else{
                outid.value=null
                expensesArray.value=[]
                console.log("no outng");
              }
            
            })
         
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

      return {errorMessage,deleteChatroom,documents,formattedDocuments,selectedchat,
        messages,name,thisName,outid,expensesArray,displayCreateExpense,isContentAVisible,toggleContent,}
    }

}
</script>

<style scoped>
  .created-at{
    color: rgb(74, 51, 74);
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
    
  }
  .created-at-self{
    color: rgb(74, 51, 74);
    display: block;
    font-size: 12px;
    margin-bottom: 2px;
  }
  .single-chat-container{
    background-color: #FFFDF0;
    box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px 10px 0 10px; 
    padding: 10px;
    width: 75%;
    margin-left: 25%;
  }
  .single-chat-container-self{
    background-color: #B492B8;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    border-radius: 10px 10px 10px 0; 
    padding: 10px;
    width: 75%;
    margin-right: 25%;
  }
  .name{
    margin-left: 25%;
    font-weight: bold;
    margin-right: 6px;
    color: #B492B8;
  }
  .name-self{
    color:#B492B8;
    font-weight: bold;
  }

  .chat-window {
    background: #FFFDF0;
    padding: 10px;
    border-radius: 20px;
    border: 2px #000000 solid;
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
    border-bottom: #B492B8 solid;
  }
  .messages::-webkit-scrollbar{
    background-color: transparent;
  }
  .messages::-webkit-scrollbar-thumb{
    background-color: #B492B8;
    border-radius: 10px;
  }
  .datetime-thing{
    text-align: right;
  }
  .click-expenses{
    text-align: right;
    font-weight: normal;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
</style>