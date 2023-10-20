<template>

  <div class="container">

<!-- add three cards in a carousel -->
<div id="carouselExampleControls" class="carousel slide row" data-bs-ride="carousel">
  
  <!-- BS card: Start --> 
  <div class="card col-lg-4" style="width: 25rem;"> 
    <div class="container">
      <div class="row"> 
      <!-- <img src="..." class="card-img-top" alt="...">  -->
        <div class="card-body container "> 
          <div class="row">
            <h5 class="card-title col-4"><img id='icon' src="../../assets/profiles/amos.jpg"></h5> 
            <div class="card-title col-8" id="name_container">
              <h5 class="fw-bold pt-2 pb-1">Amos</h5> <!--{{name}}--> 
              <p class=" pb-2 pt-1">TGIF!! Dinner & Karaoke??!</p> <!--{{message}}--> 
            </div>
          </div>
        </div>
      </div> 
      <div class="row ">
        <ul class="list-group list-group-flush "  style="list-style-image:url('../../assets/icons/clock.svg')" > 
            <li id="date" class="list-group-item" style="list-style-image:url('../../assets/icons/clock.svg')">   

              <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
              </svg>


            15 December 2023, Friday</li> <!--{{date}}--> 
            <li id="time" class="list-group-item" style="list-style-image:url('../assets/icons/clock.svg')">
            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            6pm - 10pm</li> <!--{{time}}--> 

            
            <li id="location" class="list-group-item" style="list-style-image:url('../assets/icons/clock.svg')">
            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>Teo Heng @ Buona </li> <!--{{location}}--> 
        </ul> 
      </div>

      <div class="row">
        <div class="col-5 bg-green-300 option_box"> Count me in</div>
        <div class="col-2 pl-0 pr-0"></div>
        <div class="col-5 bg-red-300 option_box">Count me out</div>

      </div>
    </div>
  </div> 


   <div class="card col-lg-4" style="width: 18rem;"> 
       <!-- <img src="..." class="card-img-top" alt="...">  -->
       <div class="card-body"> 
           <h5 class="card-title">Card title</h5> 
           <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
       </div> 
       <ul class="list-group list-group-flush"> 
           <li class="list-group-item">An item</li> 
           <li class="list-group-item">A second item</li> 
           <li class="list-group-item">A third item</li> 
       </ul> 
       <div class="card-body"> 
           <a href="#" class="card-link">Card link</a> 
           <a href="#" class="card-link">Another link</a> 
       </div> 
   </div> 

   <div class="card col-lg-4" style="width: 18rem;"> 
       <!-- <img src="..." class="card-img-top" alt="...">  -->
       <div class="card-body"> 
           <h5 class="card-title">Card title</h5> 
           <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
       </div> 
       <ul class="list-group list-group-flush"> 
           <li class="list-group-item">An item</li> 
           <li class="list-group-item">A second item</li> 
           <li class="list-group-item">A third item</li> 
       </ul> 
       <div class="card-body"> 
           <a href="#" class="card-link">Card link</a> 
           <a href="#" class="card-link">Another link</a> 
       </div> 
   </div> 
   <!-- BS card: End --> 
  
</div>

    
  </div>

  
   <!-- BS carousel: start --> 
   <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel"> 
       <div class="carousel-inner"> 
           <div class="carousel-item active"> 
               <!-- <img src="..." class="d-block w-100" alt="...">  -->
           </div> 
           <div class="carousel-item"> 
               <!-- <img src="..." class="d-block w-100" alt="...">  -->
           </div> 
           <div class="carousel-item"> 
               <!-- <img src="..." class="d-block w-100" alt="...">  -->
           </div> 
       </div> 
       <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"> 
           <span class="carousel-control-prev-icon" aria-hidden="true"></span> 
           <span class="visually-hidden">Previous</span> 
       </button> 
       <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">  
           <span class="carousel-control-next-icon" aria-hidden="true"></span> 
           <span class="visually-hidden">Next</span> 
       </button> 
   </div> 
   <!-- BS carousel: end --> 
  
</template>

<script>

export default {
  components: {
    
  }
}
</script>

<style>
.container{
padding-bottom:0px;

}

.option_box{
  border-radius: 10px;
  font-size:16px;
  padding:10px;
  height:fit-content;
}
#name_container{
  /* margin-left:1rem; */
  background-color:orange;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top:10px;
  height:fit-content;
}
#icon{
  width:5rem;
  border:2px black solid ;
  border-radius:100%;
  /* margin-top:3rem; */
}
svg{
  margin-bottom:3px;
  margin-right:3px;
}

</style>