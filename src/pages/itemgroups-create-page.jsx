import React from 'react'
import ItemGroupsEditCreatePage from 'common/pages/itemgroups-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class ItemGroupsCreatePage extends React.Component {
  get(id, success, failure) {
    success({})
  }

  submit(state, success, failure) {
    api.postCreate('itemgroups', { name: state.name }, success, failure)
  }

  render() {
    return (
      <ItemGroupsEditCreatePage
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Item Group'
      />
    )
  }
}

export default withRouter(ItemGroupsCreatePage)
