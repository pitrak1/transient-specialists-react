import React from 'react'
import PropTypes from 'prop-types'
import Title from './title.jsx'
import SearchField from './search-field.jsx'
import { Button, Toolbar } from '@material-ui/core'

const IndexToolbar = props => {
  return (
    <Toolbar>
      <Title label={props.title} />
      <Button onClick={props.onAddClick}>Add</Button>
      <div style={{ flexGrow: 1 }}></div>
      <SearchField
        onSearchChange={props.onSearchChange}
        onSearchClick={props.onSearchClick}
        value={props.searchValue}
      />
    </Toolbar>
  )
}

IndexToolbar.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  title: PropTypes.string.isRequired,
}

IndexToolbar.defaultProps = {
  searchValue: '',
}

export default IndexToolbar
