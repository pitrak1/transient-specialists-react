import React from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'

const SearchField = props => {
  const onKeyPress = event => {
    if (event.charCode === 13) {
      props.onSearchClick()
    }
  }

  return (
    <div>
      <TextField
        id='search'
        inputProps={{ onKeyPress }}
        label='Search'
        value={props.value}
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
