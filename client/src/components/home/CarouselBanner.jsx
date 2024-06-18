import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export function CarouselBanner() {
  return (
    <Carousel autoPlay infiniteLoop dynamicHeight showThumbs={false} showStatus={false} swipeable showArrows={false}>
        <img
          className="w-100"
          src="https://picsum.photos/200/100"
          alt="First slide"
        />
        <img
          className="w-100"
          src="https://picsum.photos/200/100"
          alt="Second slide"
        />
    </Carousel>
    );
}


