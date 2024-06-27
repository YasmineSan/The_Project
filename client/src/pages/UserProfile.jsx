import React, { useState, useEffect } from 'react';
import { FiMail, FiMapPin, FiSettings } from 'react-icons/fi';
import CardArticle from '../components/CardArticle';
import { useParams, NavLink } from 'react-router-dom';


export const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
 
  useEffect(() => {
    
    if (userId) {// Si c'est un autre utilisateur

      const id = userId[1];

      const fetchOtherUserProfile = async () => {//Récupérer le profil de l'autre utilisateur
        try {
          const response = await fetch(`http://4.233.138.141:3001/api/users/${id}`, {
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

      const fetchOtherUserArticles = async () => {//Récupérer les articles d'un autre utilisateur'
        try {
          const response = await fetch(`http://4.233.138.141:3001/api/articles/user/${id}/articles`, {
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

    } else {// Si c'est l'utilisateur en cours

      const fetchCurrentUser = async () => {//Récupérer le profil de l'utilisateur en cours
        try {
          const response = await fetch(`http://4.233.138.141:3001/api/users/dashboard`, {
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

      const fetchUserArticles = async () => {//Récupérer les articles de l'utilisateur en cours
        try {
          const response = await fetch(`http://4.233.138.141:3001/api/users/${userId}`, {
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
  }, []);

  return (
    <main className="container mx-auto px-10 sm:px-12 py-36">
      <div className=" bg-white shadow-lg rounded-lg p-8 mb-12 lg:mx-28">
        <div className="flex flex-col sm:flex-row items-center">
          <img src={user.profile_image} alt="Profile" className="w-40 h-40 rounded-full object-cover mb-4 sm:mr-10 shadow-md" />
          <div className="flex-1 flex flex-col items-center sm:items-start">
            <div className="container flex flex-col sm:flex-row items-center justify-between">
              <div className='flex flex-col sm:items-start items-center'>
                <h1 className="text-3xl font-medium mb-2">{user.username}</h1>
                <p className="text-gray-500 mb-2 flex items-center">
                  <FiMapPin className="inline mr-2"/>
                  {user.city}</p>
              </div>
              <div className="text-right flex flex-col items-center sm:items-end mb-4">
                {/* <div className="flex items-center sm:justify-end mb">
                  <span className="text-yellow-400 ml-2">{'★'.repeat(Math.floor(10))}</span>
                  <span className="text-gray-400">{'★'.repeat(5 - Math.floor(10))}</span>
                </div> */}
                  <NavLink to="/comment" className="hover:underline text-gold">Toutes les évaluations</NavLink>
              </div>
            </div>
            
            <p className="text-gray-700 mb-8">{user.biography}</p>

            {userId ? (
              <button className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300 flex items-center">
                Contacter
                <FiMail className="ml-2" />
              </button>
            ) : (
              <NavLink to="/usersettings" className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300 flex items-center">
                Paramètres
                <FiSettings className="ml-2" />
              </NavLink>
            )}
            
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-medium mb-6">{articles.length} articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {articles.length > 0 ? (
            articles.map(article => (
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
      
    </main>
  );
};

export default UserProfile;
