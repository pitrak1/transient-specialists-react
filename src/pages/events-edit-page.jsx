import React from 'react'
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core'
import FormTextField from '../components/form-text-field.jsx'
import FormSelect from '../components/form-select.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class EventsEditPage extends React.Component {
  state = {
    alert: null,
    data: {},
    error: null,
    loading: true,
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

  componentDidMount() {
    api.getEdit(
      'events',
      this.props.match.params.eventId,
      result => {
        const {
          id,
          status,
          jobNumber,
          companyNotes,
          startDate,
          endDate,
          updatedAt,
        } = result.event
        let statusInt = 0
        if (status === 'IN') {
          statusInt = 1
        } else if (status === 'OUT') {
          statusInt = 2
        } else if (status === 'READY') {
          statusInt = 3
        }
        this.setState({
          loading: false,
          data: result,
          id,
          status: statusInt,
          statusValid: true,
          jobNumber: jobNumber || '',
          jobNumberValid: true,
          companyNotes: companyNotes || '',
          companyNotesValid: true,
          startDate: startDate || '',
          startDateValid: true,
          endDate: endDate || '',
          endDateValid: true,
          updatedAt: updatedAt || '',
          updatedAtValid: true,
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
    api.patchUpdate(
      'events',
      {
        id: this.state.id,
        companyNotes: this.state.companyNotes,
        endDate: convertDate(this.state.endDate),
        jobNumber: this.state.jobNumber,
        startDate: convertDate(this.state.startDate),
        status: statusArray[parseInt(this.state.status)],
        updatedAt: convertDate(this.state.updatedAt),
      },
      () => {
        this.props.history.push(
          `/equipment/${this.props.match.params.equipmentId}`,
        )
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
          <Typography variant='h5'>Edit Event</Typography>
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

export default withRouter(EventsEditPage)
