import React, { useContext } from 'react'
import { io } from 'socket.io-client'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'

const SendMag = ({ msgDataObj }) => {
  const { setneedToShow} = useContext(OtherDataContext)
  const {item,setallInboxImages} = msgDataObj
  
  return (
    <>
      {item?.images?.length >= 1 && (
        <div className='sendMsgWrapper w-full flex justify-end items-center  mt-4'>
         <div className="relative max-w-[250px] max-h-[300px] rounded-xl overflow-hidden">
            <img onClick={()=>{setneedToShow((prev)=> !prev); setallInboxImages([...item?.images])}} className='w-full h-full rounded-xl object-contain cursor-pointer ' src={item?.images[0]} alt="" />

            {/* image number  */}
           {item?.images.length >= 2 &&(
            <div onClick={()=>{setneedToShow((prev)=> !prev); setallInboxImages([...item?.images])}} className='bg-[#00000050] absolute top-0 z-10 h-full w-full flex justify-center items-center text-white text-xl cursor-pointer'>{item?.images.length - 1}+</div>
           )}
         
         </div>
        </div>
      )}

      {/* if text  */}
      {item?.message && (
        <div className='sendMsgWrapper h-[35px] w-full flex justify-end items-center my-2'>
          <div className=' w-auto bg-sky-500 text-white text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px] p-2 px-4'>
            {item.message}
          </div>
        </div>
      )}
    </>
  )
}

export default SendMag