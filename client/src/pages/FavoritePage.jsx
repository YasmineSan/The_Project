
import React from 'react';
import FavoriteCard from '../components/FavoriteCard'; 

const FavoritePage = () => {
  
  const favoriteArticles = [
    {
      id: 1,
      title: 'Article 1',
      image: 'artisan-atelier.jpg',
      price: 50.99,
    },
    {
      id: 2,
      title: 'Article 2',
      image: 'artisan-atelier.jpg',
      price: 79.99,
    },
    {
        id: 3,
        title: 'Article 3',
        image: 'artisan-atelier.jpg',
        price: 79.99,
      },
      {
        id: 3,
        title: 'Article 4',
        image: 'artisan-atelier.jpg',
        price: 79.99,
      },
      {
        id: 3,
        title: 'Article 5',
        image: 'artisan-atelier.jpg',
        price: 79.99,
      },
    
  ];


  const removeFromFavorites = (id) => {
    console.log(`Retirer l'article ${id} des favoris`);
    
  };

  return (
    <div className="container mx-auto px-4 pt-4 pb-16">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:pt-28 pt-20">Favoris</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteArticles.map(article => (
          <FavoriteCard
            key={article.id}
            id={article.id}
            image={article.image}
            title={article.title}
            price={article.price}
            onRemoveFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;