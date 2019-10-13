import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import FormDateField from '../components/form-date-field.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EquipmentEditPage extends React.Component {
  state = {
    alert: null,
    calCompany: '',
    calCompanyValid: false,
    calDue: null,
    calDueValid: false,
    data: {},
    error: null,
    loading: true,
    modelId: 0,
    modelIdValid: false,
    notes: '',
    notesValid: false,
    oemId: 0,
    oemIdValid: false,
    serialNumber: '',
    serialNumberValid: false,
    typeId: 0,
    typeIdValid: false,
  }

  componentDidMount() {
    api.getEdit(
      'equipment',
      this.props.match.params.id,
      result => {
        const {
          id,
          serialNumber,
          notes,
          calCompany,
          calDue,
          oemId,
          modelId,
          typeId,
        } = result.equipment
        this.setState({
          loading: false,
          data: result,
          id,
          serialNumber,
          serialNumberValid: true,
          notes,
          notesValid: true,
          calCompany,
          calCompanyValid: true,
          calDue: calDue ? new Date(calDue) : null,
          calDueValid: true,
          oemId,
          oemIdValid: true,
          modelId,
          modelIdValid: true,
          typeId,
          typeIdValid: true,
        })
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
    api.patchUpdate(
      'equipment',
      {
        id: this.state.id,
        calCompany: this.state.calCompany,
        calDue: this.state.calDue ? this.state.calDue.toISOString() : null,
        serialNumber: this.state.serialNumber,
        modelId: this.state.modelId,
        notes: this.state.notes,
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
      return <CircularProgress size={120} />
    }

    if (this.state.error) {
      return <div>{this.state.error}</div>
    }

    return (
      <Grid container>
        {this.state.alert && (
          <Grid item xs={12}>
            {this.state.alert}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h6'>Edit Equipment</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='serialNumber'
            label='Serial Number'
            onChange={this.handleChange}
            required={true}
            value={this.state.serialNumber}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='notes'
            label='Notes'
            onChange={this.handleChange}
            required={false}
            value={this.state.notes}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='calCompany'
            label='Calibration Company'
            onChange={this.handleChange}
            required={false}
            value={this.state.calCompany}
          />
        </Grid>
        <Grid item xs={12}>
          <FormDateField
            identifier='calDue'
            label='Calibration Due'
            onChange={this.handleChange}
            value={this.state.calDue}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(EquipmentEditPage)
