import React, { useState, useEffect } from 'react';
import backgroundImage from '../../../public/joinsUs_banner.jpg';


export const JoinUsBanner = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const handleJoinUs = () => {
    if (isAuthenticated) {
      window.location.href = '/userprofile';
      window.scrollTo(0, 0); // Scroll to top
    } else {
      window.location.href = '/login';
      window.scrollTo(0, 0); // Scroll to top
    }

  }

  return (
    <section className="mx-auto relative w-full h-80 flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-30"></div> {/* Fond sombre transparent pour le texte */}
      <div className="text-center text-white relative">
        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>Commencez à vendre vos créations dès maintenant!</h2>
        <p className="mb-4 text-lg">Inscrivez-vous pour une expérience personnalisée</p>
        <button onClick={handleJoinUs} className="py-3 px-7 hover:bg-white hover:text-gold rounded-full text-white border border-white duration-300">
          Rejoignez-nous
        </button>
      </div>
    </section>
  )
}

