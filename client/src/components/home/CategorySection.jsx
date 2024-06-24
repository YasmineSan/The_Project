import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { NavLink } from 'react-router-dom';

export const CategorySection = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [ref, { width }] = useMeasure();
  const xTranslation = useRef(0);
  const controls = useAnimation();

  const categories = [
    { id: 1, name: 'Category 1', image: 'https://picsum.photos/300' },
    { id: 2, name: 'Category 2', image: 'https://picsum.photos/300' },
    { id: 3, name: 'Category 3', image: 'https://picsum.photos/300' },
    { id: 4, name: 'Category 4', image: 'https://picsum.photos/300' },
    { id: 5, name: 'Category 5', image: 'https://picsum.photos/300' },
    { id: 6, name: 'Category 6', image: 'https://picsum.photos/300' },
    { id: 7, name: 'Category 7', image: 'https://picsum.photos/300' },
    { id: 8, name: 'Category 8', image: 'https://picsum.photos/300' },
    { id: 9, name: 'Category 9', image: 'https://picsum.photos/300' },
    { id: 10, name: 'Category 10', image: 'https://picsum.photos/300' },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const nextCategory = () => {
    setCurrentCategory((prevIndex) => {
      const newIndex = prevIndex === totalPages - 1 ? 0 : prevIndex + 1;
      moveCategories(newIndex);
      return newIndex;
    });
  };

  const prevCategory = () => {
    setCurrentCategory((prevIndex) => {
      const newIndex = prevIndex === 0 ? totalPages - 1 : prevIndex - 1;
      moveCategories(newIndex);
      return newIndex;
    });
  };

  const moveCategories = (newIndex) => {
    xTranslation.current = -newIndex * width;
    controls.start({ x: xTranslation.current, transition: { duration: 0.3, type: 'tween', ease: 'linear' } });
  };

  return (
    <section className="container mx-auto py-20 px-12">
      <h2 className="text-2xl lg:text-3xl font-semibold mb-10 text-center">Catégories</h2>
      <div className="relative">
        <div className="flex overflow-hidden" ref={ref}>
          <motion.div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ width: `${100 * totalPages}%`, x: xTranslation.current }}
            animate={controls}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="flex-shrink-0 w-full flex">
                {categories.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((category) => (
                  <NavLink
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="w-1/3 p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="rounded-full w-25 h-25 overflow-hidden mb-2">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center mt-6 text-xl">{category.name}</p>
                  </NavLink>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
        <button onClick={prevCategory} className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2 bg-white rounded-full shadow-md">
          <FiChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
        <button onClick={nextCategory} className="absolute top-1/2 transform -translate-y-1/2 right-0 p-2 bg-white rounded-full shadow-md">
          <FiChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </section>
  );
};






// import React, { useState, useRef } from 'react';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// import { motion, useAnimation } from 'framer-motion';
// import useMeasure from 'react-use-measure';
// import { NavLink } from 'react-router-dom';

// export const CategorySection = () => {
//     const [currentCategory, setCurrentCategory] = useState(0);
//   const [ref, { width }] = useMeasure();
//   const xTranslation = useRef(0);
//   const controls = useAnimation();

//   const categories = [
//     { id: 1, name: 'Category 1', image: 'https://picsum.photos/300' },
//     { id: 2, name: 'Category 2', image: 'https://picsum.photos/300' },
//     { id: 3, name: 'Category 3', image: 'https://picsum.photos/300' },
//     { id: 4, name: 'Category 4', image: 'https://picsum.photos/300' },
//     { id: 5, name: 'Category 5', image: 'https://picsum.photos/300' },
//     { id: 6, name: 'Category 6', image: 'https://picsum.photos/300' },
//     { id: 7, name: 'Category 7', image: 'https://picsum.photos/300' },
//     { id: 8, name: 'Category 8', image: 'https://picsum.photos/300' },
//     { id: 9, name: 'Category 9', image: 'https://picsum.photos/300' },
//     { id: 10, name: 'Category 10', image: 'https://picsum.photos/300' },
//   ];

//   const itemsPerPage = 3;
//   const totalPages = Math.ceil(categories.length / itemsPerPage);

//   const nextCategory = () => {
//     setCurrentCategory((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
//     moveCategories(-width);
//   };

//   const prevCategory = () => {
//     setCurrentCategory((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
//     moveCategories(width);
//   };

//   const moveCategories = (distance) => {
//     xTranslation.current += distance;
//     controls.start({ x: xTranslation.current, transition: { duration: 0.3, type: 'tween', ease: 'linear' } });
//   };

//   return (
//     <section className="container mx-auto py-20 px-12">
//       <h2 className="text-2xl lg:text-3xl font-semibold mb-10 text-center">Catégories</h2>
//       <div className="relative">
//         <div className="flex overflow-hidden" ref={ref}>
//           <motion.div
//             className="flex transition-transform duration-300 ease-in-out"
//             style={{ width: `${100 * totalPages}%`, x: xTranslation.current }}
//             animate={controls}
//           >
//             {Array.from({ length: totalPages }).map((_, pageIndex) => (
//               <div key={pageIndex} className="flex-shrink-0 w-full flex">
//                 {categories.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((category) => (
//                   <NavLink
//                     key={category.id}
//                     to={`/categories/${category.id}`}
//                     className="w-1/3 p-4 flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
//                   >
//                     <div className="rounded-full w-25 h-25 overflow-hidden mb-2">
//                       <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
//                     </div>
//                     <p className="text-center mt-6 text-xl">{category.name}</p>
//                   </NavLink>
//                 ))}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//         <button onClick={prevCategory} className="absolute top-1/2 transform -translate-y-1/2 left-0 p-2 bg-white rounded-full shadow-md">
//           <FiChevronLeft className="h-6 w-6 text-gray-600" />
//         </button>
//         <button onClick={nextCategory} className="absolute top-1/2 transform -translate-y-1/2 right-0 p-2 bg-white rounded-full shadow-md">
//           <FiChevronRight className="h-6 w-6 text-gray-600" />
//         </button>
//       </div>
//     </section>
//     )
// }
