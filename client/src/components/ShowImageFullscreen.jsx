import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { OtherDataContext } from "../../scoektIoContext/OtherDataContext";

const ShowImageFullscreen = ({ images }) => {
  const { needToShow, setneedToShow } = useContext(OtherDataContext);

  return (
    <>
      {images.length !== 0 && (
        <div
          className={`${
            needToShow ? "scale-[1] " : " scale-[0]"
          } flex  absolute h-full w-full   overflow-hidden z-30 top-0 left-0  items-center justify-center transition-all duration-300 `}
        >
          {/* all images  */}
          <div className="md:w-[900px] h-[65%] bg-[#00000018] rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden p-3">
            {/* for close model  */}
            <i
              onClick={() => {
                setneedToShow((prev) => !prev);
              }}
              className="ri-close-large-line absolute top-0 end-0 text-xl m-5 mainBgColor backdrop-blur-sm z-10 h-[40px] w-[40px] rounded-full flex justify-center items-center text-white cursor-pointer hover:rotate-[30deg] transition-all"
            ></i>

            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {images?.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="h-full w-full justify-center flex ">
                    <img
                      src={img}
                      alt={`image-${index}`}
                      className="h-full object-contain rounded-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ShowImageFullscreen;
