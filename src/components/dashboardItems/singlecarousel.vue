<template>
    <div class="cardbg-orange-100 rounded-md border-blue-900" id="custom-container">  
                <div class="container bg-orange-100 rounded-lg border-white">
                    <div class="grid grid-cols-12"> 
     
                                <h5 class="col-span-2"><img class="w-100" id='icon' src="../../assets/profiles/amos.jpg"></h5> 
                           
                                <div class="col-span-10 ">
                                    <div class="w-auto self-center justify-content-center align-middle card-title bg-orange-300" id="name_container" style="height:fit-content; width:fit-content">
                                    
                                            <h5 class="fw-bold pt-2 pb-1 px-1">{{title.value}}</h5> <!--{{name}}--> 
                                            <p class=" pb-2 pt-1 px-1" >{{ desc.value }}</p> <!--{{message}}--> 

                                    </div>
                                </div>
                    </div> 
                    <div class="row ">
                        <ul class="list-group list-group-flush p-0"  style="list-style-image:url('../../assets/icons/clock.svg')" > 
                            <li id="date" class="list-group-item bg-orange-100" style="list-style-image:url('../../assets/icons/clock.svg')"> 

                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                            </svg> {{ date.value }}</li> <!--{{date}}--> 

                            <li id="time" class="list-group-item bg-orange-100" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg> {{time.value}}</li> <!--{{time}}--> 
        
                            <li id="location" class="list-group-item bg-orange-100" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>{{location.value}} </li> <!--{{location}}--> 
                        </ul> 
                    </div>
                    <div class="row grid-col-2">
                        <div class="col-6">
                            <button class="w-100 bg-orange-300 option_box text-green-700" @mouseover="isHovered_green = true" @mouseout="isHovered_green = false" :class="{ 'hovered_green': isHovered_green , 'clicked_style_green' : involved.value}" @click="has_clicked_green" > 
                                <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                </svg>
                            Count me in</button>
                        </div>
        
                        <!-- <div class="col-xl-1 col-lg-0 col-sm-0 col-md-0 pl-0 pr-0"></div> -->
        
                        <div class="col-6">
                            <button class="w-100 bg-orange-300 option_box text-red-700" @mouseover="isHovered_red = true" @mouseout="isHovered_red = false" :class="{ 'hovered_red': isHovered_red, 'clicked_style_red shadow-inner': !involved.value }" @click="has_clicked_red"  >
                            <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
                            Count me out</button>
                        </div>
                    </div>
                </div>
            </div> 
</template>

<script>

import '@/assets/main.css';
import { doc, getDoc,query,collection, setDoc ,onSnapshot} from 'firebase/firestore';
import { auth, db } from "@/firebase/config";
import { onMounted } from 'vue';
// import '../../../public/index.html';

export default {
    components: {
    },
    props:{
        outid: String,
    },
    setup(props){
        console.log("single");
        const title = ref("")
        const desc = ref("")
        const location = ref("")
        const date = ref("")
        const eCost = ref("")
        const involved = ref(null) // if null, both buttons are pressable, if true, green button is pressed( only red is pressable), if false,vice versa
        const time = ref("")
        console.log(props.outid);
        const isHovered_green=ref(false)
        const isHovered_red=ref(false)
        const docid = ref("")


        const formatDate = (timestamp) => {
            const dateObj = new Date(timestamp.toMillis());
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Add time options
            const formattedDate = dateObj.toLocaleDateString(undefined, options);
            const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions); // Format time
            return { date: formattedDate, time: formattedTime };
        };
        const fetchData = async () =>{
            const user = auth.currentUser
            const uid = user.uid
            const outID = ref(props.outid)
            const outRef = doc(db,"outings",outID)
            const outSnap = await getDoc(outRef)
            const outData = outSnap.data()
            title.value = outData.title
            desc.value = outData.description
            location.value = outData.location
            eCost.value = outData.estimatedCost
            const { date: formattedDate, time: formattedTime } = formatDate(outData.date);
            date.value = formattedDate;
            time.value = formattedTime; // Set the time value
            //probably need to use snap shot here... shag...


            const q = query(collection(db,"outings",outID,"usersInvolved"),where("user","==",uid))
            const subcollectionRef = collection(db, "outings", outID, "usersInvolved"); // Reference to the subcollection

            const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                docid.value = change.doc.id; // This is the document ID within the subcollection
                const uiData = change.doc.data();
                involved.value = uiData.imIn;
                    }
                if (change.type === "modified") {
                    // Handle the case where an attribute changed in an existing document
                    const uiData = change.doc.data();
                    // Check the attribute you want and update your reactive properties accordingly
                    if (uiData.imIn !== involved.value) {
                    involved.value = uiData.imIn;
                    }
                    // You can do similar checks for other attributes
                }
                });
            });
        }
        fetchData()

        const has_clicked_green = async () =>{
            await setDoc(doc(db,"outings",props.outid,"usersinvolved",docid),{
                imIn:true
            })
        }

        const has_clicked_red = async () =>{
            await setDoc(doc(db,"outings",props.outid,"usersinvolved",docid),{
                imIn:false
            })
        }
        onMounted(()=>{
            fetchData()
        })

        return { has_clicked_green,has_clicked_red,
            title,desc,location,date,eCost,time,isHovered_green,isHovered_red,involved
        }
    }
