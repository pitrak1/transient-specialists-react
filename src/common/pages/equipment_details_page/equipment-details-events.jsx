import React from 'react'
import PropTypes from 'prop-types'
import { Button, Toolbar, Typography } from '@material-ui/core'
import FullTable from 'common/display/table/full-table'

function EquipmentDetailsEvents(props) {
  const headers = [
    { type: 'value', id: 'status', label: 'Status' },
    { type: 'value', id: 'jobNumber', label: 'Job Number' },
    { type: 'value', id: 'companyNotes', label: 'Company/Notes' },
    { type: 'value', id: 'startDate', label: 'Start Date' },
    { type: 'value', id: 'endDate', label: 'End Date' },
    { type: 'value', id: 'updatedAt', label: 'Updated At' },
    { type: 'button', id: 'edit' },
    { type: 'button', id: 'delete' },
  ]

  const data = props.events.map(event => ({
    id: event.id,
    cells: [
      { id: 'status', type: 'value', value: event.status },
      { id: 'jobNumber', type: 'value', value: event.jobNumber },
      { id: 'companyNotes', type: 'value', value: event.companyNotes },
      { id: 'startDate', type: 'date', value: event.startDate },
      { id: 'endDate', type: 'date', value: event.endDate },
      { id: 'updatedAt', type: 'date', value: event.updatedAt },
      {
        id: 'edit',
        type: 'button',
        value: 'Edit',
        callback: props.onEditClick,
      },
      {
        id: 'delete',
        type: 'button',
        value: 'Delete',
        callback: props.onDeleteClick,
      },
    ],
  }))

  return (
    <div>
      <Toolbar>
        <Typography variant='h5'>Events</Typography>
        <Button onClick={props.onAddClick}>Add</Button>
      </Toolbar>
      <FullTable
        ascending={props.ascending}
        count={props.eventCount}
        data={data}
        headers={headers}
        onPageChange={props.onPageChange}
        onPerPageChange={props.onPerPageChange}
        onSort={props.onSortChange}
        page={props.page}
        perPage={props.perPage}
        perPageOptions={[5, 10, 25]}
        sortBy={props.sortBy}
      />
    </div>
  )
}

EquipmentDetailsEvents.propTypes = {
  ascending: PropTypes.bool.isRequired,
  eventCount: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPerPageChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
}

export default EquipmentDetailsEvents
