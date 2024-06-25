import React from 'react';
import { FiHeart } from "react-icons/fi";

const SingleArticlePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="flex flex-col md:flex-row">
          <img src="katana.jpg" alt="Article" className="w-full md:w-1/2 rounded-lg mb-4 md:mb-0" />
          <div className="md:ml-6 flex-grow">
            <div className="flex items-center mb-4">
              <img src="https://picsum.photos/200/300?grayscale" alt="Utilisateur" className="w-12 h-12 rounded-full mr-4" />
              <span className="font-bold">Jean</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">Katana</h1>
            <p className="text-xl text-gold mb-4">599€</p>
            <p className="mb-6">
              Acier à haute teneur en manganèse 65, avec ou sans bohi. Nakago bien formé Traitement thermique :
              équipement moderne et professionnel pour un chauffage globalement uniforme et une trempe à l'huile spéciale,
              revenu précis à température électronique contrôlée.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
              <button className="bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                <span className="mr-2"><FiHeart /></span> Ajouter aux favoris
              </button>
              <button className="bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                <span className="mr-2">🛒</span> Ajouter au panier
              </button>
            </div>
            <div className="text-sm text-gray-500 flex flex-col md:flex-row justify-between">
              <span>Expédié depuis : Liège</span>
              <span>Date d'ajout : 10/06/24</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <a href="/profile" className="text-gold hover:underline">Retour au profil</a>
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;