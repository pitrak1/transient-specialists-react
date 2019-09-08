import React from 'react'
import LoadFormPage from './load-form-page.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class ModelsCreatePage extends LoadFormPage {
  constructor(props) {
    super(props)

    this.state.resource = 'models'
    this.state.label = 'Model'
  }

  formFields = () => [
    {
      identifier: 'name',
      label: 'Name',
      required: true,
      type: 'text',
    },
    {
      defaultOptionLabel: 'Select an OEM',
      identifier: 'oemId',
      label: 'OEM',
      required: true,
      type: 'select',
      options: () => this.state.data.oems,
    },
  ]

  apiGet = () => {
    api.getNew('models', this.apiSuccess, this.apiFailure)
  }

  onSubmitSuccess = () => {
    this.props.history.push('/models')
  }

  formValid = () => this.state.nameValid && this.state.oemIdValid
}

export default withRouter(ModelsCreatePage)
