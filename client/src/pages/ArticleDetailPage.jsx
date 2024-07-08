import React, { useState } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const ArticleDetailPage = () => {
  const location = useLocation();
  const { state } = location;
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
    category: false,
    price: false,
    shippingCost: false
  });
  const { image, title, description, category, price, shippingCost } = state || {};

  if (!state) {
    return <div>Aucune donnée disponible. Veuillez soumettre le formulaire d'abord.</div>;
  }

  const handleEditField = (fieldName) => {
    setEditableFields(prevState => ({
      ...prevState,
      [fieldName]: true
    }));
  };

  const handleSaveField = (fieldName) => {
    // ajouter la logique pour sauvegarder les modifications
    // Par exemple, envoyer une requête PATCH au backend pour mettre à jour l'article

    // Une fois les modifications sauvegardées, désactivez le mode d'édition
    setEditableFields(prevState => ({
      ...prevState,
      [fieldName]: false
    }));
  };

  return (
    <main className="bg-slate-100 min-h-screen w-full flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 mb-8 w-11/12 md:w-3/4 lg:w-4/5">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-3xl font-semibold text-center py-4">Détails de l'article</h1>
        </div>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex justify-center md:w-4/12">
            <img src={image} alt="Article" className="w-full h-auto md:h-full rounded-lg shadow-md object-cover" />
          </div>
          <div className="space-y-4 md:w-1/2">
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold w-1/3">Titre :</h2>
                <div className="w-2/3 flex items-center">
                  {editableFields.title ? (
                    <>
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-gold ml-2 text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
                        onClick={() => handleSaveField('title')}
                      >
                        Sauvegarder
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{title}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('title')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.707 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.32.222l-3.418.855a.5.5 0 0 1-.627-.627l.855-3.418a1 1 0 0 1 .222-.32l9-9z" />
                          <path fillRule="evenodd" d="M13.5 6.793l-9 9 1.414 1.414 9-9-1.414-1.414z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold w-1/3">Description :</h2>
                <div className="w-2/3 flex items-center">
                  {editableFields.description ? (
                    <>
                      <textarea
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-gold ml-2 text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
                        onClick={() => handleSaveField('description')}
                      >
                        Sauvegarder
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{description}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('description')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.707 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.32.222l-3.418.855a.5.5 0 0 1-.627-.627l.855-3.418a1 1 0 0 1 .222-.32l9-9z" />
                          <path fillRule="evenodd" d="M13.5 6.793l-9 9 1.414 1.414 9-9-1.414-1.414z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold w-1/3">Catégorie :</h2>
                <div className="w-2/3 flex items-center">
                  {editableFields.category ? (
                    <>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                      >
                        <option value="Artisan">Artisan</option>
                        <option value="Ebeniste">Bois</option>
                        <option value="Forgeron">Forgeron</option>
                        <option value="Sculpteur">Sculpteur</option>
                        <option value="Métallier">Métallier</option>
                        <option value="Tailleur de pierre">Tailleur de pierre</option>
                        <option value="Cordonnier">Cordonnier</option>
                        <option value="Graveur">Graveur</option>
                      </select>
                      <button
                        className="px-4 py-2 bg-gold ml-2 text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
                        onClick={() => handleSaveField('category')}
                      >
                        Sauvegarder
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{category}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('category')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.707 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.32.222l-3.418.855a.5.5 0 0 1-.627-.627l.855-3.418a1 1 0 0 1 .222-.32l9-9z" />
                          <path fillRule="evenodd" d="M13.5 6.793l-9 9 1.414 1.414 9-9-1.414-1.414z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold w-1/3">Prix :</h2>
                <div className="w-2/3 flex items-center">
                  {editableFields.price ? (
                    <>
                      <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-gold ml-2 text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
                        onClick={() => handleSaveField('price')}
                      >
                        Sauvegarder
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{price}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('price')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.707 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.32.222l-3.418.855a.5.5 0 0 1-.627-.627l.855-3.418a1 1 0 0 1 .222-.32l9-9z" />
                          <path fillRule="evenodd" d="M13.5 6.793l-9 9 1.414 1.414 9-9-1.414-1.414z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold w-1/3">Coût de livraison :</h2>
                <div className="w-2/3 flex items-center">
                  {editableFields.shippingCost ? (
                    <>
                      <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={shippingCost}
                        onChange={(e) => setShippingCost(e.target.value)}
                      />
                      <button
                        className="px-4 py-2 bg-gold ml-2 text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
                        onClick={() => handleSaveField('shippingCost')}
                      >
                        Sauvegarder
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{shippingCost}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('shippingCost')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gold" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.707 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.32.222l-3.418.855a.5.5 0 0 1-.627-.627l.855-3.418a1 1 0 0 1 .222-.32l9-9z" />
                          <path fillRule="evenodd" d="M13.5 6.793l-9 9 1.414 1.414 9-9-1.414-1.414z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mt-8 text-right">
          <NavLink to={`/userprofile`} className="text-gold hover:underline">
              Retour au profil
          </NavLink>
          
        </div>
      </div>
    </main>
  );
};

export default ArticleDetailPage;


