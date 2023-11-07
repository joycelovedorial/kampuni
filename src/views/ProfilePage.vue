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
            </div>
            <div class="middle mx-auto flex-col">
                <h1 class="font-fredoka font-bold">
                    About 
                </h1>
                <div class="container p-3 font-jakarta">
                    
                   
                       
                        <div class="column1">
                      
                            <div class="text1"> Email: </div>
                            <div class="text1"> Country: </div>
                            <div class="text1"> Birthday: </div>
                      
                            <div class="text1"> Community: </div>
                        </div>
                        <div class="column1">
                    
                        <div class="text" id="profileEmail">
                            {{email}}
                        </div>
                        <div class="text" id="country">
                            {{country}}
                        </div>
                        <div class="text" id="birthday">
                            {{birthday}}
                        </div>
                     
                        <div class="text" id="community">
                            {{community}}
                        </div>
                        </div>
                   

                </div> 
            </div>
        </div>
    </div>
</div>
        
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { doc,getDoc } from 'firebase/firestore';
import { auth,db } from "@/firebase/config"
import { ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default {
    props:['id'],
    components:{Navbar},
    setup(props) {
        console.log(props.id);
        const firstname = ref('')
        const lastname = ref('')
        const email = ref('')
        const country = ref('')
        const birthday = ref("")
        const bio = ref("")
        const community = ref('')
        const toEdit = ref(true)
        const photourl = ref('')
        const route = useRoute()
        const router = useRouter()

        getDoc(doc(db,"users",props.id))
            .then(async(snap)=>{
                const userData = snap.data();
                    photourl.value=userData.photoURL;
                    
                    const cid = userData.community;
                    const commSnap = await getDoc(doc(db, "communities", cid));
                    const commData = commSnap.data();
                    firstname.value = userData.firstname;  // Use .value
                    lastname.value = userData.lastname;  // Use .value
                    birthday.value = userData.birthday;  // Use .value
                    country.value = userData.country;  // Use .value
                    console.log("bio",bio.value);
                    bio.value = userData.bio;  // Use .value
                    email.value = userData.email;  // Use .value
                    community.value = commData.communityName;  // Use .value
            })

        return {firstname, lastname, birthday, country, bio, email, community,photourl}

    }
}
</script>

<style scoped>
#profilepage {
    min-height: 100vh;
    background-color: #F2D694;
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


.column1{
    width: 25%;
}

</style>