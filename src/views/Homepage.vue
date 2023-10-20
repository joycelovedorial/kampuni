
<template>
    <Navbar/>
    <h1>Welcome back, Name
        <!-- {{ name }} Pull name data from getUser-->
    </h1>
    <Dashboard/>
</template>

<script>
import { useRouter } from "vue-router"
import Dashboard from '@/components/Dashboard.vue';
import Navbar from "@/components/Navbar.vue";
export default {
    components:{
    Navbar, Dashboard
    }
}

</script>

<style>

/* PLS READ -> FOR STYLES HERE, THEY WILL AFFECT ALL THE COMPONENTS MOUNTED HERE
SO THAT INCLUDES Navbar AND Dashboard -> Dashboard HAS COMPONENTS ON IT TOO

THIS PAGE SHOULD ONLY INCLUDE Navbar AND Dashboard AND MAYBE THE POPUP CHAT
*/
h1{
    margin: 0 auto;
    text-align: center;
}
</style> 
