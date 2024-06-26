import React from 'react';
import { FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";

const SingleArticlePage = () => {
  const [article, setArticle] = useState([]);
  const [ otherArticles, setOtherArticles ] = useState([])
  const [user, setUser] = useState({});
  const { articleId } = useParams();

  const id = articleId[1]

  useEffect(() => {

    const fetchOneArticle = async () => {// fetch pour récupérer l'article avec l'id correspondant (récupéré dans l'url)
      try {
        const response = await fetch(`https://4.233.138.141:3001/api/articles/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setArticle(data);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchOneArticle();

    const fetchArticles = async () => {// fetch pour récupérer d'autres articles de cet utilisateur
      try {
        const response = await fetch(`https://4.233.138.141:3001/api/articles/${article.user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setOtherArticles(data);
        
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();

    
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-10">
      <div className="max-w-[80%] mx-auto bg-white p-6 rounded-lg shadow-md mt-24 mb-10">
        <div className="flex flex-col lg:flex-row">
          <img 
            src={article.article_photo}
            alt={article.article_title}
            className="w-full lg:w-1/2 rounded-lg mb-4 lg:mb-0 object-cover"
          />
          <div className="lg:ml-6 flex-grow">
            <div className="flex items-center mb-4">
              <img 
                src="https://picsum.photos/200/300?grayscale" 
                alt="Utilisateur" 
                className="w-12 h-12 rounded-full mr-4" 
              />
              <span className="font-bold">Jean</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">{article.article_title}</h1>
            <p className="text-xl text-gold mb-4">{article.article_price}</p>
            <p className="mb-6">
              {article.article_description}
            </p>
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
              <button className="bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                <span className="mr-2"><FiHeart /></span> Ajouter aux favoris
              </button>
              <button className="bg-white border border-gold text-gold py-2 px-4 rounded flex items-center justify-center hover:bg-gold hover:text-white transition-colors duration-300">
                <span className="mr-2"><MdAddShoppingCart /></span> Ajouter au panier
              </button>
            </div>
            <div className="text-sm text-gray-500 flex flex-col lg:flex-row justify-between">
              <span>Expédié depuis : Liège</span>
               <span>Date d'ajout : 10/06/24</span> {/*Ajouter la variable pour date d'ajout */}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <a href="/article" className="text-gold hover:underline">Retour aux articles</a>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-medium mb-6">Autres articles de cette boutique</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {otherArticles.length > 0 ? (
            otherArticles.map(article => (
              <CardArticle
                key={article.id}
                id={article.id}
                image={article.image}
                title={article.title}
                price={article.price}
              />
            ))
          ) : (
            <p className="text-gray-500">Pas d'articles à afficher</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleArticlePage;