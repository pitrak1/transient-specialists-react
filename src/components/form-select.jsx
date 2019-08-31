import React from 'react'
import PropTypes from 'prop-types'
import { Select } from '@instructure/ui-forms'

class FormSelect extends React.Component {
  state = {
    messages: [],
  }

  options = () => {
    const startingOption = (
      <option key='0' value='0'>
        {this.props.defaultOptionLabel}
      </option>
    )
    const options = this.props.options.map(option => (
      <option key={option.id.toString()} value={option.id.toString()}>
        {option.name}
      </option>
    ))
    return [startingOption, ...options]
  }

  handleChange = (_e, option) => {
    const value = parseInt(option.value) || null
    const valid = !this.props.required || !!value
    const messages = !valid
      ? [{ type: 'error', text: `${this.props.label} is required` }]
      : []

    this.props.onChange(this.props.identifier, value, valid)
    this.setState({ messages })
  }

  render() {
    return (
      <div>
        <Select
          disabled={this.props.disabled}
          label={this.props.label}
          messages={this.state.messages}
          onChange={this.handleChange}
          selectedOption={this.props.value ? this.props.value.toString() : '0'}
        >
          {this.options()}
        </Select>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

FormSelect.propTypes = {
  defaultOptionLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.number,
}

export default FormSelect
