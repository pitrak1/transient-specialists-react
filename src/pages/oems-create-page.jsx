import React from 'react'
import OemsEditCreatePage from 'common/pages/oems-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class OemsCreatePage extends React.Component {
  get(id, success, failure) {
    success({})
  }

  submit(state, success, failure) {
    api.postCreate('oems', { name: state.name }, success, failure)
  }

  render() {
    return (
      <OemsEditCreatePage
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create OEM'
      />
    )
  }
}

export default withRouter(OemsCreatePage)
