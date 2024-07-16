import React, { useState, useEffect } from 'react';
import { FiMail, FiMapPin, FiSettings, FiPlus } from 'react-icons/fi';
import CardArticle from '../components/CardArticle';
import { useParams, Link, NavLink } from 'react-router-dom';

export const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 16;

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top

    if (userId) { // Si c'est un autre utilisateur

      const id = userId[1];

      const fetchOtherUserProfile = async () => { // Récupérer le profil de l'autre utilisateur
        try {
          const response = await fetch(`https://167.172.38.235:3001/api/users/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          } else {
            setUser(await response.json());
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchOtherUserProfile();

      const fetchOtherUserArticles = async () => { // Récupérer les articles d'un autre utilisateur
        try {
          const response = await fetch(`https://167.172.38.235:3001/api/articles/user/${id}/articles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setArticles(data);
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      }

      fetchOtherUserArticles();

    } else { // Si c'est l'utilisateur en cours

      const fetchCurrentUser = async () => { // Récupérer le profil de l'utilisateur en cours
        try {
          const response = await fetch(`https://167.172.38.235:3001/api/users/dashboard`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });

          if (response.ok) {
            setUser(await response.json());

          } else {
            console.log('Failed to fetch user profile');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchCurrentUser();

      const fetchUserArticles = async () => { // Récupérer les articles de l'utilisateur en cours
        try {
          const response = await fetch(`https://167.172.38.235:3001/api/articles/user/articles`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          });

          if (response.ok) {
            const data = await response.json()
            setArticles(data);

          } else {
            console.log('Failed to fetch user articles');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchUserArticles();

    }

  }, [userId]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className="w-full mx-auto px-10 sm:px-12 pt-36 pb-28 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 mx-auto md:max-w-[80%]">
        <div className="flex flex-col sm:flex-row items-center">
          <img src={user.profile_image} alt="Profile" className="w-40 h-40 rounded-full object-cover mb-4 sm:mr-10 shadow-md" />
          <div className="flex-1 flex flex-col items-center sm:items-start">
            <div className="container flex flex-col sm:flex-row items-center justify-between">
              <div className='flex flex-col sm:items-start items-center'>
                <h1 className="text-3xl font-medium mb-2">{user.username}</h1>
                <p className="text-gray-500 mb-2 flex items-center">
                  <FiMapPin className="inline mr-2" />
                  {user.city}</p>
              </div>
              <div className="text-right flex flex-col items-center sm:items-end mb-4">
                <Link
                  to={`/allEvaluation/${userId}`}
                  className="hover:underline text-gold duration-300"
                >
                  Toutes les évaluations
                </Link>
              </div>
            </div>

            <p className="text-gray-700 mb-8">{user.biography}</p>

            {userId ? (
              <NavLink to={`/contactUser/${user.user_id}`} className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300 flex items-center">
                Contacter
                <FiMail className="ml-2" />
              </NavLink>
            ) : (
              <NavLink to="/usersettings" className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300 flex items-center">
                Paramètres
                <FiSettings className="ml-2" />
              </NavLink>
            )}

          </div>
        </div>
      </div>

      <div className='mx-auto max-w-[90%]'>
        <h2 className="text-2xl font-medium mb-6">{articles.length} articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {!userId && (
            <NavLink to={`/addArticle`} className="transform transition duration-300 hover:scale-105 cursor-pointer bg-white rounded-lg border-4 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-6 shadow-lg hover:bg-gray-100">
              <div className="flex items-center justify-center text-gold mb-4">
                <FiPlus className="text-6xl transition duration-300 transform hover:rotate-90" />
              </div>
              <div className="text-lg font-medium text-gray-700">
                Créer un article
              </div>
            </NavLink>
          )}
          {currentArticles.length > 0 ? (
            currentArticles.map(article => (
              <CardArticle
                key={article.article_id}
                id={article.article_id}
                image={article.article_photo}
                title={article.title}
                price={article.article_price}
              />
            ))
          ) : (
            <p className="text-gray-500">Pas d'articles à afficher</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="mx-2 px-4 py-2 bg-gray-300 rounded"
        >
          Précédent
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-gold text-white' : 'bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="mx-2 px-4 py-2 bg-gray-300 rounded"
        >
          Suivant
        </button>
      </div>
    </main>
  );
};

export default UserProfile;
