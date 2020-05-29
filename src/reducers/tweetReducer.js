import { actionTypes } from '../actions/tweetActions'

function syncToStorage (savedTweets) {
  window.localStorage.setItem('savedTweets', JSON.stringify(savedTweets))
}

function requestTweets (currentState) {
  return { ...currentState, isFetching: true, fetchedTweets: [] }
}

function failRequest (currentState) {
  return { ...currentState, isFetching: false, fetchedTweets: [] }
}

function receiveTweets (currentState, payload) {
  return { ...currentState, isFetching: false, fetchedTweets: payload }
}

function saveTweet (currentState, payload) {
  const { sourceIndex, destinationIndex } = payload
  const tweetToSave = { ...currentState.fetchedTweets[sourceIndex] }
  if (currentState.savedTweets.some(tweet => tweet.idStr === tweetToSave.idStr)) {
    return currentState
  }
  const newFetchedTweets = [...currentState.fetchedTweets]
  const newSavedTweets = [...currentState.savedTweets]

  newFetchedTweets.splice(sourceIndex, 1)
  newSavedTweets.splice(destinationIndex, 0, tweetToSave)
  syncToStorage(newSavedTweets)
  return { ...currentState, savedTweets: newSavedTweets, fetchedTweets: newFetchedTweets }
}

function reorderSavedTweets (currentState, payload) {
  const { sourceIndex, destinationIndex } = payload
  const tweetToMove = { ...currentState.savedTweets[sourceIndex] }
  const newSavedTweets = [...currentState.savedTweets]
  newSavedTweets.splice(sourceIndex, 1)
  newSavedTweets.splice(destinationIndex, 0, tweetToMove)
  syncToStorage(newSavedTweets)
  return { ...currentState, savedTweets: newSavedTweets }
}

function removeTweet (currentState, payload) {
  const newSavedTweets = [...currentState.savedTweets]
  newSavedTweets.splice(payload, 1)
  syncToStorage(newSavedTweets)
  return { ...currentState, savedTweets: newSavedTweets }
}

function removeAllTweets (currentState) {
  const newSavedTweets = []
  syncToStorage(newSavedTweets)
  return { ...currentState, savedTweets: newSavedTweets }
}

function saveAllTweets (currentState) {
  const newSavedTweets = [...currentState.fetchedTweets]
  const newFetchedTweets = []
  syncToStorage(newSavedTweets)
  return { ...currentState, fetchedTweets: newFetchedTweets, savedTweets: newSavedTweets }
}

function syncFromStorage (currentState, payload) {
  return { ...currentState, savedTweets: payload }
}

function reducer (currentState, action) {
  const { type, payload } = action
  switch (type) {
    case actionTypes.REQUEST_TWEETS:
      return requestTweets(currentState)
    case actionTypes.FAIL_REQUEST:
      return failRequest(currentState)
    case actionTypes.RECEIVE_TWEETS:
      return receiveTweets(currentState, payload)
    case actionTypes.SAVE_TWEET:
      return saveTweet(currentState, payload)
    case actionTypes.REORDER_SAVED_TWEETS:
      return reorderSavedTweets(currentState, payload)
    case actionTypes.REMOVE_TWEET:
      return removeTweet(currentState, payload)
    case actionTypes.REMOVE_ALL_TWEETS:
      return removeAllTweets(currentState)
    case actionTypes.SAVE_ALL_TWEETS:
      return saveAllTweets(currentState)
    case actionTypes.SYNC_FROM_STORAGE:
      return syncFromStorage(currentState, payload)
    default:
      throw new Error('Invalid action type')
  }
}

export default reducer
