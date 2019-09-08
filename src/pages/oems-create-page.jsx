import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class OemsCreatePage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.name = ''
    this.state.nameValid = false
  }

  apiGet = () => {
    api.dummy(this.apiSuccess, this.apiFailure)
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleClick = () => {
    const { name } = this.state
    this.setState()
    const success = data => {
      this.props.history.push('/oems')
    }
    const failure = error => {
      this.setState({ loading: false, alert: error })
    }
    this.setState({ loading: true, alert: null })
    api.createOem({ name }, success, failure)
  }

  formValid = () => this.state.nameValid

  renderOutput = () => {
    return (
      <div>
        <Heading level='h1' margin='medium'>
          Add OEM
        </Heading>
        <FormTextInput
          identifier='name'
          label='Name'
          onChange={this.handleChange}
          required={true}
          value={this.state.name}
        />
        <Button disabled={!this.formValid()} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(OemsCreatePage)
