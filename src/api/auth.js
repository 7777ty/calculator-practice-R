import request from "@/helper/request";
const URL={
    SIGNUP:'/auth/register',
    LOGIN:'/auth/login',
};

export default {
    signUp({username,password}){
        return request(URL.SIGNUP,'POST',{username,password});
    },
    login({username,password}){
        return request(URL.LOGIN,'POST',{username,password});
    }
}
