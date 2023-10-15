// import { ref } from "vue";
// // import { projectAuth } from "@/firebase/config";

// const error = ref(null);

// const login = async(email,password)=>{
//     error.value=null
//     try{
//         const res = await projectAuth.signInWithEmailAndPassword(email,password)
//         error.value=null
//         return res
//     }catch(err){
//         console.log(error.value)
//         error.value= "Incorrect login credentials"
//     }
// }


// const useLogin = () => {
//     return {error,login}
// }


// export default useLogin

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
// import { auth } from "@/firebase/config"

const error = ref(null);

const login = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

const useLogin = () => {
    return {error,login}
}

export default useLogin