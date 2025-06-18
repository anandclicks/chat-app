import React, { useContext } from 'react'
import { format } from 'date-fns'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'


const RecieveMsg = ({ msgDataObj }) => {
   const { setneedToShow} = useContext(OtherDataContext)
   const {item,setallInboxImages  } = msgDataObj
  return (
    <>
      {item?.images?.length >= 1 && (
        <div className='sendMsgWrapper  w-full flex justify-start items-center  mt-4'>
           <div className="relative max-w-[250px] max-h-[300px] rounded-xl overflow-hidden">
            <img onClick={()=>{setneedToShow((prev)=> !prev); setallInboxImages([...item?.images])}}  className=' h-full rounded-xl object-contain cursor-pointer' src={item?.images[0]} alt="" />

            {/* image number  */}
            {item?.images.length >= 2 && (
              <div onClick={()=>{setneedToShow((prev)=> !prev); setallInboxImages([...item?.images])}}  className='bg-[#00000050] absolute z-10 top-0 h-full w-full flex justify-center items-center text-white text-xl cursor-pointer'>{item?.images.length - 1}+</div>
            )}
            </div>
        </div>
      )}

     {item.message && (
       <div className='recieveMsgWrapper h-[35px] w-full flex items-start my-2 flex-col'>
        {/* <small className='text-[10px]'>{formattedDate}</small> */}
        <div className='p-2 w-auto px-4 bg-slate-200 text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px]'>
          {item.message}
        </div>
      </div>
     )}
    </>
  )
}

export default RecieveMsg