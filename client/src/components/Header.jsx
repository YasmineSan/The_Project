import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'

const Header = () => {
  return (
    <header>
      <nav className='fixed mx-auto border-b-2 border-gold top-0 left-0 right-0 bg-white bg-opacity-100'>
        <div className='flex container px-4 lg:px-10 flex-wrap items-center justify-between mx-auto '>
          <NavLink to="/"><img src="craftify.png" alt="logo Craftify" className='w-20'/></NavLink>
          <Button
            content={"S'identifier"}
            path={'/login'}
            style="text-white bg-golden hover:bg-slate-800 rounded-full px-5 py-2"/>
        </div>
      </nav>
    </header>
  )
}

export default Header