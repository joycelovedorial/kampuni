import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
// import { auth }  from "../firebase/config";
const error = ref(null);

const signup = async(email,password,displayName) => {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}

const useSignup = () => {
    return {error,signup}
}

export default useSignup






























// // import { ref } from "vue";
// // import { projectAuth } from "@/firebase/config";

// // const error = ref(null);

// // const signup = async (email,password,displayName) => {
// //     error.value = null
// //     try{
// //         const res = await projectAuth.createUserWithEmailAndPassword(email,password)
// //         if (!res){
// //             throw new Error("could not complete signup")
// //         }
// //         await res.user.updateProfile({ displayName })
// //         console.log(res.user)
// //         return res
// //     }catch(err){
// //         console.log(err.message)
// //         error.value=err.message
// //     }
// // }

// // const useSignup = () => {
// //     return { error, signup }
// // }

// // export default useSignup

