import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref } from 'vue';
import { getAuth } from 'firebase/auth'; // Updated import
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
    return signInWithPopup(projectAuth, provider)
}

const useSignup = () => {
    return { error, signup, signupGoogle }
}

export default useSignup


