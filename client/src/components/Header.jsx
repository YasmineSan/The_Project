import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './Button'

const Header = () => {
  return (
    <div>
      <nav className='fixed mx-auto border-b border-[#F2F2F2] top-0 left-0 right-0 z-10 bg-white bg-opacity-100'>
        <div className='flex container lg:py-5 lg:px-10 flex-wrap items-center justify-between mx-auto px-4 py-2'>
          <NavLink to="/"><img src="craftify.png" alt="logo Craftify" className='w-10'/></NavLink>
          <Button
            content={"S'identifier"}
            path={'/login'}
            style={"text-white bg-golden hover:bg-slate-800 rounded-full px-5 py-2"}/>
        </div>
      </nav>
      

    </div>
  )
}

export default Header