import React from 'react'
import TypesEditCreatePage from 'common/pages/types-edit-create-page'
import api from 'src/api'
import { withRouter } from 'react-router'

export class TypesCreatePage extends React.Component {
  get(id, success, failure) {
    success({})
  }

  submit(state, success, failure) {
    api.postCreate('types', { name: state.name }, success, failure)
  }

  render() {
    return (
      <TypesEditCreatePage
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Type'
      />
    )
  }
}

export default withRouter(TypesCreatePage)
