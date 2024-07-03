import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardArticle from '../components/CardArticle';
import { FiMenu } from 'react-icons/fi';

const categories = ['Toutes', 5, 6, 15, 16, 17, 18];

const categoryMap = {
  5: 'Forge',
  6: 'Bois',
  15: 'Couture',
  16: 'Ebeniste',
  17: 'Forgeron',
  18: 'Artisan',
};

const AllArticles = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [menuOpen, setMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const search = params.get('search');

    if (category) {
      setSelectedCategory(categoryMap[parseInt(category)] || 'Toutes');
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
    setCurrentPage(1); // Reset to the first page when category changes
    setMenuOpen(false); // Ferme le menu lors de la sélection d'une catégorie
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const filteredArticles = articles.filter(article => {
    const matchCategory = selectedCategory === 'Toutes' || article.category_name === selectedCategory;
    const matchSearch = searchQuery === '' || article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-10 pb-10">
      <div className="w-full max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Catégories</h2>
          <button onClick={toggleMenu} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <div className="md:flex">
          <div className={`md:w-1/4 bg-gray-200 p-4 rounded-lg ${menuOpen ? 'block' : 'hidden'} md:block`}>
            <h2 className="text-xl font-semibold mb-4 hidden md:block">Catégories</h2>
            <ul className="space-y-2 md:space-y-0 md:block">
              {categories.map((category, i) => (
                <li 
                  key={i}
                  className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory === (categoryMap[category] || 'Toutes') ? 'bg-gold text-white' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick(categoryMap[category] || 'Toutes')}
                >
                  {categoryMap[category] || category}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-3/4 p-4">
            <h2 className="text-2xl font-normal mb-8">{filteredArticles.length} articles trouvés</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentArticles.length > 0 ? (
                currentArticles.map((article) => (
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
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mx-2 px-4 py-2 bg-gray-300 rounded"
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageClick(i + 1)}
                  className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-gold text-white' : 'bg-gray-300'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-2 px-4 py-2 bg-gray-300 rounded"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllArticles;
