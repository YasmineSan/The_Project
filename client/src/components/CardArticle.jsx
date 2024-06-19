import React from 'react'
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const CardArticle = ({ id, image, title, price }) => {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Implémentez la logique pour ajouter au panier ici
    console.log(`Ajouter l'article ${id} au panier`);
  };

  return (
    <div className="transform transition duration-300 hover:scale-105">
      <NavLink to={`/article/${id}`} className="border rounded-lg overflow-hidden shadow-lg h-70 flex flex-col justify-center items-center text-center">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-3 flex flex-col items-center">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-base text-gray-700">{price}</p>
        </div>
        <button 
            onClick={handleAddToCart} 
            className="py-2 px-4 mb-5 bg-gold text-white rounded-full flex items-center hover:bg-white hover:text-gold hover:border hover:border-gold">
            <FiShoppingCart className="mr-3" />
            Acheter
        </button>
      </NavLink>
      
    </div>
  );
};

export default CardArticle;
