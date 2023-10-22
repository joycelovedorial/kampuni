<template>
    
    <Navbar/>
    <body id="bg1">
    <h1 class="font-black" id="welcome">Welcome back, Name
        <!-- {{ name }} Pull name data from getUser-->
    </h1>
    <Dashboard :community="comId"/>
    </body>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import Dashboard from '@/components/Dashboard.vue';
import { auth } from '@/firebase/config';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

export default {
  components: { Navbar, Dashboard },
  setup() {
    const comId = ref('');
    const router = useRouter();

    const fetchCid = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, 'users', uid);

        try {
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          comId.value = userData.community; // Set the value of comId
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        router.push({ name: 'joinCommunity' });
      }
    };

    onMounted(() => {
      fetchCid();
    });

    return { comId };
  }
};
</script>
<style>

/* PLS READ -> FOR STYLES HERE, THEY WILL AFFECT ALL THE COMPONENTS MOUNTED HERE
SO THAT INCLUDES Navbar AND Dashboard -> Dashboard HAS COMPONENTS ON IT TOO

THIS PAGE SHOULD ONLY INCLUDE Navbar AND Dashboard AND MAYBE THE POPUP CHAT
*/
#welcome{
    margin: 0 auto;
    text-align: center;
    font-size :4.5rem;
    color:cyan;
    
}

#bg1{
    background-image: url('@/assets/background_img/background1.png');
}
</style>