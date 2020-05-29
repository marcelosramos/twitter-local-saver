import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { FlexRow } from '../layout'
import css from './search-bar.module.css'

function SearchBar ({ onSubmit, isFetching }) {
  const [query, setQuery] = useState('')

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    onSubmit(query)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FlexRow className={css.searchBar}>
        <input placeholder='Search Twitter' onChange={handleQueryChange} value={query} disabled={isFetching} />
        <button type='submit' disabled={isFetching || !query}>
          <FontAwesomeIcon icon={isFetching ? faSpinner : faSearch} spin={isFetching} />
        </button>
      </FlexRow>
    </form>
  )
}

export default SearchBar
