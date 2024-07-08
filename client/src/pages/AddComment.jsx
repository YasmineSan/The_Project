import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AddComment = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [seller, setSeller] = useState({});
  const [rating, setRating] = useState(0);


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://4.233.138.141:3001/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          evaluation_number: rating,
          evaluation_description: newComment,
          user_id: 8
        })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        throw new Error('Failed to submit comment');
      }

  

      setNewComment('');
      setRating(0);
      
      navigate(`/allEvaluation/${sellerId}`); 

      // navigate(`/allEvaluation/${sellerId}`); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Commentaires de cette boutique {seller.username}</h2>
        <Link to={`/userProfile`} className="text-gold hover:underline">Retour au profil</Link>
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Laisser un commentaire</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Écrire un commentaire..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          rows="4"
        />
        <div className="flex items-center mb-4">
          <label htmlFor="rating" className="mr-2">Note :</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 w-16"
            min="0"
            max="5"
          />
        </div>
        <button type="submit" className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300">
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default AddComment;








