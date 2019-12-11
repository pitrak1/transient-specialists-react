import React from 'react'
import PropTypes from 'prop-types'
import { Button, Toolbar } from '@material-ui/core'
import Title from 'common/display/title'

function DetailsHeader(props) {
  return (
    <Toolbar>
      <Title label={props.label} />
      <Button onClick={props.onClick}>Edit</Button>
    </Toolbar>
  )
}

DetailsHeader.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default DetailsHeader
