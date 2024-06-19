import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormField from './FormField';

export const LoginSection = ({ username, setUsername, password, setPassword, showPassword, setShowPassword, handleLogin, error, success, setIsLogin }) => (
  <>
    <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
    {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
    {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
    <form onSubmit={(e) => { e.preventDefault(); handleLogin(username, password); }}>
      <FormField label="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
      <button type="submit" className="w-full bg-gold border border-gold text-white py-2 rounded hover:bg-white hover:text-gold hover:border hover:border-gold">
        S'identifier
      </button>
    </form>
    <div className="text-center mt-4">
      <p>
        Pas encore inscrit ?{' '}
        <span className="text-gold cursor-pointer" onClick={() => setIsLogin(false)}>
          Créez un compte
        </span>
      </p>
    </div>
  </>
);

export default LoginSection;
