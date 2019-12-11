import React from 'react'
import IndexPage from 'common/pages/index-page'
import { withRouter } from 'react-router'

function OemsPage(props) {
  const headers = [
    { type: 'value', id: 'name', label: 'Name' },
    { type: 'button', id: 'showEquipment' },
    { type: 'button', id: 'showModels' },
    { type: 'button', id: 'edit' },
    { type: 'button', id: 'delete' },
  ]

  const transformData = data =>
    data.map(oem => ({
      id: oem.id,
      cells: [
        { id: 'name', type: 'value', value: oem.name },
        {
          id: 'showEquipment',
          type: 'button',
          value: 'Equipment',
          callback: 'showEquipment',
        },
        {
          id: 'showModels',
          type: 'button',
          value: 'Models',
          callback: 'showModels',
        },
        {
          id: 'edit',
          type: 'button',
          value: 'Edit',
          callback: 'edit',
        },
        {
          id: 'delete',
          type: 'button',
          value: 'Delete',
          callback: 'delete',
        },
      ],
    }))

  return (
    <IndexPage
      defaultSearchValue={props.match.params.search}
      defaultSortBy={'name'}
      headers={headers}
      history={props.history}
      resource='oems'
      title='OEMs'
      transformData={transformData}
    />
  )
}

export default withRouter(OemsPage)
