import 'date-fns'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

function FormDateField(props) {
  const [error, setError] = useState(null)

  const handleChange = value => {
    let errorCheck = null

    if (!value && props.required) {
      errorCheck = `${props.label} is required`
    }

    if (value && isNaN(value.getTime())) {
      errorCheck = `${props.label} is not a valid date`
    }

    props.onChange(props.identifier, value, !errorCheck)
    setError(errorCheck)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk={true}
        disabled={props.disabled}
        disableToolbar
        error={!!error}
        format='MM/dd/yyyy'
        helperText={error}
        label={props.label}
        margin='normal'
        onChange={handleChange}
        value={props.value}
        variant='inline'
      />
    </MuiPickersUtilsProvider>
  )
}

FormDateField.propTypes = {
  disabled: PropTypes.bool,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.object,
}

FormDateField.defaultProps = {
  disabled: false,
  required: false,
  value: null,
}

export default FormDateField
