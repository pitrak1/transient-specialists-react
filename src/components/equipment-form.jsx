import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import ErrorAlert from './error-alert.jsx'
import Spinner from './spinner.jsx'
import Title from './title.jsx'
import FormTextField from './form-text-field.jsx'
import FormSelect from './form-select.jsx'
import FormDateField from './form-date-field.jsx'

export default class EquipmentForm extends React.Component {
  state = {
    alert: null,
    calCompany: '',
    calCompanyValid: false,
    calDue: null,
    calDueValid: false,
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
    this.props.get(
      this.props.id,
      result => {
        this.setState({ loading: false, ...result })
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
    this.props.submit(
      this.state,
      result => {
        this.props.history.push('/')
      },
      error => {
        this.setState({ loading: false, alert: error })
      },
    )
  }

  render() {
    if (this.state.loading) {
      return <Spinner />
    }

    if (this.state.error) {
      return <ErrorAlert text={this.state.error} />
    }

    return (
      <Grid container>
        {this.state.alert && <ErrorAlert text={this.state.alert} />}
        <Grid item xs={12}>
          <Title label={this.props.title} />
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
            options={this.state.oems}
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
            options={this.state.models.filter(
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
            options={this.state.types}
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

EquipmentForm.propTypes = {
  get: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  id: PropTypes.string,
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

EquipmentForm.defaultProps = {
  id: null,
}
