
<template>
    <div class="container-fluid">
        <div class="row">
            <Navbar />
                <img id='background' src="../assets/background_img/background1.png">
        </div>
        <div class="row">

            <div class="col-2"> </div>

        <!-- <h1 id="outing">Upcoming Outings </h1> -->
            <div class="col-10 container" id="first-container">
                <div class="row">
                    <div class="col-lg-5 col-md-5 ">
                    </div> 
                </div>
            </div>

            <div class="col-2">

            </div>
        </div>
    </div>

</template>

<script>

import Navbar from '@/components/Navbar.vue';

export default {
    components:{
    Navbar,
    }
}

</script>

<style>
#outing{
    position:absolute;
}
#first-container{
    background:beige;
    position:absolute;
    width:80%;
    height:100%;
    right:175px;
    left:175px;
    /* left:0; */
    top:50%;
    /* transform: translateX(-50%); */
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
