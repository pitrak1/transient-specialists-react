import React from 'react'
import ModelsForm from '../common/models-form'
import api from '../api.js'
import { withRouter } from 'react-router'

export class ModelsCreatePage extends React.Component {
  get(id, success, failure) {
    api.getNew('models', success, failure)
  }

  submit(state, success, failure) {
    api.postCreate(
      'models',
      { name: state.name, oemId: state.oemId },
      success,
      failure,
    )
  }

  render() {
    return (
      <ModelsForm
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Model'
      />
    )
  }
}

export default withRouter(ModelsCreatePage)
