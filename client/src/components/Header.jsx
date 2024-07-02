import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiMenu, FiHeart, FiUser, FiShoppingCart } from 'react-icons/fi';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const categoryMap = {
    5: 'Forge',
    6: 'Bois',
    15: 'Couture',
    16: 'Ebeniste',
    17: 'Forgeron',
    18: 'Artisan',
  };

  const categories = Object.keys(categoryMap);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-articles?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

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

  return (
    <header>
      <nav className='fixed mx-auto border-b-2 border-gold top-0 left-0 right-0 bg-white bg-opacity-100 z-10'>
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
                        {categoryMap[category]}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSearchSubmit} className='relative max-w-full sm:max-w-xs lg:max-w-md mr-4 sm:mx-4'>
              <input
                type="text"
                placeholder='Que recherchez-vous?'
                value={searchQuery}
                onChange={handleSearchChange}
                className='w-full py-1 sm:py-2 pl-4 pr-10 border border-gold rounded-full focus:outline-none'
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'>
                {searchQuery ? (
                  <FiX className='h-5 text-darkGrey hover:text-gold transition-colors duration-300' onClick={clearSearch} />
                ) : (
                  <FiSearch className='h-5 text-darkGrey hover:text-gold transition-colors duration-300' />
                )}
              </div>
            </form>
          </div>
          
          {isAuthenticated ? (
            <div className='flex items-center space-x-4'>
              <NavLink to="/favorites">
                <FiHeart className='h-6 w-6 text-darkGrey hover:text-gold transition-colors duration-300' />
              </NavLink>
              <NavLink to="/cart">
                <FiShoppingCart className='h-6 w-6 text-darkGrey hover:text-gold transition-colors duration-300' />
              </NavLink>
              <div className='relative'>
                <FiUser className='h-6 w-6 text-darkGrey cursor-pointer hover:text-gold transition-colors duration-300' onClick={toggleUserDropdown} />
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
