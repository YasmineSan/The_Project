import React, { useState } from 'react';

const OrderPage = () => {
  const orders = [
    {
      id: 1,
      imageUrl: 'katana.jpg',
      title: 'Katana',
      price: '500€',
      description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
      Username: 'User12345',
      FirstName: 'Aimar',
      LastName: 'Jean',
      purchaseDate: new Date().toLocaleDateString('fr-FR'),
      address: 'Rue des artisans 10, 4000 Liège'
    },
    {
      id: 2,
      imageUrl: 'katana.jpg',
      title: 'Katana',
      price: '500€',
      description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
      Username: 'User67890',
      FirstName: 'Doe',
      LastName: 'John',
      purchaseDate: new Date().toLocaleDateString('fr-FR'),
      address: 'Rue des artisans 20, 5000 Namur'
    },
    {
        id: 1,
        imageUrl: 'katana.jpg',
        title: 'Katana',
        price: '500€',
        description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
        Username: 'User12345',
        FirstName: 'Aimar',
        LastName: 'Jean',
        purchaseDate: new Date().toLocaleDateString('fr-FR'),
        address: 'Rue des artisans 10, 4000 Liège'
      },
  ];

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (id) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Mes commandes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
            <img src={order.imageUrl} alt={`Image de ${order.title}`} className="w-full h-48 object-cover rounded-lg mb-4" />
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-semibold">{order.title}</h3>
              <p className="text-lg font-semibold text-gold mb-2">{order.price}</p>
              <p className="text-gray-600 flex-1">
                {expandedDescriptions[order.id]
                  ? order.description
                  : truncateText(order.description, 100)}
                <button
                  className="text-gold ml-2"
                  onClick={() => toggleDescription(order.id)}
                >
                  {expandedDescriptions[order.id] ? 'Voir moins' : 'Voir plus'}
                </button>
              </p>
              <div className="mt-4">
                <p className="text-gray-700 mb-2"><span className="font-semibold">Vendu par :</span> {order.Username}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Nom :</span> {order.LastName}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Prénom :</span> {order.FirstName}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Date d'achat :</span> {order.purchaseDate}</p>
                <p className="text-gray-700 mb-2"><span className="font-semibold">Adresse :</span> {order.address}</p>
              </div>
            </div>
            <button className="mt-4 bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border-gold transition-all duration-300">
              Contacter le vendeur
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;