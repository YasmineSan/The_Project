import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoHeartDislikeOutline } from 'react-icons/io5';

const FavoriteCard = ({ id, image, title, price, onRemoveFromFavorites }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRemoveClick = async () => {
    try {
      const response = await fetch(`http://4.233.138.141:3001/api/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } else {
        window.location.assign('/favorites');
      }

      
    } catch (error) {
      console.error('Error removing favorite article:', error);
    }
  };

  return (
    <div className="transform transition duration-300 hover:scale-105 bg-white rounded-lg">
      <div className="border rounded-lg overflow-hidden shadow-lg h-70 flex flex-col justify-center items-center text-center px-4 py-4">
        <NavLink to={`/articles/${id}`} className="w-full h-full flex flex-col justify-center items-center"> 
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="pt-3 flex flex-col items-center">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-base text-gold">{price} €</p>
          </div>
        </NavLink>
        <div className="flex items-center justify-center mt-2">
          <button 
            onClick={handleRemoveClick} 
            className="py-2 px-4 bg-inherit text-gold rounded-full border border-gold flex items-center hover:bg-gold hover:text-white hover:border duration-300 "
          >
            <IoHeartDislikeOutline className="mr-2 h-6 w-6" />
            Retirer des favoris
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
