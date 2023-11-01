<template>
    <div>
        <Navbar/>
    </div>
    <div v-if="toEdit" class="profile">
        <div class="text" id="firstname">
            Name: {{firstname}}
        </div>
        <div class="text" id="lastname">
            Surname: {{lastname}}
        </div>
        <div class="text" id="profileEmail">
            Email: {{email}}
        </div>
        <div class="text" id="country">
            Country: {{country}}
        </div>
        <div class="text" id="birthday">
            Birthday: {{birthday}}
        </div>
        <div class="text" id="bio"> 
            Bio: {{bio}}
        </div>
        <div class="text" id="community">
            Community: {{community}}
        </div>
    </div>
    <div v-else>
        <ProfileEdit @updated="fetchData();toEdit=true"/>
    </div>
   
    <button @click="toEdit=!toEdit">Edit</button>

        
</template>

<script>
import ProfileEdit from '@/components/ProfileEdit.vue';
import Navbar from '@/components/Navbar.vue';
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from "@/firebase/config"
import { ref, onMounted} from 'vue';
export default {
    components: { ProfileEdit, Navbar },
    setup() {
        const firstname = ref('')
        const lastname = ref('')
        const email = ref('')
        const country = ref('')
        const birthday = ref("")
        const bio = ref("")
        const community = ref('')
        const toEdit = ref(true)
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
                    console.log(commData);
                    firstname.value = userData.firstname;  // Use .value
                    lastname.value = userData.lastname;  // Use .value
                    birthday.value = userData.birthday;  // Use .value
                    country.value = userData.country;  // Use .value
                    console.log("bio",bio.value);
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
        fetchData();
        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
            return {firstname, lastname, birthday, country, bio, email, community,toEdit,fetchData}
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