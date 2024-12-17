import React, { useState } from 'react'

const Login = () => {
  const [formData, setformData] = useState({
    userName : '',
    password : ''
  })
  const handleInput = (evt)=> {
    setformData((prev)=> ({...prev, [evt.target.name] : evt.target.value}))
  }
  return (
    <div className='h-screen w-full bg-slate-200'>
     <div className="loginWrapper h-full max-w-[1300px] flex justify-center items-center mx-auto">
     <form className='h-[280px] w-[400px] bg-white rounded-2xl p-2 pt-5'>
        <h1 className='text-2xl text-center'>Welcome Back! <span className='text-sky-500'>Log In</span> to Chat</h1>
        <div className="inputs">
        <input onChange={(evt)=> handleInput(evt)} value={formData.userName} className='inputStyling placeholder:text-black text-[14px]' name='userName' placeholder='Username' type="text" />
        <input onChange={(evt)=> handleInput(evt)} value={formData.password} className='inputStyling placeholder:text-black text-[14px]' name='password' placeholder='Password' type="text" />
        <input className='h-[50px] bg-sky-500 text-white w-full rounded-xl mt-5 cursor-pointer' type='submit' value={'Log-in'} />
        </div>
      </form>
     </div>
    </div>
  )
}

export default Login