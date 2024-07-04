import React, { useState, useRef, useEffect } from 'react';
import FormField from '../components/loginInscription/FormField';
import { NavLink, useNavigate } from 'react-router-dom';

const AddArticlePage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [shippingCost, setShippingCost] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const debugFormData = (formData) => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append('article_photo', image); // Ajouter l'image au FormData
    const token = localStorage.getItem('authToken');
    
    // Déboguer le contenu de FormData
    console.log("Contenu de FormData:");
    debugFormData(formData);

    try {
      const response = await fetch('http://4.233.138.141:3001/api/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes de la requête
        },
        body: formData
      });

      console.log(response)
      const data = await response.json();
      if (response.ok) {
        setError(''); // Clear any previous error
        setSuccess("Article ajouté! Redirection vers votre profil...");
        window.scrollTo(0, 0); // Scroll to top

        // Redirection vers la page de confirmation avec les données du formulaire
        
        navigate('/articledetail', {
          state: {
            image: URL.createObjectURL(image),
            title,
            description,
            category,
            price,
            shippingCost
          }
        });
      } else {
        setSuccess(''); // Clear any previous success message
        setError(data.message || 'Une erreur est survenue, merci de réessayer.');
        window.scrollTo(0, 0); // Scroll to top
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccess(''); // Clear any previous success message
      setError('Une erreur est survenue, merci de réessayer.');
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  return (
    <main className="mx-auto px-10 sm:px-12 py-28 bg-gray-100">
      <div className='bg-white shadow-lg rounded-lg p-8 mb-12'>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-semibold text-center py-6">Mise en vente d'un article</h1>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Erreur: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Succès: </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:order-2">
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
              name="article_description"
            />
            <div>
              <label htmlFor="category" className="block text-gray-700 mb-2">Catégorie de l'article *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
                name="category_name"
              >
                <option value="artisan">Artisan</option>
                <option value="bois">Bois</option>
                <option value="forgeron">Forgeron</option>
                <option value="forge">Forge</option>
                <option value="couture">Couture</option>
                <option value="ebeniste">Ebeniste</option>
              </select>
            </div>
            <div className="flex md:space-x-4 flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <FormField
                  label="Prix de vente"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  name="article_price"
                />
                <span className="absolute right-2 top-2 text-gray-500">€</span>
              </div>
              <div className="w-full md:w-1/2 relative mt-4 md:mt-0">
                <FormField
                  label="Frais de livraison"
                  type="number"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  required
                  name="shipping_cost"
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
            <div 
              className="border-dashed border-4 border-gray-300 p-4 flex justify-center items-center h-full relative"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {image ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <img src={URL.createObjectURL(image)} alt="Article" className="max-w-full max-h-full object-cover" />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-center text-gray-500 w-full h-full flex items-center justify-center"
                >
                  <span>Glissez et déposez une image ici ou cliquez pour télécharger</span>
                  <input type="file" id="image-upload" className="hidden" onChange={handleImageUpload} required/>
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <NavLink to={`/userprofile`} className="text-gold hover:underline">
              Retour au profil
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default AddArticlePage;







// import React, { useState, useRef } from 'react';
// import FormField from '../components/loginInscription/FormField';

// const AddArticlePage = () => {
//   const [image, setImage] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [shippingCost, setShippingCost] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const formRef = useRef(null);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//    const debugFormData = (formData) => {
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}: ${value}`);
//     }
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(formRef.current);
//     formData.append('article_photo', image); // Ajouter l'image au FormData
//     const token = localStorage.getItem('authToken');
    
//     // Déboguer le contenu de FormData
//     console.log("Contenu de FormData:");
//     debugFormData(formData);

//     try {
//       const response = await fetch('http://4.233.138.141:3001/api/articles', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}` // Ajouter le token dans les en-têtes de la requête
//         },
//         body: formData
//       });

//       console.log(response)
//       const data = await response.json();
//       if (response.ok) {
//         setError(''); // Clear any previous error
//         setSuccess("Article ajouté! Redirection vers votre profil...");
//         window.scrollTo(0, 0); // Scroll to top
//         setTimeout(() => {
//           window.location.assign('/');
//         }, 2000);
//       } else {
//         setSuccess(''); // Clear any previous success message
//         setError(data.message || 'Une erreur est survenue, merci de réessayer.');
//         window.scrollTo(0, 0); // Scroll to top
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setSuccess(''); // Clear any previous success message
//       setError('Une erreur est survenue, merci de réessayer.');
//       window.scrollTo(0, 0); // Scroll to top
//     }
//   };

//   return (
//     <main className="container mx-auto px-10 sm:px-12 py-28">
//       <div className='bg-white shadow-lg rounded-lg p-8 mb-12'>
//         <div className="flex flex-col items-center mb-8">
//           <h1 className="text-3xl font-semibold text-center py-6">Mise en vente d'un article</h1>
//         </div>
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             <strong className="font-bold">Erreur: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//             <strong className="font-bold">Succès: </strong>
//             <span className="block sm:inline">{success}</span>
//           </div>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:order-2">
//             <FormField
//               label="Titre de l'article"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               name="title"
//             />
//             <FormField
//               label="Description de l'article"
//               type="textarea"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               name="article_description"
//             />
//             <div>
//               <label htmlFor="category" className="block text-gray-700 mb-2">Catégorie de l'article *</label>
//               <select
//                 id="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-3 py-2 border rounded"
//                 required
//                 name="category_name"
//               >
//                 <option value="" disabled>Sélectionner une catégorie</option>
//                 <option value="Artisan">Artisan</option>
//                 <option value="Ebeniste">Bois</option>
//                 <option value="Forgeron">Forgeron</option>
//                 <option value="Sculpteur">Sculpteur</option>
//                 <option value="Métallier">Métallier</option>
//                 <option value="Tailleur de pierre">Tailleur de pierre</option>
//                 <option value="Cordonnier">Cordonnier</option>
//                 <option value="Graveur">Graveur</option>
//               </select>
//             </div>
//             <div className="flex md:space-x-4 flex-col md:flex-row">
//               <div className="md:w-1/2 relative">
//                 <FormField
//                   label="Prix de vente"
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   required
//                   name="article_price"
//                 />
//                 <span className="absolute right-2 top-2 text-gray-500">€</span>
//               </div>
//               <div className="w-full md:w-1/2 relative mt-4 md:mt-0">
//                 <FormField
//                   label="Frais de livraison"
//                   type="number"
//                   value={shippingCost}
//                   onChange={(e) => setShippingCost(e.target.value)}
//                   required
//                   name="shipping_cost"
//                 />
//                 <span className="absolute right-2 top-2 text-gray-500">€</span>
//               </div>
//             </div>
//             <button
//               className="w-full bg-gold text-white py-2 rounded hover:bg-darkGold hover:bg-inherit hover:text-gold border border-gold hover:border hover:border-gold duration-300 mt-4"
//               type="submit"
//             >
//               Ajouter cet article
//             </button>
//           </form>
//           <div className="md:order-1">
//             <div 
//               className="border-dashed border-4 border-gray-300 p-4 flex justify-center items-center h-full relative"
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               {image ? (
//                 <div className="relative w-full h-full flex justify-center items-center">
//                   <img src={URL.createObjectURL(image)} alt="Article" className="max-w-full max-h-full object-cover" />
//                   <button
//                     onClick={handleRemoveImage}
//                     className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ) : (
//                 <label
//                   htmlFor="image-upload"
//                   className="cursor-pointer text-center text-gray-500 w-full h-full flex items-center justify-center"
//                 >
//                   <span>Glissez et déposez une image ici ou cliquez pour télécharger</span>
//                   <input type="file" id="image-upload" className="hidden" onChange={handleImageUpload} required/>
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-end mt-6">
//           <a href="/profile" className="text-gold hover:underline">Retour au profil</a>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AddArticlePage;