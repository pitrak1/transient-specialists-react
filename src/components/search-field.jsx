import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

const SearchField = props => {
  return (
    <div>
      <TextField
        id='search'
        label='Search'
        value={props.searchValue}
        onChange={props.onSearchChange}
      />
      <Button onClick={props.onSearchClick}>Search</Button>
    </div>
  )
}

SearchField.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  value: PropTypes.string,
}

SearchField.defaultProps = {
  value: '',
}

export default SearchField
