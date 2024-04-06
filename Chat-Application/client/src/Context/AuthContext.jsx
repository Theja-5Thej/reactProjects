import { createContext, useCallback, useEffect, useState } from "react";
import { baseurl, postRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [registerError,setRegisterError] = useState(null)
    const [isregisterLoading,setIsregisterLoading] = useState(false)
    const [registerInfo,setRegisterInfo] = useState({
        name:"",
        email:"",
        password:""
    })
    const [loginError,setLoginError] = useState(null)
    const [isloginLoading,setIsLoginLoading] = useState(false)
    const [loginInfo,setLoginInfo] = useState({
        email:"",
        password:""
    })
        useEffect(()=>{
            const user = localStorage.getItem("User")
            setUser(JSON.parse(user))
        },[])
    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsregisterLoading(true)
        setRegisterError(null)
        let res
        try {
             res =  await postRequest(`${baseurl}/users/register`,registerInfo)
            setIsregisterLoading(false)
            if(res.error){
                console.log(res)
                return setRegisterError(res)
            }
            localStorage.setItem("User",JSON.stringify(res))
            setUser(res)
        } catch (error) { 
        }
    },[registerInfo])

    const updateRegisterInfo=useCallback((info)=>{
         setRegisterInfo(info)
    },[])

    const updateLoginInfo=useCallback((info)=>{
        setLoginInfo(info)
   },[])

   const loginUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsLoginLoading(true)
        setLoginError(null)
        const response = await postRequest(`${baseurl}/users/login`,loginInfo)
        setIsLoginLoading(false)
        if(response.error){
            return   setLoginError(response)
        }
        localStorage.setItem("User",JSON.stringify(response))
            setUser(response)
   },[loginInfo])
    const logOutUser = useCallback(()=>{
        localStorage.removeItem("User")
        setUser(null)
    },[])
    return  (
    <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        logOutUser,
        isregisterLoading,
        loginUser,
        loginError,
        updateLoginInfo,
        loginInfo,
        isloginLoading
        }}>
       {children}
        </AuthContext.Provider>
 )
}