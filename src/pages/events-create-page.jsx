import React from 'react'
import EventsEditCreatePage from 'common/pages/events-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function EventsCreatePage(props) {
  const get = (id, success, failure) => {
    success({})
  }

  const submit = (equipmentId, state, success, failure) => {
    const statusArray = ['ERROR', 'IN', 'OUT', 'READY', 'SOLD']
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

  return (
    <EventsEditCreatePage
      equipmentId={props.match.params.id}
      get={get}
      history={props.history}
      submit={submit}
      title='Create Type'
    />
  )
}

export default withRouter(EventsCreatePage)
