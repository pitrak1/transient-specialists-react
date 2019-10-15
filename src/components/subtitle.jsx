import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Subtitle = props => {
  return <Typography variant='h6'>{props.label}</Typography>
}

Subtitle.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Subtitle
