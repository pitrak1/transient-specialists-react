import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import ErrorAlert from './error-alert.jsx'
import Spinner from './spinner.jsx'
import Title from './title.jsx'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import FormDateField from '../components/form-date-field.jsx'

export default class EventsForm extends React.Component {
  state = {
    alert: null,
    error: null,
    loading: true,
    companyNotes: '',
    companyNotesValid: true,
    endDate: null,
    endDateValid: true,
    jobNumber: '',
    jobNumberValid: true,
    loading: false,
    startDate: null,
    startDateValid: true,
    status: 0,
    statusValid: false,
    updatedAt: null,
    updatedAtValid: true,
  }

  componentDidMount() {
    this.props.get(
      this.props.eventId,
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
    this.setState(state)
  }

  handleClick = () => {
    this.setState({ loading: true, alert: null })
    this.props.submit(
      this.props.equipmentId,
      this.state,
      result => {
        this.props.history.push(`/equipment/${this.props.equipmentId}`)
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
          <FormSelect
            defaultOptionLabel='Select a Status'
            identifier='status'
            label='Status'
            onChange={this.handleChange}
            options={[
              { id: 1, name: 'IN' },
              { id: 2, name: 'OUT' },
              { id: 3, name: 'READY' },
            ]}
            required={true}
            value={this.state.status}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='jobNumber'
            label='Job Number'
            onChange={this.handleChange}
            value={this.state.jobNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='companyNotes'
            label='Company Notes'
            onChange={this.handleChange}
            value={this.state.companyNotes}
          />
        </Grid>
        <Grid item xs={12}>
          <FormDateField
            identifier='startDate'
            label='Start Date'
            onChange={this.handleChange}
            value={this.state.startDate}
          />
        </Grid>
        <Grid item xs={12}>
          <FormDateField
            identifier='endDate'
            label='End Date'
            onChange={this.handleChange}
            value={this.state.endDate}
          />
        </Grid>
        <Grid item xs={12}>
          <FormDateField
            identifier='updatedAt'
            label='Updated At'
            onChange={this.handleChange}
            value={this.state.updatedAt}
          />
        </Grid>
        <Grid item xs={12}>
          <Button disabled={!this.state.statusValid} onClick={this.handleClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

EventsForm.propTypes = {
  equipmentId: PropTypes.string.isRequired,
  eventId: PropTypes.string,
  get: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

EventsForm.defaultProps = {
  eventId: null,
}