import React from 'react';

const generateStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 15l-5.5 3 1-5.8L0 7.6l5.8-.8L10 2l2.2 4.8 5.8.8-4.3 4.6 1 5.8L10 15z" />
      </svg>
    );
  }
  return stars;
};

const Comment = ({ user, profileImage, rating, date, content }) => {
  return (
    <div className="flex mb-8 border p-4 rounded-2xl bg-white shadow-lg ">
      <div className="mr-4 flex flex-col items-center">
        <img src={profileImage} alt={`Profile de ${user}`} className="w-12 h-12 rounded-full" />
        <div className="text-center mt-2">
          <p>{user}</p>
          <div className="flex justify-center mt-1">
            {generateStars(rating)}
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2">{content}</p>
        <p className="text-gray-500 text-sm">{date}</p>
      </div>
    </div>
  );
};

export default Comment;