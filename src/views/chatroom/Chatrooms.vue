<template>
  <Navbar/>
</template>

<script>
import ChatWindow from '@/components/chatroomitems/ChatWindow.vue';

import Navbar from '@/components/Navbar.vue';
export default {
  components: { Navbar,ChatWindow },
  setup() {
    const chatlist = ref([])
    const router = useRouter();
    const selectedChat = ref(null);


    const fetchData = async () => {
      const user = auth.currentUser
      if(user){
        const uid = user.uid;

        const q = query(
          collection(db, 'chatrooms'),
          where('usersInvolved', 'array-contains', uid)
          );
        try{
          const querySnapshot = await getDocs(q);
          chatlist.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          console.log("this is querysnapshot" + chatlist.value);
           // Separate chatrooms into two arrays: with communityID and without
          const withCommunityID = chatlist.value.filter(room => room.communityID);
          const withoutCommunityID = chatlist.value.filter(room => !room.communityID);

          withoutCommunityID.forEach(async room => {
              const otherUserId = room.usersInvolved.find(userId => userId !== uid);

              // Fetch the other user's first name from the users collection
              const userDoc = await getDoc(doc(db, 'users', otherUserId));
              if (userDoc.exists()) {
                room.name = userDoc.data().firstname;
              }
            }); 

          // Sort chatrooms with communityID based on communityID
          withCommunityID.sort((a, b) => a.communityID.localeCompare(b.communityID));

          // Combine the two arrays with communityID chatrooms first
          chatlist.value = [...withCommunityID, ...withoutCommunityID];
          console.log(chatlist.value);
          if (chatlist.value.length > 0) {
            selectedChat.value = chatlist.value[0].id;
          }
          console.log("Query Successful");
        }catch(error){
          console.error("Could not fetch data",error);
        }
                
      }else{
        router.push({name:"Welcome"})
      }
    }
    const selectChat = (chatroomId) => {
      selectedChat.value = chatroomId;
    };
    onMounted(()=>{
      fetchData();
    })

    return {chatlist,selectChat,selectedChat}
  }
}
</script>

<style>

</style>