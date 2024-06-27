import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import CardArticle from '../components/CardArticle';

const SingleArticlePage = () => {
  const [article, setArticle] = useState({});
  const [otherArticles, setOtherArticles] = useState([]);
  const [user, setUser] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { articleId } = useParams();

  useEffect(() => {
    const fetchOneArticle = async () => {
      try {
        const response = await fetch(`http://4.233.138.141:3001/api/articles/articles/${articleId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setArticle(data);

        // Fetch other articles by the same user
        if (data.user_id) {
          await fetchArticles(data.user_id);
          // Fetch user info
          await fetchUser(data.user_id);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const fetchArticles = async (userId) => {
      try {
        const response = await fetch(`http://4.233.138.141:3001/api/articles/user/${userId}/articles`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOtherArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const response = await fetch(`http://4.233.138.141:3001/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOneArticle();
  }, [articleId]);

  const handleAddToCart = async () => {
    const number = 1;
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (isAuthenticated) {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({ id: articleId, number })
        });

        if (response.ok) {
          setNotificationMessage('Article ajouté au panier !');
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
            window.location.href = '/cart';
          }, 2000); // Redirection après 2 secondes
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

  const handleAddToFavorites = async () => {
    try {
      const response = await fetch('http://4.233.138.141:3001/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ articleId })
      });

      if (response.ok) {
        setNotificationMessage('Article ajouté aux favoris !');
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000); // Notification visible pendant 2 secondes
      } else {
        console.error('Erreur lors de l\'ajout aux favoris', response.statusText);
      }
    } catch (error) {
      console.error('Erreur réseau lors de l\'ajout aux favoris', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-10">
      <div className="max-w-[80%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 min-h-20">
            <img 
              src={article.article_photo}
              alt={article.article_title}
              className="rounded-lg mb-4 lg:mb-0 object-cover"
            />
          </div>
          
          <div className="flex flex-col flex-1 lg:ml-10 justify-around">
            <div>
              <div className="flex items-center mb-4">
                <NavLink to={`/userProfile/${user.user_id}`}>
                  <img 
                    src={user.profile_image} 
                    alt="Utilisateur" 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                </NavLink>
                <NavLink to={`/userProfile/:${user.user_id}`}>
                  <span className="font-semibold hover:text-gold hover:underline">{user.username}</span>
                </NavLink>
              </div>
              <h1 className="text-2xl font-semibold mb-2">{article.title}</h1>
              <p className="text-xl text-gold mb-4">{article.article_price} €</p>
              <p className="mb-6">
                {article.article_description}
              </p>
              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
                <button 
                  onClick={handleAddToFavorites} 
                  className="flex-1 bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300"
                >
                  <span className="mr-2"><FiHeart /></span> Ajouter aux favoris
                </button>
                <button 
                  onClick={handleAddToCart} 
                  className="flex-1 bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300"
                >
                  <span className="mr-2"><MdAddShoppingCart /></span> Ajouter au panier
                </button>
              </div>
              <div className="text-sm text-gray-500 flex flex-col lg:flex-row justify-between">
                <span className="mb-2">Expédié depuis : <span className="font-semibold">{user.city}</span></span>
                <span>Date d'ajout : <span className="font-semibold">{new Date(article.date_added).toLocaleDateString()}</span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <NavLink to="/articles" className="text-gold hover:underline">Retour aux articles</NavLink>
        </div>
      </div>

      <div className="pt-10 mx-auto max-w-[80%] pb-10">
        <h2 className="text-2xl font-medium mb-6">Autres articles de cette boutique</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {otherArticles.length > 0 ? (
            otherArticles.map((article, i) => (
              <CardArticle
                key={i}
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

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded">
          {notificationMessage}
        </div>
      )}
    </div>
  );
};

export default SingleArticlePage;
