import LoadFormPage from './load-form-page.jsx'
import api from '../api.js'
import { withRouter } from 'react-router'

class EquipmentCreatePage extends LoadFormPage {
  constructor(props) {
    super(props)

    this.state.resource = 'equipment'
    this.state.label = 'Equipment'
  }

  formFields = () => [
    {
      identifier: 'serialNumber',
      label: 'Serial Number',
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
    {
      defaultOptionLabel: 'Select a Model',
      identifier: 'modelId',
      label: 'Model',
      required: true,
      type: 'select',
      options: () =>
        this.state.data.models.filter(
          model => model.oemId === this.state.oemId,
        ),
      disabled: () => !this.state.oemId,
    },
    {
      defaultOptionLabel: 'Select a Type',
      identifier: 'typeId',
      label: 'Type',
      required: true,
      type: 'select',
      options: () => this.state.data.types,
    },
  ]

  apiGet = () => {
    api.getNew('equipment', this.apiSuccess, this.apiFailure)
  }

  onSubmitSuccess = () => {
    this.props.history.push('/')
  }

  handleCustomChange = (identifier, value, valid, state) => {
    if (identifier === 'oemId') {
      state.modelId = null
      state.modelIdValid = false
    }
  }

  formValid = () =>
    this.state.serialNumberValid &&
    this.state.oemIdValid &&
    this.state.modelIdValid &&
    this.state.typeIdValid
}

export default withRouter(EquipmentCreatePage)
