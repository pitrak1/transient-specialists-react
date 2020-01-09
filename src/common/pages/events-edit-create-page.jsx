import React from 'react'
import PropTypes from 'prop-types'
import { Button, Grid } from '@material-ui/core'
import ErrorAlert from 'common/display/error-alert'
import Spinner from 'common/display/spinner'
import Title from 'common/display/title'
import FormTextField from 'common/forms/form-text-field'
import FormSelect from 'common/forms/form-select'
import FormDateField from 'common/forms/form-date-field'

export default class EventsEditCreatePage extends React.Component {
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
    startDate: null,
    startDateValid: true,
    status: 0,
    statusValid: false,
    updatedAt: this.props.eventId ? null : new Date(),
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
        this.props.history.push(`/equipment/details/${this.props.equipmentId}`)
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
      return <ErrorAlert closable={false} text={this.state.error} />
    }

    return (
      <Grid container>
        {this.state.alert && (
          <ErrorAlert closable={true} text={this.state.alert} />
        )}
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
              { id: 4, name: 'SOLD' },
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
        {this.props.eventId && (
          <Grid item xs={12}>
            <FormDateField
              identifier='updatedAt'
              label='Updated At'
              onChange={this.handleChange}
              value={this.state.updatedAt}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button disabled={!this.state.statusValid} onClick={this.handleClick}>
            Submit
          </Button>
        </Grid>
      </Grid>
    )
  }
}

EventsEditCreatePage.propTypes = {
  equipmentId: PropTypes.string.isRequired,
  eventId: PropTypes.string,
  get: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

EventsEditCreatePage.defaultProps = {
  eventId: null,
}
