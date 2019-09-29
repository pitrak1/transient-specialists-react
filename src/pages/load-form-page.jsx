import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import { Alert } from '@instructure/ui-alerts'
import FormTextInput from '../components/form-text-input.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'

class LoadFormPage extends LoadPage {
  // Abstract method to provide the expected fields and related data
  formFields = () => {}

  // Abstract method to indicate whether the form is valid
  formValid = () => {}

  // Abstract method to be run after a successful submission
  onSubmitSuccess = data => {}

  // Virtual method to allow additional changes to state when form is changed
  handleCustomChange = (identifier, value, valid, state) => {}

  componentDidMount() {
    this.apiGet()
    this.initializeState()
  }

  initializeState = () => {
    const defaultValue = type => {
      switch (type) {
        case 'text':
          return ''
        default:
          return null
      }
    }

    const state = {}
    this.formFields().forEach(field => {
      state[field.identifier] = defaultValue(field.type)
      state[`${field.identifier}Valid`] = false
    })
    this.setState(state)
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid

    this.handleCustomChange(identifier, value, valid, state)

    this.setState(state)
  }

  handleClick = () => {
    const postData = () => {
      const data = {}

      this.formFields().forEach(field => {
        data[field.identifier] = this.state[field.identifier]
      })

      return data
    }

    this.setState()
    const failure = error => {
      this.setState({ loading: false, alert: error })
    }
    this.setState({ loading: true, alert: null })
    api.postCreate(
      this.state.resource,
      postData(),
      this.onSubmitSuccess,
      failure,
    )
  }

  renderOutput = () => {
    const fields = this.formFields().map(field => {
      if (field.type === 'text') {
        return (
          <FormTextInput
            identifier={field.identifier}
            key={field.identifier}
            label={field.label}
            onChange={this.handleChange}
            required={field.required}
            value={this.state[field.identifier]}
          />
        )
      }

      return (
        <FormSelect
          defaultOptionLabel={field.defaultOptionLabel}
          disabled={field.disabled ? field.disabled() : false}
          identifier={field.identifier}
          key={field.identifier}
          label={field.label}
          onChange={this.handleChange}
          options={field.options()}
          required={field.required}
          value={this.state[field.identifier]}
        />
      )
    })

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Heading level='h1' margin='medium'>
          Add {this.state.label}
        </Heading>
        {fields}
        <Button disabled={!this.formValid()} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default LoadFormPage
