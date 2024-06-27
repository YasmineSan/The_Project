import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';

const FavoritePage = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  useEffect(() => {
    const fetchFavoriteArticles = async () => {
      try {
        const response = await fetch('https://4.233.138.141:3001/api/favorites', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFavoriteArticles(data);
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
    <div className="min-h-screen pb-16 bg-slate-100 pt-14 sm:pt-20">
      <div className='container mx-auto px-4 py-8'>
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 mt-2">Favoris</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteArticles.length > 0 ? (
            favoriteArticles.map(article => (
              <FavoriteCard
                key={article.article_id}
                id={article.article_id}
                image={article.article_photo}
                title={article.article_title}
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
