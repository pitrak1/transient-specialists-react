import LoadFormPage from './load-form-page.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class OemsCreatePage extends LoadFormPage {
  constructor(props) {
    super(props)

    this.state.resource = 'oems'
    this.state.label = 'OEM'
  }

  formFields = () => [
    {
      identifier: 'name',
      label: 'Name',
      required: true,
      type: 'text',
    },
  ]

  apiGet = () => {
    api.dummy(this.apiSuccess, this.apiFailure)
  }

  onSubmitSuccess = () => {
    this.props.history.push('/oems')
  }

  formValid = () => this.state.nameValid
}

export default withRouter(OemsCreatePage)
