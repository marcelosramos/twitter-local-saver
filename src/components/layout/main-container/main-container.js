import React from 'react'

import FlexColumn from '../flex-column/flex-column'

function MainContainer({ children }) {
  return (
    <FlexColumn>
      {children}   
    </FlexColumn>
  )
}

export default MainContainer