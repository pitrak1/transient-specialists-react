import React from 'react'
import ItemGroupsEditCreatePage from 'common/pages/itemgroups-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function ItemGroupsCreatePage(props) {
  const get = (id, success, failure) => {
    success({})
  }

  const submit = (state, success, failure) => {
    api.postCreate('itemgroups', { name: state.name }, success, failure)
  }

  return (
    <ItemGroupsEditCreatePage
      get={get}
      history={props.history}
      submit={submit}
      title='Create Item Group'
    />
  )
}

export default withRouter(ItemGroupsCreatePage)
