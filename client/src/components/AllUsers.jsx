import React from 'react'
import { users } from '../data/users'
import { loggedInUser } from '../data/LoggedInUser'


const AllUsers = () => {
  return (
    <div className='w-full flex flex-col gap-5 h-[100%]'>
      {/* search box  */}
      <div className="searachBox bg-white h-[50px] w-full rounded-3xl text-[15px] flex items-center overflow-hidden gap-2 px-3">
      <i className="ri-search-line"></i>
      <input className='placeholder-black h-full outline-none ' placeholder='Search' type="text" />
      </div>

      {/* users  */}
      <div className='w-full bg-white rounded-3xl px-5 py-3 h-[100%]'>
        {users?.map((item,index)=> 
        <div key={index} className='h-[70px] w-full flex py-[10px] gap-2 items-center justify-between border-b-[1px] border-stone-200 cursor-pointer'>
          {/* profile picture  */}
          <div className="profilePicture h-full w-[50px] rounded-full overflow-hidden relative z-0">
            <img className='h-full w-full object-cover' src={item.profilePicture} alt="" />
          </div>
          {/* name and greet  */}
          <div className="nameAndGreet h-full w-[60%] flex flex-col justify-center">
            <h2 className='leading-5'>{item.name}</h2>
            <p className='text-[13px] text-stone-600'>{item.defalutGreet}</p>
          </div>
          {/* last seen  */}
          <div className='h-full'>
            <p className='text-[12px]'>{item.lastSeen}</p>
          </div>
        </div>
        )}
      </div>

      {/* loggedin user  */}
      <div className='h-[50px] w-full bg-white rounded-3xl flex items-center justify-between px-2'>
        {/* prfilepic and name  */}
        <div className="profuleAndName flex gap-2 items-center">
          <img className='h-[40px] w-[40px] rounded-full object-cover' src={loggedInUser.profilePicture} alt="" />
          <h2 className='text-sm'>{loggedInUser.name}</h2>
        </div>
        {/* setting icon  */}
        <i className="ri-logout-circle-r-line text-xl cursor-pointer"></i>
      </div>
    </div>
  )
}

export default AllUsers