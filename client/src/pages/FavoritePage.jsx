import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';

const FavoritePage = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
    const fetchFavoriteArticles = async () => {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/favorites/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        setFavoriteArticles(await response.json());
      } catch (error) {
        console.error('Error fetching favorite articles:', error);
      }
    };

    fetchFavoriteArticles();
  }, []);

  const removeFromFavorites = (id) => {
    setFavoriteArticles(prevArticles => prevArticles.filter(article => article.id !== id));
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-100 pt-14 sm:pt-20 px-14">
      <div className='container mx-auto px-4 py-8'>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-12 mt-2">Favoris</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArticles.length > 0 ? (
            favoriteArticles.map(article => (
              <FavoriteCard
                key={article.article_id}
                id={article.article_id}
                image={article.article_photo}
                title={article.title}
                price={article.article_price}
                onRemoveFromFavorites={removeFromFavorites}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun article dans les favoris</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
