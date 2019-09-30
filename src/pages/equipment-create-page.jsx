import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class EquipmentCreatePage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
    modelId: null,
    modelIdValid: false,
    oemId: null,
    oemIdValid: false,
    serialNumber: '',
    serialNumberValid: false,
    typeId: null,
    typeIdValid: false,
  }

  componentDidMount() {
    api.getNew(
      'equipment',
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

    if (identifier === 'oemId') {
      state.modelId = null
      state.modelIdValid = false
    }

    this.setState(state)
  }

  handleClick = () => {
    this.setState({ loading: true, alert: null })
    api.postCreate(
      'equipment',
      {
        serialNumber: this.state.serialNumber,
        modelId: this.state.modelId,
        typeId: this.state.typeId,
      },
      () => {
        this.props.history.push('/')
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
          Add Equipment
        </Heading>
        <FormTextInput
          identifier='serialNumber'
          label='Serial Number'
          onChange={this.handleChange}
          required={true}
          value={this.state.serialNumber}
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
        <FormSelect
          defaultOptionLabel='Select a Model'
          disabled={!this.state.oemId}
          identifier={'modelId'}
          label='Model'
          onChange={this.handleChange}
          options={this.state.data.models.filter(
            model => model.oemId === this.state.oemId,
          )}
          required={true}
          value={this.state.modelId}
        />
        <FormSelect
          defaultOptionLabel='Select a Type'
          disabled={false}
          identifier={'typeId'}
          label='Type'
          onChange={this.handleChange}
          options={this.state.data.types}
          required={true}
          value={this.state.typeId}
        />
        <Button
          disabled={
            !(
              this.state.serialNumberValid &&
              this.state.oemIdValid &&
              this.state.modelIdValid &&
              this.state.typeIdValid
            )
          }
          onClick={this.handleClick}
        >
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(EquipmentCreatePage)
