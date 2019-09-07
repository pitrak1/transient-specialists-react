import React from 'react'
import LoadPage from './load-page.jsx'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
import FormTextInput from '../components/form-text-input.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'

class EquipmentCreatePage extends LoadPage {
  constructor(props) {
    super(props)

    this.state.modelId = null
    this.state.modelIdValid = false
    this.state.oemId = null
    this.state.oemIdValid = false
    this.state.serialNumber = ''
    this.state.serialNumberValid = false
    this.state.typeId = null
    this.state.typeIdValid = false
  }

  apiGet = () => {
    api.getNew('equipment', this.apiSuccess, this.apiFailure)
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
    const { serialNumber, modelId, typeId } = this.state
    this.setState()
    const success = data => {
      console.log(data)
      // navigate('/')
    }
    const failure = error => {
      console.log(error)
      // this.setState({ loading: false, alert: error })
    }
    this.setState({ loading: true, alert: null })
    // createEquipment({ serialNumber, modelId, typeId }, success, failure)
  }

  oemOptions = () => this.state.data.oems.map(oem => api.convertObject(oem))
  modelOptions = () =>
    this.state.data.models
      .filter(model => model.oem_id === this.state.oemId)
      .map(model => api.convertObject(model))
  typeOptions = () => this.state.data.types.map(type => api.convertObject(type))
  formValid = () =>
    this.state.serialNumberValid &&
    this.state.oemIdValid &&
    this.state.modelIdValid &&
    this.state.typeIdValid

  renderOutput = () => {
    return (
      <div>
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
          identifier='oemId'
          label='OEM'
          onChange={this.handleChange}
          options={this.oemOptions()}
          required={true}
          value={this.state.oemId}
        />
        <FormSelect
          defaultOptionLabel='Select a Model'
          disabled={!this.state.oemId}
          identifier='modelId'
          label='Model'
          onChange={this.handleChange}
          options={this.modelOptions()}
          required={true}
          value={this.state.modelId}
        />
        <FormSelect
          defaultOptionLabel='Select a Type'
          disabled={false}
          identifier='typeId'
          label='Type'
          onChange={this.handleChange}
          options={this.typeOptions()}
          required={true}
          value={this.state.typeId}
        />
        <Button disabled={!this.formValid()} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default EquipmentCreatePage
