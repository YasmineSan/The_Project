import React, { useState } from 'react';

const Contact = () => {
  // États pour gérer les champs du formulaire et le message de confirmation
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [message, setMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simuler l'envoi du message
    setConfirmationMessage('Votre message a été envoyé avec succès !');

    // Réinitialiser les champs du formulaire
    setEmail('');
    setNom('');
    setPrenom('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center pt-28">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-4 mt-2">Contactez-nous</h1>
        <p className="text-center text-gray-700 mb-8">
          Vous avez une question ou une réclamation? N’hésitez pas à prendre contact avec nous via le formulaire ci-dessous. Nous vous répondrons dans les plus brefs délais.
        </p>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 p-4">
            <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700  font-semibold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-semibold" htmlFor="nom">
                  Nom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nom"
                  type="text"
                  placeholder="Votre nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="prenom">
                  Prénom
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="prenom"
                  type="text"
                  placeholder="Votre prénom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                  Votre message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                  id="message"
                  placeholder="Votre message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-gold text-white py-2 rounded hover:bg-darkGold hover:bg-inherit hover:text-gold border border-gold hover:border hover:border-gold duration-300"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
            {confirmationMessage && (
              <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">
                {confirmationMessage}
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.7008091451194!2d5.580715596789548!3d50.63267459999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0f0abbfc177c7%3A0xf2c9f9204e1bb92b!2zUMO0bGUgaW1hZ2UgZGUgTGnDqGdl!5e0!3m2!1sfr!2sbe!4v1719091330792!5m2!1sfr!2sbe"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;