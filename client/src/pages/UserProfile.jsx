import React, { useState, useEffect } from 'react';
import { FiMail, FiMapPin } from 'react-icons/fi';
import CardArticle from '../components/CardArticle';

export const UserProfile = (id) => {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);

  useEffect(() => {
  //   // Simuler une réponse de l'API avec des données fictives
  //   // const fakeUser = {
  //   //   username: 'john_doe',
  //   //   bio: 'Bonjour à toutes et à tous Je privilégie les envois par Mondial Relay. Les colis sont préparés, emballés avec soins et déposés rapidement 😉',
  //   //   location: 'Liège',
  //   //   profileImage: 'https://picsum.photos/100?random=1',
  //   //   rating: 4.5,
  //   //   reviewsLink: '#'
  //   // };

  //   // const fakeArticles = [
  //   //   {
  //   //     id: 1,
  //   //     image: 'https://picsum.photos/200/300?random=2',
  //   //     title: 'Article 1',
  //   //     description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
  //   //     price: 20.0,
  //   //     shipping: 5.0,
  //   //     sellerCity: 'Paris',
  //   //     quantity: 2
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     image: 'https://picsum.photos/200/300?random=3',
  //   //     title: 'Article 2',
  //   //     description: 'Description de l\'article 2.',
  //   //     price: 15.0,
  //   //     shipping: 3.0,
  //   //     sellerCity: 'Lyon',
  //   //     quantity: 1
  //   //   }, {
  //   //     id: 1,
  //   //     image: 'https://picsum.photos/200/300?random=4',
  //   //     title: 'Article 1',
  //   //     description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
  //   //     price: 20.0,
  //   //     shipping: 5.0,
  //   //     sellerCity: 'Paris',
  //   //     quantity: 2
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     image: 'https://picsum.photos/200/300?random=5',
  //   //     title: 'Article 2',
  //   //     description: 'Description de l\'article 2.',
  //   //     price: 15.0,
  //   //     shipping: 3.0,
  //   //     sellerCity: 'Lyon',
  //   //     quantity: 1
  //   //   },
  //   //   {
  //   //     id: 1,
  //   //     image: 'https://picsum.photos/200/300?random=6',
  //   //     title: 'Article 1',
  //   //     description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
  //   //     price: 20.0,
  //   //     shipping: 5.0,
  //   //     sellerCity: 'Paris',
  //   //     quantity: 2
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     image: 'https://picsum.photos/200/300?random=7',
  //   //     title: 'Article 2',
  //   //     description: 'Description de l\'article 2.',
  //   //     price: 15.0,
  //   //     shipping: 3.0,
  //   //     sellerCity: 'Lyon',
  //   //     quantity: 1
  //   //   },
  //   //   {
  //   //     id: 1,
  //   //     image: 'https://picsum.photos/200/300?random=8',
  //   //     title: 'Article 1',
  //   //     description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
  //   //     price: 20.0,
  //   //     shipping: 5.0,
  //   //     sellerCity: 'Paris',
  //   //     quantity: 2
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     image: 'https://picsum.photos/200/300?random=9',
  //   //     title: 'Article 2',
  //   //     description: 'Description de l\'article 2.',
  //   //     price: 15.0,
  //   //     shipping: 3.0,
  //   //     sellerCity: 'Lyon',
  //   //     quantity: 1
  //   //   },{
  //   //     id: 1,
  //   //     image: 'https://picsum.photos/200/300?random=10',
  //   //     title: 'Article 1',
  //   //     description: 'Description de l\'article 1 qui est assez longue pour être coupée...',
  //   //     price: 20.0,
  //   //     shipping: 5.0,
  //   //     sellerCity: 'Paris',
  //   //     quantity: 2
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     image: 'https://picsum.photos/200/300?random=11',
  //   //     title: 'Article 2',
  //   //     description: 'Description de l\'article 2.',
  //   //     price: 15.0,
  //   //     shipping: 3.0,
  //   //     sellerCity: 'Lyon',
  //   //     quantity: 1
  //   //   }
  //   // ];

  //   // setUser(fakeUser);
  //   // setArticles(fakeArticles);
  //   // setLoading(false);
  //   if (id) {

  //     // const fetchUserProfile = async () => {
  //     //   try {
  //     //     const response = await fetch(`https://4.233.138.141:3001/api/users/:${id}`, {
  //     //       method: 'GET',
  //     //       headers: {
  //     //         'Content-Type': 'application/json',
  //     //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //     //       }
  //     //     });

  //     //     if (!response.ok) {
  //     //       throw new Error('Failed to fetch user profile');
  //     //     } else {
  //     //       setUser(await response.json());
  //     //     }

  //     //     setLoading(false);
  //     //   } catch (error) {
  //     //     console.error('Error:', error);
  //     //     setLoading(false);
  //     //   }
  //     // };

  //     // fetchUserProfile();
    // } else {

      const fetchUser = async () => {
        try {
        const response = await fetch(`https://4.233.138.141:3001/api/users/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }})
        
        console.log(response)
        if (response.ok) {
            setUser(await response.json());
            console.log(user)
        } else {
            alert('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error:', error);
      }}

      fetchUser();
      
    
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
                 <a href='#' className="hover:underline text-gold">Toutes les évaluations</a> {/*Logique à faire */}
              </div>
            </div>
            
            <p className="text-gray-700 mb-8">{user.biography}</p>
            <button className="bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold transition-all duration-300 flex items-center">
              Contacter
              <FiMail className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium mb-6">{articles.length} articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {articles.length > 0 ? (
            articles.map(article => (
              <CardArticle
                key={article.id}
                id={article.id}
                image={article.image}
                title={article.title}
                price={article.price}
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
