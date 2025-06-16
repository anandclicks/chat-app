import React from 'react'
import {io} from 'socket.io-client' 

const SendMag = ({msgData}) => {

  console.log("rendered sendMsg")
  return (
    <div className='sendMsgWrapper h-[35px] w-full flex justify-end items-center mb-2'>
      <div className=' w-auto bg-sky-500 text-white text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px] p-2 px-4'>
      {msgData.messege}
    </div>
    </div>
  )
}

export default SendMag