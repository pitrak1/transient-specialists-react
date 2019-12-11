import React from 'react'
import IndexPage from 'common/pages/index-page'
import { withRouter } from 'react-router'

function ItemGroupsPage(props) {
  const headers = [
    { type: 'value', id: 'name', label: 'Name' },
    { type: 'button', id: 'details' },
  ]

  const transformData = data =>
    data.map(itemGroup => ({
      id: itemGroup.id,
      cells: [
        { id: 'name', type: 'value', value: itemGroup.name },
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
      defaultSortBy={'name'}
      headers={headers}
      history={props.history}
      resource='itemgroups'
      title='Item Groups'
      transformData={transformData}
    />
  )
}

export default withRouter(ItemGroupsPage)
