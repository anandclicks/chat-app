import React from 'react'
import { format } from 'date-fns'


const RecieveMsg = ({ msgData }) => {
  // const formattedDate = format(new Date(msgData.createdAt), "hh:mm a")
  return (
    <>
      {msgData?.images?.length >= 1 && (
        <div className='sendMsgWrapper h-[200px] w-full flex justify-start items-center mb-2'>
            <img className='max-w-[250px] rounded-xl h-full object-contain' src={msgData?.images[0]} alt="" />

            {/* image number  */}
            {msgData?.images.length >= 2 && (
              <div className='bg-[#00000050] absolute z-10 h-full w-full flex justify-center items-center text-white text-xl cursor-pointer'>{msgData?.images.length - 1}+</div>
            )}
        </div>
      )}

     {msgData.message && (
       <div className='recieveMsgWrapper h-[35px] w-full flex items-start mb-2 flex-col'>
        {/* <small className='text-[10px]'>{formattedDate}</small> */}
        <div className='p-2 w-auto px-4 bg-slate-200 text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px]'>
          {msgData.message}
        </div>
      </div>
     )}
    </>
  )
}

export default RecieveMsg