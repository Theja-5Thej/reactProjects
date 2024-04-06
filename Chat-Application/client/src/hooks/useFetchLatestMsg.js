import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../Context/chatContext'
import { baseurl, getRequest } from '../utils/services'

export const useFetchLatestMsg = (chat) => {
    const {newMessage,notification} = useContext(ChatContext) 
    const [latestMessage,setLatestMessage] = useState(null)
    useEffect(()=>{
        const getMessage =async()=>{
            const response = await getRequest(`${baseurl}/messages/${chat?._id}`)

            if(response.error){
                return console.log("Error getting messages...",error)
            }

            const lastMessage = response[response?.length-1]
            setLatestMessage(lastMessage)
        }
        getMessage()
    },[newMessage,notification])
  return {latestMessage}
}

 
