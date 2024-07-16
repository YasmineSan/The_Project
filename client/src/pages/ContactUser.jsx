import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

const ContactUser = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState({});
  const { userId } = useParams();


  const id = userId[1];

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject.trim() && message.trim()) {
      // ajouter la logique pour envoyer le message par mail ici
      console.log(`Sujet: ${subject}`);
      console.log(`Message: ${message}`);

      // Réinitialiser les champs du formulaire
      setSubject('');
      setMessage('');
      // Afficher le message de confirmation
      setIsSubmitted(true);
      // Masquer le message de confirmation après 3 secondes
      setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      alert('Veuillez remplir tous les champs.');
    }

  };

  const fetchOtherUserProfile = async () => {//Récupérer le profil de l'autre utilisateur
    try {
      const response = await fetch(`https://167.172.38.235:3001/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      } else {
        setUser(await response.json());
      }
;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchOtherUserProfile();

  return (
    <main className="w-full min-h-[820px] bg-gray-100 pt-28">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4 text-center">Contacter un utilisateur</h1>
        <p className="mb-6 text-center">
          Pour contacter cet utilisateur, que ce soit pour une commande, une réclamation ou autre, utilisez le formulaire ci-dessous. Votre message lui sera transmis par mail.
        </p>

        <div className="flex flex-col items-center mb-6 sm:flex-row sm:justify-center">
          <NavLink to={`/userProfile/:${userId}`}>
            <img
              className="w-16 h-16 rounded-full mr-0 mb-4 sm:mr-4 sm:mb-0"
              src={user.profile_image}
              alt={user.username}
            />
          </NavLink>
          <NavLink to={`/userProfile/:${userId}`}>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold hover:text-gold hover:underline">{user.username}</h2>
            </div>
          </NavLink>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Sujet"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              placeholder="Votre message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            className="w-full bg-gold text-white py-2 rounded hover:bg-darkGold hover:bg-inherit hover:text-gold border border-gold hover:border hover:border-gold duration-300"
            type="submit"
          >
            Envoyer
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
            Votre message a été envoyé avec succès.
          </div>
        )}

        <div className="mt-8 text-center">
          <NavLink to={`/userprofile/:${user.user_id}`} className="text-gold hover:underline">
              Retour au profil de l'utilisateur
          </NavLink>
          
        </div>
      </div>
    </main>
  );
};

export default ContactUser;
