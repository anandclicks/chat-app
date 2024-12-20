import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  // Use state for redirect to chat route 
  const [redirect, setredirect] = useState(false)
  const [formData, setformData] = useState({
    userName : '',
    password : ''
  })
  const handleInput = (evt)=> {
    setformData((prev)=> ({...prev, [evt.target.name] : evt.target.value}))
  }
  // Api call 
  const apiCall = async(evt)=> {
    evt.preventDefault()
    const response = await axios.post("http://localhost:3000/api/users/user-login",formData,{withCredentials :true})
    console.log(response)
    if(response?.data.sucess){
      setredirect(true)
    }
  }
  

  // Useeffect for controlling route 
  const navigate = useNavigate()
  useEffect(()=> {
    if(redirect){
      navigate('/chat')
    }
  },[redirect])

  return (
    <>
    {/* <Loader/> */}
    <div className='h-screen w-full bg-slate-200'>
     <div className="loginWrapper h-full max-w-[1300px] flex justify-center items-center mx-auto">
     <form onSubmit={(evt)=> apiCall(evt)} className='h-[290px] w-[400px] bg-white rounded-2xl p-2 pt-5'>
        <h1 className='text-2xl text-center'>Welcome Back! <span className='text-sky-500'>Log In</span> to Chat</h1>
        <div className="inputs">
        <input onChange={(evt)=> handleInput(evt)} value={formData.userName} className='inputStyling placeholder:text-black text-[14px]' name='userName' placeholder='Username' type="text" />
        <input onChange={(evt)=> handleInput(evt)} value={formData.password} className='inputStyling placeholder:text-black text-[14px]' name='password' placeholder='Password' type="text" />
        <input className='h-[50px] bg-sky-500 text-white w-full rounded-xl mt-5 cursor-pointer' type='submit' value={'Log-in'} />
        <p className='capitalize text-[12px] mt-3'>Don't have any Account go for <Link className='text-sky-400 underline' to={'/register'}>Register</Link></p>
        </div>
      </form>
     </div>
    </div>
    </>
  )
}

export default Login