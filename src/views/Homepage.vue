<template>
<div class="landing-page">
        <div class="div-3">
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
            </div>
        </div>
    </div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue';
export default {
    components: { Dashboard },
}

const app = Vue.createApp({ 
    data() { 
        return { 
            path: require('../assets/kampuni_logo.jpg')
        };
    },
    methods: {
        methodName() {
            
        }
    } // methods
});
const vm = app.mount('#app'); 
</script>

<style>

.landing-page {
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
} 
</style>
