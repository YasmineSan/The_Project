import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from './Button'
import { FiSearch, FiX, FiMenu } from 'react-icons/fi';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    // Implémentez la logique de recherche ici
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3']; // Exemple de catégories

  return (
    <header>
      <nav className='fixed mx-auto border-b-2 border-gold top-0 left-0 right-0 bg-white bg-opacity-100 z-10'>
        <div className='flex container px-4 lg:px-10 items-center justify-between mx-auto'>
          <NavLink to="/" className='mr-5'><img src="craftify.png" alt="logo Craftify" className='w-20 mr-5' /></NavLink>
          
          <div className='flex items-center relative'>
            <div className='flex items-center cursor-pointer' onClick={toggleDropdown}>
              <FiMenu className='h-5 w-5 text-darkGrey mr-3' />
              <span className='text-darkGrey hidden sm:block'>Catégorie</span>
            </div>
            {isDropdownOpen && (
              <div className='absolute top-full left-0 mt-2 w-48 bg-white border border-gold rounded shadow-lg z-10'>
                <ul>
                  {categories.map((category) => (
                    <li key={category} className='px-4 py-2 hover:bg-gold hover:text-white'>
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                  <FiX className='h-5 text-darkGrey' onClick={clearSearch} />
                ) : (
                  <FiSearch className='h-5 text-darkGrey' />
                )}
              </div>
            </form>
          </div>

          <NavLink to="/login" className="py-1 sm:py-2 px-4 bg-gold rounded-full text-white hover:bg-white hover:text-gold hover:border hover:border-gold">
            S'identifier
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Header