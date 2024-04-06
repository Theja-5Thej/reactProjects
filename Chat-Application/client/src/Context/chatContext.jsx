import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { baseurl, postRequest ,getRequest} from "../utils/services";
import {io} from 'socket.io-client'
export const ChatContext = createContext()

export const ChatProvider = ({children,user})=>{

const [userChats,setUserChats] = useState(null)
const [userChatsError,setUserChatsError] = useState(null)
const [isuserChatsLoading,setUserChatsLoading] = useState(false)
const [potentailChats,setPotentialChats] = useState(null)
const [currentChat,setCurrentChat] = useState(null)
const [messages,setMessages] = useState(null)
const [messagesError,setMessagesError] = useState(null)
const [isMessageLoading,setIsMessageLoading] = useState(false)
const[sendTextMessageError,setSendTextMessageError] = useState(null)
const [newMessage,setNewMessage] = useState(null)
const [socket,setSocket] = useState(null)
const [onlineUsers,setOnlineUsers] = useState([])
const [notification,setNotification] = useState([])
const [allUsers,setAllUsers] = useState(null)
//socket Connection
useEffect(()=>{
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return ()=>{
        newSocket.disconnect()
    }
},[user])
//online users
useEffect(()=>{
    if(socket===null) return
    socket.emit("addNewUser",user?._id)
    socket.on("getOnlineUsers",(res)=>{
        setOnlineUsers(res)
    })

    return ()=>{
        socket.off("getOnlineUsers")
    }
},[socket])
//send message
useEffect(()=>{
    if(socket===null) return
    const recepientId = currentChat?.members?.find((id)=>id!==user?._id)
   socket.emit("sendMessage",{...newMessage,recepientId})
},[newMessage])

//recieve message and Notification
useEffect(()=>{
    if(socket===null) return
    socket.on("getMessage",res=>{
        if(currentChat?._id !== res.chatId) return
        setMessages(prev=>[...prev,res])
    })

    socket.on("getNotification",res=>{
        const isChatOpen = currentChat?.members?.some(id=>id===res.senderId)
        if(isChatOpen){
            setNotification(prev=>[{...res,isRead : true},...prev])
        }else{
            setNotification(prev=>[res,...prev])
        }
    })

   return()=>{
    socket.off("getMessage")
    socket.off("getNotification")
   }
},[socket,currentChat])

useEffect(()=>{
    const getChats = async()=>{
        const response = await getRequest(`${baseurl}/users`)
        if(response.error) return console.log("Error while fetching users" ,response)

      const pCharts=  response.filter((u)=>{
            let isChatCreated = false
            if(user?._id === u._id) return false

            if(userChats){
              isChatCreated=  userChats?.some((chat)=>{
                    return chat.members[0] === u._id || chat.members[1] === u._id
                })
            }
            return !isChatCreated
        })
        setPotentialChats(pCharts)
        setAllUsers(response)
    }
    getChats()
},[userChats])

useEffect(()=>{
    const getUserChats = async()=>{
        if(user?._id){
            setUserChatsLoading(true)
            setUserChatsError(null)
            const response = await getRequest(`${baseurl}/chats/${user?._id}`)
            setUserChatsLoading(false)
            if(response.error) {
                return setUserChatsError(response)
            }
            setUserChats(response)
        } 
    }
    getUserChats()
},[user,notification])

useEffect(()=>{
    setIsMessageLoading(true)
            setMessagesError(null)
    const getMessages = async()=>{ 
            const response = await getRequest(`${baseurl}/messages/${currentChat?._id}`)
            setIsMessageLoading(false)
            if(response.error) {
                return setMessagesError(response)
            }
            setMessages(response) 
    }
    getMessages()
},[currentChat])

const sendTextMessages = useCallback(async(textMessage,sender,currentChatId,setTextMessage)=>{
if(!textMessage) return console.log("ENter something")
const response = await postRequest(`${baseurl}/messages`,{
    chatId : currentChatId,
    senderId : sender._id,
    text:textMessage
})
 
if(response.error) {
    return setMessagesError(response)
}
setNewMessage(response)
setMessages(prev=>[...prev,response])
setTextMessage("")
},[])

const updateCurrentChat = useCallback((chat)=>{
    setCurrentChat(chat)
},[])

const createChat = useCallback(async(firstId,secondId)=>{
    const response = await postRequest(`${baseurl}/chats`,{firstId,secondId})
    if(response.error) return console.log("Error while creating chat.." + response)
    setUserChats(prev=>[...prev,response])
},[])

const markAllNotificationAsRead =useCallback((notifications)=>{
    const mNotifications = notifications.map((n)=>{
        return {...n,isRead:true}
    })
    setNotification(mNotifications)
},[])

const markNotificationAsRead = useCallback((n,userChats,user,notification)=>{
    //find chat to opn
    const desiredChat = userChats.find((chat)=>{
        const chatMembers = [user._id,n.senderId]
        const isDesiredChat = chat?.members.every((member)=>{
            return chatMembers.includes(member)
        })
        return isDesiredChat
    })
    const mNotifications =  notification.map((el)=>{
        if(n.senderId===el.senderId){
            return {...n,isRead:true}
        }else{
            return el
        }
    })
    updateCurrentChat(desiredChat)
    setNotification(mNotifications)
},[])

const markThisNotificationAsRead =useCallback((thisUserNotification,notification)=>{
  const mNotifications=  notification.map(el=>{
        let notificatns 
        thisUserNotification.forEach(n => {
            if(n.senderId===el.senderId){
                notificatns ={...n,isRead:true}
            }else{
                notificatns = el
            }
        });
        return notificatns
    })
    setNotification(mNotifications)
},[])
    return(
        <ChatContext.Provider value={{
            userChats,
            userChatsError,
            isuserChatsLoading,
            potentailChats,
            createChat,
            updateCurrentChat,
            currentChat,
            messages,
            messagesError,
            isMessageLoading,
            sendTextMessages,
            onlineUsers,
            notification,
            allUsers,
            markAllNotificationAsRead,
            markNotificationAsRead,
            markThisNotificationAsRead
        }}>
            
            {children}
        </ChatContext.Provider>
    )
}

