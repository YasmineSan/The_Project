import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {FiEdit2, FiX} from 'react-icons/fi';

const EditArticle = () => {
  const [article, setArticle] = useState({});
  const [editableFields, setEditableFields] = useState({
    title: false,
    description: false,
    category: false,
    price: false,
    shippingCost: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const { articleId } = useParams();

  useEffect(() => {
    fetchArticle(articleId);
  }, [articleId]);

  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`http://167.172.38.235:3001/api/articles/article/${articleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch article');
      }

      const data = await response.json();
      setArticle(data);

    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleEditField = (fieldName) => {
    setEditableFields(prevState => ({
      ...prevState,
      [fieldName]: true
    }));
    setIsEditing(true);
  };

  const handleSaveField = async (fieldName) => {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [fieldName]: article[fieldName]
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save field');
      }
      setEditableFields(prevState => ({
        ...prevState,
        [fieldName]: false
      }));
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving field:', error);
    }
  };

  const handleCancelEdit = (fieldName) => {
    setEditableFields(prevState => ({
      ...prevState,
      [fieldName]: false
    }));
    setIsEditing(false);
    // Re-fetch article details to reset the field value
    fetchArticle(articleId);
  };

  const handleResetField = (fieldName) => {
    setArticle(prevState => ({
      ...prevState,
      [fieldName]: ''
    }));
  };

  const { article_photo, title, article_description, category_id, article_price, shipping_cost } = article;

  return (
    <main className="bg-gray-100 min-h-[820px] pt-24 w-full flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 mt-8 sm:p-8 w-11/12 md:w-2/3">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-medium text-center pb-4">Détails de l'article</h1>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-1 justify-center">
            <img src={article_photo} alt="Article" className=" rounded-lg shadow-md object-cover w-full max-h-[500px]" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              {/* Title */}
              <div className="flex flex-col items-start mb-4 gap-2">
                <h2 className="font-semibold text-xl">Titre</h2>
                <div className="flex items-center">
                  {editableFields.title ? (
                    <>
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={title}
                        onChange={(e) => setArticle({ ...article, title: e.target.value })}
                      />
                      <button
                        className="ml-2 px-2 py-1 text-red-500"
                        onClick={() => handleCancelEdit('title')}
                      >
                        <FiX className='w-5 h-5'/>
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{title}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('title')}
                      >
                        <FiEdit2 className='text-gold'/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Description */}
              <div className="flex flex-col items-start mb-4 gap-2">
                <h2 className="font-semibold text-xl">Description</h2>
                <div className="flex items-center">
                  {editableFields.description ? (
                    <>
                      <textarea
                        className="border border-gray-300 rounded px-3 py-2 mr-2 min-w-full resize-none"
                        value={article_description}
                        onChange={(e) => setArticle({ ...article, description: e.target.value })}
                        maxLength={500}
                        rows={4}
                      />
                      <button
                        className="ml-2 px-2 py-1 text-red-500"
                        onClick={() => handleCancelEdit('description')}
                      >
                        <FiX className='w-5 h-5'/>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className='max-h-28 overflow-y-scroll'>{article_description}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('description')}
                      >
                        <FiEdit2 className='text-gold'/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Category */}
              <div className="flex flex-col items-start mb-4 gap-2">
                <h2 className="font-semibold text-xl">Catégorie</h2>
                <div className="flex items-center">
                  {editableFields.category ? (
                    <>
                      <select
                        value={category_id}
                        onChange={(e) => setArticle({ ...article, category: e.target.value })}
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
                        className="ml-2 px-2 py-1 text-red-500"
                        onClick={() => handleCancelEdit('category')}
                      >
                        <FiX className='w-5 h-5'/>
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{category_id}</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('category')}
                      >
                        <FiEdit2 className='text-gold'/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Price */}
              <div className="flex flex-col items-start mb-4 gap-2">
                <h2 className="font-semibold text-xl">Prix</h2>
                <div className="flex items-center">
                  {editableFields.price ? (
                    <>
                      <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={article_price}
                        onChange={(e) => setArticle({ ...article, price: e.target.value })}
                      />
                      <button
                        className="ml-2 px-2 py-1 text-red-500"
                        onClick={() => handleCancelEdit('price')}
                      >
                        <FiX className='w-5 h-5'/>
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{article_price} €</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('price')}
                      >
                        <FiEdit2 className='text-gold'/>
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Shipping Cost */}
              <div className="flex flex-col items-start mb-4 gap-2">
                <h2 className="font-semibold text-xl">Coût de livraison</h2>
                <div className="flex items-center">
                  {editableFields.shippingCost ? (
                    <>
                      <input
                        type="number"
                        className="border border-gray-300 rounded px-3 py-2 w-full mr-2"
                        value={shipping_cost}
                        onChange={(e) => setArticle({ ...article, shippingCost: e.target.value })}
                      />
                      <button
                        className="ml-2 px-2 py-1 text-red-500"
                        onClick={() => handleCancelEdit('shippingCost')}
                      >
                        <FiX className='w-5 h-5'/>
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{shipping_cost} €</p>
                      <button
                        className="ml-2 px-2 py-1 text-blue-500"
                        onClick={() => handleEditField('shippingCost')}
                      >
                        <FiEdit2 className='text-gold'/>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gold text-white hover:text-gold hover:bg-inherit transition-colors duration-300 ease-in-out border border-gold rounded"
              onClick={() => {
                // Save all fields
                handleSaveField('title');
                handleSaveField('description');
                handleSaveField('category');
                handleSaveField('price');
                handleSaveField('shippingCost');
              }}
            >
              Sauvegarder
            </button>
            <button
              className="px-4 py-2 bg-red-500 ml-4 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out rounded"
              onClick={() => {
                // Cancel editing and reset fields
                handleCancelEdit('title');
                handleCancelEdit('description');
                handleCancelEdit('category');
                handleCancelEdit('price');
                handleCancelEdit('shippingCost');
              }}
            >
              Annuler
            </button>
          </div>
        )}
        <div className="mt-8 text-right">
          <NavLink to={`/userprofile`} className="text-gold hover:underline self-start">
              Retour au profil
          </NavLink>
          
        </div>
      </div>
      
    </main>
  );
};

export default EditArticle;
