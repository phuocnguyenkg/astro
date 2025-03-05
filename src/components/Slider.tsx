import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Img } from 'react-image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
  slides: {
    id: number;
    image: string;
    title?: string;
  }[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <div className="w-full">
      <div>name</div>
      <div className="w-full">
        <Swiper
          modules={[Navigation]}
          loop={false}
          navigation
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2.17,
              spaceBetween: 20,
            },
            375: {
              slidesPerView: 2.17,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.17,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }}
          className="w-full h-[137px]"
          wrapperClass="!gap-[8px] md:!gap-[16px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="!mr-0 !w-[calc(100%/2.17)] 
            sm:!w-[calc((100%/2.17)-10.6666666667px)] 
            md:!w-[calc((100%/4)-12px)]  
            lg:!w-[calc((100%/5)-12.8px)]">
              <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  <img
                    src={slide.image}
                    alt={slide.title || ''}
                    loading="lazy"
                    decoding="async"
                   
                    className="w-full h-full object-cover relative z-10 transition-opacity duration-300"
                  />
                  {slide.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-20">
                      <h3 className="text-lg font-semibold">{slide.title}</h3>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider; 