import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginSection from '../components/loginInscription/LoginSection';
import SignupSection from '../components/loginInscription/SignupSection';

export const LoginInscriptionPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [paypalAddress, setPaypalAddress] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (username, password) => {
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
        setSuccess('Connexion réussie ! Redirection...');
        setTimeout(() => {
          window.location.assign('/');  // Redirection directe vers la page d'accueil
        }, 2000);  // Délai de 2 secondes avant la redirection
      } else {
        setError('Login failed: ' + (data.message || 'Invalid credentials'));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username && email && password && confirmPassword && password === confirmPassword) {
      setSuccess('Inscription réussie ! Redirection...');
      setTimeout(() => {
        window.location.assign('/');  // Redirection directe vers la page d'accueil
      }, 2000);  // Délai de 2 secondes avant la redirection
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

  return (
    <main className="pt-28 mx-auto py-16 min-h-[820px] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <LoginSection
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleLogin={handleLogin}
              error={error}
              success={success}
              setIsLogin={setIsLogin}
            />
          ) : (
            <SignupSection
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              fullName={fullName}
              setFullName={setFullName}
              address={address}
              setAddress={setAddress}
              paypalAddress={paypalAddress}
              setPaypalAddress={setPaypalAddress}
              bio={bio}
              setBio={setBio}
              profileImage={profileImage}
              handleImageUpload={handleImageUpload}
              handleResetImage={handleResetImage}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleSignup={handleSignup}
              error={error}
              success={success}
              setIsLogin={setIsLogin}
            />
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default LoginInscriptionPage;
