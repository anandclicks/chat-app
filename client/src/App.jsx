import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import Register from './pages/Register'
import Login from './pages/Login'
import dotenv from 'dotenv'
import {ToastContainer} from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.css" integrity="sha512-6p+GTq7fjTHD/sdFPWHaFoALKeWOU9f9MPBoPnvJEWBkGS4PKVVbCpMps6IXnTiXghFbxlgDE8QRHc3MU91lJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
    <Routes>
      <Route path='/chat' element={<><ChatPage/></>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
    </Routes>
    <ToastContainer/>
    </>
  )
}

export default App
