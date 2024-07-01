import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importer motion depuis framer-motion
import CardArticle from '../components/CardArticle';
import { FiMenu } from 'react-icons/fi';

const categories = ['Toutes', 5, 6, 15, 16, 17, 18, 19];

const AllArticles = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSearchArticles, setFilteredSearchArticles] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');

    if (category) {
      setSelectedCategory(parseInt(category));
    } else {
      setSelectedCategory('Toutes');
    }

    if (search) {
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
  }, [location]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/articles/public/articles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setArticles(data);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setMenuOpen(false); // Ferme le menu lors de la sélection d'une catégorie
    filterArticles(category, searchQuery); // Applique le filtrage dès que la catégorie est sélectionnée
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    filterArticles(selectedCategory, searchQuery);
  };

  const filterArticles = (category, query) => {
    const filtered = articles.filter(article => {
      const matchCategory = category === 'Toutes' || article.category_id === category;
      const matchSearch = query === '' || article.title.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });
    setFilteredSearchArticles(filtered);
  };

  const filteredArticles = searchQuery.trim() !== '' ? filteredSearchArticles : articles.filter(article => {
    const matchCategory = selectedCategory === 'Toutes' || article.category_id === selectedCategory;
    return matchCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-10">
      <div className="w-full max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-medium text-gold">Catégories</h2>
          <button onClick={toggleMenu} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <div className="md:flex">
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Animation initiale : menu transparent et légèrement décalé vers le haut
            animate={{ opacity: 1, y: 0 }} // Animation lorsque le menu est affiché : pleine opacité et position originale
            transition={{ duration: 0.3 }} // Durée de l'animation en secondes
            className={`md:w-1/4 bg-gray-200 p-4 rounded-lg ${menuOpen ? 'block' : 'hidden'} md:block`}
          >
            <h2 className="text-xl font-semibold mb-4 hidden md:block">Catégories</h2>
            <ul className="space-y-2 md:space-y-0 md:block">
              {categories.map((category, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: -10 }} // Animation initiale : élément transparent et légèrement décalé vers le haut
                  animate={{ opacity: 1, y: 0 }} // Animation lorsque l'élément est affiché : pleine opacité et position originale
                  transition={{ duration: 0.2, delay: i * 0.1 }} // Durée de l'animation en secondes, avec un délai progressif pour chaque élément
                  className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory === category ? 'bg-gold text-white' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <div className="md:w-3/4 p-4">
            <h2 className="text-2xl font-medium mb-4">Articles</h2>
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                placeholder="Rechercher par titre..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
              />
            </form>
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
