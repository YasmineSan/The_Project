import React, { useState } from 'react';
import CardArticle from '../components/CardArticle';
import { FiMenu } from 'react-icons/fi';

const categories = ['Toutes', 'Bijoux', 'Céramique', 'Textiles', 'Peinture'];

const sampleArticles = [
  { article_id: 1, title: 'Collier en argent', category: 'Bijoux', article_photo: 'https://placeholderimage.eu/api', article_price: '50' },
  { article_id: 2, title: 'Vase en céramique', category: 'Céramique', article_photo: 'https://placeholderimage.eu/api/nature', article_price: '30' },
  { article_id: 3, title: 'Écharpe en laine', category: 'Textiles', article_photo: 'https://placeholderimage.eu/api', article_price: '25' },
  { article_id: 4, title: 'Tableau abstrait', category: 'Peinture', article_photo: 'https://placeholderimage.eu/api/nature', article_price: '100' },
  { article_id: 5, title: 'Boucles d\'oreilles', category: 'Bijoux', article_photo: 'https://placeholderimage.eu/api', article_price: '20' },
];

const AllArticles = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // Ferme le menu lors de la sélection d'une catégorie
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const filteredArticles = selectedCategory === 'Toutes'
    ? sampleArticles
    : sampleArticles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-10">
      <div className="w-full max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Catégories</h2>
          <button onClick={toggleMenu} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <div className="md:flex">
          <div className={`md:w-1/4 bg-gray-200 p-4 rounded-lg ${menuOpen ? 'block' : 'hidden'} md:block`}>
            <h2 className="text-xl font-bold mb-4 hidden md:block">Catégories</h2>
            <ul className="space-y-2 md:space-y-0 md:block">
              {categories.map((category) => (
                <li 
                  key={category}
                  className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory === category ? 'bg-gold text-white' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-3/4 p-4">
            <h2 className="text-2xl font-bold mb-4">Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <CardArticle
                    key={article.article_id}
                    id={article.article_id}
                    image={article.article_photo}
                    title={article.title}
                    price={article.article_price}
                  />
                ))
              ) : (
                <p>Aucun article trouvé dans cette catégorie.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;








// import React, { useState, useEffect } from 'react';
// import CardArticle from '../components/CardArticle';
// import { NavLink } from 'react-router-dom';

// const categories = ['Toutes', 'Bijoux', 'Céramique', 'Textiles', 'Peinture'];

// const AllArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('Toutes');
  
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await fetch('https://4.233.138.141:3001/api/articles', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setArticles(data);
        
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//       }
//     };

//     fetchArticles();
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//   };

//   const filteredArticles = selectedCategory === 'Toutes'
//     ? articles
//     : articles.filter(article => article.category === selectedCategory);

//   return (
//     <div className="min-h-screen bg-slate-100 pt-10 pb-10 flex">
//       <div className="w-full max-w-[80%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10 flex">
//         <div className="w-full md:w-1/4 bg-gray-200 p-4 rounded-lg">
//           <h2 className="text-xl font-bold mb-4">Catégories</h2>
//           <ul>
//             {categories.map((category) => (
//               <li 
//                 key={category}
//                 className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory === category ? 'bg-gold text-white' : 'text-gray-700'}`}
//                 onClick={() => handleCategoryClick(category)}
//               >
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="w-full md:w-3/4 p-4">
//           <h2 className="text-2xl font-bold mb-4">Articles</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredArticles.length > 0 ? (
//               filteredArticles.map((article) => (
//                 <CardArticle
//                   key={article.article_id}
//                   id={article.article_id}
//                   image={article.article_photo}
//                   title={article.title}
//                   price={article.article_price}
//                 />
//               ))
//             ) : (
//               <p>Aucun article trouvé dans cette catégorie.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllArticles;





















