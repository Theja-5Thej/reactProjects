import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { ChatContext } from '../../Context/chatContext'
import { useFetchRecepientUser } from '../../hooks/useFetchRecepient'
import { Stack } from 'react-bootstrap'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'

const ChatBox = () => {
    const { user } = useContext(AuthContext)
    const [recepientUseru, setRecepientUseru] = useState()
    const { messages, isMessageLoading, messagesError, currentChat ,sendTextMessages} = useContext(ChatContext)
    const { recepientUser } = useFetchRecepientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const scroll = useRef()

    useEffect(()=>{
        scroll.current?.scrollIntoView({behaviour : "smooth"})
    },[messages])
    if (!recepientUser) {
        return (
            <div style={{ textAlign: 'start', width: "100%" }}>
                <p>Conversation not selected yet...</p>
            </div>
        )
    }
    if (isMessageLoading) {
        return (
            <div style={{ textAlign: 'start', width: "100%" }}>
                <p>Loading messages..</p>
            </div>
        )
    }
    return (
        <Stack gap={4} className='chat-box'>
            
            <div className="chat-header" >
                <strong>{recepientUser?.name}</strong>
            </div>
            <Stack gap={3} className='messages'>
                {messages && messages.map((msg, index) => {
                return(
                    <Stack key={index} ref={scroll} className={`${msg?.senderId === user?._id ?
                        "message self align-self-end flex-grow-0" :
                        "message  align-self-start flex-grow-0"
                        }`}>
                        <span>{msg.text}</span>
                        <span className='message-footer'>{moment(msg.createdAt).calendar()}</span>
                    </Stack>
                )})}
            </Stack>
            <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    fontFamily='nunito'
                    borderColor='rgba(72,112,223,0.2)'
                />
                 <button className='send-btn' onClick={()=>sendTextMessages(textMessage,user,currentChat._id,setTextMessage)}>
                 <svg xmlns="http://www.w3.org/2000/svg" 
                width="16"
                 height="16"
                fill="currentColor" 
                className="bi bi-send-fill" 
                viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
                 </button>
              
            </Stack>
        </Stack>
    )
}

export default ChatBox
