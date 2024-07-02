import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Comment from '../components/Comment';


const CommentPage = () => {
  const { sellerId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [seller, setSeller] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://4.233.138.141:3001/api/comments/seller/${sellerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchSeller = async () => {
      try {
        const response = await fetch(`http://4.233.138.141:3001/api/users/${sellerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch seller profile');
        }
        const sellerData = await response.json();
        setSeller(sellerData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (sellerId) {
      fetchComments();
      fetchSeller();
    }
  }, [sellerId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://4.233.138.141:3001/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          sellerId,
          content: newComment,
          rating
        })
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        throw new Error('Failed to submit comment');
      }
      setNewComment('');
      setRating(0);
      fetchComments(); // Re-fetch comments after submission
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  const validAverageRating = isNaN(averageRating) || averageRating < 0 ? 0 : averageRating;
  const formattedAverageRating = validAverageRating.toFixed(1);

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 bg-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Commentaires de {seller.username}</h2>
        <Link to={`/profile/${sellerId}`} className="text-gold hover:underline">Retour au profil</Link>
      </div>
      <div className="flex items-center mb-4">
        <h3 className="text-lg mr-2">Note globale :</h3>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(Math.floor(validAverageRating))].map((_, index) => (
              <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                <path d="M10 1l2.1 6.4H18l-5.3 3.9 2.1 6.4-5.5-4-5.5 4 2.1-6.4L2 7.4h5.9L10 1z" />
              </svg>
            ))}
          </div>
          <span className="ml-2">{formattedAverageRating} ({comments.length} avis)</span>
        </div>
      </div>
      <div>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            user={comment.user}
            profileImage={comment.profileImage}
            rating={comment.rating}
            date={comment.date}
            content={comment.content}
          />
        ))}
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

export default CommentPage;








// import React from 'react';
// import { Link } from 'react-router-dom';

// import Comment from '../components/Comment'

// const CommentPage = () => {
  
//   const comments = [
//     {
//       id: 1,
//       user: 'Alice',
//       profileImage: 'https://picsum.photos/id/237/200/300',
//       rating: 4,
//       date: '1er juin 2024',
//       content: 'Très bon vendeur, produit conforme à la description.'
//     },
//     {
//       id: 2,
//       user: 'Bob',
//       profileImage: 'https://picsum.photos/id/237/200/300',
//       rating: 5,
//       date: '5 juin 2024',
//       content: 'Service client impeccable, je recommande !'
//     },
//     {
//       id: 3,
//       user: 'Claire',
//       profileImage: 'https://picsum.photos/id/237/200/300',
//       rating: 3,
//       date: '10 juin 2024',
//       content: 'Livraison un peu lente mais produit de qualité.'
//     },
//   ];

//   // Calcul de la note globale moyenne
//   const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
//   const formattedAverageRating = averageRating.toFixed(1); 

//   return (
//     <div className="container mx-auto px-4 pt-28 pb-8 bg-slate-100">
//       {/* Titre et lien retour */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-semibold">Commentaires</h2>
//         <Link to="/user" className="text-gold hover:underline">Retour au profil</Link>
//       </div>

//       {/* Note globale et étoiles */}
//       <div className="flex items-center mb-4">
//         <h3 className="text-lg mr-2">Note globale :</h3>
//         <div className="flex items-center">
//           {/* Affichage des étoiles (à adapter selon le besoin) */}
//           <div className="flex">
//             {[...Array(Math.round(averageRating))].map((_, index) => (
//               <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
//                 <path d="M10 1l2.1 6.4H18l-5.3 3.9 2.1 6.4-5.5-4-5.5 4 2.1-6.4L2 7.4h5.9L10 1z" />
//               </svg>
//             ))}
//           </div>
//           <span className="ml-2">{formattedAverageRating} ({comments.length} avis)</span>
//         </div>
//       </div>

//       {/* Affichage des commentaires */}
//       <div>
//         {comments.map(comment => (
//           <Comment
//             key={comment.id}
//             user={comment.user}
//             profileImage={comment.profileImage}
//             rating={comment.rating}
//             date={comment.date}
//             content={comment.content}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentPage;