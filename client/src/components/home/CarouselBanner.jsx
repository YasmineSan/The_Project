import React from 'react'
import { Carousel } from "@material-tailwind/react";



const CarouselBanner = () => {
  // Exemple de contenu statique pour le carousel
  const carouselItems = [
    { id: 1, image: 'https://picsum.photos/seed/picsum/200/200', caption: 'Première image' },
    { id: 2, image: 'https://picsum.photos/seed/picsum/200/200', caption: 'Deuxième image' },
    { id: 3, image: 'https://picsum.photos/200/200/?blur', caption: 'Troisième image' },
  ];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div className="relative w-full overflow-hidden">
          <div className="flex">
            {carouselItems.map(item => (
              <div key={item.id} className="w-full">
                <img src={item.image} alt={item.caption} className="w-full h-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselBanner;



// const CarouselBanner = () => {
//   return (
//     <Carousel className="rounded-xl">
//       <img
//         src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//         alt="image 1"
//         className="h-full w-full object-cover"
//       />
//       <img
//         src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//         alt="image 2"
//         className="h-full w-full object-cover"
//       />
//       <img
//         src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//         alt="image 3"
//         className="h-full w-full object-cover"
//       />
//     </Carousel>
//   );
// };

// export default CarouselBanner;


