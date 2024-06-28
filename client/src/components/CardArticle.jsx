import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const CardArticle = ({ id, image, title, price }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const number = 1;
    if (isAuthenticated) {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }, 
          body: JSON.stringify({ "articleId": id, "quantity": number })
        });

        if (response.ok) {
          setNotificationMessage('Article ajouté au panier !');
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            window.location.href = '/cart';
          }, 2000);  // Redirection après 2 secondes
        } else {
          console.error('Erreur lors de l\'ajout au panier', response.statusText);
        }
      } catch (error) {
        console.error('Erreur réseau lors de l\'ajout au panier', error);
      }
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="transform transition duration-300 hover:scale-105 bg-white">
      <div className="border rounded-lg overflow-hidden shadow-lg h-70 flex flex-col justify-center items-center text-center">
        <NavLink to={`/articles/${id}`} className="w-full h-full flex flex-col justify-center items-center">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="pt-3 flex flex-col items-center">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-base text-gray-700">{price} €</p>
          </div>
        </NavLink>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <button 
            onClick={handleAddToCart} 
            className="py-2 mb-4 px-4 bg-gold text-white rounded-full flex items-center border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold duration-300"
          >
            <FiShoppingCart className="mr-3" />
            Acheter
          </button>
        </div>
      </div>
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default CardArticle;
