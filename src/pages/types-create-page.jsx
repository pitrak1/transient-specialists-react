import React from 'react'
import TypesEditCreatePage from 'common/pages/types-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function TypesCreatePage(props) {
  const get = (id, success, failure) => {
    success({})
  }

  const submit = (state, success, failure) => {
    api.postCreate('types', { name: state.name }, success, failure)
  }

  return (
    <TypesEditCreatePage
      get={get}
      history={props.history}
      submit={submit}
      title='Create Type'
    />
  )
}

export default withRouter(TypesCreatePage)
