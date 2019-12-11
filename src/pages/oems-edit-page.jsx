import React from 'react'
import OemsEditCreatePage from 'common/pages/oems-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function OemsEditPage(props) {
  const get = (id, success, failure) => {
    api.getEdit(
      'oems',
      id,
      result => {
        const { id, name } = result.oem
        success({ id, name, nameValid: true })
      },
      failure,
    )
  }

  const submit = (state, success, failure) => {
    api.patchUpdate(
      'oems',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  return (
    <OemsEditCreatePage
      get={get}
      history={props.history}
      id={props.match.params.id}
      submit={submit}
      title='Edit OEM'
    />
  )
}

export default withRouter(OemsEditPage)
