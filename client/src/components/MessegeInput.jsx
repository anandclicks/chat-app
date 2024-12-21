import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const MessegeInput = () => {

  return (
    <div className='h-[50px] w-[full] flex gap-3 mt-5'>
      <input className='h-full w-[95%] bg-slate-200 rounded-3xl outline-none px-3 text-[14px]' placeholder='Type a messege..' type="text" />
      <i className="ri-send-plane-fill h-full w-[50px] rounded-full bg-sky-400 text-xl text-white flex
       justify-center items-center cursor-pointer"></i>
    </div>
  )
}

export default MessegeInput