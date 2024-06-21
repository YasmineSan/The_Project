import React, { useState } from 'react';
import FormField from '../components/loginInscription/FormField';

const AddArticlePage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [shippingCost, setShippingCost] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to an API
  };

  return (
    <div className="container mx-auto p-4 md:p-8 mt-16">
      <div className="flex flex-col items-center mb-8">
        <h1 className="md:text-3xl font-bold ">Mis en vente d'un article</h1>
        <a href="/profile" className="text-gold-500 underline mt-2">Retour au profil</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 md:order-2">
          <FormField
            label="Titre de l'article"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            name="title"
          />
          <FormField
            label="Description de l'article"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            name="description"
          />
          <div>
            <label htmlFor="category" className="block text-gray-700">Catégorie de l'article *</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              name="category"
            >
              <option value="">Sélectionner une catégorie</option>
              <option value="Artisan">Artisan</option>
              <option value="Ebeniste">Ebeniste</option>
              <option value="Forgeron">Forgeron</option>
              <option value="Sculpteur">Sculpteur</option>
              <option value="Métallier">Métallier</option>
              <option value="Tailleur de pierre">Tailleur de pierre</option>
              <option value="Cordonnier">Cordonnier</option>
              <option value="Graveur">Graveur</option>
            </select>
          </div>
          <div className="flex space-x-4 flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <FormField
                label="Prix de vente (€)"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                name="price"
              />
              <span className="absolute right-2 top-2 text-gray-500">€</span>
            </div>
            <div className="w-full md:w-1/2 mt-4 md:mt-0">
              <FormField
                label="Frais de livraison (€)"
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                required
                name="shippingCost"
              />
              <span className="absolute right-2 top-2 text-gray-500">€</span>
            </div>
          </div>
          <button
            className="w-full bg-gold text-white py-2 rounded hover:bg-darkGold hover:bg-inherit hover:text-gold border border-gold hover:border hover:border-gold duration-300 mt-4"
            type="submit"
          >
            Ajouter cet article
          </button>
        </form>
        <div className="md:order-1">
          <div className="border-dashed border-4 border-gray-300 p-4 flex justify-center items-center h-full">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Article" className="max-w-full max-h-full object-cover" />
            ) : (
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-center text-gray-500"
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setImage(file);
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <span>Glissez et déposez une image ici ou cliquez pour télécharger</span>
                <input type="file" id="image-upload" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticlePage;