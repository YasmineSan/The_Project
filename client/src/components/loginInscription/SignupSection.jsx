import React, { useState, useRef } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import FormField from './FormField';

const SignupSection = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const formRef = useRef(null);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append('profile_image', profileImage); // Ajouter l'image au FormData

    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');

    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password && confirmPassword && password === confirmPassword) {
      if (passwordStrength != 5) {
        setError('Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.');
        window.scrollTo(0, 0); // Scroll to top
      } else {

        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          if (response.ok) {
            let username = formData.get('username');
            let password = formData.get('password');

            setError(''); // Clear any previous error
            setSuccess("Inscription réussie ! Redirection vers la page d'accueil");
            window.scrollTo(0, 0); // Scroll to top

            fetch('/api/users/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.token) {
                  localStorage.setItem('authToken', data.token);
                } else {
                  setSuccess(''); // Clear any previous success message
                  setError('Login failed: ' + (data.message || 'Invalid credentials'));
                  window.scrollTo(0, 0); // Scroll to top
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                setSuccess(''); // Clear any previous success message
                setError('An error occurred. Please try again.');
                window.scrollTo(0, 0); // Scroll to top
              });

            setTimeout(() => {
              window.location.assign('/');
            }, 2000);
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
      }

      
    } else {
      setSuccess(''); // Clear any previous success message
      setError("Échec de l'inscription : Merci de remplir tous les champs requis et de vérifier que les mots de passe correspondent.");
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setError('Format de fichier non supporté. Veuillez sélectionner une image au format JPEG ou PNG.');
        setSuccess(''); // Clear any previous success message
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(file); // Stocker le fichier image
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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[@$!%*?&.\])(\\\[\/]/.test(password)) strength += 1;
    return strength;
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
              <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full rounded-full object-cover" />
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
      <form ref={formRef} onSubmit={handleSignup} className="space-y-4">
        <FormField label="Nom d'utilisateur" type="text" name="username" required />
        <FormField label="Email" type="email" name="email" required />
        <div className="mb-6 relative">
          <label className="block text-gray-700">Mot de passe *</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full px-3 py-2 border rounded pr-10"
              required
              onChange={handlePasswordChange}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff className="text-gray-700" /> : <FiEye className="text-gray-700" />}
            </div>
          </div>
          {passwordStrength < 5 && passwordStrength > 0 && <div className="text-red-600 text-sm mt-1">Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.</div>}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${passwordStrength >= 5 ? 'bg-green-500' : passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${(passwordStrength / 5) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700">Confirmer le mot de passe *</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              className="w-full px-3 py-2 border rounded pr-10"
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
        <FormField label="Nom" type="text" name="last_name" required />
        <FormField label="Prénom" type="text" name="first_name" required />
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Rue" type="text" name="street" required />
          <FormField label="Numéro" type="text" name="street_number" required />
          <FormField label="Boîte" type="text" name="apartment" />
          <FormField label="Code Postal" type="text" name="postal_code" required />
          <FormField label="Ville" type="text" name="city" required />
        </div>
        <FormField label="Adresse PayPal" type="email" name="paypal_address" />
        <FormField label="Bio" type="textarea" name="biography" />
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
