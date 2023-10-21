<template>
    <div class="container bg-orangep">
     <!-- create a container with four distinct rows -->
      <div class="row">
        <div class="col-sm-8">
          <p>IS216 Constultation</p>
        </div>
        <div class="col-sm-2">
          <p>Done</p>
        </div>
        <div class="col-sm-2">
          <p>Edit</p>
        </div>
      </div>
  </div>
</template>

<script>
import { db,auth } from "@/firebase/config"
import { onMounted, ref } from 'vue';
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  setup() {
    const user = auth.currentUser;
    const uid = user.uid;
    const tasks = ref([]);

    // Create a date object for today's date at midnight (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Use the "today" variable to query based on today's date
    const q = query(collection(db, 'users', uid, 'tasksUnique'), where('whenToDo', '>=', today), where('whenToDo', '<', new Date(today.getTime() + 24 * 60 * 60 * 1000)));

    const fetchData = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tasks.value.push({ ...doc.data(), id: doc.id });
      });
    };

    onMounted(() => {
      fetchData();
    });

    return { tasks };
  }
};
</script>

<style>

</style>