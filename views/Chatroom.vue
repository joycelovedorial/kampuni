<template>
  <img class="ban" src="../assets/logo.jpg">
  <div class="container">
    <Navbar/>
    <ChatWindow/>
    <NewChatForm/>
  </div>
</template>

<script>
import NewChatForm from '@/components/NewChatForm.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import Navbar from '@/components/Navbar.vue';
import getUser from '@/composables/getUser';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
export default {
    components: { Navbar, NewChatForm, ChatWindow },
    setup(){
        const {user} = getUser()
        const router = useRouter()
        watch(user,()=>{
            if(!user.value){
                router.push({name:'Welcome'})
            }
        })
    }


}
</script>

<style>
    nav {
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    nav p {
        margin: 2px auto;
        font-size: 16px;
        color: #444;
    }
    nav p.email {
        font-size: 14px;
        color: #999;
    }
    .ban{
        display: flex;
        justify-content: center;
        margin: 20px auto;
    }
    img {
        border-radius: 20px;
        width: 20%;
        height: 10 
    }

</style>