export const unreadNotificationsFunc =(notifications)=>{
return notifications.filter((not)=>not.isRead===false)
}