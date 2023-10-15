import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config'
import { ref } from 'vue'
import { projectAuth } from "@/firebase/config";



const error = ref(null);

const login = async(email,password)=>{
    error.value=null
    try{
        const res = await projectAuth.signInWithEmailAndPassword(email,password)
        error.value=null
        return res
    }catch(err){
        console.log(error.value)
        error.value= "Incorrect login credentials"
    }
}

const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
}


const useLogin = () => {
    return {error,login,loginGoogle}
}


export default useLogin