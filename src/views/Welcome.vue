<template>
<html>    
  <body class="flex">
    <img src="@/assets/kampuni_logo.png" id="logo">
    <div class="outermost-container mb-32 ml-24 mr-24" :class="{ 'right-panel-active': isRightPanelActive }" id="container">
      <div class="form-container register-container ">
        <form @submit.prevent="handleRegister" class="overflow-x-scroll">
          <h1 class="text-orangep text-3xl font-medium">Register here</h1>
          <div >
            <input class="form-control mb-1" type="text" required placeholder="First Name" v-model ="firstName">
            <input class="form-control mb-1" type="text" required placeholder="Last Name" v-model ="lastName">
            <input class="form-control mb-1" type="email" required placeholder="email" v-model="email">
            <input class="form-control mb-1" type="password" required placeholder='password' v-model="password">
            <input class="form-control mb-1" type="date" id="birthday" v-model="birthday">
            <input class="form-control mb-1" type="text" placeholder="country" id="country" v-model="country">
            <textarea class="form-control" id="bio" cols="30" rows="5" placeholder="bio" v-model="bio"></textarea>
        </div>
            <input class="form-control mb-1" type="password" id="password" placeholder="Password" />
        <div class="flex">
          <button type="submit" value="submit" class="flex-initial w-64" @click="handleRegister">Register
          </button>

        </div>
        <div v-if="Rerror" class="error">{{ Rerror.value }}</div>

          <span>or Sign Up using your google account</span>
          <div class="social-container">
            <a href="#" class="social" @click="signinGoogle"><i class="fa-brands fa-google"></i></a>
          </div>
        </form>
      </div>
        <div v-if="registered" class="form-container login-container">
          <form @submit.prevent="handleLogin" class="form-lg">
            <h1 class="text-orangep text-3xl font-medium">Login here</h1>
            <input class="form-control mb-1" type="email" required placeholder="email" v-model="loginEmail">
            <input class="form-control" type="password" required placeholder='password' v-model="loginPassword">
            
            <div class="flex">
                <button type="submit" value="submit" class="flex-initial w-64" @click="handleLogin">Login</button>
            </div>
          
            <div v-if="error" class="error">{{ error.value }}</div>

        
            <div>Or login using your Google account</div>
            <div class="social-container">
              <a href="#" class="social" @click="signinGoogle"><i class="fa-brands fa-google"></i></a>
            </div>
          </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left" >
            <h1 class="title">
              <br> Hello <br/>
              friends 
            </h1>
            <p>If you have an account, login here and have fun</p>
            <button class="ghost flex" id="login" @click="togglePanel" > 
              <svg class='w-7 h-5 pr-2 pt-1' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
              </svg>
              Login
            </button>
          </div>

          <div class="overlay-panel overlay-right ">
            <h1 class="title">
              Live with <br />
              Kampuni now
            </h1>
            <p>
              If you do not have an account yet, click here to join us
            </p>
            <button class="ghost flex" id="register" @click="togglePanel" >
                Register
                <svg class="w-7 h-5 pl-2 pt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/>
                </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </body>

</html>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'
import SignupForm from '@/components/SignupForm.vue'
import { ref } from 'vue'
import { auth, db } from '@/firebase/config'
import { useRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, collection } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';



// Animations
export default {
  
  components: { LoginForm, SignupForm },
  
  setup () {
    const registered = ref(true)
    const router = useRouter()
    const isRightPanelActive = ref(false);
    //handleRegister
    const Rerror = ref(null)
    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const password = ref("")
    const birthday = ref("")
    const country = ref("")
    const bio = ref("")
    //hm
    const googles = ref("")


    const handleRegister = async () => {
      
        try {
            const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
            setDoc(doc(db, "users", cred.user.uid), {
              firstname: firstName.value,
              lastname: lastName.value,
              email: email.value,
              birthday: birthday.value,
              country: country.value,
              bio: bio.value,
              community: null,
              points: 0,
            });
            console.log("registered");
            const uid = cred.user.uid;
            const docRef = doc(db, 'users', uid);

                try {
                  const docSnap = await getDoc(docRef);
                  const userData = docSnap.data();

                  if (!userData?.community) {
                    router.push({ name: 'joinCommunity' });
                  } else {
                    router.push({ name: 'Homepage' });
                  }
                } catch (error) {
                  console.error('Error fetching user data:', error);
                }
        } catch (error) {
          Rerror.value=error.message;
        }
      };
    //handlelogin
    const loginEmail = ref("")
    const loginPassword = ref("")
    const error = ref(null)
    const errorMessage = ref("")

    const handleLogin = async () => {

      try {

        const cred = await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value);
        const uid = cred.user.uid;
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();

        if (!userData?.community) {
          router.push({ name: 'joinCommunity' });
        } else {
          router.push({ name: 'Homepage' });
        }

      } catch (error) {
        error.value=error.message;

        // Handle the specific error or log the error message
        console.log(error.code);
        console.log(error.message);
      }
    };


    const signinGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user; // Initialize user here

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        

        // Set the user's email after initializing user
       

       
        const uid = user.uid;
        const docRef = doc(db, 'users', uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().community !== null) {
            router.push({ name: "Homepage" });
        } else {
            // Check if result.additionalUserInfo exists and has a profile property
            setDoc(doc(db, "users", uid), {
                firstname: null,
                lastname: null,
                email: user.email,
                birthday: null,
                country: null,
                bio: null,
                community: null,
                points: 0,
            });

            router.push({ name: 'joinCommunity' });
        }
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData && error.customData.email ? error.customData.email : null;
        const credential = GoogleAuthProvider.credentialFromError(error);

        // Handle the specific error or log the error message
        console.error('Google sign-in error:', errorCode, errorMessage);
    }
};


    //after Authenticated
    const handleAuth = async () => {
      const user = auth.currentUser
      const uid = user.uid
      const docRef = doc(db, 'users', uid)


      try {
        const docSnap = await getDoc(docRef)
        const userData = docSnap.data()


        if (!userData?.community) {
          router.push({ name: 'joinCommunity' })
        } else {
          router.push({ name: 'Homepage' })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }





    const togglePanel = () =>{
      isRightPanelActive.value = !isRightPanelActive.value
    }
    return { registered, handleAuth,isRightPanelActive,togglePanel,loginEmail, loginPassword, handleLogin,signinGoogle, errorMessage,error,
      handleRegister,firstName,lastName,country,birthday,bio, email, password, Rerror, googles
    }
}
}
</script>

