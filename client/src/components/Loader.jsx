import React from 'react'

const Loader = () => {
  return (
    <div className='h-[100vh] w-[100vw] absolute top-0 left-0 flex justify-center items-center bg-[#00000062]'>
      <div className="loadingCircle h-[80px] w-[80px] bg-transparent border-b-[5px] border-sky-600 rounded-full"></div>
    </div>
  )
}

export default Loader