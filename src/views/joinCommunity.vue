<template>
  <body id='body_container' class="bg-b">
    <div class="container custom-container">
      <div class="row">
        <h1 class="col-12 text-center text-4xl font-extra-bold p-5">Join a community!</h1>
      </div>
      <div class="row">
        <div class="col-3"></div>
          <div class="col-6">
            <h5 class="p-2 text-2xl font-medium">Select from the list</h5>
              <div class="container" style="position:relative">
                <div class="row " >
                  
                    <div class="custom-container col-12 text-center overflow-y-scroll">
                      <CommunityList />
                    </div>
                    
                    <div class="container join_comm">
                        <div class="row">
                          <h2 class="comm_text col-lg-8 col-sm-12 col-xs-12">Create Your Own Community! </h2>
                          <div class="col-lg-4 col-sm-12 col-xs-12 justify-center items-center flex">
                            <button class="create_button grow " @click="createCom = !createCom;">Create</button>
                          </div>
                        </div>
                    </div>

                </div>
              </div>
              
          </div>
        <div class="col-3"></div>

      </div>
      <div v-if="createCom">
        <CommunityCreate />
      </div>
    </div>
</body>
</template>

<script>
import CommunityList from '@/components/joinCommunityItems/CommunityList.vue';
import { auth, db } from "@/firebase/config"
import { ref, onMounted } from 'vue'
import CommunityCreate from '@/components/joinCommunityItems/CommunityCreate.vue';
import { useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';

export default {
  components: { CommunityList, CommunityCreate },
  data(){
    hover:false
  },
  methods:{
    isHover(){
      this.hover = !this.hover;
      console.log(this.hover);

    }
  },
  setup() {
    const createCom = ref(false);
    const router = useRouter();
    const user = auth.currentUser;
    console.log("this is supposed to be user " + user);

    const fetchData = async () => {
      if (user) {
        console.log(user);
        const uid = user.uid;
        const docRef = doc(db, "users", uid);

        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        console.log("This is supposed to be user data: ", userData);

        if (userData && userData.community) {
          router.push({ name: 'Homepage' });
        }
      } else {
        router.push({ name: "Welcome" });
      }
    };

    onMounted(() => {
      fetchData(); // Fetch data after the component is mounted
    });

    return { createCom };
  }
}
</script>

<style scoped>

/* .custom-container{
  background-color:#86B8B1;
  height:100vh;
} */

.custom-container::-webkit-scrollbar{
  background-color:transparent;
  height:5px;
  width:5px;
}



h1{
  margin: 0 auto;
  text-align: center;
  font-size: 48px;
  /* color: #2ec4b6; */
  color:black;
}

#body_container{
  height:120vh;
}

.custom-container{
    height:85vh;
    border:5px solid black;
    border-radius:25px;
    background-color:#FFC96B;
    position:relative;
}

.join_comm{
  background-color:#FF847C;
  position:absolute;
  bottom:10px;
  right:0;
  border-radius:0px 0px 20px 20px;
  border: 5px black solid;
  border-bottom: 0px black solid;
}

.comm_text{
  font-size: 32px;
  font-weight: light;
  padding:15px;
}

.create_button{
  background-color:white;
  border: 3px solid black;
  border-radius: 20px;
  font-size: 16px;
  padding:10px 30px 10px 30px ;
  font-weight: light;
  margin-bottom:5px;
  transition: font-size 0.3s,transform 0.3s;
}
.create_button:hover{
  background-color:white;
  border: 3px solid black;
  border-radius: 20px;
  font-size: 20px;
  padding:10px 30px 10px 30px ;
  font-weight: bold;
  margin-bottom:5px;
  transform:scale(1.05);
  /* padding:10px */

}
</style>
