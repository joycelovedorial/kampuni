<template>
  <div class="overflow-x-scroll overflow-y-hidden outer_container border-black rounded bg-white bg-opacity-25" style="height:fit-content">
  
    <div class="flex flex-nowrap content-center " v-for="out in outingArray" :key="out.id" >
      <span>hi</span>
      <div class="col-xl-4 col-lg-6 px-3 pb-3 pt-3 col-md-6 col-sm-12 col-12"><singlecarousel :outid="out.id"/></div>
    </div>
    <div class="scrollbar"></div>
  </div>
</template>

<script>
import singlecarousel from "./singlecarousel.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "@/firebase/config";
import { collection, query, where, getDocs,Timestamp, onSnapshot } from "firebase/firestore";
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
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const startOfToday = Timestamp.fromDate(now); // Use the startOfDay function

    const q = query(
      collection(db, "outings"),
      where("community", "==", cid),
      where("date", ">=", startOfToday)
    );

    

    const fetchData = async () => {
      console.log("fetching in outingcaorou");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        outingArray.value.push({ ...doc.data(), id: doc.id });
        console.log(outingArray);
      });

    };
    fetchData()

    onMounted(() => {
      fetchData();
    });

    return { outingArray }
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
  /* border: solid 1px ; */
  /* background-color:#2ec4b6; */
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

