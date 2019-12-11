import React from 'react'
import ModelsEditCreatePage from 'common/pages/models-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function ModelsEditPage(props) {
  const get = (id, success, failure) => {
    api.getEdit(
      'models',
      id,
      result => {
        const { id, name, oemId } = result.model
        success({
          id,
          name,
          nameValid: true,
          oemId,
          oemIdValid: true,
          oems: result.oems,
        })
      },
      failure,
    )
  }

  const submit = (state, success, failure) => {
    api.patchUpdate(
      'models',
      { id: state.id, name: state.name, oemId: state.oemId },
      success,
      failure,
    )
  }

  return (
    <ModelsEditCreatePage
      get={get}
      history={props.history}
      id={props.match.params.id}
      submit={submit}
      title='Edit Model'
    />
  )
}

export default withRouter(ModelsEditPage)
