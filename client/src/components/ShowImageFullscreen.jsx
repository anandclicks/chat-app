import React from 'react'

const ShowImageFullscreen = ({images}) => {
  
  return (
    <div className='absolute h-full w-full bg-[#00000063] z-10 scale-[0.2] top-0 transition-all duration-300'>
      {images?.map((img)=>{
        return (
          <img src={img} alt="" />
        )
      })}
    </div>
  )
}

export default ShowImageFullscreen