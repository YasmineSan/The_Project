import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CardArticle from '../CardArticle';

export const ShowArticlesSection = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://4.233.138.141:3001/api/articles/public/articles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setArticles(data);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
    
  }, []);

  return (
    <section className="container mx-auto py-20 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
        <div className="flex flex-col justify-center items-start p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4">Découvrez nos articles</h2>
          <p className="mb-4 text-base">Parcourez notre sélection d'articles et trouvez ceux qui vous plaisent.</p>
          <NavLink to="/articles" className="py-2 px-5 hover:bg-gold hover:text-white rounded-full bg-white text-gold border border-gold transition-all duration-300">
            Voir plus
          </NavLink>
        </div>
        {console.log(articles)}
        {articles.slice(-7).map((article, i) => (
          <CardArticle
            key={i}
            id={article.article_id}
            image={article.article_photo}
            title={article.title}
            price={article.article_price}
          />
        ))}
      </div>
    </section>
  );
};

export default ShowArticlesSection;
