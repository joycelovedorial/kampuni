<template>
    <div>form</div>
    <div>
        <form @submit.prevent>
            <input class="form-control name" type="text" required placeholder="Community Name" v-model="comName">
            <input class="form-control name" type="text" required placeholder="Password" v-model="password">
            <input class="form-control name" type="text" required placeholder="Confirm Password" v-model="cfmpassword">
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
        const password=ref("")
        const cfmpassword= ref("")

        const ComCreate = async () => {
            if (password.value==cfmpassword.value || password.value.length > 0 ){
                const user = auth.currentUser
                    const uid = user.uid
                    try {
                        const comRef = await addDoc(collection(db, "communities"), {
                            communityName: comName.value,
                            homies: [uid],
                            password: password.value,
                        });
                        const comId = comRef.id;
                        const chatRef = await addDoc(collection(db,"chatrooms"),{
                            usersInvolved: [uid],
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
            }else{
                alert("Password Mismatch or Empty!","Try again","error")
            }    
        }
        return { comName, ComCreate,password,cfmpassword }
    }

}
</script>

<style>

</style>