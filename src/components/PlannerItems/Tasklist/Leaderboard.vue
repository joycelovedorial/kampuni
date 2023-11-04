<template>
  <h1>Leaderboard</h1>
  <!-- <div v-for="homie in userPoints" :key="homie.id">
      {{ homie.name }} - Points: {{ homie.points }}
    </div> -->

  <canvas id="myChart"></canvas>
</template>

<script>
import { onMounted, ref } from "vue";
import { Bar } from "vue-chartjs";
import { addDoc, collection, getDoc, doc, query, where, getDocs, updateDoc,orderBy,limit} from "firebase/firestore";
const ctx = document.getElementById("myChart");
import { db, auth } from "@/firebase/config";

export default {
  setup() {
    const userPoints = ref([]);
    const comid = ref("");
    const labels = ref([]);
    const pointData = ref([]);
    const plugin = {
      id: "customCanvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = options.color || "#86B8B1";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    const fetchData = async () => {
      console.log("leaderboard fetch");
      const user = auth.currentUser;
      const uid = user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      comid.value = docSnap.data().community;
      console.log(comid.value, "leaderboard");
      const comRef = doc(db, "communities", comid.value);
      const comSnap = await getDoc(comRef);
      const comData = comSnap.data();
      const q = query(
        collection(db, "users"),
        where("community", "==", comid.value),
        orderBy("points", "desc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        labels.value.push(data.firstname);
        pointData.value.push(data.points);
        userPoints.value.push({
          id: doc.id,
          name: data.firstname,
          points: data.points,
        });
      });

      // for (const user of comData.homies) {
      //   console.log(user, "user");
      //   const userRef = doc(db, "users", user);
      //   const userSnap = await getDoc(userRef);
      //   const userData = userSnap.data();
      //   labels.value.push(userData.firstname);
      //   pointData.value.push(userData.points);
      //   userPoints.value.push({
      //     id: userRef.id,
      //     name: userData.firstname,
      //     points: userData.points,
      //   });
      // }
      const ctx = document.getElementById("myChart");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels.value,
          datasets: [
            {
              label: "Points",
              data: pointData.value,
              borderWidth: 1,
              backgroundColor:["#FF847C","#F2D694","#B492B8"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 10,
              ticks:{
                fonts:{
                  size:26
                }
              } // Add the stepSize option here
            },
          },
        },
        plugins: {
          customCanvasBackgroundColor: {
            color: "white",
          },
        },
      });
    };

    fetchData();

    // onMounted=(()=>{
    //   fetchData()
    // })

    return {
      userPoints,
    };
  },
};
</script>

<style>
canvas {
  height: 60%;
  width: 60%;
}
</style>