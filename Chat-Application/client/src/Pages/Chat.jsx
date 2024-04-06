import React, { useContext } from 'react'
import { ChatContext } from '../Context/chatContext'
import { Container, Stack } from 'react-bootstrap'
import UserChat from '../Components/chat/UserChat'
import { AuthContext } from '../Context/AuthContext'
import PotentialChats from '../Components/chat/PotentialChats'
import ChatBox from '../Components/chat/ChatBox'
const Chat = () => {
  const {user} = useContext(AuthContext)
  const { userChats, userChatsError, isuserChatsLoading,updateCurrentChat} = useContext(ChatContext)
  const handleCurrentChat = (chat)=>{
    updateCurrentChat(chat)
    // gettingMessages()
  }
  return (
    <Container>
      <PotentialChats/>
      {userChats?.length <1 ? null : (
      <Stack direction='horizontal' gap={4} className='align-items-start'>
        <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
          {isuserChatsLoading && <p>Loading Chats...</p>}
          {
            userChats?.map((chat,index)=>{
              return(
                <div key={index} onClick={()=>handleCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })
          }
        </Stack>
       <ChatBox/>
        </Stack>)}
    </Container>
  )
}

export default Chat
