<template>
  <div>
    <div>
      <h1 class='text-center text-6xl p-3'>TOP 3</h1>
    </div>
    <!-- <div v-for="homie in userPoints" :key="homie.id">
        {{ homie.name }} - Points: {{ homie.points }}
      </div> -->

      <canvas id="myChart" width="500" height="333"></canvas>
  </div>
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
      Chart.defaults.font.size = 20;
      ctx.width = 400; // Set the desired width
      ctx.height = 233; // Set the desired height

      
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [labels.value[1],labels.value[0],labels.value[2]],
          datasets: [
            {
              label: "Points",
              data: [pointData.value[1],pointData.value[0],pointData.value[2]],
              borderWidth: 3,
              borderColor:"black",
              backgroundColor:["#FF847C","#F2D694","#B492B8"],
              borderRadius: 25,
              
            },
          ],
        },
        options: {
          responsive: true, // Enable responsiveness
          // maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              stepSize: 10,
              grid:{
                offset:true
              }
              ,
            },
          },
        },
          plugins: {
            legend:{
              display:false,
              labels:{
                font:{
                  size:55,
                  fontFamily: {
                  sans: ['Jakarta Sans'],
                  fredoka: ['Fredoka']
      },
              }
            }
          }
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

</style>