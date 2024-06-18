import React from 'react'
import { NavLink } from 'react-router-dom'

export const Button = ({content, path, style}) => {
  return (
    <button>
        <NavLink to={path} className={style}>
            {content}
        </NavLink>
    </button>
  )
}
