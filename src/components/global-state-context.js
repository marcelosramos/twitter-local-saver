import React, { createContext, useContext, useReducer } from 'react'

import tweetReducer from '../reducers/tweetReducer'
import { actionCreators } from '../actions/tweetActions'

const StateContext = createContext({})

const initialState = {
  fetchedTweets: [],
  savedTweets: [],
  isFetching: false
}

function GlobalStateProvider ({ children }) {
  const [state, dispatch] = useReducer(tweetReducer, initialState)
  const actions = actionCreators(dispatch)

  return (
    <StateContext.Provider value={{ state, actions }}>
      {children}
    </StateContext.Provider>
  )
}

function useGlobalState () {
  return useContext(StateContext)
}

export {
  GlobalStateProvider,
  StateContext,
  useGlobalState
}
