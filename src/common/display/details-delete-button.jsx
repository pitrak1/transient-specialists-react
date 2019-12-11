import React from 'react'
import PropTypes from 'prop-types'
import { Button, Toolbar } from '@material-ui/core'

function DetailsDeleteButton(props) {
  return (
    <Toolbar>
      <Button onClick={props.onDeleteClick} color='primary' variant='contained'>
        {props.label}
      </Button>
    </Toolbar>
  )
}

DetailsDeleteButton.propTypes = {
  label: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
}

export default DetailsDeleteButton
