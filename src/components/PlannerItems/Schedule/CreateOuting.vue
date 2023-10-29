<template>
  <div class="create-outing container-fluid">
    <form class="form-control" @submit.prevent="createOuting">
        <div class="row">
            <div>
                <label for="title">Title</label>
                <input class="form-control col-6" type="text" v-model="title" id="title">
            </div>
            
            <div>
                <label for="desc=">Description</label>
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
       

        

        <label for="eCost">Estimated Cost</label>
        <input type="text" id="eCost" v-model="eCost">
        <button @click="createOuting">Create Outing</button>
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
           
            
            //maybe for this might add every single user? then set imIn to false for them first, wah but the u need pull communityDoc then loop thru homies...shag...
            
        }
            
     


        return{ createOuting,
            title,desc,location,date,eCost
        }
    }
}
</script>

<style>

</style>