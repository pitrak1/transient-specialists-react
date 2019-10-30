import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

class FormTextField extends React.Component {
  state = {
    error: null,
  }

  handleChange = event => {
    const value = event.target.value
    let error = null

    if (!value.length && this.props.required) {
      error = `${this.props.label} is required`
    }

    if (value.length > 255) {
      error = `${this.props.label} must be 255 characters or fewer`
    }

    this.props.onChange(this.props.identifier, value, !error)
    this.setState({ error })
  }

  render() {
    return (
      <TextField
        disabled={this.props.disabled}
        error={!!this.state.error}
        helperText={this.state.error}
        label={this.props.label}
        onChange={this.handleChange}
        value={this.props.value}
      />
    )
  }
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