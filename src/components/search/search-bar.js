import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { FlexRow } from '../layout'
import css from './search-bar.module.css'

function SearchBar () {
  return (
    <FlexRow className={css.searchBar}>
      <input placeholder='Search Twitter' />
      <button><FontAwesomeIcon icon={faSearch} /></button>
    </FlexRow>
  )
}

export default SearchBar