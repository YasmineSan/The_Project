import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const CardArticle = ({ id, image, title, price, isFav}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleAddToCart = (e) => {

    e.stopPropagation();
    if (isAuthenticated) {
      onAddToCart(id);
    } else {
      window.location.href = '/login';
    }
  };

  const onAddToCart = (id) => {
    console.log(`Ajouter l'article ${id} au panier`);
    //Logique pour ajouter au panier
  };


  return (
    <div className="transform transition duration-300 hover:scale-105">
      <div className="border rounded-lg overflow-hidden shadow-lg h-70 flex flex-col justify-center items-center text-center">
        <NavLink to={`/article/${id}`} className="w-full h-full flex flex-col justify-center items-center">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="pt-3 flex flex-col items-center">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-base text-gray-700">{price} €</p>
          </div>
        </NavLink>
        <div className="flex items-center justify-center mt-2">
          <button 
            onClick={handleAddToCart} 
            className="py-2 mb-4 px-4 bg-gold text-white rounded-full flex items-center hover:bg-white hover:text-gold hover:border hover:border-gold"
          >
            <FiShoppingCart className="mr-3" />
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardArticle;
