<template>
  <div
    class="rounded-lg bg-bpop border-2 border-black p-2 w-100"
    :class="{
      // 'border-g': involved,
      // 'border-r': !involved,
      'border-orange': null,
    }"
    id="custom-container"
  >
    <!--v-for{{outing}}-->
        <div class="col-12" id="detail-container">
          <div
          class="w-auto justify-content-center align-middle border-2 truncate"
            :class="{
              'border-black bg-g': involved,
              'border-black bg-r': !involved,
              'border-orange': null,
            }"
            id="name_container"
            style="
              height: fit-content;
              width: fit-content;
              display: flex;
              flex-direction: column;
              align-items: stretch;
            "
          >
            <div class='flex justify-between w-full'>
                <div class="block p-2">
                    <h1 class="font-bold font-sm font-fredoka truncate">{{ title }} </h1>
                    <p class="text-ellipsis">{{ desc }}</p>
                </div>
                <div class="block m-2">
                    <img
                        v-if="photourl == ''"
                        class="h-12 w-12 bg-bnorm rounded-full border-2 border-black mt-0 mr-0"
                    />
                    <img
                        v-else
                        :src="photourl"
                        alt=""
                        class="h-12 w-12 bg-bnorm rounded-full border-2 border-black mt-0 mr-0"
                    />
                </div>
            </div>

            
            <!--{{name}}-->

            <!--{{message}}-->
            <!-- <h5 class="mt-1 mr-3">{{creatorname}}</h5> -->
          </div>
          <!-- <img v-if="outing.creatorname != 'it\'s a mystery'" :src="outing.imgstr" class="h-12 w-12 bg-white rounded-full border-2 border-black">
            <img v-else  class="h-12 w-12 bg-white rounded-full border-2 border-black"> -->
          </div>
      <div class="space-y-2 m-2">
        <div class="flex justify-start">
            <svg
            class="inline w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
          <p>{{ date }}</p>
        </div>
        <div class="flex justify-start">
          <svg
          class="inline w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
            >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p>{{ time }}</p>
        </div>
        <div class="flex justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>

              <p>
                {{ location }}
              </p>
            </div>
            <div class="flex justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
              <p v-for="(name, i) in joined" :key="i">{{ name + " " }}</p>
            </div>
          </div>
          <div class="row grid-col-2">
            <div class="col-6">
              <button
              class="w-100 bg-bnorm option_box rounded-lg text-green-700"
              
              :class="{
                clicked_style_green: involved,
              }"
            @click="has_clicked_green"
            >
          <svg
            class="w-5 h-5 inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            >
            <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          I'm in
        </button>
      </div>
        
        <!-- <div class="col-xl-0 col-lg-0 col-sm-0 col-md-0 pl-0 pr-0"></div> -->
        
        <div class="col-6">
          <button
            class="w-100 bg-bnorm option_box text-red-700 rounded-lg"
            
            :class="{
              'clicked_style_red shadow-inner': !involved,
            }"
            @click="has_clicked_red"
            >
            <svg
              class="w-5 h-5 inline"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              >
              <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            I'm out
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
import "@/assets/main.css";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  collection,
  setDoc,
  onSnapshot,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { ref, onMounted, computed } from "vue";
// import '../../../public/index.html';

