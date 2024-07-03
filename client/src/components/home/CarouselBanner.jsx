import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselBanner = () => {

  return (
    <section className='container mx-auto px-12 pt-4'>
      <Carousel autoPlay infiniteLoop dynamicHeight showThumbs={false} showStatus={false} swipeable showArrows={false} className="rounded-xl overflow-hidden max-h-[550px]">
        <div className='relative'>
          <img
            className="w-full h-full object-cover max-h-[550px]"
            src="artisan-atelier.jpg"
            alt="First slide"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h1 className='text-center text-white font-semibold text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-loose'>
              Craftify est une plateforme dédiée à l'artisanat
            </h1>
          </div>
        </div>
        
        <div className='relative'>
          <img
            className="w-full h-full object-cover max-h-[550px]"
            src="artisan-atelier2.jpg"
            alt="Second slide"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h1 className='text-center text-white font-semibold text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-loose'>
              Nous permettons aux créateurs de présenter et vendre leurs œuvres uniques
            </h1>
          </div>
        </div>

        <div className='relative'>
          <img
            className="w-full h-full object-cover max-h-[550px]"
            src="https://img.freepik.com/photos-gratuite/artisan-faisant-coupe-bois_23-2150600765.jpg?t=st=1718785836~exp=1718789436~hmac=d8757c4a35d1e4d380f78112e28918e949f2aa7073040964389b941d5c115bbe&w=996"
            alt="Third slide"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h1 className='text-center text-white font-semibold text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-loose'>
              Des créations uniques, façonnées avec passion
            </h1>
          </div>
        </div>
      </Carousel>
    </section>
  );
}

export default CarouselBanner;
