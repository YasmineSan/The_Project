import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Comment from '../components/Comment';

const ShowComment = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const { sellerId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      const id = sellerId[1];
      try {
        const response = await fetch(`https://craftify-ekc4.onrender.com/api/evaluations/${id}`, {
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

    fetchComments();
  }, []);

  const handleDeleteComment = async (id) => {
    try {
      const response = await fetch(`https://craftify-ekc4.onrender.com/api/evaluations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error response from server:', errorMessage);
        throw new Error('Failed to delete comment');
      }
      setComments((prevComments) => prevComments.filter(comment => comment.evaluation_id !== id));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const averageRating = comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length;
  const formattedAverageRating = averageRating.toFixed(1);

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 bg-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Commentaires</h2>
        <Link to="/userProfile" className="text-gold hover:underline">Retour au profil</Link>
      </div>
      <div className="flex items-center mb-4">
        <h3 className="text-lg mr-2">Note globale :</h3>
        <div className="flex items-center">
          <div className="flex">
            {/* {[...Array(Math.round(averageRating))].map((_, index) => (
              <svg key={index} xmlns="https://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                <path d="M10 1l2.1 6.4H18l-5.3 3.9 2.1 6.4-5.5-4-5.5 4 2.1-6.4L2 7.4h5.9L10 1z" />
              </svg>
            ))} */}
          </div>
          <span className="ml-2">{formattedAverageRating} ({comments.length} avis)</span>
        </div>
      </div>
      <div>
        {comments.map(comment => (
          <div key={comment.evaluation_id} className="mb-4">
            <Comment
              user={comment.user}
              profileImage={comment.profile_image}
              rating={comment.evaluation_number}
              date={comment.date_added}
              content={comment.evaluation_description}
            />
            <button onClick={() => handleDeleteComment(comment.evaluation_id)} className="text-red-500 hover:underline mt-2">Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowComment;



// import React from 'react';
// import { Link } from 'react-router-dom';

// import Comment from '../components/Comment'

// const ShowComment = () => {
  
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
//         <Link to="/userProfile" className="text-gold hover:underline">Retour au profil</Link>
//       </div>

//       {/* Note globale et étoiles */}
//       <div className="flex items-center mb-4">
//         <h3 className="text-lg mr-2">Note globale :</h3>
//         <div className="flex items-center">
//           {/* Affichage des étoiles (à adapter selon le besoin) */}
//           <div className="flex">
//             {[...Array(Math.round(averageRating))].map((_, index) => (
//               <svg key={index} xmlns="https://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
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

// export default ShowComment;