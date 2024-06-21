import React from 'react'
import { NavLink } from 'react-router-dom'

export const Button = ({content, path, style}) => {
  return (
    <button className={style}>
        <NavLink to={path}>
            {content}
        </NavLink>
    </button>
  )
}
