import React from 'react'
import classnames from 'classnames'

import css from './flex-row.module.css'

function FlexRow({ children, className }) {
  return (
    <div className={classnames(css.flexRow, className)}>
      {children}   
    </div>
  )
}

export default FlexRow