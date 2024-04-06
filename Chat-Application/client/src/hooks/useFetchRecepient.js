
import { useEffect,useState } from "react";
import { baseurl, getRequest } from "../utils/services";

export const useFetchRecepientUser =(chat,user)=>{
const [recepientUser,setRecepientUser] = useState(null)
const [error,setError] = useState(null)

const recepientId = chat?.members?.find((id)=>id!==user?._id)

useEffect(()=>{
    const getrUser =async()=>{
        const response =recepientId!==undefined && await getRequest(`${baseurl}/users/find/${recepientId}`)
        if(response.error){
            return setError(response)
        }
        setRecepientUser(response)
    }
    getrUser()
},[recepientId])
return {recepientUser}
}