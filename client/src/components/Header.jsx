import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiHeart, FiUser, FiShoppingCart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (event) => {
      if (domNode.current && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

const Header = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prev) => !prev);
    if (isUserDropdownOpen) {
      setIsUserDropdownOpen(false);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
    if (isCategoryDropdownOpen) {
      setIsCategoryDropdownOpen(false);
    }
  };

  const categoryDropdownRef = useClickOutside(() => {
    setIsCategoryDropdownOpen(false);
  });

  const userDropdownRef = useClickOutside(() => {
    setIsUserDropdownOpen(false);
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsUserDropdownOpen(false);
    window.location.assign('/');
  };

  const categories = [5, 6, 15, 16, 17, 18, 19]; // Exemple de catégories

  return (
    <header>
      <nav className='fixed mx-auto shadow-md top-0 left-0 right-0 bg-white bg-opacity-100 z-10 min-h-16 flex'>
        <div className='flex container px-4 lg:px-10 items-center justify-between mx-auto'>
          <NavLink to="/" className='mr-5'>
            <img src="/craftify.png" alt="logo Craftify" className='w-20 mr-5' />
          </NavLink>
          
          <div className='flex items-center relative'>
            <div className='flex items-center cursor-pointer' onClick={toggleCategoryDropdown}>
              <FiMenu className='h-5 w-5 text-darkGrey mr-3 hover:text-gold transition-colors duration-300' />
              <span className='text-darkGrey hidden sm:block hover:text-gold transition-colors duration-300'>Catégorie</span>
            </div>
            <AnimatePresence>
              {isCategoryDropdownOpen && (
                <motion.div
                  ref={categoryDropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='absolute top-full left-0 mt-2 w-48 bg-white border border-gold rounded shadow-lg z-10 cursor-pointer'
                >
                  <ul>
                    {categories.map((category) => (
                      <li key={category} className='px-4 py-2 hover:bg-gold hover:text-white transition-all' onClick={() => navigate(`/all-articles?category=${encodeURIComponent(category)}`)}>
                        {category}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lien vers la page des articles avec loupe */}
            <div className='flex items-center mr-4 sm:mx-4 overflow-hidden max-w-36 sm:max-w-full border-b-2 border-gold'>
              <NavLink to="/all-articles" className='py-1 sm:py-2 focus:outline-none block text-slate-500 text-sm sm:text-base truncate '>
                <span className='inline-block align-middle'>Vous recherchez un article?</span>
              </NavLink>
              <FiSearch className='min-h-5 min-w-5 mr-2 text-darkGrey ml-2 inline-block align-middle hover:text-gold transition-colors duration-300' />
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className='flex items-center space-x-4'>
              <NavLink to="/favorites">
                <FiHeart className='h-5 w-5 sm:h-6 sm:w-6 text-darkGrey hover:text-gold transition-colors duration-300' />
              </NavLink>
              <NavLink to="/cart">
                <FiShoppingCart className='h-5 w-5 sm:h-6 sm:w-6 text-darkGrey hover:text-gold transition-colors duration-300' />
              </NavLink>
              <div className='relative'>
                <FiUser className='h-5 w-5 sm:h-6 sm:w-6 text-darkGrey cursor-pointer hover:text-gold transition-colors duration-300' onClick={toggleUserDropdown} />
                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      ref={userDropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className='absolute top-full right-0 mt-2 w-48 bg-white border border-gold rounded shadow-lg z-10'
                    >
                      <ul>
                        <li className='px-4 py-2 hover:bg-gold hover:text-white transition-all cursor-pointer' onClick={() => { navigate('/userprofile'); setIsUserDropdownOpen(false); }}>Mon profil</li>
                        <li className='px-4 py-2 hover:bg-gold hover:text-white transition-all cursor-pointer' onClick={() => { navigate('#'); setIsUserDropdownOpen(false); }}>Mes commandes</li>
                        <li className='px-4 py-2 hover:bg-gold hover:text-white transition-all cursor-pointer' onClick={() => { navigate('#'); setIsUserDropdownOpen(false); }}>Mes ventes</li>
                        <li className='px-4 py-2 hover:bg-gold hover:text-white transition-all cursor-pointer' onClick={() => { navigate('/userSettings'); setIsUserDropdownOpen(false); }}>Paramètres</li>
                        <li className='px-4 py-2 hover:bg-red-500 hover:text-white transition-all cursor-pointer text-red-500' onClick={handleLogout}>Déconnexion</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <NavLink to="/login" className="py-1 sm:py-2 px-4 bg-gold rounded-full text-white hover:bg-white hover:text-gold hover:border hover:border-gold transition-all">
              S'identifier
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
