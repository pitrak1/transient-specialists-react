import React from 'react'
import PropTypes from 'prop-types'
import { Button, Toolbar } from '@material-ui/core'

function EquipmentDetailsDeleteButton(props) {
  return (
    <Toolbar>
      <Button onClick={props.onDeleteClick} color='primary' variant='contained'>
        Delete Equipment
      </Button>
    </Toolbar>
  )
}

EquipmentDetailsDeleteButton.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
}

export default EquipmentDetailsDeleteButton
