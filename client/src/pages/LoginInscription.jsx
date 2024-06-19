import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginInscription = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  const login = (username, password) => {
    fetch('http://4.233.138.141:3001/api/users/login', {
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
        navigate('/');
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gold text-white py-2 rounded hover:bg-darkGold"
          >
            S'identifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginInscription;