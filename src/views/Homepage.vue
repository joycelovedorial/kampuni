
<template>
    <!-- <div class="container-fluid"> -->
        <div>
            <img id='background' src="../assets/background_img/background1.png">
        </div>

    <div class="container-fluid" id="first-container">
        <div class="row">
            <div class="col-lg-7 col-md-7 d-flex justify-content-end">
                <img class='justify-content-end' id='logo' src="../assets/logo.png">
            </div>
            
        
            <div class="col-lg-5 col-md-5 ">
                <ul class="nav"> 
                    <li id="home" class="nav-item"> 
                        <a class=" nav-link active" aria-current="page" href="#">Home</a> 
                    </li> 
                    <li id="chat" class="nav-item"> 
                        <a class="nav-link" href="#">Chat</a> 
                    </li> 
                    <li id="calendar" class="nav-item"> 
                        <a class="nav-link" href="#">Calendar</a> 
                    </li> 
                    <li id="tasks" class="nav-item"> 
                        <a class="nav-link">Tasks</a> 
                    </li> 
                </ul> 
            </div>
        <!-- <div class="container">
            <div class="row toprow">
                <div class="col-4">
                    <h1>Hello</h1>
                    <ul>
                        <li>
                            15 Decenmber 2023, Friday
                        </li>
                        <li>
                            6pm-10pm
                        </li>
                        <li>
                            Teo Heng @ Buona Vista
                        </li>
                    </ul>
                </div>

                <div class="col-4">
                    <h1>Hello</h1>
                </div>

                <div class="col-4">
                    <h1>Hello</h1>
                </div>
            </div>
        </div> -->
        </div>
    </div>
    <!-- </div> -->
        
        <!-- <div class="div-3">
            <div class="body">
                <div class="text-wrapper-22">Welcome back, An Yu!</div>
            </div>
            <Overlap />
            <NavBarWrapper />
            <Outings />
            <div class="text-wrapper-23">Upcoming outings</div>
            <div class="text-wrapper-24">Today’s Task</div>
            <div class="text-wrapper-25">Expenses</div>
            <Tasks />
            <div class="overlap-8">
                <div class="text-wrapper-26">View More</div>
            </div>
            <div class="overlap-9">
                <div class="text-wrapper-26">View More</div>
            </div>
            <div class="overlap-10">
                <div class="text-wrapper-26">View More</div>
            </div> -->
        <!-- </div> -->




</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';

import Dashboard from '@/components/Dashboard.vue';
export default {
    components: { Dashboard },
}

</script>

<style>
#first-container{
    position:absolute;
    top:0;
    left:0;
    right:0;
    background:bisque;
}
.container{
    height:100%;
    width:100%;
    
    position:absolute;
    top:200px;
    right:200px;
}

#background{
    position: relative;
    /* display:flex; */
    width: 100%;
    height: 100%;
    /* z-index: -1; */
    /* justify-content: center */
}

.nav-link{
    color:#2ec4b6;
}
.active{
    color:#ffbf69;
}
#navbar{
    
    /* padding-top:900px; */
    width: 40%;
    /* height: 100px; */
    /* top:0; */
    /* right:200px; this moves the nav bar to the right */
    /* display:flex; */
    /* justify-content: end; */
    /* margin-top:70px;
    margin-right:30px; */
    
    
}

.li{
    font-size:5px;
}

#home{	margin-top: 40px;
    /* margin-right: 0px; */
	padding: 0px 20px 20px 20px; /* this adjusts the space between the image and the text */
	list-style: none;
	background-image: url("../assets/background_img/home.png");
	background-repeat: no-repeat;
	background-position: left top;
	background-size: 35px;
    font-size:20px;
    /* display:flex;
    justify-content: center;
    align-content: center; */
}
#chat{	margin-top: 40px;
    /* margin-right: 0px; */
	padding: 0px 20px 20px 20px; /* this adjusts the space between the image and the text */
	list-style: none;
	background-image: url("../assets/background_img/home.png");
	background-repeat: no-repeat;
	background-position: left top;
	background-size: 35px;
    font-size:20px;
    /* display:flex;
    justify-content: center;
    align-content: center; */
}
#calendar{	margin-top: 40px;
    /* margin-right: 0px; */
	padding: 0px 20px 20px 20px; /* this adjusts the space between the image and the text */
	list-style: none;
	background-image: url("../assets/background_img/home.png");
	background-repeat: no-repeat;
	background-position: left top;
	background-size: 35px;
    font-size:20px;
    /* display:flex;
    justify-content: center;
    align-content: center; */
}
#tasks{	margin-top: 40px;
    /* margin-right: 0px; */
	padding: 0px 20px 20px 20px; /* this adjusts the space between the image and the text */
	list-style: none;
	background-image: url("../assets/background_img/home.png");
	background-repeat: no-repeat;
	background-position: left top;
	background-size: 35px;
    font-size:20px;
    /* display:flex; */
    /* justify-content: center;
    align-content: center; */
}

.toprow{
    background:pink;
    top:0;
}

#logo{
    /* position: absolute; */
    margin:0;
    width:265px;
    height:100px;
    /* padding:0; */
    /* margin-left:925px; */
    /* margin-right:0px; */
    /* justify-content: center; */


    /* display:flex */
}
/* .col-6{
    position:absolute;
} */

/* .landing-page {
    background-image: url('../assets/background_img/background1.PNG');
    background-color:blue;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
}

.landing-page .div-3 {
    background-image: url('../assets/background_img/background1.PNG');
    background-position: 50% 50%;
    background-size: cover;
    height: 982px;
    position: relative;
    width: 1512px;
}

.landing-page .body {
    height: 45px;
    left: 569px;
    position: absolute;
    top: 125px;
    width: 376px;
}

.landing-page .text-wrapper-22 {
    color: #2ec4b6;
    font-family: "Plus Jakarta Sans-Regular", Helvetica;
    font-size: 36px;
    font-weight: 400;
    height: 45px;
    left: 0;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 0;
}

.landing-page .text-wrapper-23 {
    color: #ff9f1c;
    font-family: "Fredoka One-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    height: 29px;
    left: 158px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 191px;
}

.landing-page .text-wrapper-24 {
    color: #ff9f1c;
    font-family: "Fredoka One-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    height: 29px;
    left: 158px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 544px;
}

.landing-page .text-wrapper-25 {
    color: #ff9f1c;
    font-family: "Fredoka One-Regular", Helvetica;
    font-size: 24px;
    font-weight: 400;
    height: 29px;
    left: 601px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 544px;
}

.landing-page .overlap-8 {
    background-color: #2ec4b6;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #00000040;
    height: 25px;
    left: 496px;
    position: absolute;
    top: 549px;
    width: 75px;
}

.landing-page .text-wrapper-26 {
    color: #f2f2f2;
    font-family: "Plus Jakarta Sans-Bold", Helvetica;
    font-size: 10px;
    font-weight: 700;
    height: 13px;
    left: 12px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 5px;
}

.landing-page .overlap-9 {
    background-color: #2ec4b6;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #00000040;
    height: 25px;
    left: 1296px;
    position: absolute;
    top: 553px;
    width: 75px;
}

.landing-page .overlap-10 {
    background-color: #2ec4b6;
    border-radius: 10px;
    box-shadow: 0px 4px 4px #00000040;
    height: 25px;
    left: 1296px;
    position: absolute;
    top: 190px;
    width: 75px;
}  */
</style>
