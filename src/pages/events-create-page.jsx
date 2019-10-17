import React from 'react'
import EventsForm from 'common/events-form'
import api from 'src/api'
import { withRouter } from 'react-router'

export class EventsCreatePage extends React.Component {
  get = (id, success, failure) => {
    success({})
  }

  submit = (equipmentId, state, success, failure) => {
    const statusArray = ['ERROR', 'IN', 'OUT', 'READY']
    api.postCreate(
      'events',
      {
        companyNotes: state.companyNotes,
        endDate: state.endDate ? state.endDate.toISOString() : null,
        jobNumber: state.jobNumber,
        startDate: state.startDate ? state.startDate.toISOString() : null,
        status: statusArray[parseInt(state.status)],
        updatedAt: state.updatedAt ? state.updatedAt.toISOString() : null,
        equipmentId,
      },
      success,
      failure,
    )
  }

  render() {
    return (
      <EventsForm
        equipmentId={this.props.match.params.id}
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Type'
      />
    )
  }
}

export default withRouter(EventsCreatePage)
