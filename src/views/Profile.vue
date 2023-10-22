<template>
    <div>
        <Navbar/>
    </div>
    <div class="profile">
        <div id="firstname">
            Name:{{firstname.value}}
        </div>
        <div id="lastname">
            Surname:{{lastname.value}}
        </div>
        <div id="profileEmail">
            Email:{{email.value}}
        </div>
        <div id="country">
            Country:{{country.value}}
        </div>
        <div id="birthday">
            Birthday:{{birthday.value}}
        </div>
        <div id="community">
            Community:{{community.value}}
        </div>
    </div>
    <div>
        <!-- <ProfileEdit/> -->
    </div>

        
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

        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                const docRef = doc(db, "users", uid);

                try {
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    console.log(userData);
                    const cid = userData.community
                    const commSnap = getDoc(doc(db,"communities",cid))
                    const commData = (await commSnap).data();
                    firstname = userData.firstname
                    lastname = userData.lastname
                    birthday = userData.birthday
                    country = userData.country
                    bio = userData.bio
                    email = userData.email
                    community = commData.communityName

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.error("User is not authenticated.");
            }
        }
        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
            return {firstname, lastname, birthday, country, bio, email, community}
    }
}
</script>

<style>
.profile {
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
}
</style>