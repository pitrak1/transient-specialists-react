import React from 'react'
import IndexPage from 'common/pages/index-page'
import { withRouter } from 'react-router'

function ModelsPage(props) {
  const headers = [
    { type: 'value', id: 'name', label: 'Name' },
    { type: 'value', id: 'oemName', label: 'OEM' },
    { type: 'button', id: 'showEquipment' },
    { type: 'button', id: 'edit' },
    { type: 'button', id: 'delete' },
  ]

  const transformData = data =>
    data.map(model => ({
      id: model.id,
      cells: [
        { id: 'name', type: 'value', value: model.name },
        { id: 'oemName', type: 'value', value: model.oemName },
        {
          id: 'showEquipment',
          type: 'button',
          value: 'Equipment',
          callback: 'showEquipment',
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
      resource='models'
      title='Models'
      transformData={transformData}
    />
  )
}

export default withRouter(ModelsPage)
