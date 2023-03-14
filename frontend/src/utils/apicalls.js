import axios from "axios";

const api = axios.create({
    baseURL:"http://3.239.14.1:8080/api",
    timeout: 1000,
  headers: {'Access-Control-Allow-Origin': '*'}
})

export const loginUser = async ({email,password}) =>{
    try{
        const { data } =await api.post('/login',{email,password});
        return data
    }catch(error){
        throw Error(error.response.data.message)
    }
}

export const signupUser = async ({name,email,password}) =>{
    try{
        const { data } =await api.post('/register',{name,email,password});
        return data
    }catch(error){
        throw Error(error.response.data.message)
    }
}