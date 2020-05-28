import React from 'react'

import { FlexRow, FlexColumn } from '../../layout'
import SearchBar from '../../search/search-bar'
import TweetList from '../../tweets/tweet-list'
import css from './tweet-saver.module.css'

const tweet = {
  createdAt: 1590647646000,
  id: 1265894098797498368,
  text: '@funder: BREAKING: marcelosramos@gmail.com Trump in email “the @crisis we face underscores the necessity for real leadership in the WH.” Biden will g…',
  user: {
    name: 'Anna Bellard 🏠😷stay healthy 🍑again!',
    screenName: 'AnnaBellard6',
    profileImageUrlHttps: 'https://pbs.twimg.com/profile_images/1239984635456770048/Ha7e6s8k_normal.jpg'
  },
  userMentionEntities: []
}

const tweet2 = {
  createdAt: 1590614266000,
  id: 1265754092233617409,
  text: 'aughhhhhhhh   horrifying   this should be illegal\nwheres @ewarren https://t.co/lR6JWmE3GJ',
  user: {
    name: 'lou',
    screenName: 'eliaswatama',
    profileImageUrlHttps: 'https://pbs.twimg.com/profile_images/864581235460329472/r9UYX3Qt_normal.jpg'
  },
  userMentionEntities : [ {
    start : 57,
    end : 65,
    screenName : 'ewarren'
  } ],
}

const fetchedTweets = []
const savedTweets = []

function SearchColumn() {
  return (
    <FlexColumn className={css.searchColumn}>
      <SearchBar />
      <TweetList className={css.tweetList} tweets={fetchedTweets} />
    </FlexColumn>
  )
}

function MiddleColumn() {
  return (
    <FlexColumn className={css.middleColumn}>
      <span>Drag tweets</span>
      <span>----------></span>
      <span>to save</span>
    </FlexColumn>
  )
}

function SavedColumn() {
  return (
    <FlexColumn className={css.savedColumn}>
      <span>Saved Tweets</span>
      <TweetList className={css.tweetList} tweets={savedTweets} />
    </FlexColumn>
  )
}

function TweetSaver() {
  return (
    <FlexRow className={css.tweetSaverView}>
      <SearchColumn />
      <MiddleColumn />
      <SavedColumn />
    </FlexRow>
  )
}

export default TweetSaver