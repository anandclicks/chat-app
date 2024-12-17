import React from 'react'
import AllUsers from '../components/AllUsers'
import MessegeInput from '../components/MessegeInput'
import SendMag from '../components/SendMag'
import RecieveMsg from '../components/RecieveMsg'
import { users } from '../data/users'
import { loggedInUser } from '../data/LoggedInUser'

const ChatPage = () => {
  const data = users?.messeges?.map((item, index) => item);

  console.log(users[0]?.messeges)
  return (
    <div className='h-[100vh] w-[100vw] bg-slate-200'>
      <div className="chatWrapper h-full max-w-[1300px] mx-auto pt-[100px] pb-[100px] flex gap-5">
        {/* left side  */}
        <div className="chatPageLeft w-[350px]">
        <AllUsers/>
        </div>
        {/* right side  */} 
        <div className="chatField w-[850px] h-full p-3 bg-white rounded-3xl flex flex-col justify-end">
          {/* All messeges  */}
          <div className="allMsgs">
            {users[0]?.messeges?.map((item,index)=> {
            return  item.senderId == loggedInUser._id ? (
                <SendMag msgData= {item}/>
              ) :
              (
                <RecieveMsg msgData= {item}/>
              ) 
            
            })}
          </div>
          <MessegeInput/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage