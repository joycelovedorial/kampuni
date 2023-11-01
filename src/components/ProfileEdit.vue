<template>
    <div class="profileEdit">
    <form @submit.prevent="updateEdit">
    <div class="editForm">
      <label for="firstname">First Name</label>
      <input type="text" id="firstname" v-model="editfirstname" :placeholder="firstname">
      <label for="lastname">Last Name</label>
      <input type="text" id="lastname" v-model="editlastname" :placeholder="lastname">
      <label for="birthday">Birthday</label>
      <input type="date" id="birthday" v-model="editbirthday" :placeholder="birthday">
      <label for="bio">Bio</label>
      <input type="text" id="bio" v-model="editbio" :placeholder="bio">
    </div>
      <div class="text" id="community">
        Community: {{ community }}
      </div>
      <div class="text" id="country">{{ country}}</div>
      <button class="updateBtn" @click="updateEdit">Update</button>
    </form>
    </div>  
  </template>
<script>
import Navbar from '@/components/Navbar.vue';
import { doc,getDoc,setDoc,updateDoc } from 'firebase/firestore';
import { auth,db } from "@/firebase/config"
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
export default {
    components: { Navbar },
    setup(props,context) {
        const firstname = ref('')
        const lastname = ref('')
        const country = ref('')
        const birthday = ref("")
        const bio = ref("")
        const community = ref('')

        const editfirstname = ref('')
        const editlastname = ref('')
        const editcountry = ref('')
        const editbirthday = ref("")
        const editbio = ref("")
        const editcommunity = ref('')
        const toEdit = ref(true)
        const router = useRouter()

        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                const docRef = doc(db, "users", uid);

                try {
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    console.log("edit");
                    console.log(userData,"profile edit");
                    const cid = userData.community;
                    const commSnap = await getDoc(doc(db, "communities", cid));
                    const commData = commSnap.data();
                    firstname.value = userData.firstname;  // Use .value
                    lastname.value = userData.lastname;  // Use .value
                    birthday.value = userData.birthday;  // Use .value
                    country.value = userData.country;  // Use .value
                    bio.value = userData.bio;  // Use .value
                    community.value = commData.communityName;  // Use .value

                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                console.error("User is not authenticated.");
            }
        }
        fetchData()

        const updateEdit = async () => {
            console.log("inupdate");
            const user = auth.currentUser;
            if (!user) {
                console.error("User is not authenticated.");
                return;
            }

            const uid = user.uid;
            const docRef = doc(db, "users", uid);

            // Create an object to store the updated data
            const updatedData = {};

            // Check each field and add it to the updatedData object only if it's not empty
            if (editfirstname.value !== "") {
                updatedData.firstname = editfirstname.value;
            }
            if (editlastname.value !== "") {
                updatedData.lastname = editlastname.value;
            }
            if (editbirthday.value !== "") {
                updatedData.birthday = editbirthday.value;
            }
            if (editbio.value !== "") {
                updatedData.bio = editbio.value;
            }
            console.log(updatedData,"updated data");
            try {
                if (Object.keys(updatedData).length > 0) {
                    // Update the user's profile only if there is data to update
                    await updateDoc(docRef, updatedData);
                    console.log("User profile updated successfully.");
                } else {
                    console.log("No data to update.");
                }
            } catch (error) {
                console.error("Error updating user profile:", error);
            }
            context.emit("updated")
        };
        onMounted(() => {
            fetchData(); // Fetch data after the component is mounted
        });
            return {updateEdit,firstname, lastname, birthday, country, bio, community,toEdit,
                    editfirstname,editlastname,editcountry,editbirthday,editbio,editcommunity,
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
.editForm{
    display: flex;
    flex-direction: column;
}
</style>