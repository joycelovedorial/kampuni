<template>
    <form>
      <textarea
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
  import { doc, getDoc,collection,addDoc,FieldValue, serverTimestamp} from "firebase/firestore";
  
  export default {
    props:{
        selectedchat: String,
    },
      setup(props) {
          const user = auth.currentUser
          const uid = user.uid
          const displayName = ref('')
          const message = ref('')
          
          const fetchData=async()=>{

            console.log("this is chatform ",props.selectedchat);

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef); 
            const docData = docSnap.data()
            console.log(docData);
            displayName.value = docData.firstname
            console.log(displayName.value);
          }

          const handleSubmit = async () => {
            try {
                const docRef = await addDoc(collection(db, "chatrooms", props.selectedchat, "messages"), {
                    name: displayName.value,
                    message: message.value,
                    createdAt: serverTimestamp(),
                    });
                console.log("doc added ",docRef.id)
                message.value = '';
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        }

        onMounted(()=>{
          fetchData()
        })
        watch(() => props.selectedchat, () => {
          console.log("swapped new cid in chatform->",props.selectedchat);

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
          margin-bottom: 6px;
          padding: 10px;
          box-sizing: border-box;
          border: 0;
          border-radius: 20px;
          font-family: inherit;
          outline: none;
      }
  
  </style>