import React from 'react'
import {
  Button,
  CircularProgress,
  Toolbar,
  Typography,
} from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EventsCreatePage extends React.Component {
  state = {
    alert: null,
    companyNotes: '',
    companyNotesValid: true,
    endDate: '',
    endDateValid: true,
    jobNumber: '',
    jobNumberValid: true,
    loading: false,
    startDate: '',
    startDateValid: true,
    status: 0,
    statusValid: false,
    updatedAt: '',
    updatedAtValid: true,
  }

  handleChange = (identifier, value, valid) => {
    const state = {}
    state[identifier] = value
    state[`${identifier}Valid`] = valid
    this.setState(state)
  }

  handleClick = () => {
    const convertDate = date => {
      if (!date) {
        return null
      }

      const dateObj = new Date(date)
      return dateObj.toISOString()
    }

    this.setState({ loading: true, alert: null })
    const statusArray = ['ERROR', 'IN', 'OUT', 'READY']
    api.postCreate(
      'events',
      {
        companyNotes: this.state.companyNotes,
        endDate: convertDate(this.state.endDate),
        jobNumber: this.state.jobNumber,
        startDate: convertDate(this.state.startDate),
        status: statusArray[parseInt(this.state.status)],
        updatedAt: convertDate(this.state.updatedAt),
        equipmentId: this.props.match.params.id,
      },
      () => {
        this.props.history.push(`/equipment/${this.props.match.params.id}`)
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

    return (
      <Grid container>
        {this.state.alert && (
          <Grid item xs={12}>
            {this.state.alert}
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h5'>Add Event</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormSelect
            defaultOptionLabel='Select a Status'
            disabled={false}
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
            required={false}
            value={this.state.jobNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='companyNotes'
            label='Company Notes'
            onChange={this.handleChange}
            required={false}
            value={this.state.companyNotes}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='startDate'
            label='Start Date'
            onChange={this.handleChange}
            required={false}
            value={this.state.startDate}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='endDate'
            label='End Date'
            onChange={this.handleChange}
            required={false}
            value={this.state.endDate}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            identifier='updatedAt'
            label='Updated At'
            onChange={this.handleChange}
            required={false}
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

export default withRouter(EventsCreatePage)
