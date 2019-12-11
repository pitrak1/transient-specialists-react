import React from 'react'
import EventsEditCreatePage from 'common/pages/events-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function EventsEditPage(props) {
  const get = (id, success, failure) => {
    api.getEdit(
      'events',
      id,
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
        } else if (status === 'SOLD') {
          statusInt = 4
        }

        success({
          id,
          status: statusInt,
          statusValid: true,
          jobNumber: jobNumber || '',
          jobNumberValid: true,
          companyNotes: companyNotes || '',
          companyNotesValid: true,
          startDate: startDate ? new Date(startDate) : null,
          startDateValid: true,
          endDate: endDate ? new Date(endDate) : null,
          endDateValid: true,
          updatedAt: updatedAt ? new Date(updatedAt) : null,
          updatedAtValid: true,
        })
      },
      failure,
    )
  }

  const submit = (equipmentId, state, success, failure) => {
    const statusArray = ['ERROR', 'IN', 'OUT', 'READY', 'SOLD']
    api.patchUpdate(
      'events',
      {
        id: state.id,
        companyNotes: state.companyNotes,
        endDate: state.endDate ? state.endDate.toISOString() : null,
        jobNumber: state.jobNumber,
        startDate: state.startDate ? state.startDate.toISOString() : null,
        status: statusArray[parseInt(state.status)],
        updatedAt: state.updatedAt ? state.updatedAt.toISOString() : null,
      },
      success,
      failure,
    )
  }

  return (
    <EventsEditCreatePage
      equipmentId={props.match.params.equipmentId}
      eventId={props.match.params.eventId}
      get={get}
      history={props.history}
      submit={submit}
      title='Edit Type'
    />
  )
}

export default withRouter(EventsEditPage)
