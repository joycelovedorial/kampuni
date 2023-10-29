
<template>
  <Navbar />
  <body id="bg-container">
    <h1 class="text-black font-fredoka text-" id="welcome">Welcome back, {{ name }}</h1>
    <Dashboard :community="comid" />
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
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        router.push({ name: "Welcome" });
      }
    };
    onMounted(() => {
      fetchCid();
    });
    return { name, comid };
  },
};
</script>

<style>
#welcome {
  margin: 0 auto;
  text-align: center;
  font-size: 4.5rem;
  font-weight: lighter;
  /* color: #2ec4b6; */
  color:black;
}

#bg-container {
  background-image: url("@/assets/background_img/background4.png");

  /* background-color: rgb(137, 255, 255); */
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100vh;
  margin: 0;

  /* z-index: -1; */
}

.blur {
  backdrop-filter: blur(5px);
}


</style>

