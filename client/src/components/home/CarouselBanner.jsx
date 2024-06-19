import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselBanner = () => {

  return (
    <section className='container mx-auto px-12'>
      <Carousel autoPlay infiniteLoop dynamicHeight showThumbs={false} showStatus={false} swipeable showArrows={false} className="rounded-lg overflow-hidden">
        <div className='relative'>
            <img
            className="w-100"
            src="banner_home.png"
            alt="First slide"
          />
        <h1 className='absolute left-5 lg:left-20 md:top-32 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-white'>Des créations uniques, façonnées avec passion</h1>
        </div>
        
        <div className='relative'>
            <img
            className="w-100"
            src="banner_home.png"
            alt="First slide"
          />
        <h1 className='absolute left-5 lg:left-20 md:top-32 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-white'>Des créations uniques, façonnées avec passion</h1>
        </div>

        <div className='relative'>
            <img
            className="w-100"
            src="banner_home.png"
            alt="First slide"
          />
        <h1 className='absolute left-5 lg:left-20 md:top-32 sm:to-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-white'>Des créations uniques, façonnées avec passion</h1>
        </div>
      </Carousel>
    </section>
    
    );
}

export default CarouselBanner;

