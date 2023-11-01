<template>

    <div class="cardbg-orange-100 rounded-md border-5 hovering bg-white p-2 pt-3" :class="{'border-g bg-g' : involved, 'border-r bg-g' : !involved , 'border-orange' : null}" id="custom-container" > 
         <!--v-for{{outing}}-->
                <div class="container bg-white rounded-lg ">
                
                    <div class="row"> 
                        <div class="col-12 " id="detail-container">
                            <div class="w-auto self-center justify-content-center align-middle card-title border-3 d-flex justify-content-between truncate" :class="{'border-black bg-g' : involved, 'border-black bg-r' : !involved , 'border-orange' : null}" id="name_container" style="height:fit-content; width:fit-content">
                                <div class="">
                                    <h5 class="fw-bold pt-2 pb-1 px-3 truncate ">{{title}}</h5> <!--{{name}}--> 
                                    <p class=" pb-2 pt-1 px-3 text-ellipsis" >{{ desc }}</p> <!--{{message}}--> 
                                </div>
                                <div class="my-auto mx-2"><img class="h-fit w-12" id='icon' src="../../assets/profiles/amos.jpg"></div> 
                            </div>
                    </div>
                        
                                
                    </div> 
                    <div class="row ">
                        <ul class="list-group list-group-flush p-0"  style="list-style-image:url('../../assets/icons/clock.svg')" > 
                            <li id="date" class="list-group-item bg-white" style="list-style-image:url('../../assets/icons/clock.svg')"> 

                            <svg class="inline w-5 h-5 text-orangep" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
                            </svg> {{ date }}</li> <!--{{date}}--> 

                            <li id="time" class="list-group-item bg-white" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg> {{time}}</li> <!--{{time}}--> 
        
                            <li id="location" class="list-group-item bg-white" style="list-style-image:url('../assets/icons/clock.svg')">
                            <svg class="inline w-5 h-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/>
                            

                            </svg>{{location}} </li> <!--{{location}}--> 
                        </ul> 
                    </div>
                    <div class="row grid-col-2">
                        <div class="col-6">
                            <button class="w-100 bg-white option_box text-green-700" @mouseover="isHovered_green = true" @mouseout="isHovered_green = false" :class="{ 'hovered_green': isHovered_green , 'clicked_style_green' : involved}" @click="has_clicked_green" > 
                                <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
                                </svg>
                            I'm in</button>
                        </div> 
        
                        <!-- <div class="col-xl-0 col-lg-0 col-sm-0 col-md-0 pl-0 pr-0"></div> -->
        
                        <div class="col-6">
                            <button class="w-100 bg-white option_box text-red-700" @mouseover="isHovered_red = true" @mouseout="isHovered_red = false" :class="{ 'hovered_red': isHovered_red, 'clicked_style_red shadow-inner': !involved }" @click="has_clicked_red"  >
                            <svg class="w-5 h-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
                            I'm out</button>
                        </div> 
                    </div>
                </div>
            </div> 
</template>

<script>

import '@/assets/main.css';
import { doc, addDoc,getDoc,getDocs,query,collection, setDoc ,onSnapshot,where, updateDoc,arrayUnion, arrayRemove} from 'firebase/firestore';
import { auth, db } from "@/firebase/config";
import { ref,onMounted,computed } from 'vue';
// import '../../../public/index.html';

