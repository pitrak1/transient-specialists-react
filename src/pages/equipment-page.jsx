import React from 'react'
import IndexPage from 'common/pages/index-page'
import { withRouter } from 'react-router'

function EquipmentPage(props) {
  const headers = [
    { type: 'value', id: 'serialNumber', label: 'Serial Number' },
    { type: 'value', id: 'oemName', label: 'OEM' },
    { type: 'value', id: 'modelName', label: 'Model' },
    { type: 'value', id: 'typeName', label: 'Type' },
    { type: 'value', id: 'notes', label: 'Notes' },
    { type: 'value', id: 'eventStatus', label: 'Status' },
    { type: 'value', id: 'eventJobNumber', label: 'Job Number' },
    { type: 'value', id: 'eventCompanyNotes', label: 'Company/Notes' },
    { type: 'value', id: 'eventStartDate', label: 'Start Date' },
    { type: 'value', id: 'eventEndDate', label: 'End Date' },
    { type: 'button', id: 'details' },
  ]

  const transformData = data =>
    data.map(equipment => ({
      id: equipment.id,
      cells: [
        { id: 'serialNumber', type: 'value', value: equipment.serialNumber },
        { id: 'oemName', type: 'value', value: equipment.oemName },
        { id: 'modelName', type: 'value', value: equipment.modelName },
        { id: 'typeName', type: 'value', value: equipment.typeName },
        { id: 'notes', type: 'value', value: equipment.notes },
        { id: 'eventStatus', type: 'value', value: equipment.eventStatus },
        {
          id: 'eventJobNumber',
          type: 'value',
          value: equipment.eventJobNumber,
        },
        {
          id: 'eventCompanyNotes',
          type: 'value',
          value: equipment.eventCompanyNotes,
        },
        {
          id: 'eventStartDate',
          type: 'date',
          value: equipment.eventStartDate,
        },
        { id: 'eventEndDate', type: 'date', value: equipment.eventEndDate },
        {
          id: 'details',
          type: 'button',
          value: 'Details',
          callback: 'details',
        },
      ],
    }))

  return (
    <IndexPage
      defaultSearchValue={props.match.params.search}
      defaultSortBy={'serialNumber'}
      headers={headers}
      history={props.history}
      resource='equipment'
      title='Equipment'
      transformData={transformData}
    />
  )
}

export default withRouter(EquipmentPage)
