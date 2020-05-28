import React from 'react'

import css from './view-container.module.css'

function ViewContainer({ children }) {
  return (
    <div className={css.viewContainer}>
      {children}   
    </div>
  )
}

export default ViewContainer