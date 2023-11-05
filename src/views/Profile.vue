<template>
    <div id="profilepage" class="bg-bnorm">
        <div>
            <Navbar/>
        </div>
        <div class="w-10/12 mx-auto space-y-2 p-3">
            <div class="mx-auto">
                <div class="text-center flex flex-col space-y-2">
                    <img class="mx-auto h-36 w-36 block rounded-full border-2 border-black" :src="photourl">
                    <h1 class="font-fredoka font-bold text-lg">{{ lastname }} {{ firstname }}</h1>
                    <p>{{ bio }}</p>
                    <button class="mx-auto block button px-2 rounded-lg w-40" @click="toEdit=!toEdit">Edit</button>
                </div>
            </div>
            <div class="middle mx-auto flex-col">
                <h1 class="font-fredoka font-bold">
                    About 
                </h1>
                <div class="container p-3 font-jakarta">
                    <div v-if="toEdit" class="profile mx-auto">
                        <!-- <div class="column">
                        <img :src="photourl" alt="">
                        </div> -->
                        <div class="column1">
                            <!-- <div class="text1"> First Name: </div>
                            <div class="text1"> Last Name: </div> -->
                            <div class="text1"> Email: </div>
                            <div class="text1"> Country: </div>
                            <div class="text1"> Birthday: </div>
                            <!-- <div class="text1"> Bio: </div> -->
                            <div class="text1"> Community: </div>
                        </div>
                        <div class="column1">
                        <!-- <div class="text" id="firstname">
                            {{firstname}}
                        </div>
                        <div class="text" id="lastname">
                            {{lastname}}
                        </div> -->
                        <div class="text" id="profileEmail">
                            {{email}}
                        </div>
                        <div class="text" id="country">
                            {{country}}
                        </div>
                        <div class="text" id="birthday">
                            {{birthday}}
                        </div>
                        <!-- <div class="text" id="bio"> 
                            {{bio}}
                        </div> -->
                        <div class="text" id="community">
                            {{community}}
                        </div>
                        </div>
                    </div>
                    <div v-else>
                        <ProfileEdit @updated="fetchData();toEdit=true"/>
                    </div>
                </div> 
            </div>
        </div>
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
        const toEdit = ref(true)
        const photourl = ref('')
        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                const docRef = doc(db, "users", uid);

                try {
                    const docSnap = await getDoc(docRef);
                    const userData = docSnap.data();
                    photourl.value=userData.photoURL;
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
            return {firstname, lastname, birthday, country, bio, email, community,toEdit,fetchData,photourl}
    }
}
</script>

<style scoped>
#profilepage {
    min-height: 100vh;
}

.profile {
  display: flex;
  flex-direction: row; 
  /* align-items: flex-start;  */
}
.text{ 
    /* font-size: 3vw; */
    display: flex;
    /* justify-content:left; */
}
.text1{
    /* font-size: 3vw; */
    font-weight: bold;
}
/* #profilepage{
    background-color: #F2D694;
    height: 100vh;
    margin: 0;
} */
.middle{
    justify-content: center;
    align-items: center;
    display: flex;
}
.container{
    width: 75%;
    height:50%;
    margin: 10px;
    border: solid;
    border-radius: 20px;
    background-color: #FFFDF0;
}
/* img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    border: solid;
} */
.column{
    margin: 10px;
    width: 50%;
}
.button{
border: solid 2px;
/* border-radius: 5px; */
cursor: pointer;
background-color: #F2D694;
/* padding: 5px 5px; */
transition: background-color 0.3s ease;
}
.button:hover{
    background-color: #FFFDF0;
}
.column1{
    width: 25%;
}

</style>