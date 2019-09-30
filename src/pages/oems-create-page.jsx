import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class OemsCreatePage extends React.Component {
  state = {
    alert: null,
    loading: false,
    name: '',
    nameValid: false,
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleClick = () => {
    this.setState({ loading: true, alert: null })
    api.postCreate(
      'oems',
      { name: this.state.name },
      () => {
        this.props.history.push('/oems')
      },
      error => {
        this.setState({ loading: false, alert: error })
      },
    )
  }

  render() {
    if (this.state.loading) {
      return <Spinner renderTitle='Loading' size='large' />
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
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
        <Button disabled={!this.state.nameValid} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(OemsCreatePage)
