import React from 'react'
import OemsEditCreatePage from 'common/pages/oems-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

function OemsCreatePage(props) {
  const get = (id, success, failure) => {
    success({})
  }

  const submit = (state, success, failure) => {
    api.postCreate('oems', { name: state.name }, success, failure)
  }

  return (
    <OemsEditCreatePage
      get={get}
      history={props.history}
      submit={submit}
      title='Create OEM'
    />
  )
}

export default withRouter(OemsCreatePage)
