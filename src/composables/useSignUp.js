import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config'
import { ref } from 'vue'
import { projectAuth } from "@/firebase/config";

const error = ref(null);

const signup = async (email,password,displayName) => {
    error.value = null
    try{
        const res = await projectAuth.createUserWithEmailAndPassword(email,password)
        if (!res){
            throw new Error("could not complete signup")
        }
        await res.user.updateProfile({ displayName })
        console.log(res.user)
        return res
    }catch(err){
        console.log(err.message)
        error.value=err.message
    }
}

const signupGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
}

const useSignup = () => {
    return { error, signup, signupGoogle }
}

export default useSignup


