import axios from "axios"
export const baseurl = 'http://localhost:5000/api'

export const postRequest = async(url,body)=>{
   
    try {
        const response = await axios.post(url,body)
        return response.data
    } catch (error) {
        let message 
            if(error.response){
                message= error.response.data
            }
            return {error :true,message}
    }

}

export const getRequest = async(url)=>{
    try {
        const response=  await axios.get(url)
        return response.data
    } catch (error) {
        let message = "An error occured..."
        if(error.response){
            message= error.response.data
        }
        return {error :true,message}
    }
  
}