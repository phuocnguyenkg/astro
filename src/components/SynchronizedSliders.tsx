import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller, Pagination } from "swiper/modules";
import { useState } from "react";
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SynchronizedSlidersProps {
  images?: string[];
}

const SynchronizedSliders = ({ images = [] }: SynchronizedSlidersProps) => {
  const [firstSwiper, setFirstSwiper] = useState<SwiperType | null>(null);
  const [secondSwiper, setSecondSwiper] = useState<SwiperType | null>(null);

  const defaultImages = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3',
    'https://picsum.photos/800/400?random=4',
  ];

  const slidesData = images.length > 0 ? images : defaultImages;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Main Slider */}
      <Swiper
        modules={[Navigation, Controller, Pagination]}
        slidesPerView={4}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        onSwiper={setFirstSwiper}
        controller={{ control: secondSwiper }}
        className="w-full rounded-lg overflow-hidden"
      >
        {slidesData.map((image, index) => (
          <SwiperSlide key={`main-${index}`}>
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        modules={[Navigation, Controller]}
        slidesPerView={4}
        spaceBetween={10}
        navigation
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
        className="w-full"
      >
        {slidesData.map((image, index) => (
          <SwiperSlide key={`thumb-${index}`}>
            <div className="cursor-pointer aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SynchronizedSliders; 