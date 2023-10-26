<template>
    <div class="profileEdit">
    <form>
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
import { doc,getDoc,setDoc } from 'firebase/firestore';
import { auth,db } from "@/firebase/config"
import { ref, onMounted} from 'vue';
export default {
    components: { Navbar },
    setup() {
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
            const user = auth.currentUser;
            const uid = user.uid;
            const docRef = doc(db, "users", uid);

            if(editfirstname.value!=""){
                const fn = editfirstname.value
            }
            if(editlastname.value!=""){
                const ln = editlastname.value
            }
            if(editbirthday.value!=""){
                const bd = editbirthday.value
            }
            if(editbio.value!=""){
                const bi = editbio.value
            }
            await setDoc(docRef,{
                firstname:fn,
                lastname:ln,
                birthday:bd,
                bio:bi,
            })


        }
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