<template>
    
    
    <Navbar/>
    <body id="bg1" >
    <h1 class="font-extrabold" id="welcome">Welcome back, Name
        <!-- {{ name }} Pull name data from getUser-->
    </h1>
    <Dashboard/>
    </body>
    
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import Dashboard from '@/components/Dashboard.vue';

export default {
    components: {Navbar, Dashboard},

}


</script>

<style>

/* PLS READ -> FOR STYLES HERE, THEY WILL AFFECT ALL THE COMPONENTS MOUNTED HERE
SO THAT INCLUDES Navbar AND Dashboard -> Dashboard HAS COMPONENTS ON IT TOO

THIS PAGE SHOULD ONLY INCLUDE Navbar AND Dashboard AND MAYBE THE POPUP CHAT
*/
#welcome{
    margin: 0 auto;
    text-align: center;
    font-size :4.5rem;
    color:#2EC4B6;
}

#bg1{
    background-image: url('@/assets/background_img/background1.png');
    background-color: #f2f2f2;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh; /* 100% of viewport height */
    margin: 0;
     /* Remove default margin to cover the entire viewport */
}
</style>