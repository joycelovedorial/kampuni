<template>
  <div class="create-outing container-fluid">
    <span><button @click="emitCo">X</button></span>
    <form class="form-control" @submit.prevent="createOuting">
        Create Outing
        <div class="row">
            <div>
                <label for="title">Title</label>
                <input class="form-control col-6" type="text" v-model="title" id="title">
            </div>
            
            <div>
                <label for="desc">Description</label>
                <input class="form-control col-6" type="text" v-model="desc" id="desc">
            </div>
        </div>
        <div>
            <label for="location">Location</label>
            <input class="form-control" type="text" v-model="location" id="location">
        </div>


        <div>
            <label for="date">Date</label>
            <input class="form-control" type="datetime-local" id="date" v-model="date">
        </div>
       
        <button>Create Outing</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { ref } from 'vue'
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore"; 

export default {
    setup(props,context){
        const title = ref("")
        const desc = ref("")
        const location = ref("")
        const date = ref("")
        const photourl = ref("")

        const createOuting = async() => {
            const user = auth.currentUser
            const uid = user.uid
            const docSnap = await getDoc(doc(db,"users",uid))
            const docData = docSnap.data()
            if (docData.photoURL){
                photourl.value=docData.photoURL
            }
            const cid = docData.community

            const dateOut = new Date(date.value)

            const outRef = await addDoc(collection(db, "outings"), {
                    community: cid,
                    date: Timestamp.fromDate(dateOut),
                    location: location.value,
                    description: desc.value,
                    title: title.value,
                    photoURL:photourl.value
                });

            if (outRef) {
            console.log("Outing created");
            }
           
            const comSnap = await getDoc(doc(db,"communities",cid))
            const comData = comSnap.data()
            const homies = comData.homies
            const outID = outRef.id
            const subcolInvolved = collection(db,'outings',outID,"usersInvolved");
            for (const homie of homies) {
                if(homie==uid){
                    addDoc(subcolInvolved,{
                    user:homie,
                    imIn:true,
                })
                }else{
                    addDoc(subcolInvolved,{
                            user:homie,
                            imIn:null,
                    })
                } 
            }
           //create chatroom
            console.log("create outing outid",outID);
            const chatRef = await addDoc(collection(db,"chatrooms"),{
                community: cid,
                usersInvolved:[uid],
                name:title.value,
                outing:outID
            })

            if (chatRef){
                console.log("Chatroom created for outing",chatRef.id);
            }
            const chatID = chatRef.id
            const newSubcollectionRef = collection(db, "chatrooms", chatID, "messages");
            addDoc(newSubcollectionRef,{
                createdAt: new Date(),
                title:title.value,
                message:"Welcome to " + title.value,
            });
            location.value=""
            desc.value = ""
            title.value=""
        }
            
        const emitCo = () =>{
            context.emit("closeCreateOuting")
        }


        return{ createOuting,
            title,desc,location,date,emitCo
        }
    }
}
</script>

<style>

</style>