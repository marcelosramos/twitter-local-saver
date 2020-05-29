import React, { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faTrash, faEraser } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'

import { useGlobalState } from '../../global-state-context'
import { FlexRow, FlexColumn } from '../../layout'
import SearchBar from '../../search/search-bar'
import TweetList from '../../tweets/tweet-list'
import css from './tweet-saver.module.css'

function TweetSaver () {
  const { state, actions } = useGlobalState()

  function handleStorageEvent (storageEvent) {
    if (storageEvent.key !== 'savedTweets') return
    actions.syncFromStorage()
  }

  useEffect(() => {
    actions.syncFromStorage()
    const eventListener = window.addEventListener('storage', handleStorageEvent, false)
    return () => window.removeEventListener('storage', eventListener)
  }, [])

  const handleDragFromFetchedColumn = (source, destination) => {
    if (destination.droppableId !== 'savedColumn') return
    actions.saveTweet(source.index, destination.index)
  }

  const handleDragFromSavedColumn = (source, destination) => {
    if (destination.droppableId === 'savedColumn') {
      return actions.reorderSavedTweets(source.index, destination.index)
    }
    if (destination.droppableId === 'trash') {
      console.log(source.index)
      return actions.removeTweet(source.index)
    }
  }

  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return
    if (source.droppableId === 'fetchedColumn') {
      return handleDragFromFetchedColumn(source, destination)
    } if (source.droppableId === 'savedColumn') {
      return handleDragFromSavedColumn(source, destination)
    }
  }

  const handleSaveAllClick = () => actions.saveAllTweets()

  const handleResetSavedList = () => actions.removeAllTweets()

  const handleSubmit = query => {
    actions.fetchTweets(query)
  }

  const SearchColumn = () => (
    <FlexColumn className={css.searchColumn}>
      <SearchBar onSubmit={handleSubmit} isFetching={state.isFetching} />
      <TweetList className={css.tweetList} tweets={state.fetchedTweets} id='fetchedColumn' />
      <div className={css.columnFooter}>
        <button onClick={handleSaveAllClick}>Save All <FontAwesomeIcon icon={faCartPlus} /></button>
      </div>
    </FlexColumn>
  )

  const MiddleColumn = () => (
    <FlexColumn className={css.middleColumn}>
      <span>Drag tweets</span>
      <span>----------&gt;</span>
      <span>to save</span>
    </FlexColumn>
  )

  const SavedColumn = () => (
    <FlexColumn className={css.savedColumn}>
      <FlexRow className={css.savedColumnHeader}>
        <span>Saved Tweets</span>
        <button onClick={handleResetSavedList}>Reset Saved List <FontAwesomeIcon icon={faEraser} /></button>
      </FlexRow>
      <TweetList className={css.tweetList} tweets={state.savedTweets} id='savedColumn' />
      <Droppable droppableId='trash'>
        {(provided, snapshot) => (
          <div
            className={classnames(css.columnFooter, css.trash, { [css.isDestination]: snapshot.isDraggingOver })}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span>Drag here to delete (saved tweets only) <FontAwesomeIcon icon={faTrash} /></span>
          </div>
        )}
      </Droppable>
    </FlexColumn>
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <FlexRow className={css.tweetSaverView}>
        <SearchColumn />
        <MiddleColumn />
        <SavedColumn />
      </FlexRow>
    </DragDropContext>
  )
}

export default TweetSaver
