import React, { useContext } from 'react'
import {useFetchRecepientUser} from '../../hooks/useFetchRecepient'
import profile from '../../assets/profile.svg'
import { Stack } from 'react-bootstrap'
import { ChatContext } from '../../Context/chatContext'
import {unreadNotificationsFunc} from '../../utils/unreadNotification'
import {useFetchLatestMsg} from '../../hooks/useFetchLatestMsg'
import moment from 'moment'
const UserChat = ({chat,user}) => {
    const {recepientUser } = useFetchRecepientUser(chat,user)
    const {onlineUsers,notification,markThisNotificationAsRead} = useContext(ChatContext)
    const {latestMessage} = useFetchLatestMsg(chat)
    const isOnline = onlineUsers.some((user)=>user?.userId===recepientUser?._id)

    const unReadNotifications = unreadNotificationsFunc(notification)
    const thisUserNotification = unReadNotifications.filter((n)=>n.senderId === recepientUser?._id)
  const truncateText =(text)=>{
    let shortText = text.text.substring(0,20)
    if(text.text.length>20){
      shortText = shortText+"..."
    }
    return shortText
  }
  return (
    <Stack direction='horizontal' gap={3} className='user-card align-items-center p-2 justify-content-between' role='button'
    onClick={()=>{
      if(thisUserNotification?.length>0){
        markThisNotificationAsRead(thisUserNotification,notification)
      }
    }}
    >
      <div className='d-flex'>
            <div className="me-2">
                <img src={profile} height="35px"/>
                 </div>
            <div className="text-content">
                <div className="name"> {recepientUser?.name}</div>
                <div className="text">{
                  latestMessage?.text && (
                    <span>{truncateText(latestMessage)}</span>
                  )
                }</div>
            </div>
      </div>
      <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
            <div className={thisUserNotification.length>0 ? "this-user-notifications":" "}>
            {thisUserNotification.length>0 ? thisUserNotification.length : ""}
            </div>
            <div className={isOnline ? "user-online": ""}></div>
      </div>
    </Stack>
  )
}

export default UserChat
