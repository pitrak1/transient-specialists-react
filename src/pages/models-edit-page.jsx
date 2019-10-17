import React from 'react'
import ModelsEditCreatePage from 'common/pages/models-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class ModelsEditPage extends React.Component {
  get = (id, success, failure) => {
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

  submit = (state, success, failure) => {
    api.patchUpdate(
      'models',
      { id: state.id, name: state.name, oemId: state.oemId },
      success,
      failure,
    )
  }

  render() {
    return (
      <ModelsEditCreatePage
        get={this.get}
        history={this.props.history}
        id={this.props.match.params.id}
        submit={this.submit}
        title='Edit Model'
      />
    )
  }
}

export default withRouter(ModelsEditPage)
