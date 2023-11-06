<template>
    <!-- <div>form</div>
    <div class="container">
        <form @submit.prevent>
            <input class="form-control name" type="text" required placeholder="Community Name" v-model="comName">
            <input class="form-control name" type="text" required placeholder="Password" v-model="password">
            <input class="form-control name" type="text" required placeholder="Confirm Password" v-model="cfmpassword">
            <button type="submit" @click="ComCreate">Create</button>
        </form>
    </div> -->
<div class='container'>
<div class="row ">
    <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Community Name</label>
    <div class="flex">
    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
    </span>
    <input type="text" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green">
    </div>
</div>
<div class="row">
    <div class="col-6 pt-3">
        <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        </span>
        <input type="text" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green">
        </div>
    </div>

    <div class="col-6 pt-3">
        <label for="website-admin" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
        <div class="flex">
        <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
        </span>
        <input type="text" id="website-admin" class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie Green">
        </div>
    </div>
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
                            //comId is the id of the communities document created above
                            community: comId,
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