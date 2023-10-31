<template>
    <Navbar/>
  <div id="expenses-page">

  <Expense @add-expense="addExpense" />


  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Expenses from '@/components/dashboardItems/Expenses.vue';
export default {
components:{
  Navbar,
  Expenses
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