export default {
  components: {},
  props: {
    outid: String,
  },
  setup(props) {
    const toDisplay = ref([]);
    const title = ref("");
    const desc = ref("");
    const location = ref("");
    const date = ref("");
    const eCost = ref("");
    const involved = ref(null); // if null, both buttons are pressable, if true, green button is pressed( only red is pressable), if false,vice versa
    const time = ref("");
    const isHovered_green = ref(false);
    const isHovered_red = ref(false);
    const docid = ref("");
    const outID = ref(props.outid);
    const user = auth.currentUser;
    const uid = user.uid;
    const photourl = ref("");
    const creatorname = ref("");
    const joined = ref([]);

    const formatDate = (timestamp) => {
      const dateObj = new Date(timestamp.toMillis());
      const options = { day: "numeric", month: "long", year: "numeric" };
      const timeOptions = { hour: "2-digit", minute: "2-digit" }; // Add time options
      const formattedDate = dateObj.toLocaleDateString(undefined, options);
      const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions); // Format time
      return { date: formattedDate, time: formattedTime };
    };
    const fetchData = async () => {
      const outRef = doc(db, "outings", outID.value);
      try {
        const outSnap = await getDoc(outRef);
        const outData = outSnap.data();

        title.value = outData.title;
        desc.value = outData.description;
        location.value = outData.location;
        eCost.value = outData.estimatedCost;
        const { date: formattedDate, time: formattedTime } = formatDate(
          outData.date
        );
        date.value = formattedDate;
        time.value = formattedTime;
        // photourl.value = outData.photoURL;
        //probably need to use snap shot here... shag...
        if (outData.creator) {
          console.log(outData.creator);
          const csnap = await getDoc(doc(db, "users", outData.creator));
          const cdata = csnap.data();
          creatorname.value = cdata.firstname;
          photourl.value = cdata.photoURL;
        } else {
          creatorname.value = "It's a mystery";
        }
      } catch {}
    };
    fetchData();

    const q = query(
      collection(db, "outings", outID.value, "usersInvolved"),
      where("user", "==", uid)
    );
    const subcollectionRef = collection(
      db,
      "outings",
      outID.value,
      "usersInvolved"
    ); // Reference to the subcollection
    getDocs(subcollectionRef).then(async (usersSnap) => {
      usersSnap.forEach(async (udoc) => {
        const udata = udoc.data();
        if (udata.imIn) {
          const dsnap = await getDoc(doc(db, "users", udata.user));
          const ddata = dsnap.data();
          joined.value.push(ddata.firstname);
        }
      });
    });

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach(async (doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      toDisplay.value = results;
      if (results.length > 0) {
        involved.value = results[0].imIn;
        docid.value = results[0].id;
      }
    });

    //join outing
    const has_clicked_green = async () => {
      const user = auth.currentUser;
      const uid = user.uid;
      console.log("outID", outID.value);
      if (docid.value) {
        await updateDoc(
          doc(db, "outings", props.outid, "usersInvolved", docid.value),
          {
            imIn: true,
          }
        );
      } else {
        await addDoc(collection(db, "outings", outID.value, "usersInvolved"), {
          imIn: true,
          user: uid,
        });
      }
      const q = query(
        collection(db, "chatrooms"),
        where("outing", "==", outID.value)
      );
      const snapshot = await getDocs(q);
      var chatroomid = "";
      snapshot.forEach((doc) => {
        chatroomid = doc.id;
      });
      await updateDoc(doc(db, "chatrooms", chatroomid), {
        usersInvolved: arrayUnion(uid),
      });
    };
    //leave outing
    const has_clicked_red = async () => {
      const user = auth.currentUser;
      const uid = user.uid;
      console.log("outID", outID.value);
      if (docid.value) {
        await updateDoc(
          doc(db, "outings", outID.value, "usersInvolved", docid.value),
          {
            imIn: false,
          }
        );
      } else {
        await addDoc(collection(db, "outings", outID.value, "usersInvolved"), {
          imIn: false,
          user: uid,
        });
      }
      const q = query(
        collection(db, "chatrooms"),
        where("outing", "==", outID.value)
      );
      const snapshot = await getDocs(q);
      var chatroomid = "";
      snapshot.forEach((doc) => {
        chatroomid = doc.id;
      });
      await updateDoc(doc(db, "chatrooms", chatroomid), {
        usersInvolved: arrayRemove(uid),
      });
    };
    onMounted(() => {
      fetchData();
    });

    return {
      has_clicked_green,
      has_clicked_red,
      joined,
      title,
      desc,
      location,
      date,
      eCost,
      time,
      isHovered_green,
      isHovered_red,
      involved,
      photourl,
      creatorname,
    };
  },
};
</script>

<style>
.clicked_style_green {
  background-color: #99b898 !important;
  color: rgb(255, 255, 255) !important;
  /* font-size: 30px; */
  /* border:rgb(4, 84, 4) solid 1px; */
}
.clicked_style_red {
  background-color: #ff847c !important;
  color: rgb(255, 255, 255) !important;
  /* border:rgb(255, 255, 255)  solid 1px; */
}

.custom-container {
  padding-bottom: 0px;
  display: inline;
  background-color: white;
  margin-bottom: 5px;
}

.card {
  display: inline-block;
}

.option_box {
  /* border-radius: 10px; */
  /* font-size: 18px; */
  padding: 2px 4px;
  /* padding-top: 10px;
  padding-right: 5px;
  padding-right: 5px;
  padding-bottom: 10px; */
  margin-bottom: 10px;
  height: fit-content;
  width: fit-content;
  border: black 2px solid;
  /* margin-top:20px; */
}

#detail_container {
  margin-top: 5px;
}

#name_container {
  /* margin-left:1rem; */

  border-radius: 10px;
  height: fit-content;
}
#icon {
  border-radius: 50%;
  width: full;
  /* border: 3px #ee944b solid; */
}

svg {
  margin-bottom: 3px;
  margin-right: 3px;
}

/* 
@media (max-width:768px){
    #custom-container{
        font-size:14px;
    }
}

@media (max-width:576px){
    #custom-container{
        font-size:10px;
    }
} */

/* 
@media (max-width:768px){
    #icon{
    width:auto;
    height:auto;
    border:1px black solid ;
    border-radius:100%;
    margin:0px;
    }
}
    @media (max-width:992px){
    #icon{
    width: 200px;
    height:auto;
    border:1px black solid ;
    border-radius:100%;
    }
}
    @media (max-width:1024px){
    #icon{
    width: 200px;
    height:auto;
    margin-right:20px;
    border:1px black solid ;
    border-radius:100%;
    } */

/* @media (max-width:576px){
    .option_box{
        font-size:16px;
    }
}

@media (max-width:768px){
    .option_box{
        font-size:16px;
    }
}

@media (max-width:1280px){
    .option_box{
        font-size:16px !important;
    }
} */
</style>