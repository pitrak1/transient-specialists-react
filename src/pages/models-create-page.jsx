import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class ModelsCreatePage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
    name: '',
    nameValid: false,
    oemId: null,
    oemIdValid: false,
  }

  componentDidMount() {
    api.getNew(
      'models',
      result => {
        this.setState({ loading: false, data: result })
      },
      error => {
        this.setState({ loading: false, error })
      },
    )
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
      'models',
      { name: this.state.name, oemId: this.state.oemId },
      () => {
        this.props.history.push('/models')
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

    if (this.state.error) {
      return <Alert variant='error'>{this.state.error}</Alert>
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
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
          identifier={'oemId'}
          label='OEM'
          onChange={this.handleChange}
          options={this.state.data.oems}
          required={true}
          value={this.state.oemId}
        />
        <Button
          disabled={!(this.state.nameValid && this.state.oemIdValid)}
          onClick={this.handleClick}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(ModelsCreatePage)
