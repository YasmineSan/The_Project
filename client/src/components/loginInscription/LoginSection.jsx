import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormField from './FormField';

const LoginSection = ({ setIsLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    console.log({username,password})
    fetch('http://167.172.38.235:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          console.log('Login successful!');
          setSuccess('Connexion réussie ! Redirection...');
          setTimeout(() => {
            window.location.assign('/');
          }, 2000);
        } else {
          setError('Login failed: ' + (data.message || 'Invalid credentials'));
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <FormField label="Nom d'utilisateur" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <div className="mb-6 relative">
          <label className="block text-gray-700">Mot de passe *</label>
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
        <button type="submit" className="w-full bg-gold border border-gold text-white py-2 rounded hover:bg-white hover:text-gold hover:border hover:border-gold duration-300">
          S'identifier
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Pas encore inscrit ?{' '}
          <span className="text-gold cursor-pointer hover:underline duration-300" onClick={() => setIsLogin(false)}>
            Créez un compte
          </span>
        </p>
      </div>
    </>
  );
};

export default LoginSection;
