import React from 'react'
import TypesForm from '../components/types-form.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

export class TypesEditPage extends React.Component {
  get = (id, success, failure) => {
    api.getEdit(
      'types',
      id,
      result => {
        const { id, name } = result.type
        success({ id, name, nameValid: true })
      },
      failure,
    )
  }

  submit = (state, success, failure) => {
    api.patchUpdate(
      'types',
      { id: state.id, name: state.name },
      success,
      failure,
    )
  }

  render() {
    return (
      <TypesForm
        get={this.get}
        history={this.props.history}
        id={this.props.match.params.id}
        submit={this.submit}
        title='Edit Type'
      />
    )
  }
}

export default withRouter(TypesEditPage)
