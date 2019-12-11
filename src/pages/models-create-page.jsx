import React from 'react'
import ModelsEditCreatePage from 'common/pages/models-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function ModelsCreatePage(props) {
  const get = (id, success, failure) => {
    api.getNew('models', success, failure)
  }

  const submit = (state, success, failure) => {
    api.postCreate(
      'models',
      { name: state.name, oemId: state.oemId },
      success,
      failure,
    )
  }

  return (
    <ModelsEditCreatePage
      get={get}
      history={props.history}
      submit={submit}
      title='Create Model'
    />
  )
}

export default withRouter(ModelsCreatePage)
