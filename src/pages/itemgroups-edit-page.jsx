import React from 'react'
import ItemGroupsEditCreatePage from 'common/pages/itemgroups-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function ItemGroupsEditPage(props) {
  const get = (id, success, failure) => {
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

  const submit = (state, success, failure) => {
    api.patchUpdate(
      'itemgroups',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  return (
    <ItemGroupsEditCreatePage
      get={get}
      history={props.history}
      id={props.match.params.id}
      submit={submit}
      title='Edit Item Group'
    />
  )
}

export default withRouter(ItemGroupsEditPage)
