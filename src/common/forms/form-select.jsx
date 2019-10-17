import React from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'

class FormSelect extends React.Component {
  state = {
    error: null,
  }

  options = () => {
    const startingOption = (
      <MenuItem key='0' value={0}>
        {this.props.defaultOptionLabel}
      </MenuItem>
    )
    const options = this.props.options.map(option => (
      <MenuItem key={option.id.toString()} value={option.id}>
        {option.name}
      </MenuItem>
    ))
    return [startingOption, ...options]
  }

  handleChange = event => {
    const value = event.target.value
    const valid = !this.props.required || !!value
    const error = !valid ? `${this.props.label} is required` : null

    this.props.onChange(this.props.identifier, value, valid)
    this.setState({ error })
  }

  render() {
    return (
      <div>
        <FormControl disabled={this.props.disabled} error={!!this.state.error}>
          <InputLabel>{this.props.label}</InputLabel>
          <Select onChange={this.handleChange} value={this.props.value}>
            {this.options()}
          </Select>
          <FormHelperText>{this.state.error}</FormHelperText>
        </FormControl>
      </div>
    )
  }
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
