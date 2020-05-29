import React from 'react'
import classnames from 'classnames'
import { Droppable } from 'react-beautiful-dnd'

import TweetListItem from './tweet-list-item'
import css from './tweets.module.css'


function TweetList({ tweets, className, id }) {
  const tweetListItems = tweets.map((tweet, index) => <TweetListItem tweet={tweet} key={tweet.id} index={index} droppableId={id} />)
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div className={classnames(css.tweetList, className, { [css.isDestination]: snapshot.isDraggingOver })}>
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {tweetListItems}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  )
}

export default TweetList
