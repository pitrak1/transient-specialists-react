import React from 'react'
import ModelsForm from '../common/models-form'
import api from '../api.js'
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
      <ModelsForm
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
