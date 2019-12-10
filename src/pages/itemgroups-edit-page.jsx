import React from 'react'
import ItemGroupsEditCreatePage from 'common/pages/itemgroups-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class ItemGroupsEditPage extends React.Component {
  get = (id, success, failure) => {
    api.getEdit(
      'itemgroups',
      id,
      result => {
        const { id, name } = result.itemGroup
        success({ id, name, nameValid: true })
      },
      failure,
    )
  }

  submit = (state, success, failure) => {
    api.patchUpdate(
      'itemgroups',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  render() {
    return (
      <ItemGroupsEditCreatePage
        get={this.get}
        history={this.props.history}
        id={this.props.match.params.id}
        submit={this.submit}
        title='Edit Item Group'
      />
    )
  }
}

export default withRouter(ItemGroupsEditPage)
