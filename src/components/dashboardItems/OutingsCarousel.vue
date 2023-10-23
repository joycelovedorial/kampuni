<template>
<div class= "overflow-x-scroll overflow-y-hidden outer_container">
  <div class="flex flex-nowrap content-center" >
    <div class="col-lg-7 p-3 col-md-7 col-sm-12"><singlecarousel/> </div>
    <div class="col-lg-7 p-3 col-md-7 col-sm-12" ><singlecarousel/> </div>
    <div class="col-lg-7 p-3 col-md-7 col-sm-12"><singlecarousel/> </div>

  </div>
</div>



</template>



<script>
import singlecarousel from '@/components/dashboardItems/singlecarousel';



export default {
  // backend needs testing
  components: {singlecarousel},

}






</script>


<style>
.testing{
  overflow:scroll
}
.outer_container{
  width:auto;
  height:300px;
  
}
</style>

