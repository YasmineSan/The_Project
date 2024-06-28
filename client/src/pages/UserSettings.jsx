import React, { useState, useEffect } from 'react';
import {
  FiEdit2,
  FiSave,
  FiX,
  FiCalendar,
  FiUser,
  FiMail,
  FiLock,
  FiMapPin,
  FiInfo,
  FiCamera,
} from 'react-icons/fi';

const SettingsPage = () => {
    const [user, setUser] = useState({});
    const [formData, setFormData] = useState({});
    const [editingField, setEditingField] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error message
  
    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          // Mocked user data (replace with actual API request)
          const mockUser = {
            profilePhoto: 'https://via.placeholder.com/150',
            username: 'john_doe',
            firstName: 'John',
            lastName: 'Doe',
            biography: 'Software developer interested in web technologies.',
            email: 'john.doe@example.com',
            paypalAddress: 'john.doe.paypal@example.com',
            registrationDate: '2024-06-27T10:30:00Z',
            address: {
              street: '123 Avenue Street',
              number: '10',
              box: 'A',
              city: 'Paris',
              postalCode: '75001',
              country: 'France',
            },
            password: '************',
          };
          setUser(mockUser);
          setFormData({ ...mockUser });
          setLoading(false);
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
      };
  
      fetchCurrentUser();
    }, []);
  
    const handleEditField = (fieldName) => {
      setEditingField(fieldName);
    };
  
    const handleCancelEdit = () => {
      setFormData({ ...user }); // Reset formData to original user data
      setEditingField(null); // Reset editingField state to hide input fields
    };
  
    const handleSaveChanges = () => {
      setUser({ ...formData }); // Update user data with formData
      setEditingField(null); // Reset editingField state to hide input fields
      // Here you would normally send formData to your backend API
      console.log('Saving changes:', formData);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleProfilePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Vérifier le type d'image
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData({ ...formData, profilePhoto: reader.result });
            setEditingField('profilePhoto'); // Activer l'édition de la photo de profil
            setError(null); // Effacer l'erreur précédente si elle existe
          };
          reader.readAsDataURL(file);
        } else {
          // Afficher un message d'erreur pour informer l'utilisateur
          setError('Le type de fichier n\'est pas supporté. Veuillez sélectionner un fichier PNG ou JPEG.');
          // Réinitialiser l'input file pour effacer la sélection non valide
          e.target.value = null;
        }
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
      );
    }

  return (
    <main className="container mx-auto px-4 sm:px-20 pt-36 pb-20 bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-medium mb-6">Paramètres du compte</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center justify-center mb-4 md:col-span-2">
            <div className="relative">
              <img
                src={formData.profilePhoto}
                alt="Profile"
                className="w-28 rounded-full object-cover mr-4"
              />
              <label
                htmlFor="profilePhotoInput"
                className="absolute bottom-0 right-0 bg-gold text-white p-1 rounded-full cursor-pointer hover:bg-yellow-600 transition-colors duration-300"
              >
                <FiCamera size={20} />
              </label>
              <input
                id="profilePhotoInput"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleProfilePhotoChange}
                className="hidden"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Username */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Nom d'utilisateur</h4>
            <div className="flex items-center">
              <FiUser className="text-gold w-6 h-6 mr-2" />
              {editingField === 'username' ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                />
              ) : (
                <p className="text-gray-700">{formData.username}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('username')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'username' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Nom et prénom</h4>
            <div className="flex items-center">
              <FiUser className="text-gold w-6 h-6 mr-2" />
              {editingField === 'name' ? (
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    placeholder="Prénom"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    placeholder="Nom"
                  />
                </div>
              ) : (
                <p className="text-gray-700">{`${formData.firstName} ${formData.lastName}`}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('name')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'name' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Biography */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Biographie</h4>
            <div className="flex items-center">
              <FiInfo className="text-gold w-6 h-6 mr-2" />
              {editingField === 'biography' ? (
                <textarea
                  name="biography"
                  value={formData.biography}
                  onChange={handleChange}
                  className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full resize-none transition-all duration-300 ease-in-out transform focus:scale-105"
                />
              ) : (
                <p className="text-gray-700">{formData.biography}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('biography')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'biography' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Adresse email</h4>
            <div className="flex items-center">
              <FiMail className="text-gold w-6 h-6 mr-2" />
              {editingField === 'email' ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                />
              ) : (
                <p className="text-gray-700">{formData.email}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('email')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'email' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

          {/* PayPal */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Adresse PayPal</h4>
            <div className="flex items-center">
              <FiMail className="text-gold w-6 h-6 mr-2" />
              {editingField === 'paypalAddress' ? (
                <input
                  type="email"
                  name="paypalAddress"
                  value={formData.paypalAddress}
                  onChange={handleChange}
                  className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                />
              ) : (
                <p className="text-gray-700">{formData.paypalAddress}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('paypalAddress')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'paypalAddress' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

         
          {/* Password */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Mot de passe</h4>
            <div className="flex items-center">
              <FiLock className="text-gold w-6 h-6 mr-2" />
              {editingField === 'password' ? (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                />
              ) : (
                <p className="text-gray-700">{formData.password}</p>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('password')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'password' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>

        {/* Registration Date */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Date d'inscription</h4>
            <div className="flex items-center">
              <FiCalendar className="text-gold w-6 h-6 mr-2" />
              <p className="text-gray-700">
                {new Date(formData.registrationDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col mb-4">
            <h4 className="text-gray-500 font-medium mb-2 cursor-pointer">Adresse</h4>
            <div className="flex items-center">
              <FiMapPin className="text-gold w-6 h-6 mr-2" />
              {editingField === 'address' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-gray-500 font-medium mb-2">Rue</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-500 font-medium mb-2">Numéro</label>
                    <input
                      type="text"
                      name="number"
                      value={formData.address.number}
                      onChange={handleChange}
                      className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-500 font-medium mb-2">Boîte</label>
                    <input
                      type="text"
                      name="box"
                      value={formData.address.box}
                      onChange={handleChange}
                      className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-500 font-medium mb-2">Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.address.postalCode}
                      onChange={handleChange}
                      className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-500 font-medium mb-2">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="border border-gray-300 focus:outline-none focus:border-gold rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out transform focus:scale-105"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700">{`${formData.address.street}, ${formData.address.number} ${formData.address.box}, ${formData.address.city} ${formData.address.postalCode}, ${formData.address.country}`}</p>
                </div>
              )}
              <button
                className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                onClick={() => handleEditField('address')}
              >
                <FiEdit2 size={18} />
              </button>
              {editingField === 'address' && (
                <button
                  className="ml-2 text-gray-500 hover:text-gold transition-colors duration-300 ease-in-out"
                  onClick={() => setEditingField(null)}
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>
        </div>

        {editingField && (
          <div className="flex justify-end mt-6">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCancelEdit}
            >
              <FiX className="inline mr-2" /> Annuler
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleSaveChanges}
            >
              <FiSave className="inline mr-2" /> Sauvegarder
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default SettingsPage;
