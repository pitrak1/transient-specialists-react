import React from 'react'
import { Spinner } from '@instructure/ui-elements'
import { Alert } from '@instructure/ui-alerts'
import { Heading } from '@instructure/ui-elements'
import { Button } from '@instructure/ui-buttons'
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
    status: null,
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
      return <Spinner renderTitle='Loading' size='large' />
    }

    return (
      <div>
        {this.state.alert && <Alert variant='error'>{this.state.alert}</Alert>}
        <Heading level='h1' margin='medium'>
          Add Event
        </Heading>
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
        <FormTextField
          identifier='jobNumber'
          label='Job Number'
          onChange={this.handleChange}
          required={false}
          value={this.state.jobNumber}
        />
        <FormTextField
          identifier='companyNotes'
          label='Company Notes'
          onChange={this.handleChange}
          required={false}
          value={this.state.companyNotes}
        />
        <FormTextField
          identifier='startDate'
          label='Start Date'
          onChange={this.handleChange}
          required={false}
          value={this.state.startDate}
        />
        <FormTextField
          identifier='endDate'
          label='End Date'
          onChange={this.handleChange}
          required={false}
          value={this.state.endDate}
        />
        <FormTextField
          identifier='updatedAt'
          label='Updated At'
          onChange={this.handleChange}
          required={false}
          value={this.state.updatedAt}
        />
        <Button disabled={!this.state.statusValid} onClick={this.handleClick}>
          Submit
        </Button>
      </div>
    )
  }
}

export default withRouter(EventsCreatePage)
