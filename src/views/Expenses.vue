<template>
    <Navbar/>
    <createExpenses/>

</template>

<script>
import Navbar from '@/components/Navbar.vue';
import createExpenses from '@/components/expensesItems/createExpense.vue';
export default {
components:{
  Navbar,
  createExpenses
},
setup(){
  return{}
}
}
</script>

<style>
#expenses-page {
  background-image: url('../assets/background_img/background4.png');
  background-color: #f2f2f2;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
}

</style>