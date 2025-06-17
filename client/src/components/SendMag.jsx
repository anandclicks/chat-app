import React from 'react'
import { io } from 'socket.io-client'

const SendMag = ({ msgData }) => {

  return (
    <>
      {msgData?.images?.length >= 1 && (
        <div className='sendMsgWrapper h-[200px] w-full flex justify-end items-center mb-2'>
          <div className=' max-w-[250px] min-w-[250px] shadow relative text-white text-sm h-full flex justify-center items-center rounded-3xl  overflow-hidden'>
           <img className='h-full object-cover' src={msgData?.images[0]} alt="" />

            {/* image number  */}
           {msgData?.images.length >= 2 &&(
            <div className='bg-[#00000050] absolute z-10 h-full w-full flex justify-center items-center text-white text-xl cursor-pointer'>{msgData?.images.length - 1}+</div>
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