import React from 'react'
import TypesForm from '../common/types-form'
import api from '../api.js'
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
      <TypesForm
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create Type'
      />
    )
  }
}

export default withRouter(TypesCreatePage)
