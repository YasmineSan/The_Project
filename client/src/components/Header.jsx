import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/articles">Articles</NavLink>
      </nav>
      

    </div>
  )
}

export default Header