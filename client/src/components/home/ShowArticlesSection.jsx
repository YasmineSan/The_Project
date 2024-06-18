import React, { useEffect, useState } from 'react';
import CardArticle from '../CardArticle'

export const ShowArticlesSection = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      image: 'https://picsum.photos/200/100?random=1',
      title: 'Article 1',
      price: '20€'
    },
    {
      id: 2,
      image: 'https://picsum.photos/200/100?random=2',
      title: 'Article 2',
      price: '30€'
    },
    {
      id: 3,
      image: 'https://picsum.photos/200/100?random=3',
      title: 'Article 3',
      price: '40€'
    }
  ]);

  return (
    <section className="container mx-auto py-20 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10"> {/* Augmentation de l'espace entre les colonnes */}
        <div className="flex flex-col justify-center items-start p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Découvrez nos articles</h2>
          <p className="mb-4 text-base">Parcourez notre sélection d'articles et trouvez ceux qui vous plaisent.</p>
          <button className="py-2 px-5 hover:bg-gold hover:text-white rounded-full bg-white text-gold border border-gold">
            Voir plus
          </button>
        </div>
        {articles.map(article => (
          <CardArticle
            key={article.id}
            image={article.image}
            title={article.title}
            price={article.price}
          />
        ))}
      </div>
    </section>
  )
}
