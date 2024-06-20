import React, { useState } from 'react';

const ContactUser = ({ user = { id: '', name: 'Utilisateur Anonyme', image: 'https://via.placeholder.com/150' } }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  return (
    <div className="w-full bg-gray-100 pt-28">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Contacter un Utilisateur</h1>
        <p className="mb-6 text-center">
          Pour contacter cet utilisateur, que ce soit pour une commande, une réclamation ou autre, utilisez le formulaire ci-dessous. Votre message lui sera transmis par mail.
        </p>

        <div className="flex flex-col items-center mb-6 sm:flex-row sm:justify-center">
          <img
            className="w-16 h-16 rounded-full mr-0 mb-4 sm:mr-4 sm:mb-0"
            src={user.image}
            alt={user.name}
          />
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold">{user.name}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
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

        <div className="mt-4 text-center">
          <a
            href={`/profile/${user.id}`}
            className="text-gold hover:underline"
          >
            Voir le profil de l'utilisateur
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUser;
