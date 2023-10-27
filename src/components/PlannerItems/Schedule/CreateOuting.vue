<template>
  <div class="create-outing">
    <form class="form-control" @submit.prevent>

        <label for="title">Title</label>
        <input type="text" v-model="title" id="title">

        <label for="desc=">Description</label>
        <input type="text" v-model="desc" id="desc">

        <label for="location">Location</label>
        <input type="text" v-model="location" id="location">

        <label for="date">Date</label>
        <input type="datetime-local" id="date" v-model="date">

        <label for="eCost">Estimated Cost</label>
        <input type="text" id="eCost" v-model="eCost">
        <button @click="createOuting">Create</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { ref } from 'vue'
import { collection, addDoc, Timestamp, getDoc, doc } from "firebase/firestore"; 

export default {
    setup(){
        const title = ref("")
        const desc = ref("")
        const location = ref("")
        const date = ref("")
        const eCost = ref("")
        //outings: autoID
        //commID:
        //usersInvolved (might need to be subcollection)
        //date:
        //location:
        //description:
        //title:
        //estimatedCost:

        const createOuting = async() => {
            const user = auth.currentUser
            const uid = user.uid
            const docSnap = await getDoc(doc(db,"users",uid))
            const docData = docSnap.data()
            const cid = docData.community

            const dateOut = new Date(date.value)

            const outRef = await addDoc(collection(db, "outings"), {
                    community: cid,
                    date: Timestamp.fromDate(dateOut),
                    location: location.value,
                    description: desc.value,
                    title: title.value,
                    estimatedCost: eCost.value,
                });

                if (outRef) {
                console.log("Outing created");
                }

                const outID = outRef.id
                const subcolInvolved = collection(db,'outings',outID,"usersInvolved");
                //maybe for this might add every single user? then set imIn to false for them first, wah but the u need pull communityDoc then loop thru homies...shag...
                addDoc(subcolInvolved,{
                    user:uid,
                    imIn:true,
                })
        }
            
     


        return{ createOuting,
            title,desc,location,date,eCost
        }
    }
}
</script>

<style>

</style>