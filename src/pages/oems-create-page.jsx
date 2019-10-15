import React from 'react'
import OemsForm from '../components/oems-form.jsx'
import api from '../api.js'
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
      <OemsForm
        get={this.get}
        history={this.props.history}
        submit={this.submit}
        title='Create OEM'
      />
    )
  }
}

export default withRouter(OemsCreatePage)
