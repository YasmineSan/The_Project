import React from 'react'
import backgroundImage from '../../../public/joinsUs_banner.jpg';

export const JoinUsBanner = () => {
    return (
        <section className="mx-auto relative w-full h-80 flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-black opacity-30"></div> {/* Fond sombre transparent pour le texte */}
          <div className="z-10 text-center text-white relative">
            <h2 className='text-3xl font-semibold mb-4'>Commencez à vendre vos créations dès maintenant!</h2>
            <p className="mb-4 text-lg">Inscrivez-vous pour une expérience personnalisée</p>
            <button className="py-3 px-7 hover:bg-white hover:text-gold rounded-full text-white border border-white">
              Rejoignez-nous
            </button>
          </div>
        </section>
    )
}

