import React from 'react'
import {io} from 'socket.io-client' 

const SendMag = ({msgData}) => {
  const socket = io("http://localhost:3000",{withCredentials : true})
  socket.on("connect",()=> {
    socket.on("newMsg", msg=> {
      console.log(msg)
    })
  })
  console.log("rendered sendMsg")
  return (
    <div className='sendMsgWrapper h-[35px] w-full flex justify-end items-center mb-2'>
      <div className=' w-auto px-2 bg-sky-500 text-white text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px]'>
      {msgData.messege}
    </div>
    <img className='h-[40px] w-[40px] rounded-full object-cover ms-2' src={msgData.profilePicture} alt="" />
    </div>
  )
}

export default SendMag