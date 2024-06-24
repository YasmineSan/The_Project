import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselBanner = () => {

  return (
    <section className='container mx-auto px-12'>
      <Carousel autoPlay infiniteLoop dynamicHeight showThumbs={false} showStatus={false} swipeable showArrows={false} className="rounded-xl overflow-hidden max-h-[550px]">
        <div className='relative'>
          <div className="absolute inset-0 bg-black opacity-20 "></div>
          <img
          className="w-full h-full object-cover max-h-[550px]"
          src="artisan-atelier.jpg"
          alt="First slide"
          />
          <h1 className='absolute left-22 lg:left-8 md:top-60 sm:top-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-stone-50 leading-loose text-center'>Craftify est une plateforme dédiée à l'artisanat </h1>
        </div>
        
        <div className='relative'>
        <div className="absolute inset-0 bg-black opacity-50"></div>
            <img
            className="w-full h-full object-cover max-h-[550px]"
            src="artisan-atelier2.jpg"
            alt="First slide"
          />
        <h1 className='absolute left-5 lg:left-8 md:top-60 sm:top-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-white leading-loose text-center'>Nous permettont aux créateurs de présenter et vendre leurs œuvres uniques</h1>
        </div>

        <div className='relative'>
        <div className="absolute inset-0 bg-black opacity-60"></div>
            <img
            className="w-full h-full object-cover max-h-[550px]"
            src="https://img.freepik.com/photos-gratuite/artisan-faisant-coupe-bois_23-2150600765.jpg?t=st=1718785836~exp=1718789436~hmac=d8757c4a35d1e4d380f78112e28918e949f2aa7073040964389b941d5c115bbe&w=996"
            alt="First slide"
          />
        <h1 className='absolute left-5 lg:left-8 md:top-60 sm:top-10 top-5 text-1xl sm:text-2xl lg:text-3xl md:text-3xl xl:text-5xl font-medium text-white'>Des créations uniques, façonnées avec passion</h1>
        </div>
      </Carousel>
    </section>
    
    );
}

export default CarouselBanner;

