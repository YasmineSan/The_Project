import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const AddComment = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const id = sellerId[1]
    try {
      const response = await fetch('https://167.172.38.235:3001/api/evaluations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          evaluation_number: rating,
          evaluation_description: newComment,
          user_id: id
        })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        setError('Erreur, commentaire non soumis');
        setNewComment('');
        setRating(0);
        throw new Error('Failed to submit comment');
        
      } else {
        setSuccess('Commentaire ajouté!');
        setTimeout(() => {
            navigate(`/allEvaluation/${sellerId}`);
          }, 2000);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <main className="min-h-screen w-full mx-auto px-4 bg-gray-100 flex justify-center items-center">
      <div className='w-4/5 bg-white shadow-lg rounded-lg p-8'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Evaluez cet utilisateur</h2>
          <NavLink to={`/userprofile/${sellerId}`} className="text-gold hover:underline">Retour au profil</NavLink>
        </div>
        <form onSubmit={handleCommentSubmit} className="mt-8">
          <h3 className="text-lg font-medium mb-4">Commentaire</h3>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire..."
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            rows="4"
          />
          <div className="flex items-center mb-6">
            <label htmlFor="rating" className="mr-2 font-medium">Note :</label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-16"
              min="1"
              max="5"
              required
            />
          </div>
          {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
          <button type="submit" className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300">
            Soumettre
          </button>
        </form>
      </div>
      
    </main>
  );
};

export default AddComment;






