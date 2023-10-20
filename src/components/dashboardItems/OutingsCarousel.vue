<template>

<div class="container custom-container">

<!-- add three cards in a carousel -->
  <!-- BS card: Start --> 
  <div class="card col-lg-3" style="width: 25rem;">  <!--v-for{{outing}}-->
    <div class="container">
      <div class="row"> 
      <!-- <img src="..." class="card-img-top" alt="...">  -->
        <div class="card-body container "> 
          <div class="row">
            <h5 class="card-title col-4"><img id='icon' src="../../assets/profiles/amos.jpg"></h5> 
            <div class="card-title col-8 bg-orange-300" id="name_container">
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
        <button class="col-5 bg-orange-300 option_box text-green-700"> 
          <svg class='w-5 h-5 inline' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
          Count me in</button>

        <div class="col-2 pl-0 pr-0"></div>

        <button class="col-5 bg-orange-300 option_box text-red-700">
        <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        Count me out</button>

      </div>
    </div>
  </div> 



  <div class="card col-lg-3" style="width: 25rem;">  <!--v-for{{outing}}-->
    <div class="container">
      <div class="row"> 
      <!-- <img src="..." class="card-img-top" alt="...">  -->
        <div class="card-body container "> 
          <div class="row">
            <h5 class="card-title col-4"><img id='icon' src="../../assets/profiles/amos.jpg"></h5> 
            <div class="card-title col-8 bg-orange-300" id="name_container">
              <h5 class="fw-bold pt-2 pb-1">2</h5> <!--{{name}}--> 
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
        <button class="col-5 bg-orange-300 option_box text-green-700"> 
          <svg class='w-5 h-5 inline' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
          Count me in</button>

        <div class="col-2 pl-0 pr-0"></div>

        <button class="col-5 bg-orange-300 option_box text-red-700">
        <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        Count me out</button>

      </div>
    </div>
  </div> 


  <div class="card col-lg-3" style="width: 25rem;">  <!--v-for{{outing}}-->
    <div class="container">
      <div class="row"> 
      <!-- <img src="..." class="card-img-top" alt="...">  -->
        <div class="card-body container "> 
          <div class="row">
            <h5 class="card-title col-4"><img id='icon' src="../../assets/profiles/amos.jpg"></h5> 
            <div class="card-title col-8 bg-orange-300" id="name_container">
              <h5 class="fw-bold pt-2 pb-1">3</h5> <!--{{name}}--> 
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
        <button class="col-5 bg-orange-300 option_box text-green-700"> 
          <svg class='w-5 h-5 inline' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
          Count me in</button>

        <div class="col-2 pl-0 pr-0"></div>

        <button class="col-5 bg-orange-300 option_box text-red-700">
        <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
        Count me out</button>

      </div>
    </div>
  </div> 
  </div>
  
</template>

<script>

export default {
  components: {
    
  }
}
</script>

<style>

.custom-container{
padding-bottom:0px;
display: inline;
background-color: white;

}

.card{
  display:inline-block;
}

.option_box{
  border-radius: 10px;
  font-size:16px;
  padding:10px;
  height:fit-content;
  margin-top:20px;
  box-shadow: 3px 10px 7px rgb(194, 194, 194);
}
#name_container{
  /* margin-left:1rem; */
  
  
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