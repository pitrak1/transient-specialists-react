import React from 'react'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EquipmentCreatePage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
    modelId: 0,
    modelIdValid: false,
    oemId: 0,
    oemIdValid: false,
    serialNumber: '',
    serialNumberValid: false,
    typeId: 0,
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
      state.modelId = 0
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
      return <CircularProgress />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <div>
        {this.state.alert && <div>{this.state.alert}</div>}
        <Typography variant='h5'>Add Equipment</Typography>
        <FormTextField
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
