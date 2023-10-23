<template>
    <div>form</div>
    <div>
        <form @submit.prevent>
            <input class="form-control name" type="text" required placeholder="Community Name" v-model="comName">
            <button type="submit" @click="ComCreate">Create</button>
        </form>
    </div>
</template>

<script>
import { db,auth } from "@/firebase/config"
import { ref, onMounted } from 'vue'
import { doc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "vue-router";
export default {
    setup () {
        const router = useRouter()
        const comName = ref("")

        const ComCreate = async () => {
            const user = auth.currentUser
            const uid = user.uid
            try {
                const comRef = await addDoc(collection(db, "communities"), {
                    communityName: comName.value,
                    homies: [uid]
                 });
                const comId = comRef.id;
                const chatRef = await addDoc(collection(db,"chatrooms"),{
                    usersInvoled: [uid],
                    name:comName.value,
                    //comId is the id of the communities document created above
                    communityID: comId,
                    //want to add another collection here called "messages"
                })
                const chatID = chatRef.id
                const newSubcollectionRef = collection(db, "chatrooms", chatID, "messages");
                addDoc(newSubcollectionRef,{
                    createdAt: new Date(),
                    name:comName.value,
                    message:"Welcome to " + comName.value,
                });

                router.push({ name: "Homepage", params: {community:comId} });
            } catch (error) {
                console.error("Error creating community:", error);
            }
        }
                
            
        

        return { comName, ComCreate }
    }

}
</script>

<style>

</style>