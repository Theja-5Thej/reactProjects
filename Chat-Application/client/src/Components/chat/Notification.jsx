import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import {ChatContext} from '../../Context/chatContext'
import {unreadNotificationsFunc} from '../../utils/unreadNotification'
import moment from 'moment'

const Notification = () => {
    const [toggleNotification,setToggleNotification] = useState(false)
    const {user}  = useContext(AuthContext)
    const{notification,userChats,allUsers,markAllNotificationAsRead,markNotificationAsRead} = useContext(ChatContext)
     const unreadNotifications= unreadNotificationsFunc(notification)

     const modifiedNotification =notification.map((n)=>{
        const sender = allUsers.find((user)=>user?._id===n.senderId)
        return {
            ...n,
            senderName : sender?.name
        }
     })
    
    return (
        <div className='notifications'>
            <div className="notification-icon" onClick={()=>setToggleNotification(!toggleNotification)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                </svg>
                {unreadNotifications?.length ===0 ? null:(
                    <span className='notification-count'><span>{unreadNotifications?.length}</span></span>
                ) }
            </div>
          {toggleNotification &&  <div className="notifications-box">
                <div className="notifications-header">
                    <h3>Notifications</h3>
                    <div className="mark-as-read" onClick={()=>{
                        markAllNotificationAsRead(notification)
                        setToggleNotification(false)
                    
                    }}>Mark all as read</div>
                </div>
                {modifiedNotification.length ===0 ? <span className ="notification">No notificaions Yet</span>:null}
                {modifiedNotification && modifiedNotification.map((n,index)=>{
                    return (<dir key={index} className ={n.isRead ? 'notification' : "notification not-read"} 
                    onClick={()=>{
                        markNotificationAsRead(n,userChats,user,notification)
                        setToggleNotification(false)
                        
                    }} >
                        <span>{`${n.senderName} sent you a message`}</span>
                        <span className="notification-time">{moment(n.date).calendar()}</span>
                    </dir>
                    )
                })}
            </div>}
        </div>
    )
}

export default Notification