//     data() {
//     return {
//         isHovered_green: false,
//         isHovered_red: false,
//         clicked_green: false,
//         clicked_red:false
//     };
// },
// methods: {
//     has_clicked_green() {
//         if (this.clicked_green == true) {
//             this.clicked_green = false;
//         } else {
//       this.clicked_green = true;
//       this.clicked_red = false;
//       }
//     },
//     has_clicked_red() {
//         if (this.clicked_red == true) {
//             this.clicked_red = false;
//         } else {
//       this.clicked_red = true;
//       this.clicked_green = false;
//       }
//     },
//   },


}
</script>

<style>

.clicked_style_green{
    background-color: #FF9F1C!important;
    transform: scale(1.05);
    color: rgb(4, 84, 4) !important;
    border:rgb(4, 84, 4) solid 1px;
    
}
.clicked_style_red{
    background-color: #FF9F1C!important;
    transform: scale(1.05);
    color: rgb(173, 7, 7) !important;
    border:rgb(173, 7, 7)  solid 1px;
    
}

.hovered_green{
    background-color: #FF9F1C!important;
    transform: scale(1.05);
    transition: all .15s ease-in-out;
    color: rgb(4, 84, 4) !important;
}

.hovered_red{
    background-color: #FF9F1C!important;
    transform: scale(1.05);
    transition: all .15s ease-in-out;
    color: rgb(173, 7, 7) !important;;
}

.custom-container{
padding-bottom:0px;
display: inline;
background-color: white;

}

.card{
display:inline-block;
background-color: orange !important;
}

.option_box{
border-radius: 10px;
font-size:10px;
padding-top:10px;
padding-right:5px;
padding-right:5px;
padding-bottom:10px;
margin-bottom:10px;
height:fit-content;
width:fit-content;
/* margin-top:20px; */

}
#name_container{
  /* margin-left:1rem; */

border-top-left-radius: 10px;
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
margin-top:10px;
margin-left:10px;
height:fit-content;
}
#icon{
width:auto;
height:auto;
min-width:35px;

/* margin-left:10px; */
min-height: 35px;
border:1px black solid ;
border-radius:100%;
margin-top:30px;
  /* margin-top:3rem; */
}
svg{
margin-bottom:3px;
margin-right:3px;
}


@media (max-width:768px){
    #custom-container{
        font-size:14px;
    }
}

@media (max-width:576px){
    #custom-container{
        font-size:10px;
    }
}


@media (max-width:768px){
    #icon{
    width:auto;
    height:auto;
    border:1px black solid ;
    border-radius:100%;
    margin:0px;
    }
}
    @media (max-width:992px){
    #icon{
    width: 200px;
    height:auto;
    border:1px black solid ;
    border-radius:100%;
    }
}
    @media (max-width:1024px){
    #icon{
    /* width: 200px; */
    /* height:auto; */
    margin-right:20px;
    border:1px black solid ;
    border-radius:100%;
    }

@media (max-width:576px){
    .option_box{
        font-size:10px;
    }
}

@media (max-width:768px){
    .option_box{
        font-size:10px;
    }
}

@media (max-width:1280px){
    .option_box{
        font-size:10px !important;
    }
}

}
</style>