import React from 'react'
import TypesEditCreatePage from 'common/pages/types-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function TypesEditPage(props) {
  const get = (id, success, failure) => {
    api.getEdit(
      'types',
      id,
      result => {
        const { id, name } = result.type
        success({ id, name, nameValid: true })
      },
      failure,
    )
  }

  const submit = (state, success, failure) => {
    api.patchUpdate(
      'types',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  return (
    <TypesEditCreatePage
      get={get}
      history={props.history}
      id={props.match.params.id}
      submit={submit}
      title='Edit Type'
    />
  )
}

export default withRouter(TypesEditPage)
