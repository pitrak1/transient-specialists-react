import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '@instructure/ui-text-input'

class FormTextInput extends React.Component {
  state = {
    messages: [],
  }

  handleChange = (_e, value) => {
    const messages = []

    if (!value.length && this.props.required) {
      messages.push({ type: 'error', text: `${this.props.label} is required` })
    }

    if (value.length > 255) {
      messages.push({
        type: 'error',
        text: `${this.props.label} must be 255 characters or fewer`,
      })
    }

    this.props.onChange(this.props.identifier, value, !messages.length)
    this.setState({ messages })
  }

  render() {
    return (
      <TextInput
        messages={this.state.messages}
        onChange={this.handleChange}
        renderLabel={this.props.label}
        value={this.props.value}
      />
    )
  }
}

FormTextInput.propTypes = {
  identifier: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}

export default FormTextInput