<style scoped>
#logo {
  margin-bottom: 5px auto;
  margin-top:60px;
  /* padding-top:20px; */
  padding-bottom:10px;
  

}
#logo {
  width: 22rem;
  height: auto;
}
.logo-container {
  width: 250px;
}

.loginform {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginform input {
  border-radius: 10px;
}

/* @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"); */

* {
  /* margin: 0;
    padding: 0; */
  box-sizing: border-box;
}

body {
  background: url(@/assets/background_img/newnew.jpg)
    top center / cover no-repeat;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
  height: 100vh;
}

h1 {
  font-weight: 700;
  letter-spacing: -1px;
  margin: 0;
  margin-bottom: 15px;
  padding:20px;
}

h1.title {
  font-size: 45px;
  line-height: 45px;
  margin: 0;
  text-shadow: 0 0 10px rgba(16, 64, 74, 0.5);
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
  text-shadow: 0 0 10px rgba(16, 64, 74, 0.5);
}

span {
  font-size: 14px;
  margin-top: 20px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: 0.3s ease-in-out;
}

a:hover {
  color: #4bb6b7;
}

.content {
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}

.content .checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content input {
  accent-color: #333;
  width: 12px;
  height: 12px;
}

.content label {
  font-size: 14px;
  user-select: none;
  padding: 5px;
}

button {
  position: relative;
  border-radius: 20px;
  border: 1px solid #4bb6b7;
  background-color: #4bb6b7;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  margin: 20px;
  padding: 12px;
  letter-spacing: 1px;
  text-transform: capitalize;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

button:hover {
  letter-spacing: 3px;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid #fff;
  color: #fff;
}

#login i {
  position: absolute;
  left: 50px;
}

#register i {
  position: absolute;
  right: 50px;
}

button.ghost i {
  position: absolute;
  opacity: 1;
  transition: 0.3s ease-in-out;
  z-index: 6;
}

button.ghost i.register {
  right: 70px;
}

button.ghost i.login {
  left: 70px;
}

form {
  background-color: #fff;
  
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #fff;
  outline: none;
  border: none;
  border-bottom: 2px solid #adadad;
  padding: 12px 0px;
  margin: 8px 0;
  width: 100%;
}

.outermost-container {
  border-radius: 25px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 0px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 500px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.form-control {
  width: 100%;
  position: relative;
}

.form-control2 {
  width: 100%;
  position: relative;
}

.form-control2 span {
  position: absolute;
  border-bottom: 3px solid #2691d9;
  left: 0;
  bottom: 8px;
  width: 0%;
  transition: all 0.3s ease;
}

.form-control2 input:focus ~ span {
  width: 100%;
}
.form-control small {
  color: red;
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 12px;
  z-index: 100;
}

.form-control span {
  position: absolute;
  border-bottom: 3px solid #2691d9;
  left: 0;
  bottom: 8px;
  width: 0%;
  transition: all 0.3s ease;
}

.form-control input:focus ~ span {
  width: 100%;
}

.form-control2 small {
  color: red;
  position: absolute;
  top: 50px;
  left: 0;
  font-size: 12px;
  z-index: 100;
}

.form-control2 span {
  position: absolute;
  border-bottom: 3px solid #2691d9;
  left: 0;
  bottom: 8px;
  width: 0%;
  transition: all 0.3s ease;
}

.form-control2 input:focus ~ span {
  width: 100%;
}

.login-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .login-container {
  transform: translateX(100%);
  animation: show 0.6s;
}

.register-container {
  /* position: relative; */
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.outermost-container.right-panel-active .register-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.outermost-container.right-panel-active .overlay-container {
  transform: translate(-100%);
}

.overlay {
  background-image: url("@/assets/background_img/newnew.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay::before {
  content: "";
  /* margin-left:30px;
  margin-right:30px; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(46, 94, 109, 0.4) 40%,
    rgba(46, 94, 109, 0)
  );
}

.outermost-container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  
  transform: translateX(0);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.outermost-container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
  transition: 0.3s ease-in-out;
}

.social-container a:hover {
  border: 1px solid #4bb6b7;
}




</style>
