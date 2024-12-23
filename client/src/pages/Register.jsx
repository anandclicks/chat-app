import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  // Usestate for navigate on login route in case of registration succes
  const [redirect, setredirect] = useState(false)
  const [formData, setformData] = useState({
    name : '',
    email : '',
    userName : '',
    password : ''
  })
  const handleInput = (evt)=> {
    setformData((prev)=> ({...prev, [evt.target.name] : evt.target.value}) )
  }
  // Api call for user registration 
  const apiCall = async(evt)=> {
    evt.preventDefault()
    const response = await axios.post('http://localhost:3000/api/users/user-registration',formData,{withCredentials : true})
    if(response?.data.sucess){
      setredirect(true)
    }
  }

  // Redirection function 
  const navigate = useNavigate()
  useEffect(()=> {
    if(redirect) {
      navigate('/')
    }
  },[redirect])

  
  return (
    <div className='bg-slate-200 h-screen w-full'>
      <div className="registerWrapper h-full max-w-[1300px] mx-auto flex items-center justify-center">
        {/* main from  */}
        <form onSubmit={(evt)=> apiCall(evt)} className='h-[410px] w-[400px] bg-white rounded-3xl p-2 pt-5 shadow-lg'>
          <h2 className='text-2xl text-center'><span className='text-sky-500'>Sign Up </span>to Connect!</h2>
          <div className="allInputs">
            <input onChange={(evt)=> handleInput(evt)} value={formData.name} className='inputStyling placeholder:text-black text-[14px]' name='name' placeholder='Full Name' type="text" />
            <input onChange={(evt)=> handleInput(evt)} value={formData.email} className='inputStyling placeholder:text-black text-[14px]' name='email' placeholder='Email Address' type="text" />
            <input onChange={(evt)=> handleInput(evt)} value={formData.userName} className='inputStyling placeholder:text-black text-[14px]' name='userName' placeholder='Username' type="text" />
            <input onChange={(evt)=> handleInput(evt)} value={formData.password} className='inputStyling placeholder:text-black text-[14px]' name='password' placeholder='password' type="text" />
            <input className='h-[50px] bg-sky-500 text-white w-full rounded-xl mt-5 cursor-pointer' type='submit' value={'Sign-up'} />
            <p className='capitalize text-[12px] mt-3'>Already have an Account go for <Link className='text-sky-400 underline' to={'/login'}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register