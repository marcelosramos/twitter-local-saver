import React from 'react'

import css from './header.module.css'

function Header ({ appName }) {
  return (
    <div className={css.header}>
      <h1>{appName}</h1>
      <hr />
    </div>
  )
}

export default Header
