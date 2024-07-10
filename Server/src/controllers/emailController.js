const fetch = require('node-fetch');

exports.sendConfirmationEmail = async (req, res) => {
  const { email, username } = req.body;

  try {
    const response = await fetch('http://4.233.138.141:3001/api/sendConfirmationEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username })
    });

    const text = await response.text(); // Obtenez le texte brut de la réponse
    console.log('Response text:', text); // Loggez la réponse brute

    try {
      const data = JSON.parse(text); // Essayez de parser le texte en JSON
      if (response.ok) {
        console.log('Email de confirmation envoyé avec succès.');
        res.status(200).send({ message: 'Email de confirmation envoyé avec succès.' });
      } else {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation:', data.message || 'Une erreur est survenue.');
        res.status(500).send({ message: 'Erreur lors de l\'envoi de l\'email de confirmation.' });
      }
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error); // Loggez l'erreur de parsing JSON
      res.status(500).send({ message: 'Erreur lors du parsing JSON.', error: error.message });
    }
  } catch (error) {
    console.error('Erreur réseau lors de l\'envoi de l\'email de confirmation:', error);
    res.status(500).send({ message: 'Erreur réseau lors de l\'envoi de l\'email de confirmation.', error: error.message });
  }
};
