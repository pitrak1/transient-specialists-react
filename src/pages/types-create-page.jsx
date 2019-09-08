import LoadFormPage from './load-form-page.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class TypesCreatePage extends LoadFormPage {
  constructor(props) {
    super(props)

    this.state.resource = 'types'
    this.state.label = 'Type'
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
    this.props.history.push('/types')
  }

  formValid = () => this.state.nameValid
}

export default withRouter(TypesCreatePage)
