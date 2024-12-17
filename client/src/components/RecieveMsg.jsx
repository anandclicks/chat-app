import React from 'react'

const RecieveMsg = ({msgData}) => {
  console.log("rendered recieve msg")
  return (
    <div className='recieveMsgWrapper h-[35px] w-full flex items-center mb-2'>
      <img className='h-[40px] w-[40px] rounded-full object-cover me-2' src={msgData.profilePicture} alt="" />
      <div className=' w-auto px-2 bg-slate-200 text-sm h-full flex justify-center items-center rounded-3xl min-w-[50px]'>
      {msgData.messege}
    </div>
    </div>
  )
}

export default RecieveMsg