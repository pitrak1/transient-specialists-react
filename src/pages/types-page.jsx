import React from 'react'
import IndexPage from 'common/pages/index-page'
import { withRouter } from 'react-router'

export class TypesPage extends React.Component {
  render() {
    const headers = [
      { type: 'value', id: 'name', label: 'Name' },
      { type: 'button', id: 'showEquipment' },
      { type: 'button', id: 'edit' },
      { type: 'button', id: 'delete' },
    ]

    const transformData = data =>
      data.map(type => ({
        id: type.id,
        cells: [
          { id: 'name', type: 'value', value: type.name },
          {
            id: 'showEquipment',
            type: 'button',
            value: 'Equipment',
            callback: this.handleShowClick,
          },
          {
            id: 'edit',
            type: 'button',
            value: 'Edit',
            callback: this.handleEditClick,
          },
          {
            id: 'delete',
            type: 'button',
            value: 'Delete',
            callback: this.handleDeleteClick,
          },
        ],
      }))

    return (
      <IndexPage
        defaultSearchValue={this.props.match.params.search}
        defaultSortBy={'name'}
        headers={headers}
        history={this.props.history}
        resource='types'
        title='Types'
        transformData={transformData}
      />
    )
  }
}

export default withRouter(TypesPage)
