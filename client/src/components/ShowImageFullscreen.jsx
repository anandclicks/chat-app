import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'
import { OtherDataContext } from '../../scoektIoContext/OtherDataContext'

const ShowImageFullscreen = ({ images }) => {
  const { needToShow, setneedToShow } = useContext(OtherDataContext)

  return (
    <>
      {images.length !== 0 && (
        <div className={`${needToShow ? 'scale-[0.9] ' : ' scale-[0]'} flex  absolute h-full w-full  rounded-2xl overflow-hidden z-10 top-0 left-0   items-center justify-center transition-all duration-300 `}>

          {/* all images  */}
          <div className='md:w-[800px] h-full bg-[#0000003a] rounded-2xl shadow-lg backdrop-blur-sm'>
              {/* for close model  */}
          <i onClick={() => {setneedToShow(false);}} class="ri-close-large-line absolute top-0 end-0 text-xl m-5 bg-[#ffffff1a] backdrop-blur-sm z-10 h-[40px] w-[40px] rounded-full flex justify-center items-center text-white cursor-pointer hover:rotate-[30deg] transition-all"></i>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className='w-full h-full'
            >
              {images?.map((img, index) => (
                <SwiperSlide key={index} className='flex items-center justify-center'>
                  <div className='h-full w-full justify-center flex'>
                    <img src={img} alt={`image-${index}`} className='h-full object-contain' />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  )
}

export default ShowImageFullscreen
