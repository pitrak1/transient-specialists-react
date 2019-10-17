import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const Title = props => {
  return <Typography variant='h5'>{props.label}</Typography>
}

Title.propTypes = {
  label: PropTypes.string.isRequired,
}

export default Title
