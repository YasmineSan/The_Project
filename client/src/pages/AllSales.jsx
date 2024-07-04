import React from 'react';

const AllSales = () => {
  const sales = [
    {
      id: 1,
      imageUrl: 'katana.jpg',
      title: 'Katana',
      price: '500€',
      description: `Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique : équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale, revenu précis à température électronique contrôlée.`,
      Username: 'User12345',
      FirstName: 'Aimar',
      LastName: 'Jean',
      purchaseDate: new Date().toLocaleDateString('fr-FR'), // Date d'achat avec la date du jour
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
      purchaseDate: new Date().toLocaleDateString('fr-FR'), // Date d'achat avec la date du jour
      address: 'Rue des artisans 20, 5000 Namur'
    },
  ];

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Mes ventes</h2>
      {sales.map(sale => (
        <div key={sale.id} className="bg-white p-4 mb-6 mx-8 sm:mx-32 lg:mx-0 rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            <img src={sale.imageUrl} alt={`Image de ${sale.title}`} className="w-full lg:w-64 h-auto object-cover rounded-lg mb-4 lg:mb-0" />
            <div className="text-center lg:text-left lg:ml-8 flex-1 mb-2">
              <h3 className="text-lg font-semibold">{sale.title}</h3>
              <p className="text-lg font-semibold text-gold">{sale.price}</p>
              <p className="text-gray-600 mb-2">{sale.description}</p>
            </div>
            <div className="lg:w-1/3 ml-8 lg:ml-12 self-start">
              <p className="text-gray-700 mb-2"><span className="font-semibold">Acheté par :</span> {sale.Username}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Nom :</span> {sale.LastName}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Prénom :</span> {sale.FirstName}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Date d'achat :</span> {sale.purchaseDate}</p>
              <p className="text-gray-700 mb-2"><span className="font-semibold">Adresse :</span> {sale.address}</p>
              <button className="mt-4 bg-gold text-white py-2 px-4 rounded-full shadow-md border border-gold hover:bg-white hover:text-gold hover:border-gold transition-all duration-300">
                Contacter le vendeur
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllSales;