import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders/user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const parsedOrders = data.map(order => {
          if (order.article_details) {
            try {
              order.article_details = JSON.parse(order.article_details);
            } catch (e) {
              console.error('Failed to parse article_details:', e);
              order.article_details = [];
            }
          } else {
            order.article_details = [];
          }
          return order;
        });
        setOrders(parsedOrders); // Mettre à jour les commandes récupérées depuis le backend
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        setError('Erreur lors de la récupération des commandes');
      }
    };

    fetchOrders(); // Appeler la fonction pour récupérer les commandes lors du chargement initial
  }, []); 

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options); 
  };

  return (
    <div className="min-h-screen w-full px-4 pt-28 pb-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Mes commandes</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => {
              console.log(order);

              return (
                <div key={order.order_id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-lg font-semibold text-gold">{order.total_price} €</p>
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="mt-4">
                      <img src={order.article_details.article_photo} />
                      {order.article_details[0] && (
                        <>
                            <span className="font-semibold text-gray-700 mb-2">Description :</span> 
                            {expandedDescriptions[order.order_id]
                              ? order.article_details[0].description
                              : order.article_details[0].description.slice(0, 100) + (order.article_details[0].description.length > 100 ? '...' : '')}
                            {order.article_details[0].description.length > 100 && (
                              <button
                                className="text-gold ml-2"
                                onClick={() => toggleDescription(order.order_id)}
                              >
                                {expandedDescriptions[order.order_id] ? 'Voir moins' : 'Voir plus'}
                              </button>
                            )}
                          <p className="text-gray-700 mb-2"><span className="font-semibold">Titre :</span> {order.article_details[0].title}</p>
                          <p className="text-gray-700 mb-2"><span className="font-semibold">Prix :</span> {order.article_details[0].price} €</p>
                        </>
                      )}
                      <p className="text-gray-700 mb-2"><span className="font-semibold">Vendu par :</span> {order.username}</p>
                      <p className="text-gray-700 mb-2"><span className="font-semibold">Nom :</span> {order.last_name}</p>
                      <p className="text-gray-700 mb-2"><span className="font-semibold">Prénom :</span> {order.first_name}</p>
                      <p className="text-gray-700 mb-2"><span className="font-semibold">Date d'achat :</span> {formatDate(order.order_date)}</p>
                      <p className="text-gray-700 mb-2"><span className="font-semibold">Adresse :</span> {`${order.street_number}, ${order.street}, ${order.postal_code} ${order.city}`}</p>
                    </div>
                  </div>
                  <Link
                  to={`/contactUser/${order.user_id}`}
                  className="mt-4 bg-inherit text-gold py-2 px-4 rounded-full shadow-md border border-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 text-center"
                >
                  Contacter le vendeur
                </Link>
                  <Link
                  to={`/addEvaluation/:${order.user_id}`}
                  className="mt-4 bg-inherit text-gold py-2 px-4 rounded-full shadow-md border border-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 text-center"
                >
                  Evaluer le vendeur
                </Link>
                </div>
              );
            })
          ) : (
            <p>Aucune commande trouvée.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;


// import React, { useState } from 'react';

// const OrderPage = () => {
//   const orders = [
//     {
//       id: 1,
//       imageUrl: 'katana.jpg',
//       title: 'Katana',
//       price: '500€',
//       description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
//       Username: 'User12345',
//       FirstName: 'Aimar',
//       LastName: 'Jean',
//       purchaseDate: new Date().toLocaleDateString('fr-FR'),
//       address: 'Rue des artisans 10, 4000 Liège'
//     },
//     {
//       id: 2,
//       imageUrl: 'katana.jpg',
//       title: 'Katana',
//       price: '500€',
//       description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
//       Username: 'User67890',
//       FirstName: 'Doe',
//       LastName: 'John',
//       purchaseDate: new Date().toLocaleDateString('fr-FR'),
//       address: 'Rue des artisans 20, 5000 Namur'
//     },
//     {
//         id: 1,
//         imageUrl: 'katana.jpg',
//         title: 'Katana',
//         price: '500€',
//         description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
//         Username: 'User12345',
//         FirstName: 'Aimar',
//         LastName: 'Jean',
//         purchaseDate: new Date().toLocaleDateString('fr-FR'),
//         address: 'Rue des artisans 10, 4000 Liège'
//       },
//   ];

//   const truncateText = (text, maxLength) => {
//     if (text.length <= maxLength) {
//       return text;
//     }
//     return text.substring(0, maxLength) + '...';
//   };

//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   const toggleDescription = (id) => {
//     setExpandedDescriptions((prevState) => ({
//       ...prevState,
//       [id]: !prevState[id]
//     }));
//   };

//   return (
//     <div className="min-h-screen w-full px-4 pt-28 pb-8 bg-gray-100">
//       <h2 className="text-2xl font-semibold mb-6">Mes commandes</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {orders.map(order => (
//           <div key={order.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
//             <img src={order.imageUrl} alt={`Image de ${order.title}`} className="w-full h-48 object-cover rounded-lg mb-4" />
//             <div className="flex flex-col flex-1">
//               <h3 className="text-lg font-semibold">{order.title}</h3>
//               <p className="text-lg font-semibold text-gold mb-2">{order.price}</p>
//               <p className="text-gray-600 flex-1">
//                 {expandedDescriptions[order.id]
//                   ? order.description
//                   : truncateText(order.description, 100)}
//                 <button
//                   className="text-gold ml-2"
//                   onClick={() => toggleDescription(order.id)}
//                 >
//                   {expandedDescriptions[order.id] ? 'Voir moins' : 'Voir plus'}
//                 </button>
//               </p>
//               <div className="mt-4">
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Vendu par :</span> {order.Username}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Nom :</span> {order.LastName}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Prénom :</span> {order.FirstName}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Date d'achat :</span> {order.purchaseDate}</p>
//                 <p className="text-gray-700 mb-2"><span className="font-semibold">Adresse :</span> {order.address}</p>
//               </div>
//             </div>
//             <button className="mt-4 bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border-gold transition-all duration-300">
//               Contacter le vendeur
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderPage;