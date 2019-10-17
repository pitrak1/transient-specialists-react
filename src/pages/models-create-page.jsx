import React from 'react'
import ModelsEditCreatePage from 'common/pages/models-edit-create-page'
import api from 'src/api'
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
      <ModelsEditCreatePage
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Model'
      />
    )
  }
}

export default withRouter(ModelsCreatePage)
