import React from 'react'
import {format} from 'date-fns'


const RecieveMsg = ({msgData}) => {
  const formattedDate = format(new Date(msgData.createdAt), "hh:mm a")
  console.log("rendered recieve msg")
  return (
    <div className='recieveMsgWrapper h-[35px] w-full flex items-start mb-2 flex-col'>
      {/* <small className='text-[10px]'>{formattedDate}</small> */}
      <div className='p-2 w-auto px-2 bg-slate-200 text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px]'>
      {msgData.messege}
    </div>
    </div>
  )
}

export default RecieveMsg