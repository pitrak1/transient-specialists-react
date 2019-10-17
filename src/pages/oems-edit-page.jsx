import React from 'react'
import OemsEditCreatePage from 'common/pages/oems-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class OemsEditPage extends React.Component {
  get = (id, success, failure) => {
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

  submit = (state, success, failure) => {
    api.patchUpdate(
      'oems',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  render() {
    return (
      <OemsEditCreatePage
        get={this.get}
        history={this.props.history}
        id={this.props.match.params.id}
        submit={this.submit}
        title='Edit OEM'
      />
    )
  }
}

export default withRouter(OemsEditPage)
