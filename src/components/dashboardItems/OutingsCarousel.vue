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
import { ref } from 'vue';
import { auth } from '@/firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";



export default {
  // backend needs testing
  components: { singlecarousel },
  props: {
    community: String, // Define the "community" prop in the child component
  },
  setup(props) {
  const uid = auth.currentUser.uid;
  const cid = props.community;
  const outingArray = ref([]);
  const filteredOutingList = ref([]);
  const now = new Date(); // Get the current date and time
  const startOfToday = startOfDay(now); // Get the start of the current day

  // Define the query with a date filter
  const q = query(
    collection(db, "outings"),
    where("communityID", "==", cid),
    where("date", ">=", startOfToday) // Filter for outings dated today and after
  );

  const fetchData = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      outingArray.value.push({ ...doc.data(), id: doc.id });
    });

    for (const out of outingArray.value) {
      if (!out.usersInvoled.includes(uid)) {
        filteredOutingList.push(out);
      }
    }
  }

  onMounted(() => {
    fetchData();
  });
}
}


</script>


<style>

</style>

