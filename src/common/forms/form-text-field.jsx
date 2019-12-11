import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

function FormTextField(props) {
  const [error, setError] = useState(null)

  const handleChange = event => {
    const value = event.target.value
    let errorCheck = null

    if (!value.length && props.required) {
      errorCheck = `${props.label} is required`
    }

    if (value.length > 255) {
      errorCheck = `${props.label} must be 255 characters or fewer`
    }

    props.onChange(props.identifier, value, !errorCheck)
    setError(errorCheck)
  }

  return (
    <TextField
      disabled={props.disabled}
      error={!!error}
      helperText={error}
      label={props.label}
      onChange={handleChange}
      value={props.value}
    />
  )
}

FormTextField.propTypes = {
  disabled: PropTypes.bool,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
}

FormTextField.defaultProps = {
  disabled: false,
  required: false,
  value: '',
}

export default FormTextField
