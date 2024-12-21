import React, { useContext, useEffect, useState } from 'react'
import { SocketIoContext } from '../../scoektIoContext/Socket.Io'
import { LoggedinUserContext } from '../../scoektIoContext/LoggdinUserContext'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'

const MessegeInput = ({setchats}) => {
  // Use state for storing messege text 
  const [messege, setMessege] = useState('')
  const handleInput = (evt)=> {
    setMessege( evt.target.value)
  }
  // Getting socekt and reciever user id number from socekt context 
  const {socket} = useContext(SocketIoContext)
  const {loggedinUser} = useContext(LoggedinUserContext)
  const {recieverId} = useContext(OtherDataContext)

  
  // Fuction for sending messeges 
  const sendMessege = ()=> {
   if(recieverId){
    socket.emit("sendMessege",{messege : messege, sender :loggedinUser._id, reciever : recieverId })
    setMessege(' ')
   }
  }


  return (
    <div className='h-[50px] w-[full] flex gap-3 mt-5'>
      <input onChange={(evt)=> handleInput(evt)} value={messege} className='h-full w-[95%] bg-slate-200 rounded-3xl outline-none px-3 text-[14px]' placeholder='Type a messege..' type="text" />
      <i onClick={()=> { 
        sendMessege()
        setchats(prev => [...prev, {messege : messege, sender :loggedinUser._id, reciever : recieverId }])
      }} className="ri-send-plane-fill h-full w-[50px] rounded-full bg-sky-400 text-xl text-white flex
       justify-center items-center cursor-pointer"></i>
    </div>
  )
}

export default MessegeInput