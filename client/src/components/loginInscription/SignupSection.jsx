import React, { useState } from 'react';
import FormField from './FormField';

const SignupSection = ({
  username, setUsername, email, setEmail, password, setPassword,
  confirmPassword, setConfirmPassword, fullName, setFullName, address, setAddress,
  paypalAddress, setPaypalAddress, bio, setBio, profileImage, handleImageUpload,
  handleResetImage, showPassword, setShowPassword, handleSignup, error, success, setIsLogin
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
                  className="absolute  top-0 left-24 w-8 h-8 bg-red-500 text-white rounded-full p-1 transform transition duration-300 hover:scale-110"
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
      <form onSubmit={(e) => { e.preventDefault(); handleSignup(e); }} className="space-y-4">
        <FormField label="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <FormField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="flex flex-wrap">
          <div className="w-full">
            <FormField label="Mot de passe" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="w-full">
            <FormField label="Confirmez le mot de passe" type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
        </div>
        <FormField label="Nom complet" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <FormField label="Adresse" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <FormField label="Adresse PayPal" type="text" value={paypalAddress} onChange={(e) => setPaypalAddress(e.target.value)} />
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-full md:w-auto bg-gold text-white py-2 px-6 rounded border border-gold hover:bg-white hover:text-gold hover:border hover:border-gold">
            S'inscrire
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <p>
          Déjà inscrit ?{' '}
          <span className="text-gold cursor-pointer" onClick={() => setIsLogin(true)}>
            Connectez-vous
          </span>
        </p>
      </div>
    </>
  );
};

export default SignupSection;
