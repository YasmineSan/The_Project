import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselBanner = () => {

  return (
    <Carousel autoPlay infiniteLoop dynamicHeight showThumbs={false} showStatus={false} swipeable showArrows={false} className="rounded-lg overflow-hidden">
        <div className='relative'>
            <img
            className="w-100"
            src="https://picsum.photos/200/100"
            alt="First slide"
          />
        <p className='absolute left-5 lg:left-20 md:top-20 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-4xl font-medium text-white'>Des créations uniques, façonnées avec passion</p>
        </div>
        
        <div className='relative'>
            <img
            className="w-100"
            src="https://picsum.photos/200/100"
            alt="First slide"
          />
        <p className='absolute left-5 lg:left-20 md:top-20 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-4xl font-medium text-white'>Des créations uniques, façonnées avec passion</p>
        </div>

        <div className='relative'>
            <img
            className="w-100"
            src="https://picsum.photos/200/100"
            alt="First slide"
          />
        <p className='absolute left-5 lg:left-20 md:top-20 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl xl:text-4xl md:text-3xl font-medium text-white'>Des créations uniques, façonnées avec passion</p>
        </div>
    </Carousel>
    );
}

export default CarouselBanner;

