import React, { useContext } from 'react'
import { ChatContext } from '../../Context/chatContext'
import { AuthContext } from '../../Context/AuthContext'

const PotentialChats = () => {
    const {user} = useContext(AuthContext)
    const {potentailChats,createChat,onlineUsers} = useContext(ChatContext)
    
  return (
    <>
    <div className="all-users">
        {
            potentailChats && potentailChats.map((u,index)=>(
                <div className="single-user" key={index} onClick={()=>createChat(user._id,u._id)}>
                    {u.name}
                    <span className={
                        onlineUsers.some((user)=>user?.userId===u._id) ?
                        'user-online':" "}></span>
                </div>
            ))
        }
    </div>
     
    </>
  )
}

export default PotentialChats
