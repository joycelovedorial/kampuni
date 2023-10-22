<template>

<!-- <singlecarousel/> -->

<div class="carousel rounded-box">
  <div class="carousel-item">
    <img src="../../assets/logo.png">
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div> 
  <div class="carousel-item">
    <singlecarousel/>
  </div>
</div>
</template>



<script>
import singlecarousel from '@/components/dashboardItems/singlecarousel';
import { ref, onMounted } from 'vue';
import { auth,db } from '@/firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { startOfDay } from 'date-fns'; // Import the startOfDay function

export default {
  components: { singlecarousel },
  props: {
    community: String,
  },
  setup(props) {
    const uid = auth.currentUser.uid;
    const cid = props.community;
    const outingArray = ref([]);
    const filteredOutingList = ref([]);
    const now = new Date();
    const startOfToday = startOfDay(now); // Use the startOfDay function

    const q = query(
      collection(db, 'outings'),
      where('communityID', '==', cid),
      where('date', '>=', startOfToday)
    );

    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        outingArray.value.push({ ...doc.data(), id: doc.id });
      });

      for (const out of outingArray.value) {
        if (!out.usersInvoled.includes(uid)) {
          filteredOutingList.push(out);
        }
      }
    };

    onMounted(() => {
      fetchData();
    });
  },
};


</script>


<style>

</style>

