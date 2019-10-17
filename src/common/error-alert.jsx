import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@instructure/ui-alerts'

const ErrorAlert = props => {
  const closeLabel = props.closable ? 'Close' : null
  return (
    <Alert variant='error' renderCloseButtonLabel={closeLabel}>
      {props.text}
    </Alert>
  )
}

ErrorAlert.propTypes = {
  closable: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default ErrorAlert
