
<template>
  <body id="bg-container">
    <Navbar />
      <!-- <div class='overflow-y-auto'> -->
        <h1 class="text-black font-fredoka index1 p-4 relative text-4xl font-lg sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl" id="welcome" >
          <span style="position: relative;">Welcome back, {{ name }}</span>
        </h1>
      <Dashboard :community="comid" class=""/>
      <!-- </div> -->
  </body>

</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Dashboard from "@/components/Dashboard.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export default {
  components: { Navbar, Dashboard },
  setup() {
    const name = ref("");
    const router = useRouter();
    const comid = ref(null)
    const photo=ref('')

    const fetchCid = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);

        try {
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          comid.value= userData.community;
          name.value = userData.firstname;
          photo.value=userData.photoURL
          if(name.value==null){
            alert("Please update your profile!")
            router.push({name:"Profile"})
          }
          
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push({ name: "Welcome" });
      }
    };
    
    onMounted(() => {
      fetchCid();

    //   document.addEventListener('DOMContentLoaded', function() {
    // const bgContainer = document.getElementById('bg-container');
    // const blurOverlay = document.createElement('div');
    // blurOverlay.className = 'blur-overlay';
    // bgContainer.appendChild(blurOverlay);
    // });
  })
  
  return { name, comid,photo};
  },
};
</script>

<style scoped>
#welcome {
  margin: 0 auto;
  text-align: center;
  /* font-size: 4.5rem; */
  font-weight: lighter;
  /* color: #2ec4b6; */
  color:black;
}

#bg-container {
  /* position: relative; */
  /* background-image: url("@/assets/background_img/background3.png"); */
  background-color:#FFC96B; 
  /* FFC96B F2D694*/
  /* background-size: cover; */
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
  height: fit-content;
  margin: 0;
  /* overflow: scroll; */
  /* overflow: hidden; */
}

@media (max-width: 425px) {
  #bg-container {
    height: 180vh;
  }
}
@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.rainbow-text {
  font-family: sans-serif;
  font-size: 6rem;
  background: linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red);
  background-clip: text;
  -webkit-background-clip: text; /* For WebKit-based browsers like Safari */
  color: transparent;
  animation: rainbow 5s linear infinite;
}
/* @media (min-width: 998px) {
  #bg-container {
    height: 185vh;
  }
} */

@media (min-width: 1440px) {
  #bg-container {
    height: 110vh;
  }
}

@media (min-width: 2550px) {
  #bg-container {
    height: 120vh;
  }
}





</style>

