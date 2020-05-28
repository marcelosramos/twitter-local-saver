import React from 'react'
import classnames from 'classnames'

import TweetListItem from './tweet-list-item'
import css from './tweets.module.css'


function TweetList({ tweets, className }) {
  const tweetListItems = tweets.map(tweet => <TweetListItem tweet={tweet} />)
  return (
    <div className={classnames(css.tweetList, className)}>
      <ul>
        {tweetListItems}
      </ul>
    </div>
  )
}

export default TweetList