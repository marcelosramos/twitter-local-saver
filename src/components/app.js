import React from 'react'

import { MainContainer, Header, ViewContainer } from './layout'
import { TweetSaverView } from './views'

function App() {
  return (
    <GlobalStateProvider>
      <MainContainer>
        <Header appName='Tweet Saver' />
        <ViewContainer>
          <TweetSaverView />
        </ViewContainer>
      </MainContainer>      
    </GlobalStateProvider>
  )
}

export default App