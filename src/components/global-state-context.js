import React, { createContext, useContext, useReducer } from 'react'
import jsonp from 'jsonp'

const StateContext = createContext({})

const initialState = {
  fetchedTweets: [],
  savedTweets: [],
  isFetching: false
}

const actionTypes = {
  REQUEST_TWEETS: 'REQUEST_TWEETS',
  RECEIVE_TWEETS: 'RECEIVE_TWEETS'
}

function fetchTweets(dispatch, query) {
  dispatch({ type: actionTypes.REQUEST_TWEETS })
  jsonp(`http://tweetsaver.herokuapp.com/?q=${query}&count=10`, null, (err, json) => {
    // If I have time I should implement error handling
    if (!err) {
      dispatch({ type: actionTypes.RECEIVE_TWEETS, payload: json.tweets })
    }
  })
}

function actionCreators(dispatch) {
  return {
    fetchTweets: query => fetchTweets(dispatch, query)
  }
}

function reducer(currentState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_TWEETS:
      return { ...currentState, isFetching: true, fetchedTweets: [] }
    case actionTypes.RECEIVE_TWEETS:
      return { ...currentState, isFetching: false, fetchedTweets: action.payload }
    default:
      throw new Error('Invalid action type');
  }
}

function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const actions = actionCreators(dispatch)

  return (
    <StateContext.Provider value={{ state, actions }}>
      {children}
    </StateContext.Provider>
  )
}

function useGlobalState() {
  return useContext(StateContext)
}

export {
  GlobalStateProvider,
  StateContext,
  useGlobalState
}
