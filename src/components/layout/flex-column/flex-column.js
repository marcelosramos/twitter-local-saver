import React from 'react'
import classnames from 'classnames'

import css from './flex-column.module.css'

function FlexColumn ({ children, className }) {
  return (
    <div className={classnames(css.flexColumn, className)}>
      {children}
    </div>
  )
}

export default FlexColumn
