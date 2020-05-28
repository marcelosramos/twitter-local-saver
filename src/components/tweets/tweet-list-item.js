import React from 'react'
import moment from 'moment'
import parse from 'html-react-parser'

import { FlexRow } from '../layout'
import css from './tweets.module.css'

function Avatar ({ url }) {
  return (
    <div>
      <img className={css.avatar} src={url} alt='Avatar' />
    </div>
  )
}

/*
  userMentionEntities : [ {
    start : 57,
    end : 65,
    screenName : 'ewarren'
  } ],
*/

function linkMentions (text, mentions) {
  let mentionLinkedText = ''
  let previousEnd = 0

  mentions.forEach(({start, end, screenName}) => {
    mentionLinkedText += `${text.slice(previousEnd, start)}<a href="https://twitter.com/${screenName}">@${screenName}</a>`
    previousEnd = end
  })

  if (previousEnd < text.length) {
    mentionLinkedText += text.slice(previousEnd)
  }
  return parse(mentionLinkedText)
}

function TweetText({ value, mentions }) { 
  const parsedText = linkMentions(value, mentions)
  return (
    <div>
      <p className={css.text}>{parsedText}</p>
    </div>
  )
}

function TweetListItem({ tweet }) {
  const { text, createdAt, userMentionEntities } = tweet
  const { name, screenName, profileImageUrlHttps: imageUrl } = tweet.user
  return (
    <li className={css.item}>
      <FlexRow>
        <Avatar url={imageUrl} />
        <div className={css.content}>
          <FlexRow className={css.header}>
            <span><strong>{name}</strong></span>
            <span className={css.screenName}>@{screenName}</span>
            <span>{moment(createdAt).format('MMM DD')}</span>
          </FlexRow>
          <TweetText value={text} mentions={userMentionEntities} />
        </div>
      </FlexRow>
    </li>
  )
}

export default TweetListItem