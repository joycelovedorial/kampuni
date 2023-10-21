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
        const comName = ref("")
        const ComCreate = () => {
            const user = auth.currentUser
            const uid = user.uid
            const createdRef = async () => {
                await addDoc(collection(db,"communities"), {
                communityName: comName.value,
                homies: [uid]
                });
            }
            if(!createdRef){
                router.push({name:"Homepage"})
            }
        }

        return { ComCreate}
    }

}
</script>

<style>

</style>