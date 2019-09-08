import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class ModelsCreatePage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.name = ''
    this.state.nameValid = false
    this.state.oemId = null
    this.state.oemIdValid = false
  }

  apiGet = () => {
    api.getNew('models', this.apiSuccess, this.apiFailure)
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleClick = () => {
    const { name, oemId } = this.state
    this.setState()
    const success = data => {
      this.props.history.push('/models')
    }
    const failure = error => {
      this.setState({ loading: false, alert: error })
    }
    this.setState({ loading: true, alert: null })
    api.createModel({ name, oemId }, success, failure)
  }

  oemOptions = () => this.state.data.oems.map(oem => api.convertObject(oem))
  formValid = () => this.state.nameValid && this.state.oemIdValid

  renderOutput = () => {
    return (
      <div>
        <Heading level='h1' margin='medium'>
          Add Model
        </Heading>
        <FormTextInput
          identifier='name'
          label='Name'
          onChange={this.handleChange}
          required={true}
          value={this.state.name}
        />
        <FormSelect
          defaultOptionLabel='Select an OEM'
          disabled={false}
          identifier='oemId'
          label='OEM'
          onChange={this.handleChange}
          options={this.oemOptions()}
          required={true}
          value={this.state.oemId}
        />
        <Button disabled={!this.formValid()} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(ModelsCreatePage)
