<template>
  <div class="overflow-x-scroll overflow-y-hidden outer_container">
    <div class="flex flex-nowrap content-center">
      <div class="col-lg-7 p-3 col-md-7 col-sm-12"><singlecarousel /></div>
      <div class="col-lg-7 p-3 col-md-7 col-sm-12"><singlecarousel /></div>
      <div class="col-lg-7 p-3 col-md-7 col-sm-12"><singlecarousel /></div>
    </div>
    <div class="scrollbar"></div>
  </div>
</template>

<script>
import singlecarousel from "./singlecarousel.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { startOfDay } from "date-fns"; // Import the startOfDay function

export default {
  components: { singlecarousel },
  props: {
    community: String,
  },

  setup(props) {
    const user = auth.currentUser;
    const uid = user.uid;
    const cid = props.community;
    console.log("this is in outings carousel" + cid);
    const outingArray = ref([]);
    const filteredOutingList = ref([]);
    const now = new Date();
    const startOfToday = startOfDay(now); // Use the startOfDay function

    const q = query(
      collection(db, "outings"),
      where("communityID", "==", cid),
      where("date", ">=", startOfToday)
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
      console.log(filteredOutingList.value);
    };

    onMounted(() => {
      fetchData();
    });
  },
};
</script>


<style>
.testing {
  overflow: scroll;
}

.outer_container {
  width: auto;
  height: 300px;
  scrollbar-color: #2ec4b6 #f4a261;
}

:root {
  --primary: #2ec4b6;
  --secondary: #f4a261;
}

.outer_container::-webkit-scrollbar {
  
  border-radius:10px;
}

.outer_container::-webkit-scrollbar-track {
  background: transparent;
}

.outer_container::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius:10px;
}
</style>

