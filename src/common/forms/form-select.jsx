import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'

function FormSelect(props) {
  const [error, setError] = useState(null)

  const options = () => {
    const startingOption = (
      <MenuItem key='0' value={0}>
        {props.defaultOptionLabel}
      </MenuItem>
    )
    const options = props.options.map(option => (
      <MenuItem key={option.id.toString()} value={option.id}>
        {option.name}
      </MenuItem>
    ))
    return [startingOption, ...options]
  }

  const handleChange = event => {
    const value = event.target.value
    const valid = !props.required || !!value
    const errorCheck = !valid ? `${props.label} is required` : null

    props.onChange(props.identifier, value, valid)
    setError(errorCheck)
  }

  return (
    <div>
      <FormControl disabled={props.disabled} error={!!error}>
        <InputLabel>{props.label}</InputLabel>
        <Select onChange={handleChange} value={props.value}>
          {options()}
        </Select>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    </div>
  )
}

FormSelect.propTypes = {
  defaultOptionLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  value: PropTypes.number,
}

FormSelect.defaultProps = {
  disabled: false,
  required: false,
}

export default FormSelect
