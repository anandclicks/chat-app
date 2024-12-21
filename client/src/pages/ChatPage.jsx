import React, { useContext, useEffect, useState } from 'react'
import AllUsers from '../components/AllUsers'
import MessegeInput from '../components/MessegeInput'
import SendMag from '../components/SendMag'
import RecieveMsg from '../components/RecieveMsg'
import { users } from '../data/users'
import { useParams } from 'react-router-dom'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'
import { SocketIoContext } from '../../scoektIoContext/Socket.Io'
import { LoggedinUserContext } from '../../scoektIoContext/LoggdinUserContext'

const ChatPage = () => {
  // Use state for storing chats between loggedin user and this perticuler userid's person 
  const [chats, setchats] = useState([])
  console.log(chats)
  // Geeing id number of currecnt reciever user  
  const {socket} = useContext(SocketIoContext)
  const {loggedinUser} = useContext(LoggedinUserContext)
  useEffect(() => {
    socket.on("recieveMessege", payload => {
        setchats(prev => [...prev, payload])
    });


    // Cleanup listener on component unmount
    return () => {
        socket.off("recieveMessege");
    };
}, [socket]);

console.log(loggedinUser._id)
  return (
    <div className='h-[100vh] w-[100vw] bg-slate-200'>
      <div className="chatWrapper h-full max-w-[1300px] mx-auto pt-[100px] pb-[100px] flex gap-5">
        {/* left side  */}
        <div className="chatPageLeft w-[350px]">
        <AllUsers/>
        </div>
        {/* right side  */} 
        <div className="chatField w-[850px] h-full p-3 bg-white rounded-3xl flex flex-col justify-end">
          {/* if chtas are not there  */}
          {chats.length == 0 && (
            <div className='h-full w-full flex justify-center items-center'>
              <img className='h-[200px] w-[200px] object-cover' src="http://localhost:3000/uploads/defaultProfile.png" alt="" />
            </div>
          )}
          {/* All messeges  */}
          <div className="allMsgs">
           {chats?.length > 0 && (
            <div>
               {chats.map((item,index)=> {
            return  item?.sender === loggedinUser?._id ? (
                <SendMag key={index} msgData= {item}/>
              ) :
              (
                <RecieveMsg key={index} msgData= {item}/>
              ) 
            
            })}
            </div>
           )}
          </div>
          
          <MessegeInput setchats={setchats}/>

        </div>
      </div>
    </div>
  )
}

export default ChatPage