
<template>
  <Navbar />
    <body id="bg-container">
      <!-- <div class='overflow-y-auto'> -->
      <h1 class="text-black font-fredoka index1 p-4" id="welcome">Welcome back, {{ name }}</h1>
      <Dashboard :community="comid" class="index2"/>
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
          if(name.value==null){
            alert("Please update your profile!")
            router.push({name:"Profile"})
          }
          console.log(name.value,"name");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push({ name: "Welcome" });
      }
    };
    
    onMounted(() => {
      fetchCid();

      document.addEventListener('DOMContentLoaded', function() {
    const bgContainer = document.getElementById('bg-container');
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay';
    bgContainer.appendChild(blurOverlay);
    });
  })
  
  return { name, comid };
  },
};
</script>

<style scoped>
#welcome {
  margin: 0 auto;
  text-align: center;
  font-size: 4.5rem;
  font-weight: lighter;
  /* color: #2ec4b6; */
  color:black;
}

#bg-container {
  position: relative;
  /* background-image: url("@/assets/background_img/background3.png"); */
  background-color:#FFC96B; 
  /* FFC96B F2D694*/
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 180vh;
  margin: 0;
  overflow: scroll;
  overflow: hidden; /* Ensure the overlay doesn't extend beyond the container */
}

@media (min-width: 635px) {
  #bg-container {
    height: 170vh;
  }
}

/* @media (min-width: 998px) {
  #bg-container {
    height: 185vh;
  }
} */

@media (min-width: 1440px) {
  #bg-container {
    height: 105vh;
  }
}

@media (min-width: 2550px) {
  #bg-container {
    height: 115vh;
  }
}



</style>

