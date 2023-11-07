<template>
    <form>
      <textarea
      class="bg-p/50 rounded-lg focus:border-p"
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
      >
      </textarea>
      <!-- <div class="error">{{ error }}</div> -->
    </form>
  </template>
  
  <script>
  import { ref,onMounted,watch } from 'vue'
  import {auth,db} from '@/firebase/config'
  import { doc, getDoc,collection,addDoc, serverTimestamp} from "firebase/firestore";
  
  export default {
    props:{
        selectedchat: String,
    },
      setup(props,context) {
          const user = auth.currentUser
          const uid = user.uid
          const displayName = ref('')
          const message = ref('')
          const selectedChat = ref('')
          const photourl = ref('')
          
          const fetchData=async()=>{
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef); 
            const docData = docSnap.data()
            displayName.value = docData.firstname
            console.log(displayName.value);
            if(docData.photoURL){
              photourl.value=docData.photoURL
            }
          }

          const handleSubmit = async () => {
            try {
                const chatRoom = selectedChat.value; // Capture selectedchat in a local variable
                console.log("handleEvent",chatRoom);
                const user = auth.currentUser
                const uid = user.uid
                const docRef = await addDoc(collection(db, "chatrooms", chatRoom, "messages"), {
                    name: displayName.value,
                    message: message.value,
                    createdAt: serverTimestamp(),
                    photoURL:photourl.value,
                    userid:uid,
                    });
                console.log("doc added ",docRef.id)
                message.value = '';
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }

        onMounted(()=>{
          fetchData()
          selectedChat.value = props.selectedchat
          console.log("mounted:",props.selectedchat);
        })
        watch(() => props.selectedchat, () => {
          console.log("check",props.selectedchat);
          selectedChat.value = props.selectedchat
          fetchData();
        });
          return { message, handleSubmit}
      }
  
  }
  </script>
  
  <style scoped>
      form {
          margin: 10px;
       }
      textarea {
          width: 100%;
          max-width: 100%;
          padding: 10px;
          box-sizing: border-box;
          border: #B492B8 solid 2px;
          font-family: inherit;
          outline: none;
          color: black;

      }
  
  </style>