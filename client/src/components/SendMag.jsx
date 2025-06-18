import React from 'react'
import { io } from 'socket.io-client'

const SendMag = ({ msgData }) => {

  return (
    <>
      {msgData?.images?.length >= 1 && (
        <div className='sendMsgWrapper h-[250px] w-full flex justify-end items-center mb-2'>
       
         <div className="relative max-w-[250px] h-[250px] rounded-xl overflow-hidden">
            <img className='w-full h-full rounded-xl object-contain cursor-pointer ' src={msgData?.images[0]} alt="" />

            {/* image number  */}
           {msgData?.images.length >= 2 &&(
            <div className='bg-[#00000050] absolute top-0 z-10 h-full w-full flex justify-center items-center text-white text-xl cursor-pointer'>{msgData?.images.length - 1}+</div>
           )}
         
         </div>
        </div>
      )}

      {/* if text  */}
      {msgData?.message && (
        <div className='sendMsgWrapper h-[35px] w-full flex justify-end items-center mb-2'>
          <div className=' w-auto bg-sky-500 text-white text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px] p-2 px-4'>
            {msgData.message}
          </div>
        </div>
      )}
    </>
  )
}

export default SendMag