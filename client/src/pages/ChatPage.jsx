import React, { useContext, useEffect, useState } from 'react'
import AllUsers from '../components/AllUsers'
import MessegeInput from '../components/MessegeInput'
import SendMag from '../components/SendMag'
import RecieveMsg from '../components/RecieveMsg'

import { useParams } from 'react-router-dom'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'
import { SocketIoContext } from '../../scoektIoContext/Socket.Io'
import { LoggedinUserContext } from '../../scoektIoContext/LoggdinUserContext'
import axios from 'axios'

const ChatPage = () => {
  // Use state for storing chats between loggedin user and this perticuler userid's person 
  const [chats, setchats] = useState([])
  console.log(chats)
  // Geeing id number of currecnt reciever user  
  const {socket} = useContext(SocketIoContext)
  const {loggedinUser} = useContext(LoggedinUserContext)
  const {recieverId} = useContext(OtherDataContext)
  useEffect(() => {
    socket.on("recieveMessege", payload => {
        setchats(prev => [...prev, payload])
    });

}, [socket]);


// Fetching chats 
useEffect(()=> {
  if(recieverId){
    const fetchingChats = async ()=> {
      const response = await axios.get(`http://localhost:3000/api/chats/${recieverId}`, {withCredentials : true})
      setchats(response.data?.allChats)
    }
    fetchingChats()
  }
},[recieverId])


// Fetching clieckedUseid by api call 
const [selectedUserData, setselectedUserData] = useState([])

useEffect(()=> {
  const apiCall = async()=> {
    const response = await axios.get(`http://localhost:3000/api/users/user/${recieverId}`, {withCredentials : true})
    setselectedUserData(response.data.user)
  }
  if(recieverId){
    apiCall()
  }
},[recieverId])

// Online user 
const [onlineUsers, setonlineUsers] = useState([]);
useEffect(()=> {
  socket.on("onlineUser", (payload) => {
    setonlineUsers(payload);
    console.log("one user connected")
  });

}, [socket])

console.log(selectedUserData)
  return (
    <div className='h-[100vh] w-[100vw] bg-slate-200'>
      <div className="chatWrapper h-full max-w-[1300px] mx-auto pt-[100px] pb-[100px] flex gap-5">
        {/* left side  */}
        <div className="chatPageLeft w-[350px]">
        <AllUsers onlineUsers={onlineUsers}/>
        </div>
        {/* right side  */} 
        <div className="chatField w-[850px] h-full p-3 bg-white rounded-3xl flex flex-col justify-between">
          
        <div className='w-full h-[50px] flex gap-2 items-center'>
            <img className='h-full rounded-full' src={`http://localhost:3000${selectedUserData?.profilePicture}`} alt="" />
            {/* chat header */}
           {recieverId && (
             <div >
             <h2>{selectedUserData?.name}</h2>
            {onlineUsers?.find((user) => user.email === selectedUserData.email) ? (
             <p className='text-[13px] leading-3 text-green-500'>Online</p>
            ) : (<p className='text-[13px] leading-3'>Ofline</p>)}
           </div>
           )}
          </div>
          {/* if chtas are not there  */}
          {chats.length == 0 && (
            <div className='h-full w-full flex justify-center items-center'>
              <img className='h-[200px] w-[200px] object-cover' src="http://localhost:3000/uploads/defaultProfile.png" alt="" />
            </div>
          )}
          {/* All messeges  */}
     
         <div className='chatsAndInput'>
         <div className="allMsgs">
           {chats?.length > 0 && (
            <div>
               {chats.map((item,index)=> {
            return  item?.senderId === loggedinUser?._id ? (
                <SendMag key={index} msgData= {item}/>
              ) :
              (
                <RecieveMsg key={index} msgData= {item}/>
              ) 
            
            })}
            </div>
           )}
          </div>
          
          {recieverId && (
            <MessegeInput setchats={setchats}/>
          )}
         </div>

        </div>
      </div>
    </div>
  )
}

export default ChatPage