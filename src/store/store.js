import { defineStore } from "pinia";


export const useTokenStore = defineStore("token", {
    state: () => {
    return { token: '',useremail:'' };
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        setToken(token){
            this.token=token
        },
        setUserEmail(email){
            this.useremail=email
        }
    },
});
