import jsonp from 'jsonp'

const API_BASE_URL = process.env.API_URL
const DEFAULT_COUNT = 10

const actionTypes = {
  REQUEST_TWEETS: 'REQUEST_TWEETS',
  FAIL_REQUEST: 'FAIL_REQUEST',
  RECEIVE_TWEETS: 'RECEIVE_TWEETS',
  SAVE_TWEET: 'SAVE_TWEET',
  REORDER_SAVED_TWEETS: 'REORDER_SAVED_TWEETS',
  SYNC_FROM_STORAGE: 'SYNC_FROM_STORAGE',
  REMOVE_TWEET: 'REMOVE_TWEET',
  REMOVE_ALL_TWEETS: 'REMOVE_ALL_TWEETS',
  SAVE_ALL_TWEETS: 'SAVE_ALL_TWEETS'
}

function fetchTweets (dispatch, query) {
  if (!query) return
  dispatch({ type: actionTypes.REQUEST_TWEETS })
  jsonp(`${API_BASE_URL}?q=${query}&count=${DEFAULT_COUNT}`, null, (err, json) => {
    if (err) {
      dispatch({ type: actionTypes.FAIL_REQUEST })
    }
    dispatch({ type: actionTypes.RECEIVE_TWEETS, payload: json.tweets })
  })
}

function syncFromStorage (dispatch) {
  const savedTweets = JSON.parse(window.localStorage.getItem('savedTweets')) || []
  dispatch({ type: actionTypes.SYNC_FROM_STORAGE, payload: savedTweets })
}

function actionCreators (dispatch) {
  return {
    fetchTweets: query => fetchTweets(dispatch, query),
    saveTweet: (sourceIndex, destinationIndex) => dispatch({ type: actionTypes.SAVE_TWEET, payload: { sourceIndex, destinationIndex } }),
    reorderSavedTweets: (sourceIndex, destinationIndex) => dispatch({ type: actionTypes.REORDER_SAVED_TWEETS, payload: { sourceIndex, destinationIndex } }),
    removeTweet: sourceIndex => dispatch({ type: actionTypes.REMOVE_TWEET, payload: sourceIndex }),
    removeAllTweets: () => dispatch({ type: actionTypes.REMOVE_ALL_TWEETS }),
    saveAllTweets: () => dispatch({ type: actionTypes.SAVE_ALL_TWEETS }),
    syncFromStorage: () => syncFromStorage(dispatch)
  }
}

export {
  actionTypes,
  actionCreators
}
