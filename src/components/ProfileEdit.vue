<template>
    <form @submit.prevent>
        <input type="text" id="firstname" placeholder={{firstname.value}} v-model="editfirstname">
        <input type="text" placeholder={{lastname.value}} id="lastname" v-model="editlastname">
        <input type="email" placeholder={{email.value}} id="profileEmail" v-model="editemail">
        <input type="date" id="birthday" placeholder={{birthday}} v-model="editbirthday">
        <input type="text" id="bio" placeholder={{bio}} v-model="editbio">
        <div class="text" id="community">
            Community:{{community.value}}
            <!-- give option to leave community to join another one? -->
        </div>
        <button @click="update"></button>
    </form>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from "@/firebase/config"
import { ref, onMounted} from 'vue';
export default {
    components: { Navbar },
    setup() {
        const firstname = ref('')
        const lastname = ref('')
        const email = ref('')
        const country = ref('')
        const birthday = ref("")
        const bio = ref("")
        const community = ref('')

        const editfirstname = ref('')
        const editlastname = ref('')
        const editemail = ref('')
        const editcountry = ref('')
        const editbirthday = ref("")
        const editbio = ref("")
        const editcommunity = ref('')
        const edittoEdit = ref(true)
        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                const docRef = doc(db, "users", uid);

                try {
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    console.log(userData);
                    const cid = userData.community;
                    const commSnap = await getDoc(doc(db, "communities", cid));
                    const commData = commSnap.data();
                    firstname.value = userData.firstname;  // Use .value
                    lastname.value = userData.lastname;  // Use .value
                    birthday.value = userData.birthday;  // Use .value
                    country.value = userData.country;  // Use .value
                    bio.value = userData.bio;  // Use .value
                    email.value = userData.email;  // Use .value
                    community.value = commData.communityName;  // Use .value

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.error("User is not authenticated.");
            }
        }
        const updateEdit = () => {

        }
        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
            return {updateEdit,firstname, lastname, birthday, country, bio, email, community,toEdit,
                    editfirstname,editlastname,editemail,editcountry,editbirthday,editbio,editcommunity,
          }
    }
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
}
.text{
    padding: 40px;
}
</style>