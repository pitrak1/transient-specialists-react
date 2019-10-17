import 'date-fns'
import React from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

class FormDateField extends React.Component {
  state = {
    error: null,
  }

  handleChange = value => {
    let error = null

    if (!value && this.props.required) {
      error = `${this.props.label} is required`
    }

    if (value && isNaN(value.getTime())) {
      error = `${this.props.label} is not a valid date`
    }

    this.props.onChange(this.props.identifier, value, !error)
    this.setState({ error })
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disabled={this.props.disabled}
          disableToolbar
          error={!!this.state.error}
          format='MM/dd/yyyy'
          helperText={this.state.error}
          label={this.props.label}
          margin='normal'
          onChange={this.handleChange}
          value={this.props.value}
          variant='inline'
        />
      </MuiPickersUtilsProvider>
    )
  }
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
