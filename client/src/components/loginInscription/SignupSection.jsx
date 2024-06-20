import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormField from './FormField';

const SignupSection = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [paypalAddress, setPaypalAddress] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword && password === confirmPassword) {
      setSuccess('Inscription réussie ! Redirection...');
      setTimeout(() => {
        window.location.assign('/');
      }, 2000);
    } else {
      setError('Signup failed: Please fill in all required fields and ensure passwords match');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Format de fichier non supporté. Veuillez sélectionner une image au format JPEG ou PNG.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setProfileImage(null);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Inscription</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
      <div className="mb-6 flex items-center justify-center">
        <div
          className={`relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center transition duration-300 transform ${isHovered ? 'scale-110' : 'scale-100'}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {profileImage ? (
            <div className="relative">
              <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              {isHovered && (
                <button
                  type="button"
                  className="absolute top-0 left-24 w-8 h-8 bg-red-500 text-white rounded-full p-1 transform transition duration-300 hover:scale-110"
                  onClick={handleResetImage}
                >
                  X
                </button>
              )}
            </div>
          ) : (
            <>
              <label htmlFor="photo" className="cursor-pointer block text-gray-700 text-sm text-center m-2">
                <span>{isHovered ? 'Importer une photo' : 'Ajouter une photo de profil'}</span>
              </label>
              <input
                type="file"
                id="photo"
                className="sr-only"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>
      </div>
      <form onSubmit={handleSignup} className="space-y-4">
        <FormField label="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="mb-6 relative">
          <label className="block text-gray-700">Mot de passe</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff className="text-gray-700" /> : <FiEye className="text-gray-700" />}
            </div>
          </div>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700">Confirmer le mot de passe</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff className="text-gray-700" /> : <FiEye className="text-gray-700" />}
            </div>
          </div>
        </div>
        <FormField label="Nom complet" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <FormField label="Adresse" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <FormField label="Adresse PayPal" type="email" value={paypalAddress} onChange={(e) => setPaypalAddress(e.target.value)} />
        <FormField label="Bio" type="textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
        <button type="submit" className="w-full bg-gold border border-gold text-white py-2 rounded hover:bg-white hover:text-gold">
          S'inscrire
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Déjà inscrit ?{' '}
          <span className="text-gold cursor-pointer hover:underline" onClick={() => setIsLogin(true)}>
            Connectez-vous
          </span>
        </p>
      </div>
    </>
  );
};

export default SignupSection;