export default {
    components: {
    },
    props:{
        outid: String,
    },
    setup(props){
        const toDisplay = ref([])
        const title = ref("")
        const desc = ref("")
        const location = ref("")
        const date = ref("")
        const eCost = ref("")
        const involved = ref(null) // if null, both buttons are pressable, if true, green button is pressed( only red is pressable), if false,vice versa
        const time = ref("")
        const isHovered_green=ref(false)
        const isHovered_red=ref(false)
        const docid = ref("")
        const outID = ref(props.outid)
        const user = auth.currentUser
        const uid = user.uid

        const formatDate = (timestamp) => {
            const dateObj = new Date(timestamp.toMillis());
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            const timeOptions = { hour: '2-digit', minute: '2-digit' }; // Add time options
            const formattedDate = dateObj.toLocaleDateString(undefined, options);
            const formattedTime = dateObj.toLocaleTimeString(undefined, timeOptions); // Format time
            return { date: formattedDate, time: formattedTime };
        };
        const fetchData = async () =>{
            const outRef = doc(db,"outings",outID.value)
            try{
                
                const outSnap = await getDoc(outRef)
                const outData = outSnap.data()
          
                title.value = outData.title
                desc.value = outData.description
                location.value = outData.location
                eCost.value = outData.estimatedCost
                const { date: formattedDate, time: formattedTime } = formatDate(outData.date);
                date.value = formattedDate;
                time.value = formattedTime;
                //probably need to use snap shot here... shag...
            }catch{

            }
            
        }
        fetchData()

        const q = query(collection(db,"outings",outID.value,"usersInvolved"),where("user","==",uid))
        const subcollectionRef = collection(db, "outings", outID.value, "usersInvolved"); // Reference to the subcollection
     
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = []
            snapshot.forEach((doc)=>{
                results.push({ ...doc.data(),id:doc.id})
               
            })
            toDisplay.value=results
            if(results.length>0){
                involved.value=results[0].imIn
                docid.value=results[0].id
            }
        
          
        });

        //join outing
        const has_clicked_green = async () => {
            const user = auth.currentUser
            const uid = user.uid
            console.log("outID",outID.value);
            if (docid.value) {
              
                await updateDoc(doc(db, "outings", props.outid, "usersInvolved", docid.value), {
                imIn: true,
                });
              
            }else{

                await addDoc(collection(db,"outings",outID.value,"usersInvolved"),{
                    imIn: true,
                    user: uid
                })
            }
            const q = query(collection(db,"chatrooms"),where("outing","==",outID.value))
            const snapshot = await getDocs(q)
            var chatroomid =""
            snapshot.forEach((doc)=>{
                chatroomid = doc.id
            })
            await updateDoc(doc(db,"chatrooms",chatroomid),{
                usersInvolved:arrayUnion(uid),
            })

        };
        //leave outing
        const has_clicked_red = async () =>{
            const user = auth.currentUser
            const uid = user.uid
            console.log("outID",outID.value);
            if(docid.value){
                await updateDoc(doc(db,"outings",outID.value,"usersInvolved",docid.value),{
                    imIn:false
                })
            } else{
                await addDoc(collection(db,"outings",outID.value,"usersInvolved"),{
                    imIn: false,
                    user: uid
                })
            }
            const q = query(collection(db,"chatrooms"),where("outing","==",outID.value))
            const snapshot = await getDocs(q)
            var chatroomid =""
            snapshot.forEach((doc)=>{
                chatroomid = doc.id
            })
            await updateDoc(doc(db,"chatrooms",chatroomid),{
                usersInvolved:arrayRemove(uid),
            })     
        }
        onMounted(()=>{
            fetchData()
        })

        return { has_clicked_green,has_clicked_red,
            title,desc,location,date,eCost,time,isHovered_green,isHovered_red,involved
        }
    }
}
</script>

<style>


.hovering:hover {
    animation: changeSize 1.2s infinite alternate; /* Add a smooth transition effect */
}

@keyframes changeSize {
    0% {
        transform: scale(1); /* Initial size */
    }
    100% {
        transform: scale(1.05); /* Slightly larger size */
    }
}

.clicked_style_green{
    background-color: #99B898 !important;
    transform: scale(1.05);
    color: rgb(255, 255, 255) !important;
    font-size: 30px;
    /* border:rgb(4, 84, 4) solid 1px; */
    
}
.clicked_style_red{
    background-color: #FF847C!important;
    transform: scale(1.05);
    color: rgb(255, 255, 255) !important;
    /* border:rgb(255, 255, 255)  solid 1px; */
    
}

.hovered_green{
    background-color: #99B898!important;
    transform: scale(1.05);
    transition: all .15s ease-in-out;
    color: white !important;
}

.hovered_red{
    background-color: #FF847C!important;
    transform: scale(1.05);
    transition: all .15s ease-in-out;
    color: white !important;;
}

.custom-container{
padding-bottom:0px;
transition: transform 1s ease-in-out;
display: inline;
background-color: white;
margin-bottom:5px;

}

.card{
display:inline-block;
background-color: orange !important;
}

.option_box{
border-radius: 10px;
font-size:18px;
padding-top:10px;
padding-right:5px;
padding-right:5px;
padding-bottom:10px;
margin-bottom:10px;
height:fit-content;
width:fit-content;
border:black 3px solid;
/* margin-top:20px; */
}

#detail_container{
margin-top:5px;
}


#name_container{
  /* margin-left:1rem; */

border-radius:10px;
margin-left:10px;
height:fit-content;
}
#icon{
border-radius:50%;
width: full;
/* border: 3px #ee944b solid; */
}

svg{
margin-bottom:3px;
margin-right:3px;
}

/* 
@media (max-width:768px){
    #custom-container{
        font-size:14px;
    }
}

@media (max-width:576px){
    #custom-container{
        font-size:10px;
    }
} */

/* 
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
    width: 200px;
    height:auto;
    margin-right:20px;
    border:1px black solid ;
    border-radius:100%;
    } */

/* @media (max-width:576px){
    .option_box{
        font-size:16px;
    }
}

@media (max-width:768px){
    .option_box{
        font-size:16px;
    }
}

@media (max-width:1280px){
    .option_box{
        font-size:16px !important;
    }
} */


</style>