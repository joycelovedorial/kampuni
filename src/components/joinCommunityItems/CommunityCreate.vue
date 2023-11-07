<template>

<div class='container'>
    <div class="row h1 p-4 flex justify-center">Your Community's Detail</div>
    <div class="row">
    <form class="border-2 border-black border-solid flex flex-col bg-y" @submit.prevent>
        <input class="form-control mt-3 mb-3 name" type="text" required placeholder="Community Name" v-model="comName">
        <input class="form-control mt-3 mb-3 first-letter:first-line:name" type="text" required placeholder="Password" v-model="password">
        <input class="form-control mt-3 mb-3 name" type="text" required placeholder="Confirm Password" v-model="cfmpassword">
        <button type="submit" @click="ComCreate">Create</button>
    </form>
    </div>

</div>

    
</template>

<script>
import { db,auth } from "@/firebase/config"
import { ref, onMounted } from 'vue'
import { doc, addDoc, collection,updateDoc } from "firebase/firestore";
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
                        const docRef = doc(db,"users",uid)
                        await updateDoc(docRef, {
                            community:comId
                        })
                        const chatRef = await addDoc(collection(db,"chatrooms"),{
                            usersInvolved: [uid],
                            name:comName.value,
                            community: comId,
                            outing:null,
                        })
                        
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